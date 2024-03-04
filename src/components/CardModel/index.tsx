import { UnknownObject } from "@/utils/types";
import { Image as AntdImage, Space, Tag } from "antd";
import Image from "next/image";
import Link from "next/link";
import { tagIcons } from "./helper";
import {
  ModalTags,
  ModelCard,
  ModelCardContainer,
  ModelCardDetail,
  ModelCardHeading,
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
  console.log("🚀 ~ modelData:", modelData);
  return (
    <Link prefetch href={redirectUrl}>
      <ModelCardContainer>
        <ModelCard>
          {/* <ModelHeaderContainer> */}
          {modelData?.weights_file_s3_url ||
          modelData?.model_params?.weights_file_s3_url ? (
            <AntdImage
              preview={false}
              src={
                modelData?.weights_file_s3_url ??
                modelData?.model_params?.weights_file_s3_url
              }
              height={28}
              width={28}
              alt="Model-img"
            />
          ) : (
            <Image src={imageUrl} height={28} width={28} alt="Model-img" />
          )}

          <ModelCardHeading>
            {modelData?.name || modelData?.model_name}
          </ModelCardHeading>
          {/* </ModelHeaderContainer> */}

          <ModelCardDetail>{modelData?.desc}</ModelCardDetail>
        </ModelCard>
        <ModalTags serial={index}>
          {[...(modelData?.tags || [])]?.map((tag: string) => {
            const tagText = Object.keys(tagIcons)?.find((tagIconText: string) =>
              tag?.toUpperCase()?.includes(tagIconText?.toUpperCase()),
            );
            const tagIcon = tagText ? tagIcons?.[tagText] : null;
            return (
              <Tag key={tag}>
                <Space size={2}>
                  {tagIcon} {tag}
                </Space>
              </Tag>
            );
          })}
        </ModalTags>
      </ModelCardContainer>
    </Link>
  );
};

export default CardModel;
