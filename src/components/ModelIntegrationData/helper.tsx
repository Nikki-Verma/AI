import ChannelsList, { CHANNEL_PAGE_TYPE } from "../ChannelsList";

export const items = (
  data: any,
  userModelId: string | string[],
  toggleChannelIntegrate: () => void,
  isRefetching: boolean,
) => [
  {
    key: "integrated_channels",
    label: "Integrated Channels",
    children: (
      <ChannelsList
        data={data}
        userModelId={userModelId}
        integrateChannel={toggleChannelIntegrate}
        isRefetching={isRefetching}
        pageType={CHANNEL_PAGE_TYPE.MODEL}
      />
    ),
  },
  {
    key: "embedded_code",
    label: "Embedded Code",
    children: <div>Embedded Code</div>,
  },
];
