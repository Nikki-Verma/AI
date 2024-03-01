import { UnknownObject } from "@/utils/types";
import { Tag } from "antd";
import Image from "next/image";
import Link from "next/link";
import {
  ModalTags,
  ModelCard,
  ModelCardContainer,
  ModelCardDetail,
  ModelCardHeading,
  ModelHeaderContainer,
} from "./style";

type CardModelProps = {
  modelData: UnknownObject;
  redirectUrl: string;
  imageUrl: string;
  index: number;
};

const CardModel = ({
  modelData,
  redirectUrl,
  imageUrl,
  index,
}: CardModelProps) => {
  return (
    <Link prefetch href={redirectUrl}>
      <ModelCardContainer>
        <ModelCard>
          <ModelHeaderContainer>
            <Image src={imageUrl} height={28} width={28} alt="Model-img" />
            <ModelCardHeading>
              {modelData?.name || modelData?.model_name}
            </ModelCardHeading>
          </ModelHeaderContainer>

          <ModelCardDetail>{modelData?.desc}</ModelCardDetail>
        </ModelCard>
        <ModalTags serial={index}>
          {[...(modelData?.tags || [])]?.map((tag: string) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </ModalTags>
      </ModelCardContainer>
    </Link>
  );
};

export default CardModel;
