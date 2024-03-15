import { PERMISSION_TYPE } from "./constants";
import { Permissions_Types } from "./types";

export const validatePermission = (
  reqPermissions: undefined | null | string | string[] = [],
  userPermissions: string[] = [],
  permissionType: Permissions_Types,
): boolean => {
  if (userPermissions?.includes("SUPER_ADMIN")) {
    return true;
  }
  if (!reqPermissions || reqPermissions.length < 1) {
    return true;
  }
  const perms = Array.isArray(reqPermissions)
    ? reqPermissions
    : [reqPermissions];
  let shouldAllow;

  if (permissionType === PERMISSION_TYPE.OR) {
    shouldAllow = perms.some((per) =>
      Array.isArray(per)
        ? per.every((p: any) => userPermissions?.includes(p))
        : userPermissions?.includes(per),
    );
  } else {
    shouldAllow = perms.every((per) => {
      return Array.isArray(per)
        ? per.every((p: any) => userPermissions?.includes(p))
        : userPermissions?.includes(per);
    });
  }
  return shouldAllow;
};
