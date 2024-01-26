export enum Permissions_Types {
  "OR",
  "AND",
}

export const PERMISSION_TYPE = {
  OR: Permissions_Types.OR,
  AND: Permissions_Types.AND,
};

export const tokenDateFormat = "YYYY-MM-DDThh:mm:ss.ssssss";

export enum PageTypeEnum {
  UNAUTH,
  AUTH,
}

export const Page_Type = {
  auth: PageTypeEnum.AUTH,
  unauth: PageTypeEnum.UNAUTH,
};
