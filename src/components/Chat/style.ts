import { styled } from "styled-components";

export const ChatContainer = styled.div`
    display : flex;
    flex-direction : column;
    width : 100%;
    flex-grow : 1;
    overflow : auto;
`

export const ChatInputContainer = styled.div`
    display : flex;
    flex-direction : column;
    width : 100%;
    border-radius: 10px;
    border: 1px solid var(--Text-Color-200, #C7C7C7);
    background: var(--Text-Color-50, #FFF);
    box-shadow: 0px 5px 8.4px 3px rgba(173, 173, 173, 0.15);
    .ant-input{
        border : 0px !important;
        border-radius: 10px 10px 0px 0px;
        box-shadow : none !important;
    }
`

export const MessageContainer = styled.div`
    display : flex;
    flex-direction : column;
    margin-bottom: 10px;
    gap : 12px;
    align-items:${(props : any) => {
        switch (props.Role) {
          case "SimplAi":
            return 'flex-start !important';
          case "user":
            return 'flex-end !important';
          default:
            return 'flex-end !important';
        }
    }};
    max-width: 70%;
    margin-left:${(props : any) => {
        switch (props.Role) {
          case "SimplAi":
            return '0 !important';
          case "user":
            return 'auto !important';
          default:
            return 'auto !important';
        }
    }};
    margin-right: ${(props : any) => {
        switch (props.Role) {
          case "SimplAi":
            return 'auto !important';
          case "user":
            return '0 !important';
          default:
            return '0 !important';
        }
    }};
`
export const IconContainer = styled.div`
  display: flex;
  background: #e6eaf5;
  justify-content: center;
  align-items: center;
  min-height: 24px;
  min-width: 24px;
  border-radius: 50%;
  color: var(primary-color);
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 12px; /* 200% */
  letter-spacing: 0.12px;
`;

export const PromptContainer = styled.div`
    display: inline-flex;
    padding: 12px;
    justify-content: center;
    align-items: center;
    gap: 12px;
    border-radius: 10px;
    background: ${(props : any) => {
        switch (props.Role) {
          case "SimplAi":
            return 'var(--Text-Color-50, #FFF) !important';
          case "user":
            return '#F0F4F8 !important';
          default:
            return '#F0F4F8 !important';
        }
    }};#F0F4F8;
    color: ${(props : any) => {
        switch (props.Role) {
          case "SimplAi":
            return 'var(--Text-Color-850, #222) !important';
          case "user":
            return 'var(--Text-Color-700, #444) !important';
          default:
            return 'var(--Text-Color-700, #444) !important';
        }
    }};
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    border:${(props : any) => {
        switch (props.Role) {
          case "SimplAi":
            return '0.5px solid var(--Text-Color-150, #D5D5D5) !important';
          case "user":
            return '0px !important';
          default:
            return '0px !important';
        }
    }};
`

export const BottomControls = styled.div`
    display : flex;
    width : 100%;
    justify-content : space-between;
    align-items : center;
    min-height : 45px;
    border-radius: 0px 0px 10px 10px;
    background: #FBFAFE;
    padding : 14px 16px;
`

export const BottonRightControl = styled.div`
    display : flex;
    gap : 20px;
`

export const BottonLeftControl = styled.div`
    display : flex;
    gap : 20px;
`

export const ActionContainer = styled.div`
    display : flex;
    gap : 8px;
    color: var(--Text-Color-800, #2E2E2E);
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const WelcomeText = styled.div`
    display : flex;
    text-align: center;
    color: var(--Text-Color-900, #171717);
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-top : 8px;
    margin-bottom : 13px;
`

export const GetStartedText = styled.div`
    display : flex;
    color: var(--Text-Color-850, #222);
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`