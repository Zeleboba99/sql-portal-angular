export class Db {
  public id: number;
  public name: string;
  public author_id: number;
  public author: string;

  constructor(id: number, name: string, author_id: number, author: string) {
    this.id = id;
    this.name = name;
    this.author_id = author_id;
    this.author = author;
  }
}
