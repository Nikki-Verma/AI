import { PERMISSION_TYPE } from "@/utils/constants";
import { validatePermission } from "@/utils/permissionUtils";
import { useSession } from "next-auth/react";

const useAuthorization = () => {
  const { data: userSessionDetails }: any = useSession();

  const userPermissions = userSessionDetails?.user?.permissions;

  const isAuthorized = (
    reqPermissions: string[],
    permissionType = PERMISSION_TYPE.OR
  ) => {
    return validatePermission(reqPermissions, userPermissions, permissionType);
  };

  return [isAuthorized, userPermissions];
};

export default useAuthorization;
