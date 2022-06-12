// DB操作まわりの関数をまとめて提供します


// TODO: //とりあえずpg直で叩いてるけどPrismaとかORM入れたい
//const { Client } = require("pg");
import { v4 as uuidv4 } from 'uuid';
//const pgParse = require('pg-connection-string').parse;
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

require("dotenv").config();

//if(!process.env.DATABASE_URL) throw new Error("Environment variable DATABASE_URL is not set.");

/*if (!process.env.RDS_HOSTNAME) {
  throw new Error("Environment variable RDS_HOSTNAME is not set.");
}

if (!process.env.RDS_PORT) {
  throw new Error("Environment variable RDS_PORT is not set.");
}

if (!process.env.RDS_DB_NAME) {
  throw new Error("Environment variable RDS_DB_NAME is not set.");
}
if (!process.env.RDS_USERNAME) {
  throw new Error("Environment variable RDS_USERNAME is not set.");
}

if (!process.env.RDS_PASSWORD) {
  throw new Error("Environment variable RDS_PASSWORD is not set.");
}*/

if (!process.env.LIFF_URL) {
  throw new Error("Environment variable LIFF_URL is not set.");
}

const liffUrl = process.env.LIFF_URL;

export type pgConfig = {
  user: string;
  host: string;
  database: string;
  password: string;
  port: string;
  ssl: any;
};

/*var config = pgParse(process.env.DATABASE_URL)
const pgConfig: pgConfig = {
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
  ssl: { rejectUnauthorized: false }
};

console.log(pgConfig);
const pg = new Client(pgConfig);

pg.connect()
  .then(() => console.log("pg Connected successfuly"))
  .catch((e: string) => console.log("pr err\n"+e));*/

export const getServiceDetail = async (serviceId: string) => {
  const tableName = serviceId.split("-")[0];
  const query = `SELECT * FROM ${tableName} WHERE service_id='${String(serviceId)}';`;
  const res = await prisma.$queryRawUnsafe(query);

  if (!res) {
    throw new Error("Not found");
  }

  const seidoType = serviceId.split("-")[0];
  const img_url = getImageUrl(seidoType);

  const service = res[0];

  return {
    ...service,
    image_url: img_url,
    uri: liffUrl + "/info/" + serviceId,
  };
};

export const saveUser = async (lineId: string) => {
  const res = await prisma.users.findUnique({
    where: { line_id: lineId },
  });

  if (!res) {
    await prisma.users.create({
      data: {
        line_id: lineId,
        shibuya_preschool: 0,
        shibuya_parenting: 0,
        kumamoto_earthquake: 0,
        japan: 0,
        favorite: "[]",
        created_at: new Date(),
      },
    });
  }
};

export const updateUserCount = async (lineId: string, selected: string) => {
  const res = await prisma.users.findUnique({
    where: { line_id: lineId },
  });

  if (res) {
    await prisma.users.update({
      where: { line_id: lineId },
      data: {
        [selected]: Number(res[selected]) + 1,
      },
    });
  }else{
    await prisma.users.create({
      data: {
        line_id: lineId,
        [selected]: 1,
        favorite: "[]",
        created_at: new Date(),
      },
    });
  }
}

//制度の利用数ログ
export const updateUseCount = async (serviceId: string) => {
  const res = await prisma.seido_use_count.findUnique({
    where: { service_id: serviceId },
  });

  if (res) {
    await prisma.seido_use_count.update({
      where: { service_id: serviceId },
      data: {
        count: Number(res.count) + 1,
      },
    });
  }else{
    await prisma.seido_use_count.create({
      data: {
        service_id: serviceId,
        count: 1,
      },
    });
  }
};
//制度の利用数

/*export const userFavorite = async (lineId: string, seidoId: string) => {
  const res = await pg.query({
    text: "SELECT * FROM users WHERE line_id=$1",
    values: [lineId],
  });

  if (res.rows.length === 1) {
    try{
      const fav = await pg.query({
        text: "SELECT favorite FROM users WHERE line_id=$1",
        values: [lineId],
      });
      let favList = JSON.parse(fav.rows[0].favorite)
      if(favList.includes(seidoId)){
        favList.splice(favList.indexOf(seidoId), 1);
      }else{
        favList.push(seidoId);
      }

      const saveString = JSON.stringify(favList);
      await pg.query({
        text: `UPDATE users SET favorite=$1 WHERE line_id=$2;`,
        values: [saveString, lineId],
      });
      return true;
    }catch(e){
      return false;
    }
  }
};

export const getUserFavorite = async (lineId: string) => {
  const res = await pg.query({
    text: "SELECT * FROM users WHERE line_id=$1",
    values: [lineId],
  });

  if (res.rows.length === 1) {
    try{
      const fav = await pg.query({
        text: "SELECT favorite FROM users WHERE line_id=$1",
        values: [lineId],
      });
      return JSON.parse(fav.rows[0].favorite);
    }catch(e){
      return [];
    }
  }
};*/

export const isLoggedIn = async (lineId: string) => {
  // lineIdがすでにDBに乗ってたらtrue,そうでなければFalse
  const res = await prisma.users.findUnique({
    where: { line_id: lineId },
  });

  if (!res) {
    return false;
  }
  return true;
};

export type resultSaveData = {
  result: Array<{ title: string; overview: string; detailUrl: string }>;
  resultId: string;
};

export const queryServices = async (
  systemIds: Array<string>,
  lineId: string,
  seido: string
) => {
  const resultId: string = uuidv4();

  const resultSaveData: resultSaveData = {
    result: [],
    resultId: resultId,
  };

  let othersType: string;
  if (seido === "shibuya_preschool") {
    othersType = "施設";
  } else if (seido === "shibuya_parenting" || seido === "kumamoto_earthquake"|| seido === "japan") {
    othersType = "制度";
  } else {
    othersType = "";
  }

  let imgUrl;
  if (seido === "shibuya_parenting" || seido === "shibuya_preschool") {
    imgUrl =
      "https://static.civichat.jp/thumbnail-image/babycar_woman_color.png";
  } else {
    imgUrl = "https://static.civichat.jp/thumbnail-image/savings.png";
  }
  for (const systemId of systemIds) {
    const query = `SELECT * FROM ${seido} WHERE service_id='${String(systemId)}';`;
    const res = await prisma.$queryRawUnsafe(query);
    //検索結果を配列に格納
    resultSaveData.result.push({
      ...res[0],
      othersType: othersType,
    });
  }
  const saveString = JSON.stringify(resultSaveData);

  //保存する
  await prisma.results.create({
    data: {
      result_id: resultId,
      result_body: saveString,
      line_id: lineId,
      src_table: seido,
      created_at: new Date(),
    },
  });
  return [resultId,othersType,imgUrl];
};

export const getQueryResult = async (resultId: string) => {
  const res = await prisma.results.findUnique({
    where: { result_id: resultId },
  });

  const seidoType = JSON.parse(
    res.result_body
  ).result[0].service_id.split("-")[0];
  const img_url = getImageUrl(seidoType);
  if (res) {
    return {
      result: JSON.parse(res.result_body).result,
      img_url: img_url,
    };
  } else {
    return { result: [] };
  }
};

// systemsdata.jsonから制度詳細をDBに追加する関数
export const saveInitialDatafromJson = async () => {
  /*await pg.query({
    text: `
    CREATE TABLE "apply_locations" (
      "service_id" text,
      "application_lcoation" text,
      PRIMARY KEY ("service_id", "application_lcoation")
    );`
  })

  await pg.query({
    text: `CREATE TABLE "apply_postal_address" (
      "service_id" text,
      "postal_address" text,
      PRIMARY KEY ("service_id", "postal_address")
    );`
  })

  await pg.query({
    text: `CREATE TABLE "documents" (
      "service_id" text,
      "document_name" text,
      "document_url" text,
      PRIMARY KEY ("service_id", "document_name")
    );`
  })

  await pg.query({
    text: `CREATE TABLE "related_system" (
      "subject_service_id" text,
      "object_service_id" text,
      "relationship" text,
      PRIMARY KEY ("subject_service_id", "object_service_id")
    );`
  })

  await pg.query({
    text: `CREATE TABLE "shibuya_parenting" (
      "id" serial PRIMARY KEY,
      "service_id" character varying(255) NOT NULL UNIQUE UNIQUE UNIQUE,
      "service_number" text,
      "origin_id" text,
      "alteration_flag" text,
      "provider" text,
      "prefecture_id" text,
      "city_id" text,
      "name" text,
      "abstract" text,
      "provisions" text,
      "target" text,
      "how_to_apply" text,
      "application_start_date" text,
      "application_close_date" text,
      "detail_url" text,
      "contact" text,
      "information_release_date" text,
      "tags" text,
      "theme" text,
      "category" text,
      "person_type" text,
      "entity_type" text,
      "keyword_type" text,
      "issue_type" text
    );`
  })

  await pg.query({
    text: `CREATE TABLE "japan" (
      "id" serial PRIMARY KEY,
      "service_id" character varying(255) NOT NULL UNIQUE UNIQUE UNIQUE,
      "service_number" text,
      "origin_id" text,
      "alteration_flag" text,
      "provider" text,
      "prefecture_id" text,
      "city_id" text,
      "name" text,
      "abstract" text,
      "provisions" text,
      "target" text,
      "how_to_apply" text,
      "application_start_date" text,
      "application_close_date" text,
      "detail_url" text,
      "contact" text,
      "information_release_date" text,
      "tags" text,
      "theme" text,
      "category" text,
      "person_type" text,
      "entity_type" text,
      "keyword_type" text,
      "issue_type" text
    );`
  })

  await pg.query({
    text: `CREATE TABLE "kumamoto_earthquake" (
      "id" serial PRIMARY KEY,
      "service_id" character varying(255) NOT NULL UNIQUE UNIQUE UNIQUE,
      "management_id" text,
      "name" text,
      "target" text,
      "sub_title" text,
      "priority" text,
      "start_release_date" text,
      "end_release_date" text,
      "is_release" text,
      "overview" text,
      "organization" text,
      "parent_system" text,
      "relationship_parent_system" text,
      "qualification" text,
      "purpose" text,
      "area" text,
      "support_content" text,
      "note" text,
      "how_to_use" text,
      "needs" text,
      "documents_url" text,
      "postal_address" text,
      "acceptable_dates" text,
      "acceptable_times" text,
      "apply_url" text,
      "start_application_date" text,
      "end_application_date" text,
      "contact" text,
      "detail_url" text,
      "administrative_service_category" text,
      "lifestage_category" text,
      "problem_category" text
    );`
  })

  await pg.query({
    text: `CREATE TABLE "shibuya_preschool" (
      "id" serial PRIMARY KEY,
      "service_id" character varying(255) NOT NULL UNIQUE UNIQUE UNIQUE,
      "prefecture_id" text,
      "city_id" text,
      "area" text,
      "name" text,
      "target_age" text,
      "type_nursery_school" text,
      "administrator" text,
      "closed_days" text,
      "playground" text,
      "bringing_your_own_towel" text,
      "take_out_diapers" text,
      "parking" text,
      "lunch" text,
      "ibservation" text,
      "extended_hours_childcare" text,
      "allergy_friendly" text,
      "admission_available" text,
      "apply" text,
      "detail_url" text,
      "contact" text,
      "information_release_date" text,
      "availability_of_childcare_facilities_for_0" text,
      "availability_of_childcare_facilities_for_1" text,
      "availability_of_childcare_facilities_for_2" text,
      "availability_of_childcare_facilities_for_3" text,
      "availability_of_childcare_facilities_for_4" text,
      "availability_of_childcare_facilities_for_5" text,
      "location" text,
      "thisyear_admission_rate_for_0" text,
      "thisyear_admission_rate_for_1" text,
      "thisyear_admission_rate_for_2" text,
      "thisyear_admission_rate_for_3" text,
      "thisyear_admission_rate_for_4" text,
      "thisyear_admission_rate_for_5" text,
      "thisyear_admission_point_for_0" text,
      "thisyear_admission_point_for_1" text,
      "thisyear_admission_point_for_2" text,
      "thisyear_admission_point_for_3" text,
      "thisyear_admission_point_for_4" text,
      "thisyear_admission_point_for_5" text,
      "lastyear_admission_rate_for_0" text,
      "lastyear_admission_rate_for_1" text,
      "lastyear_admission_rate_for_2" text,
      "lastyear_admission_rate_for_3" text,
      "lastyear_admission_rate_for_4" text,
      "lastyear_admission_rate_for_5" text,
      "lastyear_admission_point_for_0" text,
      "lastyear_admission_point_for_1" text,
      "lastyear_admission_point_for_2" text,
      "lastyear_admission_point_for_3" text,
      "lastyear_admission_point_for_4" text,
      "lastyear_admission_point_for_5" text,
      "security" text,
      "baby_buggy" text,
      "ibservation_detail" text
    );`
  })

  await pg.query({
    text: `CREATE TABLE "users" (
      "line_id" text,
      "created_at" text
    );`
  })

  await pg.query({
    text: `CREATE TABLE "results" (
      "result_id" text,
      "result_body" text,
      "line_id" text,
      "src_table" text,
      "created_at" text
    );`
  })

  await pg.query({
    text: `ALTER TABLE "apply_locations"
    ADD FOREIGN KEY ("service_id") REFERENCES "shibuya_parenting" ("service_id");`
  })

  await pg.query({
    text: `ALTER TABLE "apply_postal_address"
  ADD FOREIGN KEY ("service_id") REFERENCES "shibuya_parenting" ("service_id");`
})

  await pg.query({
    text: `ALTER TABLE "documents"
  ADD FOREIGN KEY ("service_id") REFERENCES "shibuya_parenting" ("service_id");`
})

  await pg.query({
    text: `ALTER TABLE "related_system"
  ADD FOREIGN KEY ("subject_service_id") REFERENCES "shibuya_parenting" ("service_id");`
})

  await pg.query({
    text: `ALTER TABLE "related_system"
  ADD FOREIGN KEY ("object_service_id") REFERENCES "shibuya_parenting" ("service_id");`
})

  await pg.query({
    text: `ALTER TABLE "apply_locations"
  ADD FOREIGN KEY ("service_id") REFERENCES "kumamoto_earthquake" ("service_id");`
})

  await pg.query({
    text: `ALTER TABLE "apply_postal_address"
  ADD FOREIGN KEY ("service_id") REFERENCES "kumamoto_earthquake" ("service_id");`
})

  await pg.query({
    text: `ALTER TABLE "documents"
  ADD FOREIGN KEY ("service_id") REFERENCES "kumamoto_earthquake" ("service_id");`
})

  await pg.query({
    text: `ALTER TABLE "related_system"
  ADD FOREIGN KEY ("subject_service_id") REFERENCES "kumamoto_earthquake" ("service_id");`
})

  await pg.query({
    text: `ALTER TABLE "related_system"
  ADD FOREIGN KEY ("object_service_id") REFERENCES "kumamoto_earthquake" ("service_id");`
})

  await pg.query({
    text: `ALTER TABLE "apply_locations"
  ADD FOREIGN KEY ("service_id") REFERENCES "shibuya_parenting" ("service_id");`
})

  await pg.query({
    text: `ALTER TABLE "apply_postal_address"
  ADD FOREIGN KEY ("service_id") REFERENCES "shibuya_parenting" ("service_id");`
})

  await pg.query({
    text: `ALTER TABLE "documents"
  ADD FOREIGN KEY ("service_id") REFERENCES "shibuya_parenting" ("service_id");`
})

  await pg.query({
    text: `ALTER TABLE "related_system"
  ADD FOREIGN KEY ("subject_service_id") REFERENCES "shibuya_parenting" ("service_id");`
})

  await pg.query({
    text: `ALTER TABLE "related_system"
  ADD FOREIGN KEY ("object_service_id") REFERENCES "shibuya_parenting" ("service_id");`
})*/
  return "ok";
};

function getImageUrl(seidoType: string) {
  let img_url: string;
  if (seidoType === "shibuya_preschool" || seidoType === "shibuya_parenting") {
    img_url =
      "https://static.civichat.jp/thumbnail-image/babycar_man_color.png";
  } else if (seidoType === "kumamoto_earthquake") {
    img_url = "https://static.civichat.jp/thumbnail-image/support.png";
  } else {
    img_url = "https://static.civichat.jp/thumbnail-image/support.png";
  }
  return img_url;
}