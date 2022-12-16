export interface Event {
  title: string;
  description: string;
  dateOfEvent?: string;
  tags?: Tag[];
  files?: string[];
  userId?: string;

  multiMedia?: string[];

  //   Nog te doen: Tags, files, userId referencen naar andere interfaces
}

export interface Tag {
  subject: string;
}
