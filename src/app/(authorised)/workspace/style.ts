import { Radio } from "antd";
import styled from "styled-components";

export const RadioButton = styled(Radio.Button)`
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 157.143% */
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
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
