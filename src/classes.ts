export { Question, ChatState, Session, Answer };

export type Qna = {
  question_id: string;
  answers: Array<answer>;
};

type system = {
  system_id: string;
  system_answer: string;
};

export type answer = {
  answer_id: string;
  systems: Array<system>;
};

export type SystemProperty = {
  [index: string]: string;
};

export type System = {
  [x: string]: string | boolean;
  id: string;
};

export type syst = {
  [index: string]: boolean;
};

export type Sessions = {
  [index: string]: Session;
};

class Answer {
  id: string;
  answerText: string;
  callback?: string;
  qnaMap: syst;

  constructor(id: string, answerText: string, qnaMap: syst, callback?: string) {
    this.id = id;
    this.answerText = answerText;
    this.qnaMap = qnaMap;
    this.callback = callback;
  }

  isMatch(system: string) {
    return this.qnaMap[system] ? true : false;
  }
  getAnswerText() {
    return this.answerText;
  }
}

class Question {
  id: string;
  questionText: string;
  answers: Array<Answer>;

  constructor(id: string, questionText: string, answers: Array<Answer>) {
    this.id = id;
    this.questionText = questionText;
    this.answers = answers;
  }
  getQuestionText() {
    return this.questionText;
  }
}

class ChatState {
  systems: Array<string>;
  questions: Question[];
  seido: string;

  constructor(
    systems: Array<string>,
    questions: Array<Question>,
    seido: string
  ) {
    this.systems = systems;
    this.questions = questions;
    this.seido = seido;
  }

  getSeido() {
    return this.seido;
  }

  getSystems() {
    return this.systems;
  }

  getQuestions() {
    return this.questions;
  }

  selectAnswerById(questionId: string, answerId: string) {
    this.questions
      .filter((question: Question) => {
        return question.id === questionId;
      })
      .forEach((question: Question) => {
        question.answers
          .filter((answer: Answer) => {
            return answer.id === answerId;
          })
          .forEach((answer: Answer) => {
            this.systems = this.systems.filter((system) => {
              return answer.isMatch(system);
            });
            this.questions = this.questions.filter((question: Question) => {
              return question.id != questionId;
            });
          });
      });
  }

  selectAnswerByText(questionId: string, answerText: string) {
    this.questions
      .filter((question: Question) => {
        return question.id === questionId;
      })
      .forEach((question: Question) => {
        question.answers
          .filter((answer: Answer) => {
            return answer.answerText === answerText;
          })
          .forEach((answer: Answer) => {
            this.systems = this.systems.filter((system) => {
              return answer.isMatch(system);
            });
            this.questions = this.questions.filter((question: any) => {
              return question.id != questionId;
            });
          });
      });
  }
  maintenanceQuestions() {
    this.questions = this.questions
      .map((question: Question) => {
        let trues = 0;
        question.answers.forEach((answer: Answer) => {
          this.systems.forEach((system) => {
            trues += answer.qnaMap[system] ? 1 : 0;
          });
        });
        if (
          trues < this.systems.length * question.answers.length &&
          trues != 0
        ) {
          return question;
        }
      })
      .filter((v) => v) as Array<Question>;
  }

  selectQuestionFromPriority() {
    return this.questions[0];
  }

  isEnded() {
    return this.questions.length === 0 || this.systems.length === 0;
  }

  questionMessageItem() {
    return {
      questionText: this.selectQuestionFromPriority().questionText,
      answers: this.selectQuestionFromPriority().answers.map((answer) => {
        let trues = 0;
        this.systems.forEach((system) => {
          trues += answer.qnaMap[system] ? 1 : 0;
        });
        return {
          answerText: `${answer.answerText}（該当${String(trues)}件）`,
          callback: answer.answerText,
        };
      }),
    };
  }
}

class Session {
  state: ChatState;
  beforeQuestionId: string;

  constructor(state: ChatState, beforeQuestionId: string) {
    this.state = state;
    this.beforeQuestionId = beforeQuestionId;
  }
  getState() {
    return this.state;
  }

  getBeforeQuestionId() {
    return this.beforeQuestionId;
  }
}
