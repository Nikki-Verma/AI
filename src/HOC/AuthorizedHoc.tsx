import AuthorizedComponent, { Types } from "@/components/AuthorizedComponent";
import { PERMISSION_TYPE } from "@/utils/constants";

const AuthorizedHOC =
  (
    permissions: undefined | null | string | string[],
    permissionType = PERMISSION_TYPE.OR,
    type = Types.CONTAINER,
  ) =>
  (Component: React.FC<any>) =>
  (props: any) => {
    return (
      <AuthorizedComponent
        permissions={permissions}
        permissionType={permissionType}
        type={type}
      >
        <Component {...props} />
      </AuthorizedComponent>
    );
  };

export default AuthorizedHOC;
