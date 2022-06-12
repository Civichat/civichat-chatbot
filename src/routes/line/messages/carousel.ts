import * as types from "@line/bot-sdk/lib/types";
import { SystemProperty } from "../../../classes";

module.exports = function carouselTemplate(
  items: SystemProperty[],
  systemsCount: number,
  resultId: string,
  othersType: string,
  imgUrl: string
) {
  if (items.length === 0) {
    return { type: "text", text: "当てはまる制度が見つかりませんでした。" };
  }
  const carouselContents = [
    {
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: String(systemsCount),
            color: "#000000",
            align: "center",
            gravity: "center",
            size: "5xl",
            weight: "bold",
            decoration: "none",
          },
          {
            type: "text",
            text: `種類の${othersType}が見つかりました🎉`,
            color: "#000000",
            weight: "bold",
            align: "center",
          },
        ],
        justifyContent: "center",
      },
    },
  ] as types.FlexBubble[];
  for (const item of items) {
    const content: types.FlexBubble = {
      type: "bubble",
      header: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "filler",
          },
        ],
      },
      hero: {
        type: "image",
        url: imgUrl,
        size: "3xl",
        aspectRatio: "20:13",
        aspectMode: "fit",
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text:
              item.name ||
              "タイトル",
            color: "#000000",
            weight: "bold",
            size: "xl",
            wrap: true,
          },
        ],
      },
      footer: {
        type: "box",
        layout: "vertical",
        margin: "none",
        contents: [
          {
            type: "text",
            text: "詳しく見る",
            weight: "bold",
            size: "lg",
            color: "#177BDCFF",
            align: "center",
            margin: "md",
            action: {
              type: "uri",
              label: "詳しく見る",
              uri: `${process.env.LIFF_URL}/services/${item.service_id}`,
            },
            contents: [],
          },
          {
            type: "spacer",
          },
        ],
      },
    };
    if (item.abstract || item.overview) {
      content.body.contents.push({
        type: "text",
        text: item.abstract || item.overview,
        color: "#000000",
        weight: "bold",
        margin: "md",
        size: "sm",
        wrap: true,
      });
    }
    if (item.location) {
      const encodeAddress = encodeURI(item.location);
      content.body.contents.push({
        type: "box",
        layout: "vertical",
        margin: "md",
        contents: [
          {
            type: "box",
            layout: "horizontal",
            contents: [
              {
                type: "text",
                text: "住所",
                color: "#6A6A6A",
                contents: [],
              },
              {
                type: "text",
                text: item.location,
                color: "#000000",
                wrap: true,
                action: {
                  type: "uri",
                  label: "tel",
                  uri: `https://www.google.com/maps/search/?api=1&query=${encodeAddress}`,
                },
                contents: [],
              },
            ],
          },
        ],
      });
    }
    if (item.ibservation) {
      content.body.contents.push({
        type: "box",
        layout: "vertical",
        margin: "md",
        contents: [
          {
            type: "box",
            layout: "horizontal",
            contents: [
              {
                type: "text",
                text: "見学",
                color: "#6A6A6A",
                contents: [],
              },
              {
                type: "text",
                text: item.ibservation,
                color: "#000000",
                wrap: true,
                contents: [],
              },
            ],
          },
        ],
      });
    }
    // if (item["お問い合わせ先"]) {
    //   content.body.contents.push({
    //     type: "box",
    //     layout: "vertical",
    //     margin: "md",
    //     contents: [
    //       {
    //         type: "box",
    //         layout: "horizontal",
    //         contents: [
    //           {
    //             type: "text",
    //             text: "お問い合わせ先",
    //             color: "#000000",
    //             contents: [],
    //           },
    //           {
    //             type: "text",
    //             text: item["お問い合わせ先"],
    //             color: "#000000",
    //             wrap: true,
    //             action: {
    //               type: "uri",
    //               label: "tel",
    //               uri: `tel:${item["お問い合わせ先"]}`,
    //             },
    //             contents: [],
    //           },
    //         ],
    //       },
    //     ],
    //   });
    // }
    if (item.target) {
      content.body.contents.push({
        type: "box",
        layout: "vertical",
        margin: "md",
        contents: [
          {
            type: "box",
            layout: "horizontal",
            contents: [
              {
                type: "text",
                text: "対象者",
                color: "#6A6A6A",
                contents: [],
              },
              {
                type: "text",
                text: item.target,
                color: "#000000",
                wrap: true,
                contents: [],
              },
            ],
          },
        ],
      });
    }
    if( item.amount ){
      content.body.contents.push({
        type: "box",
        layout: "vertical",
        margin: "md",
        contents: [
          {
            type: "box",
            layout: "horizontal",
            contents: [
              {
                type: "text",
                text: "支援額（想定）",
                color: "#6A6A6A",
                contents: [],
              },
              {
                type: "text",
                text: item.amount,
                color: "#000000",
                wrap: true,
                contents: [],
              },
            ],
          },
        ],
      });
    }
    if (item.administrative_service_category) {
      content.body.contents.push({
        type: "box",
        layout: "vertical",
        margin: "md",
        contents: [
          {
            type: "box",
            layout: "horizontal",
            contents: [
              {
                type: "text",
                text: "行政サービス分類",
                color: "#6A6A6A",
                contents: [],
              },
              {
                type: "text",
                text: item.administrative_service_category,
                color: "#000000",
                wrap: true,
                contents: [],
              },
            ],
          },
        ],
      });
    }
    if (
      item.lastyear_admission_rate_for_0 ||
      item.lastyear_admission_point_for_0
    ) {
      content.body.contents.push(
        {
          type: "text",
          text: "aa",
          weight: "bold",
          size: "lg",
          align: "start",
          margin: "md",
          contents: [
            {
              type: "span",
              text: "前年度の申込状況",
              color: "#6A6A6A",
              size: "md",
            },
          ],
        },
        {
          type: "text",
          text: "hello, world",
          contents: [
            {
              type: "span",
              text: "（倍率／最下指数）",
              color: "#6A6A6A",
              size: "md",
              weight: "regular",
            },
          ],
        },
        {
          type: "box",
          layout: "horizontal",
          margin: "md",
          contents: [
            {
              type: "text",
              text: "0歳児",
              color: "#6A6A6A",
              weight: "regular",
              align: "start",
              contents: [],
            },
            {
              type: "text",
              text: `${
                item. lastyear_admission_rate_for_0 != null
                  ? item. lastyear_admission_rate_for_0
                  : "-"
              }／${
                item.lastyear_admission_point_for_0 != null
                  ? item.lastyear_admission_point_for_0
                  : `-`
              }`,
              color: "#000000",
              align: "end",
              wrap: true,
              contents: [],
            },
          ],
        },
        {
          type: "box",
          layout: "horizontal",
          contents: [
            {
              type: "text",
              text: "1歳児",
              color: "#6A6A6A",
              weight: "regular",
              align: "start",
              contents: [],
            },
            {
              type: "text",
              text: `${
                item.lastyear_admission_rate_for_1 != null
                  ? item.lastyear_admission_rate_for_1
                  : "-"
              }／${

                item.lastyear_admission_point_for_1 != null
                  ? item.lastyear_admission_point_for_1
                  : `-`
              }`,
              color: "#000000",
              align: "end",
              wrap: true,
              contents: [],
            },
          ],
        },
        {
          type: "box",
          layout: "horizontal",
          contents: [
            {
              type: "text",
              text: "2歳児",
              color: "#6A6A6A",
              weight: "regular",
              align: "start",
              contents: [],
            },
            {
              type: "text",
              text: `${
                item.lastyear_admission_rate_for_2 != null
                  ? item.lastyear_admission_rate_for_2
                  : "-"
              }／${
                item.lastyear_admission_point_for_2 != null
                  ? item.lastyear_admission_point_for_2
                  : `-`
              }`,
              color: "#000000",
              align: "end",
              wrap: true,
              contents: [],
            },
          ],
        },
        {
          type: "box",
          layout: "horizontal",
          contents: [
            {
              type: "text",
              text: "3歳児",
              color: "#6A6A6A",
              weight: "regular",
              align: "start",
              contents: [],
            },
            {
              type: "text",
              text: `${
                item.lastyear_admission_rate_for_3 != null
                  ? item.lastyear_admission_rate_for_3
                  : "-"
              }／${
                item.lastyear_admission_point_for_3 != null
                  ? item.lastyear_admission_point_for_3
                  : `-`
              }`,
              color: "#000000",
              align: "end",
              wrap: true,
              contents: [],
            },
          ],
        },
        {
          type: "box",
          layout: "horizontal",
          contents: [
            {
              type: "text",
              text: "4歳児",
              weight: "regular",
              align: "start",
              contents: [],
            },
            {
              type: "text",
              text: `${
                item.lastyear_admission_rate_for_4 != null
                  ? item.lastyear_admission_rate_for_4
                  : "-"
              }／${
                item.lastyear_admission_point_for_4 != null
                  ? item.lastyear_admission_point_for_4
                  : `-`
              }`,
              color: "#000000",
              align: "end",
              wrap: true,
              contents: [],
            },
          ],
        },
        {
          type: "box",
          layout: "horizontal",
          contents: [
            {
              type: "text",
              text: "5歳児",
              color: "#6A6A6A",
              weight: "regular",
              align: "start",
              contents: [],
            },
            {
              type: "text",
              text: `${
                item.lastyear_admission_rate_for_5 != null
                  ? item.lastyear_admission_rate_for_5
                  : "-"
              }／${
                item.lastyear_admission_point_for_5 != null
                  ? item.lastyear_admission_point_for_5
                  : `-`
              }`,
              color: "#000000",
              align: "end",
              wrap: true,
              contents: [],
            },
          ],
        }
      );
    }
    carouselContents.push(content);
  }

  carouselContents.push({
    type: "bubble",
    body: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: `利用できる${systemsCount}個の${othersType}を見る`,
          size: "lg",
          color: "#1F00FFFF",
          align: "center",
          action: {
            type: "uri",
            label: "リンク",
            uri: `${process.env.LIFF_URL}/others/${resultId}`,
          },
          contents: [],
        },
      ],
      justifyContent: "center",
    },
  });
  const returnMessage: types.Message = {
    type: "flex",
    altText: "検索結果",
    contents: {
      type: "carousel",
      contents: carouselContents,
    },
    quickReply: {
      items: [
        {
          type: "action",
          action: {
            type: "uri",
            label: `利用できる${systemsCount}個の${othersType}を見る`,
            uri: `${process.env.LIFF_URL}/others/${resultId}`,
          },
        },
      ],
    },
  };
  return returnMessage;
};
