"use client";

import { useAppStore } from "@/store";
import { useLayoutEffect } from "react";

const WorkflowEdit = () => {
  const { updateHeaderTitle } = useAppStore();

  useLayoutEffect(() => {
    updateHeaderTitle("Edit Workflow");
  }, []);
  return <div>WorkflowEdit</div>;
};

export default WorkflowEdit;
