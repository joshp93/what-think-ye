
export class ThinkYe {
    id: string;
    question: string;
    uid: string;


  constructor(id: string, question: string, uid: string) {
    this.id = id;
    this.question = question;
    this.uid = uid;
  }

  getHTMLFriendlyQuestion() {
    let result = this.question.split("\n").join("<br>");
    result = result.split("\t").join("&nbsp;");
    return result;
  }
    
}
