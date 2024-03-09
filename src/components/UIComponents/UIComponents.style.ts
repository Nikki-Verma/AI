import { Button, Radio } from "antd";
import { styled } from "styled-components";

export const FlexBox = styled.div`
  display: flex;
`;
export const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexEndContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const FlexStartContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: calc(100vh - 114px);
`;

export const PageSubHeading = styled.div`
  font-size: 14px;
  color: #14141480;
  font-family: var(--font-dm-sans);
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const PageTitle = styled.div`
  display: flex;
  color: var(--Text-Color-900, #171717);
  font-family: var(--font-dm-sans);
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-right: 22px;
`;
export const PageAbout = styled.div`
  display: flex;
  color: var(--Text-Color-850, #222);
  text-overflow: ellipsis;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 154%; /* 24.64px */
`;

export const MediumRadioGroup = styled(Radio.Group)`
  .ant-radio-button-wrapper {
    height: 40px;
    padding: 9px 30px;
    color: var(--Text-Color-850, #222);
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 157.143% */
    border: 0.5px solid $primary-color !important;

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

export const RemoveButton = styled(Button)`
  color: #ff0000 !important;
  border-color: #ff0000 !important;
  &:hover {
    background-color: #ff0000 !important;
    color: #fff !important;
  }
`;
