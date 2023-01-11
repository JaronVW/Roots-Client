export interface Event {
  id?: number;
  title: string;
  description: string;
  dateOfEvent?: string;
  tags: Tag[];
  files?: string[];
  userId?: string;

  multimediaItems?: {
    path: string;
    multimedia: string;
  }[];
  isArchived?: boolean;
  organisationId?: number;
  content?: string;

  //   Nog te doen: Tags, files, userId referencen naar andere interfaces
}

export interface Tag {
  id?: number;
  subject: string;
}
