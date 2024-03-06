import { Space, Tag, TagProps } from "antd";
import { tagIcons } from "../CardModel/helper";
import { ModelTagContainer } from "./style";

function ModelTag({ tag, tagProps }: { tag: string; tagProps?: TagProps }) {
  const tagText = Object.keys(tagIcons)?.find((tagIconText: string) =>
    tag?.toUpperCase()?.includes(tagIconText?.toUpperCase()),
  );
  const tagIcon = tagText ? tagIcons?.[tagText] : null;
  return (
    <ModelTagContainer key={tag}>
      <Tag key={tag} {...tagProps}>
        <Space size={2}>
          {tagIcon} {tag}
        </Space>
      </Tag>
    </ModelTagContainer>
  );
}

export default ModelTag;
