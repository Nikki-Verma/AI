import ChannelsList, { CHANNEL_PAGE_TYPE } from "../ChannelsList";

export const items = (
  data: any,
  agentId: string | string[],
  toggleChannelIntegrate: () => void,
  isRefetching: boolean,
) => [
  {
    key: "integrated_channels",
    label: "Integrated Channels",
    children: (
      <ChannelsList
        data={data}
        agentId={agentId}
        integrateChannel={toggleChannelIntegrate}
        isRefetching={isRefetching}
        pageType={CHANNEL_PAGE_TYPE.AGENT}
      />
    ),
  },
  {
    key: "embedded_code",
    label: "Embedded Code",
    children: <div>Embedded Code</div>,
  },
];
