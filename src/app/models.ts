
export class Message{
    MessageBody:string;
    CreateDate:Date;
    Author:string;
  }

  export class Theme{
    public ThemeName:string;
    public ThemeId:number;
    public CreateDate:Date;
    public SectionId:number;
  }

  export class Section{
    public SectionName:string;
    public SectionId:number;
    public CreateDate:Date;
  }

  export class User{
    public Id:number;
    public UserName:string;
    public Email:string;
    public Roles:Role[];
  }

  export class Role{
    public Id:number;
    public Name:string;
  }