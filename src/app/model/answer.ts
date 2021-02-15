export class Answer {
  public id: number;
  public text: string;
  public grade: number;

  constructor(id: number, text: string, grade: number) {
    this.id = id;
    this.text = text;
    this.grade = grade;
  }
}
