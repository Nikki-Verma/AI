import { Modal } from "antd";
import PlanDetails from "../PlanDetails";
import { PlanDivider, PlansContainer } from "./style";

type UpgradePlanModalProps = {
  open: boolean;
  onClose: () => void;
};

const UpgradePlanModal = ({ open, onClose }: UpgradePlanModalProps) => {
  const types = ["basic", "basic", "Suggested", "basic"];
  return (
    <Modal
      title="Upgrade Plan"
      open={open}
      onCancel={() => {
        onClose();
      }}
      width="95vw"
      footer={false}
    >
      <PlansContainer>
        {types?.map((type: string, index: number) => {
          return (
            <>
              <PlanDetails type={type} />
              {index != types?.length - 1 && <PlanDivider />}
            </>
          );
        })}
      </PlansContainer>
    </Modal>
  );
};
export default UpgradePlanModal;
