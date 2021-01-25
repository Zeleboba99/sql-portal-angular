export class Course {
  public id: number;
  public name: string;
  public description: string;
  public author: string;

  constructor(id: number, name: string, description: string, author: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.author = author;
  }
}
