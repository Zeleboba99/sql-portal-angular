export class Course {
  public id: number;
  public name: string;
  public description: string;
  public  author_id: number;
  public author: string;


  constructor(id: number, name: string, description: string, author_id: number, author: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.author_id = author_id;
    this.author = author;
  }
}
