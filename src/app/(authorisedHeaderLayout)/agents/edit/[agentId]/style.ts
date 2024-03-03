import styled from "styled-components";

export const AgentEditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
  padding: 20px;
`;

export const EmptyChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  height: calc(100vh - 104px);
`;

export const EmptyChattitle = styled.div`
  color: var(--Text-Color-900, #171717);
  text-align: center;
  opacity: 0.5;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;