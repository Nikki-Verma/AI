import { ReactNode } from "react";

export enum UploadFileType {
  "FILE" = "FILE",
  "DIRECT_LINK" = "DIRECT_LINK",
  "EXTERNAL_SOURCE" = "EXTERNAL_SOURCE",
  "CONFLUENCE_CONFIG" = "CONFLUENCE_CONFIG",
  "CONFLUENCE_FILES" = "CONFLUENCE_FILES",
}

export const UPLOAD_FILE_TYPES = {
  FILE: UploadFileType.FILE,
  DIRECT_LINK: UploadFileType.DIRECT_LINK,
  EXTERNAL_SOURCE: UploadFileType.EXTERNAL_SOURCE,
  CONFLUENCE_CONFIG: UploadFileType.CONFLUENCE_CONFIG,
  CONFLUENCE_FILES: UploadFileType.CONFLUENCE_FILES,
};

export const CONNECTOR_CHANNEL_TYPES = {
  CONFLUENCE: UploadFileType.CONFLUENCE_CONFIG,
};

export type ConnectorsAvailableChannelType = {
  channelType: UploadFileType;
  name: string;
  displayName: string;
  imageUrl: ReactNode | undefined;
  disabled?: boolean;
};
