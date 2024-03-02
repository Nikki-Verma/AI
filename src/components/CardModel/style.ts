import { TEXT_HOVER_BG_COLOR } from "@/_utils/theme.antd";
import styled from "styled-components";

export const ModelContainer = styled.div`
  display: flex;
  flex-direction: column;
  .ant-input-affix-wrapper {
    border-radius: 20px;
    border: 1px solid var(--Text-Color-150, #d5d5d5);
    background: #fff;
    height: 60px;
  }
  .ant-input-affix-wrapper > input.ant-input {
    color: var(--Text-Color-900, #171717);
    font-family: var(--font-dm-sans);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .ant-select-selector {
    display: flex;
    height: 36px;
    padding: 0px 7px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 20px;
    border: 1px solid var(--Text-Color-150, #d5d5d5);
    background: var(--Text-Color-50, #fff);

    /* drop-shadow/button-secondary */
    box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
  }
`;

export const Heading = styled.div`
  color: var(--character-title-85, rgba(0, 0, 0, 0.85));
  font-family: var(--font-dm-sans);
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px; /* 110% */
`;

export const ModelCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 200px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 0.8px solid var(--Text-Color-150, #d5d5d5);
  background: #fdfeff;
  &:hover {
    box-shadow:
      0 1px 2px -2px rgba(0, 0, 0, 0.16),
      0 3px 6px 0 rgba(0, 0, 0, 0.12),
      0 5px 12px 4px rgba(0, 0, 0, 0.09);
  }
`;

export const ModelCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 19px 19px 8px 19px;
  gap: 10px;
  height: 100%;
`;

export const ModalTags = styled.div<any>`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 8px;
  border-radius: 0px 0px 10px 10px;
  // border-top: 0.2px solid var(--Text-Color-150, #d5d5d5);

  box-shadow: 0px 3px 8px 0px rgba(158, 158, 158, 0.15);
  text-overflow: ellipsis;
  overflow: hidden;
  height: 80px;

  .ant-tag {
    display: flex;
    height: 26px;
    padding: 0px 14px;
    justify-content: center;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
    border-radius: 10px;
    border: 0.3px solid var(--Text-Color-150, #d5d5d5);
    background: ${TEXT_HOVER_BG_COLOR};
    // // }};

    /* drop-shadow/button-secondary */
    box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);

    // font styling

    color: var(--Text-Color-900, #171717);
    text-align: center;
    font-family: var(--font-dm-sans);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
  }
`;

export const ModelHeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
`;

export const ModelCardHeading = styled.div`
  display: flex;
  color: var(--Text-Color-900, #171717);
  font-family: var(--font-dm-sans);
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const ModelCardDetail = styled.div`
  //   display: flex;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  color: var(--Text-Color-850, #222);
  text-overflow: ellipsis;
  overflow: hidden;
  height: 72px;
  word-break: break-all;
  font-family: var(--font-dm-sans);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 164%; /* 22.96px */
`;
