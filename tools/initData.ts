/*const db = require("./index.js");

//まっさらなDBに制度の情報を流し込む関数
db.saveInitialDatafromJson().then((res: string) =>{
    console.log(res)
})*/
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

(async(e: string)=>{
  if(e=='kumamoto_earthquake'){
    const systemsDataKumamoto = require("../static_data/kumamotoEarthquake/systemsdata.json");
    for (const item of systemsDataKumamoto.systemsData) {
      await prisma.kumamoto_earthquake.create({
        data: {
          service_id: item["サービスID"],
          management_id: item["制度管理番号"],
          name: item["制度名"],
          target: item["対象者"],
          sub_title: item["サブタイトル"],
          priority: item["表示優先度"],
          start_release_date: item["公開日程"],
          end_release_date: item["申請期限（公開終了日）"],
          is_release: item["公開・非公開（チェックで公開）"],
          overview: item["制度概要"],
          organization: item["制度所管組織"],
          parent_system: item["親制度"],
          relationship_parent_system: item["親制度との関係性"],
          qualification: item["条件"],
          purpose: item["用途・対象物"],
          area: item["対象地域"],
          support_content: item["支援内容"],
          note: item["留意事項"],
          how_to_use: item["手続き等"],
          needs: item["必要なもの"],
          documents_url: item["必要書類のURL"],
          postal_address: item["申請窓口"],
          acceptable_dates: item["受付可能日時（受付日）"],
          acceptable_times: item["受付可能日時（受付時間）"],
          apply_url: item["申請可能URL"],
          start_application_date: item["受付開始日"],
          end_application_date: item["受付終了日"],
          contact: item["お問い合わせ先"],
          detail_url: item["詳細参照先"],
          administrative_service_category: item["行政サービス分類"],
          lifestage_category: item["ライフステージ分類"],
          problem_category: item["お困りごと分類"],
        }
      });
      console.log(item["サービスID"], item["制度名"])
    }
    console.log('ok')
  }else if(e=='shibuya_parenting'){
    const systemsDataShibuya = require("../static_data/shibuyaParenting/systemsdata.json");
    for (const item of systemsDataShibuya.systemsData) {
      await prisma.shibuya_parenting.create({
        data: {
          service_id: item["サービスID"],
          service_number: item["制度番号"],
          origin_id: item["元制度番号"],
          alteration_flag: item["制度変更区分"],
          provider: item["制度所管組織"],
          prefecture_id: item["都道府県"],
          city_id: item["市町村"],
          name: item["タイトル（制度名）"],
          abstract: item["概要"],
          provisions: item["支援内容"],
          amount: item["金額"],
          target: item["対象者"],
          how_to_apply: item["利用・申請方法"],
          application_start_date: item["受付開始日"],
          application_close_date: item["受付終了日"],
          contact: item["お問い合わせ先"],
          information_release_date: item["公開日"],
          tags: item["タグ"],
          theme: item["テーマ"],
          category: item["タグ（カテゴリー）"],
          person_type: item["タグ（事業者分類）"],
          entity_type: item["タグ（事業者分類）"],
          keyword_type: item["タグ（キーワード）"],
          issue_type: item["タグ（テーマ）"],
          detail_url: item["詳細参照先"]
        }
      });
      console.log(item["サービスID"], item["タイトル（制度名）"])
    }
    console.log('ok')
  }else if(e=='shibuya_preschool'){
    const systemsDataShibuyaKindergarten = require("../static_data/shibuyaPreschool/systemsdata.json");
    for (const item of systemsDataShibuyaKindergarten.systemsData) {
      await prisma.shibuya_preschool.create({
        data: {
          service_id: item["サービスID"],
          prefecture_id: item["都道府県"],
          city_id: item["市町村"],
          area: item["エリア"],
          name: item["幼稚園•保育園のタイトル"],
          target_age: item["対象年齢"],
          type_nursery_school: item["施設のカテゴリ"],
          administrator: item["施設の運営者"],
          closed_days: item["休園日"],
          playground: item["園庭"],
          bringing_your_own_towel: item["タオルの持ち込み"],
          take_out_diapers: item["オムツの持ち帰り"],
          parking: item["駐輪場"],
          lunch: item["給食・離乳食"],
          ibservation: item["見学"],
          extended_hours_childcare: item["延長保育の対応時間"],
          allergy_friendly: item["アレルギー対応"],
          admission_available: item["入園可能"],
          apply: item["申し込み受付先"],
          contact: item["お問い合わせ先"],
          information_release_date: item["公開日"],
          availability_of_childcare_facilities_for_0: item["保育施設の空き状況（0さい）"],
          availability_of_childcare_facilities_for_1: item["保育施設の空き状況（1さい）"],
          availability_of_childcare_facilities_for_2: item["保育施設の空き状況（2さい）"],
          availability_of_childcare_facilities_for_3: item["保育施設の空き状況（3さい）"],
          availability_of_childcare_facilities_for_4: item["保育施設の空き状況（4さい）"],
          availability_of_childcare_facilities_for_5: item["保育施設の空き状況（5さい）"],
          location: item["住所"],
          thisyear_admission_rate_for_0: item["今年の保育所利用の倍率（0さい）"],
          thisyear_admission_rate_for_1: item["今年の保育所利用の倍率（1さい）"],
          thisyear_admission_rate_for_2: item["今年の保育所利用の倍率（2さい）"],
          thisyear_admission_rate_for_3: item["今年の保育所利用の倍率（3さい）"],
          thisyear_admission_rate_for_4: item["今年の保育所利用の倍率（4さい）"],
          thisyear_admission_rate_for_5: item["今年の保育所利用の倍率（5さい）"],
          thisyear_admission_point_for_0: item["今年の保育所利用の指数・ポイント（0さい）"],
          thisyear_admission_point_for_1: item["今年の保育所利用の指数・ポイント（1さい）"],
          thisyear_admission_point_for_2: item["今年の保育所利用の指数・ポイント（2さい）"],
          thisyear_admission_point_for_3: item["今年の保育所利用の指数・ポイント（3さい）"],
          thisyear_admission_point_for_4: item["今年の保育所利用の指数・ポイント（4さい）"],
          thisyear_admission_point_for_5: item["今年の保育所利用の指数・ポイント（5さい）"],
          lastyear_admission_rate_for_0: item["去年の保育所利用の倍率（0さい）"],
          lastyear_admission_rate_for_1: item["去年の保育所利用の倍率（1さい）"],
          lastyear_admission_rate_for_2: item["去年の保育所利用の倍率（2さい）"],
          lastyear_admission_rate_for_3: item["去年の保育所利用の倍率（3さい）"],
          lastyear_admission_rate_for_4: item["去年の保育所利用の倍率（4さい）"],
          lastyear_admission_rate_for_5: item["去年の保育所利用の倍率（5さい）"],
          lastyear_admission_point_for_0: item["去年の保育所利用の指数・ポイント（0さい）"],
          lastyear_admission_point_for_1: item["去年の保育所利用の指数・ポイント（1さい）"],
          lastyear_admission_point_for_2: item["去年の保育所利用の指数・ポイント（2さい）"],
          lastyear_admission_point_for_3: item["去年の保育所利用の指数・ポイント（3さい）"],
          lastyear_admission_point_for_4: item["去年の保育所利用の指数・ポイント（4さい）"],
          lastyear_admission_point_for_5: item["去年の保育所利用の指数・ポイント（5さい）"],
          security: item["保育施設のセキュリティ"],
          baby_buggy: item["ベビーバギー置き場"],
          ibservation_detail: item["見学詳細"],
          detail_url: item["詳細参照先"]
        }
      });
      console.log(item["サービスID"], item["幼稚園•保育園のタイトル"])
    }
    console.log('ok')
  }else if(e=='japan'){
    const systemsDataJapan = require("../static_data/japan/systemsdata.json");
    for (const item of systemsDataJapan.systemsData) {
      await prisma.japan.create({
        data: {
          service_id: item["サービスID"],
          service_number: item["制度番号"],
          origin_id: item["元制度番号"],
          alteration_flag: item["制度変更区分"],
          provider: item["制度所管組織"],
          prefecture_id: item["都道府県"],
          city_id: item["市町村"],
          name: item["タイトル（制度名）"],
          abstract: item["概要"],
          provisions: item["支援内容"],
          target: item["対象者"],
          how_to_apply: item["利用・申請方法"],
          application_start_date: item["受付開始日"],
          application_close_date: item["受付終了日"],
          contact: item["お問い合わせ先"],
          information_release_date: item["公開日"],
          tags: item["タグ"],
          theme: item["テーマ"],
          category: item["タグ（カテゴリー）"],
          person_type: item["タグ（事業者分類）"],
          entity_type: item["タグ（事業者分類）"],
          keyword_type: item["タグ（キーワード）"],
          issue_type: item["タグ（テーマ）"],
          detail_url: item["詳細参照先"]
        }
      });
      console.log(item["サービスID"], item["タイトル（制度名）"])
    }
    console.log('ok')
  }
})('japan');