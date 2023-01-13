export interface Event {
  id?: number;
  title: string;
  description: string;
  dateOfEvent?: string | null;
  tags: Tag[];
  files?: string[] | null;
  userId?: string | null;

  multimediaItems?: Multimedia[] | null;
  isArchived?: boolean | null;
  organisationId?: number | null;
  content?: string | null;

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
  multimedia: string;
  path?: string;
  file: File;
}
