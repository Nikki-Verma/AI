export enum Permissions_Types {
  "OR",
  "AND",
}

export const PERMISSION_TYPE = {
  OR: Permissions_Types.OR,
  AND: Permissions_Types.AND,
};

export const tokenDateFormat = "YYYY-MM-DDThh:mm:ss.ssssss";

export const X_USER_ID = "X-USER-ID";
export const X_SELLER_ID = "X-SELLER-ID";
export const X_SELLER_PROFILE_ID = "X-SELLER-PROFILE-ID";
export const X_TENANT_ID = "X-TENANT-ID";
export const X_DEVICE_ID = "X-DEVICE-ID";
export const X_PRODUCT_NAME = "X-PRODUCT-NAME";
export const PIM_SID = "PIM-SID";

export const DUMMY_SELLER_ID = "1";
export const DUMMY_SELLER_PROFILE_ID = "11";
export const DUMMY_TENANT_ID = "1";

export const DEFAULT_PAGE = 0;
export const DEFAULT_PAGE_SIZE = 20;

export enum PageTypeEnum {
  UNAUTH,
  AUTH,
}

export const Page_Type = {
  auth: PageTypeEnum.AUTH,
  unauth: PageTypeEnum.UNAUTH,
};
