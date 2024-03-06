export enum PlaygroundConfigurationOptionType {
  AGENT = "AGENT",
  WORKFLOW = "WORKFLOW",
}

export const PlaygroundConfigurationOptions = [
  {
    key: PlaygroundConfigurationOptionType.WORKFLOW,
    tab: "Workflows",
  },
  {
    key: PlaygroundConfigurationOptionType.AGENT,
    tab: "Agents",
  },
];
