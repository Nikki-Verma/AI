import { UnknownObject } from "@/utils/types";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
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
};

const CardModel = ({ modelData, redirectUrl, imageUrl }: CardModelProps) => {
  return (
    <Link prefetch href={redirectUrl}>
      <ModelCardContainer>
        <ModelCard>
          <ModelHeaderContainer>
            <Image src={imageUrl} height={28} width={28} alt="Model-img" />
            <>
              {false ? (
                <HeartOutlined
                  style={{
                    color: "#5B5B5B",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <HeartFilled
                  style={{
                    color: "red",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                />
              )}
            </>
          </ModelHeaderContainer>
          <ModelCardHeading>
            {modelData?.name || modelData?.model_name}
          </ModelCardHeading>
          <ModelCardDetail>{modelData?.desc}</ModelCardDetail>
        </ModelCard>
        <ModalTags>
          {[...(modelData?.tags || [])]?.map((tag: string) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </ModalTags>
      </ModelCardContainer>
    </Link>
  );
};

export default CardModel;
