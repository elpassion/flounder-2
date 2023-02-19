export interface IFileDestinationDto {
  key: string;
  url: string;
}

export interface IFileMetadataDto {
  fileName: string;
  fileSize: number;
  fileType: string;
}

export enum AttachedFileAction {
  KEEP = 'KEEP',
  NEW = 'NEW',
  DELETE = 'DELETE',
}

export interface IKeepAttachedFile {
  readonly action: AttachedFileAction.KEEP;
}

export interface IDeleteAttachedFile {
  readonly action: AttachedFileAction.DELETE;
}

export interface INewAttachedFile {
  readonly action: AttachedFileAction.NEW;
  readonly path: string;
}

export type IAttachedFile = IKeepAttachedFile | IDeleteAttachedFile | INewAttachedFile;

export interface IFileUploadedDto {
  readonly path: string;
  readonly type: string;
  readonly name: string;
}
