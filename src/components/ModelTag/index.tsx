import { Tag, TagProps } from "antd";
import { ModelTagContainer } from "./style";

function ModelTag({ tag, tagProps }: { tag: string; tagProps?: TagProps }) {
  return (
    <ModelTagContainer>
      <Tag key={tag} {...tagProps}>
        {tag}
      </Tag>
    </ModelTagContainer>
  );
}

export default ModelTag;
