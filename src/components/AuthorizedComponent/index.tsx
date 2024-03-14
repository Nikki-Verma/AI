import { PERMISSION_TYPE } from "@/utils/constants";
import { validatePermission } from "@/utils/permissionUtils";
import { Permissions_Types } from "@/utils/types";
import { Button, Col, Result, Row } from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect } from "react";
import FullScreenLoader from "../FullScreenLoader/FullScreenLoader";

export const Types = {
  ROUTE: "ROUTE",
  CONTAINER: "CONTAINER",
  COMPONENT: "COMPONENT",
};

type AuthorizedComponentProps = {
  permissions?: undefined | null | string | string[];
  permissionType?: Permissions_Types;
  type?: string;
  children: ReactElement;
};

const AuthorizedComponent = ({
  permissions = [],
  permissionType = PERMISSION_TYPE.OR,
  type = "",
  children,
}: AuthorizedComponentProps) => {
  const { status, data: session }: any = useSession();

  const router = useRouter();

  useEffect(() => {
    router.prefetch("/home");
  }, []);

  if (!status || status === "loading") {
    switch (type) {
      case Types.CONTAINER:
        return <FullScreenLoader />;
      default:
        return null;
    }
  }

  const isAuthorized = validatePermission(
    permissions,
    session?.user?.permissions,
    permissionType,
  );

  const goBack = () => {
    router.back();
  };

  if (!isAuthorized) {
    switch (type) {
      case Types.ROUTE:
        router.push("/home");
        <FullScreenLoader />;
      case Types.CONTAINER:
        return (
          <Result
            status={403}
            title="Un Authorized"
            subTitle="You are not authorized to view this page. Please contact your admin for access"
            extra={
              <Row
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <Col>
                  <Button onClick={goBack} color="primary">
                    Go Back
                  </Button>
                </Col>
                <Col>
                  <Link href={"/home"}>
                    <Button style={{ color: "white" }} type="primary">
                      Home
                    </Button>
                  </Link>
                </Col>
              </Row>
            }
          />
        );
      case Types.COMPONENT:
        return null;
      default:
        return null;
    }
  }

  return children;
};

export default AuthorizedComponent;
