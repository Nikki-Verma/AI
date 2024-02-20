import { ReactNode } from "react";

export enum ChannelType {
  "SLACK" = "SLACK",
  "TELEGRAM" = "TELEGRAM",
}

export const CHANNEL_TYPES = {
  SLACK: ChannelType.SLACK,
  TELEGRAM: ChannelType.TELEGRAM,
};

export type AvailableChannelType = {
  channelType: ChannelType;
  name: string;
  displayName: string;
  imageUrl: ReactNode | undefined;
  disabled?: boolean;
};
