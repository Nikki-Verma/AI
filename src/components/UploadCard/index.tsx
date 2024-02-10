import Image from "next/image";
import { Heading, UploadCardContainer, UploadDetail } from "./style";

const UploadCard = (props: any) => {
  return (
    <UploadCardContainer onClick={props?.onClick}>
      {props?.imageUrl && (
        <Image src={props?.imageUrl} alt="uploader" width={68} height={68} />
      )}
      <Heading>{props?.heading}</Heading>
      <UploadDetail>{props?.details}</UploadDetail>
    </UploadCardContainer>
  );
};

export default UploadCard;
