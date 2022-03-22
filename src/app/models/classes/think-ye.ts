import { Thought } from "./thought";

export class ThinkYe {
    id: string;
    question: string;
    thoughts: Thought[];


  constructor(id: string, question: string, thoughts: Thought[]) {
    this.id = id;
    this.question = question;
    this.thoughts = thoughts;
  }
    
}
