import styled from "styled-components";

export const SubHeading = styled.div`
  color: var(--Text-Color-900, #171717);
  font-family: var(--font-dm-sans);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const WorkspaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  .ant-radio-button-wrapper {
    height: 40px;
    padding: 9px 30px;
    color: var(--Text-Color-850, #222);
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 157.143% */
    border: 0.5px solid var(primary-color) !important;

    /* drop-shadow/button-secondary */
    box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
  }
  .ant-radio-button-wrapper:not(:first-child) {
    border-left: 0px !important;
  }
  .ant-radio-button-wrapper:not(:first-child)::before {
    width: 0px !important;
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
