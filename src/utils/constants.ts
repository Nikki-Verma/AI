import { PageModeEnum, PageTypeEnum, Permissions_Types } from "./types";

// Auth constants
export const PERMISSION_TYPE = {
  OR: Permissions_Types.OR,
  AND: Permissions_Types.AND,
};

// date format constants
export const tokenDateFormat = "YYYY-MM-DDThh:mm:ss.ssssss";
export const dateFormatForFrontend = "DD-MM-YYYY";
export const timeFormatForFrontend = "hh:mm A";
export const dateTimeFormatWithMilliseconds = "DD-MM-YYYY hh:mm:ss A";

// common headers constants
export const X_USER_ID = "X-USER-ID";
export const X_SELLER_ID = "X-SELLER-ID";
export const X_CLIENT_ID = "X-CLIENT-ID";
export const X_SELLER_PROFILE_ID = "X-SELLER-PROFILE-ID";
export const X_TENANT_ID = "X-TENANT-ID";
export const X_DEVICE_ID = "X-DEVICE-ID";
export const X_PRODUCT_NAME = "X-PRODUCT-NAME";
export const PIM_SID = "PIM-SID";

// Dummy data constants
export const DUMMY_SELLER_ID = "1";
export const DUMMY_SELLER_PROFILE_ID = "11";
export const DUMMY_TENANT_ID = "1";

// pagination constants
export const DEFAULT_PAGE = 0;
export const DEFAULT_PAGE_SIZE = 20;
export const ALL_DATA_PAGE_SIZE = 2000;

// Page mode
export const PAGE_MODE = {
  CREATE: PageModeEnum.CREATE,
  VIEW: PageModeEnum.VIEW,
  EDIT: PageModeEnum.EDIT,
};

export const Page_Type = {
  auth: PageTypeEnum.AUTH,
  unauth: PageTypeEnum.UNAUTH,
};
