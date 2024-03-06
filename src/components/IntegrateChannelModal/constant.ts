import { ReactNode } from "react";

export enum ChannelType {
  "SLACK" = "SLACK",
  "TELEGRAM" = "TELEGRAM",
  "KALEYRAWHATSAPP" = "KALEYRAWHATSAPP",
}

export const CHANNEL_TYPES = {
  SLACK: ChannelType.SLACK,
  TELEGRAM: ChannelType.TELEGRAM,
  KALEYRAWHATSAPP: ChannelType.KALEYRAWHATSAPP,
};

export type AvailableChannelType = {
  channelType: ChannelType;
  name: string;
  displayName: string;
  imageUrl: ReactNode | undefined;
  disabled?: boolean;
};
