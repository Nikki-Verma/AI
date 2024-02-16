import ModelOverView from "@/components/ModelOverview";

export const items = (data: any) => [
  {
    key: "model_details",
    label: "Model Details",
    children: (
      <ModelOverView
        markdown={data?.result?.detail}
        modelDetails={data?.result}
      />
    ),
  },
  {
    key: "run",
    label: "Run",
    children: <div>Under Maintenance</div>,
  },
];
