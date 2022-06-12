import * as line from "@line/bot-sdk";
import * as types from "@line/bot-sdk/lib/types";

import {
  Answer,
  Question,
  ChatState,
  Session,
  Sessions,
  Qna,
  answer,
  syst,
} from "../../classes";

import { getServiceDetail, queryServices, saveUser, updateUserCount } from '../../db/index';

const config: line.ClientConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new line.Client(config);

const carouselTemplate = require("./messages/carousel");

const questionTemplate = require("./messages/question_m");

let sessions: Sessions = {};

module.exports = async (event: line.ReplyableEvent & line.WebhookEvent) => {
  console.log(event);
  if (!event.source.userId) {
    throw Error("userId is undefined");
  }
  let returnMessage: Array<types.Message> = [
    { type: "text", text: "hello world!" },
  ];

  switch (event.type) {
    case "message":
      if (event.message.type === "text") {
        if (event.message.text === "Civichatをはじめる") {
          returnMessage = [
            {
              type: "flex",
              altText: "選択してください",
              contents: {
                type: "bubble",
                direction: "ltr",
                header: {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    {
                      type: "text",
                      text: "どのカテゴリーを探したいですか",
                      weight: "bold",
                      align: "center",
                      contents: [],
                    },
                  ],
                },
                body: {
                  type: "box",
                  layout: "vertical",
                  spacing: "md",
                  contents: [
                    {
                      type: "button",
                      action: {
                        type: "postback",
                        label: "熊本県・震災制度",
                        data: "start-kumamoto_earthquake",
                      },
                      style: "primary",
                    },
                    {
                      type: "button",
                      action: {
                        type: "postback",
                        label: "渋谷区・子育て制度",
                        data: "start-shibuya_parenting",
                      },
                      style: "primary",
                    },
                    {
                      type: "button",
                      action: {
                        type: "postback",
                        label: "渋谷区・保育施設",
                        data: "start-shibuya_preschool",
                      },
                      style: "primary",
                    },
                    {
                      type: "button",
                      action: {
                        type: "postback",
                        label: "全国版",
                        data: "start-japan",
                      },
                      style: "primary",
                    },
                    {
                      type: "button",
                      "action": {
                        "type": "uri",
                        "label": "導入リクエストを送る",
                        "uri": "https://forms.gle/HvoejEDFo1TPFnxA8"
                      },
                      style: "secondary",
                    },
                  ],
                },
              },
            },
          ];
        } else if (event.message.text === "渋谷保育施設一覧希望") {
          returnMessage = [
            {
              type: "text",
              text: "「Civichatを利用している方全員に無料」で、施設名・住所などに加え、空き状況・保育所利用の倍率・指数（令和2, 3年度）などのデータを含めた「渋谷区の保育施設一覧」をお渡ししています！✌🏻\n\n貰う方法は、SNSで感想を投稿するだけ！\n1. 〈Twitterの場合〉規定のツイートに引用RTで感想を書いてツイート https://twitter.com/civichat/status/1435516003140583428?openExternalBrowser=1\n2. 〈Instagramの場合〉 規定の動画をストーリーでリポスト（@civichat.jpのメンションをしてください） https://www.instagram.com/p/CTpGWcJBg0N/?openExternalBrowser=1\n\n完了すると、運営から1日以内にDMでメッセージが届きます！📩保育施設を探しをしているパパ・ママの方は、ぜひご参加ください！🔥\n---\n⚠️鍵アカウントの方は鍵を外してからご参加ください。\n🔗応募規約https://civichat.notion.site/SNS-e8672bf7c71d4048844b11c53b7c7a14",
            },
            {
              type: "imagemap",
              baseUrl: "https://static.civichat.jp/cp",
              altText: "This is an imagemap",
              baseSize: {
                width: 1040,
                height: 1057,
              },
              actions: [
                {
                  type: "uri",
                  area: {
                    x: 0,
                    y: 3,
                    width: 1035,
                    height: 527,
                  },
                  linkUri:
                    "https://twitter.com/civichat/status/1435516003140583428?openExternalBrowser=1",
                },
                {
                  type: "uri",
                  area: {
                    x: 0,
                    y: 539,
                    width: 1030,
                    height: 518,
                  },
                  linkUri:
                    "https://www.instagram.com/p/CTpGWcJBg0N?openExternalBrowser=1",
                },
              ],
            },
          ];
        } else {
          // ユーザーのセッション取得
          const userSession: Session = sessions[event.source.userId];
          if (userSession) {
            const cs = userSession.getState();
            cs.selectAnswerByText(
              userSession.getBeforeQuestionId(),
              event.message.text
            );
            cs.maintenanceQuestions();
            if (cs.isEnded()) {
              console.log(`制度推薦終了,${cs.getSystems().length}個の制度`);
              if (cs.getSystems().length === 0) {
                returnMessage = [
                  {
                    type: "text",
                    text: "現在の条件では、該当するものを見つけることができませんでした。再度、条件を変更してお試しください。",
                  },
                ];
              }
              //カルーセルが8枚より上
              else if (cs.getSystems().length > 8) {
                let results = [];
                for(const system of cs.getSystems()) {
                  const serviceDetail = await getServiceDetail(system);
                  results.push(serviceDetail);
                }
                const systemsCount = results.length;
                const [resultId, othersType, imgUrl] = await queryServices(
                  cs.getSystems(),
                  event.source.userId,
                  cs.getSeido()
                );
                returnMessage = [
                  {
                    type: "text",
                    text: `質問へのご回答ありがとうございました！\nあなたの条件にぴったりの${othersType}が${results.length}件見つかりました！\n\n（最新情報は各公式ホームページをご確認ください。もし間違いなどございましたら、運営までご連絡ください。）`,
                  },
                  await carouselTemplate(
                    results.slice(0, 8),
                    systemsCount,
                    resultId,
                    othersType,
                    imgUrl
                  ),
                ];
              } else {
                // 8枚以下
                const results = [];
                for(const system of cs.getSystems()) {
                  const serviceDetail = await getServiceDetail(system);
                  results.push(serviceDetail);
                }
                const systemsCount = results.length;
                const [resultId, othersType, imgUrl] = await queryServices(
                  cs.getSystems(),
                  event.source.userId,
                  cs.getSeido()
                );
                returnMessage = [
                  {
                    type: "text",
                    text: `質問へのご回答ありがとうございました！\nあなたの条件にぴったりの${othersType}が${results.length}件見つかりました！\n\n（最新情報は各公式ホームページをご確認ください。もし間違いなどございましたら、運営までご連絡ください。）`,
                  },
                  await carouselTemplate(
                    results,
                    systemsCount,
                    resultId,
                    othersType,
                    imgUrl
                  ),
                ];
              }
              await updateUserCount(event.source.userId, cs.getSeido());
            } else {
              sessions = {
                ...sessions,
                [event.source.userId]: new Session(
                  cs,
                  cs.selectQuestionFromPriority().id
                ),
              };
              returnMessage = [
                await questionTemplate(cs.questionMessageItem()),
              ];
            }
          } else {
            returnMessage = [
              {
                type: "text",
                text: "不明なエラーが発生しました。「Civichatをはじめる」と送信してもう一度お試しください。",
              },
            ];
          }
        }
      } else {
        returnMessage = [
          {
            type: "text",
            text: "「Civichatをはじめる」と送信してください！",
          },
        ];
      }
      break;
    case "follow":
      await saveUser(event.source.userId);
      /*returnMessage = [
        {
          type: "text",
          text: "友だち登録ありがとうございます！\n\n「Civichat（シビチャット）」はあなたにぴったりの行政サービスをかんたんに探せるサービスです 🤳🏛　\n\n現在は渋谷区の子育て系の制度・保育施設に加え、熊本市の災害支援制度を探すことができます📱\n\n※スマホ版LINEアプリのみの対応となります。（パソコンからのご利用はできません。）\n※質問への回答を修正したい場合は、初めからやり直してください。",
        },
      ];
      break;*/
      return;
    case "postback":
      if (
        event.postback.data === "start-kumamoto_earthquake" ||
        event.postback.data === "start-shibuya_preschool" ||
        event.postback.data === "start-shibuya_parenting" ||
        event.postback.data === "start-japan"
      ) {
        const selected = event.postback.data.split("-")[1];

        // 上でやってた初期化をここでやる
        let jsonAnswers, jsonQuestions, systems;
        if (selected === "kumamoto_earthquake") {
          jsonAnswers = require(`../../../static_data/kumamotoEarthquake/answers.json`);
          jsonQuestions = require(`../../../static_data/kumamotoEarthquake/questions.json`);
          systems = require(`../../../static_data/kumamotoEarthquake/systems.json`);
        } else if (selected === "shibuya_parenting") {
          jsonAnswers = require(`../../../static_data/shibuyaParenting/answers.json`);
          jsonQuestions = require(`../../../static_data/shibuyaParenting/questions.json`);
          systems = require(`../../../static_data/shibuyaParenting/systems.json`);
        } else if (selected === "shibuya_preschool") {
          jsonAnswers = require(`../../../static_data/shibuyaPreschool/answers.json`);
          jsonQuestions = require(`../../../static_data/shibuyaPreschool/questions.json`);
          systems = require(`../../../static_data/shibuyaPreschool/systems.json`);
        } else if (selected === "japan") {
          jsonAnswers = require(`../../../static_data/japan/answers.json`);
          jsonQuestions = require(`../../../static_data/japan/questions.json`);
          systems = require(`../../../static_data/japan/systems.json`);
        }
        const questions: Array<Question> = [];

        jsonAnswers["qnas"].forEach((question: Qna, i: number) => {
          const answers: Array<Answer> = [];
          question.answers.forEach((answer: answer, j: number) => {
            let syst: syst = {};

            systems["systems"].forEach((system: string, k: number) => {
              syst = {
                ...syst,
                [system]: answer.systems[k].system_answer === "1",
              };
            });

            answers.push(
              new Answer(
                jsonQuestions.questions[i].answers[j].answer_id,
                jsonQuestions.questions[i].answers[j].answer_text,
                syst
              )
            );
          });
          questions.push(
            new Question(
              jsonQuestions.questions[i].question_id,
              jsonQuestions.questions[i].question_text,
              answers
            )
          );
        });

        // 初期ChatStateの生成
        const cs = new ChatState(systems["systems"], questions, selected);
        // Sessionに前回のデータが残ってたら除去
        if (sessions[event.source.userId]) {
          delete sessions[event.source.userId];
        }
        sessions = {
          ...sessions,
          [event.source.userId]: new Session(
            cs,
            cs.selectQuestionFromPriority().id
          ),
        };
        returnMessage = [await questionTemplate(cs.questionMessageItem())];
      }
      break;
    case "unfollow":
      return;
  }
  client.replyMessage(event.replyToken, returnMessage);
};
