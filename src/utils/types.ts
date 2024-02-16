export enum Permissions_Types {
  "OR" = "OR",
  "AND" = "AND",
}

export enum PageTypeEnum {
  UNAUTH = "UNAUTH",
  AUTH = "AUTH",
}

export enum PageModeEnum {
  CREATE = "CREATE",
  EDIT = "EDIT",
  VIEW = "VIEW",
}

export interface UnknownObject {
  [key: string]: any;
}
