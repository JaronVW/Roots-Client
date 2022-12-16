export interface Event {
  title: string;
  description: string;
  date?: Date;
  tags?: string[];
  files?: string[];
  userId?: string;

  multiMedia?: string[];

  //   Nog te doen: Tags, files, userId referencen naar andere interfaces
}
