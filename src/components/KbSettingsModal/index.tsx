import { PAGE_MODE } from "@/utils/constants";
import { UnknownObject } from "@/utils/types";
import { Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import KbSettingsForm from "../KbSettingsForm";

type KbSettingsModalProps = {
  open: boolean;
  onClose: () => void;
  kbDetails: UnknownObject;
};

const KbSettingsModal = ({
  open,
  onClose,
  kbDetails,
}: KbSettingsModalProps) => {
  const [form] = useForm();
  const afterModalClose = () => {
    form.resetFields();
  };

  const updateKbSettingsHandler = (values: UnknownObject) => {
    console.log("🚀 ~ updateKbSettingsHandler ~ values:", values);
  };

  return (
    <Modal
      open={open}
      title={
        kbDetails?.name
          ? `${kbDetails?.name}'s settings`
          : "Knowledge base settings"
      }
      width={700}
      onCancel={onClose}
      afterClose={afterModalClose}
      footer={null}
      destroyOnClose={true}
    >
      <KbSettingsForm
        form={form}
        updateKbSettingsHandler={updateKbSettingsHandler}
        mode={PAGE_MODE.EDIT}
        kbDetails={kbDetails}
      />
    </Modal>
  );
};

export default KbSettingsModal;
