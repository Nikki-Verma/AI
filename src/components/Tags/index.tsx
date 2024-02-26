import { Tag } from "antd";
import React from "react";

type TagProps = {
    color ?: string,
    background ?: string,
    border ?: string,

}

const Tags = ({ tag, tagProps }: { tag: string; tagProps?: TagProps }) => {

    return(
        <Tag style={{color : tagProps?.color ?? '#222222' ,background: tagProps?.background ?? '#FFFFFF' ,border : tagProps?.border ?? '#222222',boxShadow: '0px 2px 0px 0px rgba(0, 0, 0, 0.02)',padding : '4px 15px',borderRadius : '8px'}}>
            {tag}
        </Tag>
    )
}

export default Tags