"use client";

import theme from "@/_utils/theme.antd";
import { ConfigProvider, theme as antdTheme } from "antd";
export const ThemeProvider = (props: React.PropsWithChildren) => {
  return (
    <ConfigProvider theme={{ ...theme, algorithm: antdTheme.defaultAlgorithm }}>
      {props.children}
    </ConfigProvider>
  );
};
