import Image from "next/image";
import { Heading, UploadCardContainer, UploadDetail } from "./style";

const UploadCard = (props: any) => {
  const conatinerProps = {
    disabled: typeof props?.disabled === "boolean" ? props?.disabled : false,
  };
  return (
    <UploadCardContainer
      {...conatinerProps}
      onClick={props?.disabled ? null : props?.onClick}
    >
      {props?.imageUrl && (
        <Image src={props?.imageUrl} alt="uploader" width={68} height={68} />
      )}
      <Heading>{props?.heading}</Heading>
      <UploadDetail>{props?.details}</UploadDetail>
    </UploadCardContainer>
  );
};

export default UploadCard;
