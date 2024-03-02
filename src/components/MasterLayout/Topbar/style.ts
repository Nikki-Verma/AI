import { Layout, Typography } from "antd";
import { styled } from "styled-components";
const { Header } = Layout;
const { Text } = Typography;
export const DashboardHeader = styled(Header)`
  display: flex !important;
  justify-content: space-between !important;
  padding: 0 24px !important;
  background: #fff !important;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.06) !important;
  position: fixed !important;
  top: 0 !important;
  width: 100vw !important;
  height: 64px !important;
  line-height: 64px !important;
  z-index: 99 !important;
  overflow: hidden !important;
  box-sizing: border-box !important;
  font-family: var(--font-dm-sans) !important;
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: max-content;
  height: 100%;
  justify-content: center;
`;

export const HeaderTitle = styled.div`
  color: var(--Text-Color-850, #222);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const HeaderSubTitle = styled.div`
  color: var(--Text-Color-600, #5b5b5b);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const TopBarMenuContainer = styled.div`
  display: flex;
  gap: 12px;
  height: 100%;
  overflow: hidden;
  align-items: center;
  line-height: normal;
`;

export const IconContainer = styled.div`
  cursor: pointer;
  display: flex;
  background: #e6eaf5;
  justify-content: center;
  align-items: center;
  min-height: 40px;
  min-width: 40px;
  border-radius: 50%;
  color: $primary-color;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 200% */
  letter-spacing: 0.12px;
`;

export const BetaTag = styled.div`
  display: flex;
  padding: 2px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid var(--blue-purple-600, #602edf);
  background: #fff;

  /* drop-shadow/button-secondary */
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
`;

export const BetaTagTitle = styled(Text)`
  color: var(--New-Main-Color, #602edf) !important;
  text-align: center;
  font-family: "DM Sans";
  font-size: 12px !important;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 183.333% */
`;
