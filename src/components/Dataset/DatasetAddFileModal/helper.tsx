import ConfluenceIcon from "@/components/Icons/ConfluenceIcon";
import { ReactNode } from "react";
import {
  ConnectorsAvailableChannelType,
  CONNECTOR_CHANNEL_TYPES,
  UploadFileType,
} from "./constant";

export const Data_Connectors_Available_Channels: ConnectorsAvailableChannelType[] =
  [
    {
      channelType: CONNECTOR_CHANNEL_TYPES.CONFLUENCE,
      name: "confluence",
      displayName: "Confluence",
      imageUrl: <ConfluenceIcon />,
    },
  ];

export const ChannelTableDetails: {
  [key in UploadFileType]?: {
    text: string;
    icon: ReactNode;
  };
} = {
  [UploadFileType.CONFLUENCE_CONFIG]: {
    text: "Confluence",
    icon: <ConfluenceIcon style={{ height: "24px", width: "24px" }} />,
  },
};
