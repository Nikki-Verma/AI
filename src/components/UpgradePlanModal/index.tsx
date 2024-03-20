import { useFetchData } from "@/Hooks/useApi";
import config from "@/utils/apiEndoints";
import { getErrorFromApi } from "@/utils/helperFunction";
import { UnknownObject } from "@/utils/types";
import { Col, Modal, Result, Row, Skeleton, Spin } from "antd";
import { useSession } from "next-auth/react";
import PlanDetails from "../PlanDetails";
import { PlanDivider, PlansContainer } from "./style";

type UpgradePlanModalProps = {
  open: boolean;
  onClose: () => void;
  upgradePlanHandler: (values: UnknownObject) => void;
  loading: boolean;
};

const UpgradePlanModal = ({
  open,
  onClose,
  upgradePlanHandler,
  loading,
}: UpgradePlanModalProps) => {
  const { data: session }: any = useSession();
  const { data: currentPlanDetails, isLoading: currentPlanLoading } =
    useFetchData(config.subscription.currentPlan, {
      tenant_id: session?.user?.details?.tenantId,
      additional_fields: "feature,pricing",
    });
  const { data, isLoading, isError, error, isRefetching } = useFetchData(
    config.subscription.allPlans,
    {
      additional_fields: "feature",
    },
  );
  console.log("🚀 ~ data:", data);
  console.log("plans length", data?.result - 1);

  return (
    <Modal
      title="Upgrade Plan"
      open={open}
      onCancel={() => {
        onClose();
      }}
      width="90vw"
      footer={false}
    >
      <Spin spinning={loading}>
        <PlansContainer>
          {isError ? (
            <Row>
              <Col>
                <Result
                  icon={null}
                  title="Error Loading Plans"
                  subTitle={getErrorFromApi(error)}
                />
              </Col>
            </Row>
          ) : isLoading || isRefetching ? (
            <Skeleton active paragraph={{ rows: 12 }} />
          ) : (
            data?.result?.map((plan: UnknownObject, index: number) => {
              return (
                <>
                  <PlanDetails
                    plan={plan}
                    upgradePlanHandler={upgradePlanHandler}
                    currentPlan={currentPlanDetails}
                  />
                  {index != data?.result?.length - 1 && <PlanDivider />}
                </>
              );
            })
          )}
        </PlansContainer>
      </Spin>
    </Modal>
  );
};
export default UpgradePlanModal;
