export class DbInfo {
  public id: number;
  public name: string;
  public schemaImage: any;
  public author_id: number;
  public author: string;

  constructor(id: number, name: string, schemaImage: any, author_id: number, author: string) {
    this.id = id;
    this.name = name;
    this.schemaImage = schemaImage;
    this.author_id = author_id;
    this.author = author;
  }
}
