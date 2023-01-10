export interface Event {
  id?: number;
  title: string;
  description: string;
  dateOfEvent?: string;
  tags: Tag[];
  files?: string[];
  userId?: string;

  multimediaItems?: Multimedia[];
  isArchived?: boolean;
  organisationId?: number;
  content?: string;

  //   Nog te doen: Tags, files, userId referencen naar andere interfaces
}

export interface Tag {
  id?: number;
  subject: string;
  count: number;
  tagText?: string;
}

export interface Multimedia {
  id?: number;
  multimedia: File;
  description?: string;
  transcript?: string;
  alt?: string;
}
