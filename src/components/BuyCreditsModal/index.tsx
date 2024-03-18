import { UnknownObject } from "@/utils/types";
import { Form, Modal } from "antd";
import { FormInstance, useForm } from "antd/es/form/Form";

type BuyCreditsModalProps = {
  open: boolean;
  onClose: () => void;
};

type TopUpCreditsFormProps = {
  form: FormInstance;
  creditsTopupHandler: (values: UnknownObject) => void;
};

export const TopUpCreditsForm = ({
  form,
  creditsTopupHandler,
}: TopUpCreditsFormProps) => {
  return (
    <Form form={form} preserve={false} onFinish={creditsTopupHandler}></Form>
  );
};

const BuyCreditsModal = ({ open, onClose }: BuyCreditsModalProps) => {
  const [form] = useForm();

  return (
    <Modal
      title="Top Up Credits"
      open={open}
      onCancel={() => {
        onClose();
      }}
      width="50vw"
      footer={false}
    >
      <TopUpCreditsForm
        form={form}
        creditsTopupHandler={(val: any) => console.log("val")}
      />
    </Modal>
  );
};

export default BuyCreditsModal;
