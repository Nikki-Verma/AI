import { PERMISSION_TYPE } from "./constants";
import { Permissions_Types } from "./types";

export const validatePermission = (
  reqPermissions: string[] = [],
  userPermissions: string[] = [],
  permissionType: Permissions_Types,
): boolean => {
  console.log("🚀 ~ userPermissions:", userPermissions);
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
