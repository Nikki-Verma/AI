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
    height: 36px !important;
    width : 150px !important;
    padding: 0px 20px !important;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 20px !important;
    border: 1px solid var(--Text-Color-150, #d5d5d5) !important;
    background: var(--Text-Color-50, #fff) !important;

    /* drop-shadow/button-secondary */
    box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02) !important;
  }
  .ant-select .ant-select-arrow,.ant-select .ant-select-clear {
    inset-inline-start: auto;
    inset-inline-end: 20px !important;
    margin-top: -4px !important;
  }
  .ant-select-single .ant-select-selector .ant-select-selection-search{
    inset-inline-start: 20px;
    inset-inline-end: 20px;
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
  height: 250px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 0.8px solid var(--Text-Color-150, #d5d5d5);
  background: #fdfeff;
`;

export const ModelCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 19px 19px 8px 19px;
  gap: 10px;
  height: 100%;
`;

export const ModalTags = styled.div`
  display: flex;
  gap: 8px;
  padding: 11px 15px;
  border-radius: 0px 0px 10px 10px;
  border-top: 0.2px solid var(--Text-Color-150, #d5d5d5);
  background: #f7fdf5;
  box-shadow: 0px 3px 8px 0px rgba(158, 158, 158, 0.15);

  .ant-tag {
    display: flex;
    height: 26px;
    padding: 0px 7px;
    justify-content: center;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
    border-radius: 10px;
    border: 0.3px solid var(--Text-Color-150, #d5d5d5);
    background: inherit;

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
  justify-content: space-between;
  align-items: center;
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
  display: flex;
  color: var(--Text-Color-850, #222);
  text-overflow: ellipsis;
  font-family: var(--font-dm-sans);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 164%; /* 22.96px */
`;
