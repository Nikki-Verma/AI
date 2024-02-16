import { styled } from "styled-components";
export const ModelTagContainer = styled.div`
  .ant-tag {
    display: flex;
    width: max-content;

    height: 32px;
    padding: 0px 7px;
    justify-content: center;
    align-items: center;
    gap: 6px;

    border-radius: 8px;
    border: 0.5px solid #e6e4eb;
    background: #faf8ff;

    flex-shrink: 0;

    /* drop-shadow/button-secondary */
    box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);

    // font styling

    color: var(--Text-Color-850, #222);
    text-align: center;
    font-family: var(--font-dm-sans);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 157.143% */
  }
`;
