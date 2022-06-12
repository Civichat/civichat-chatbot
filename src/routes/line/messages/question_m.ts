import * as types from "@line/bot-sdk/lib/types";

import { Question } from "../../../classes";

module.exports = (item: Question) => {
  const answerContents: types.FlexComponent[] = [];
  item.answers.forEach((answer, i) => {
    answerContents.push({
      type: "button",
      action: {
        type: "message",
        label: answer.answerText,
        text: answer.callback as string,
      },
      style: "secondary",
      margin: "sm",
    });
  });
  return {
    type: "flex",
    altText: "質問です",
    contents: {
      type: "bubble",
      direction: "ltr",
      header: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: item.questionText,
            weight: "bold",
            size: "md",
            align: "start",
            wrap: true,
            contents: [],
          },
        ],
      },
      footer: {
        type: "box",
        layout: "vertical",
        spacing: "md",
        contents: answerContents,
      },
    },
  };
};
