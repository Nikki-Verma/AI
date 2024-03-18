import { Modal } from "antd";

type BuyCreditsModalProps = {
  open: boolean;
  onClose: () => void;
};

const BuyCreditsModal = ({ open, onClose }: BuyCreditsModalProps) => {
  return (
    <Modal
      title="Top Up Credits"
      open={open}
      onCancel={() => {
        onClose();
      }}
      width="50vw"
      footer={false}
    ></Modal>
  );
};

export default BuyCreditsModal;
