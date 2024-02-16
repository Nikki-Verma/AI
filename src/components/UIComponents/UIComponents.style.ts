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
  color: var(--Text-Color-900, #171717);
  font-family: var(--font-dm-sans);
  font-size: 16px;
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
