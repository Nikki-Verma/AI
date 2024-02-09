import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Image from "next/image";
import { EmptyMessage, EmptyUploadContainer } from "./style";

const EmptyUpload = (props: any) => {
  return (
    <EmptyUploadContainer>
      <Image
        src={"/assets/Images/emptyBox.svg"}
        height={120}
        width={120}
        alt="empty-box"
      />
      <EmptyMessage>{props?.message}</EmptyMessage>

      <Button onClick={() => props?.onClick()} icon={<PlusOutlined />}>
        {props?.buttonText}
      </Button>
    </EmptyUploadContainer>
  );
};

export default EmptyUpload;
