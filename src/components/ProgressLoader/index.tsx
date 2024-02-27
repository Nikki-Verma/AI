import { Progress } from "antd";
import React from "react";

const ProgressLoader: React.FC = () => {
  return (
    <Progress
      percent={100}
      status="active"
      showInfo={false}
      strokeLinecap="butt"
      strokeColor="linear-gradient(90deg, #C266E7 -3.52%, #602EDF 110.56%)"
      style={{ position: "absolute", top: -12, left: 0, right: 0, zIndex: 999 }}
    />
  );
};

export default ProgressLoader;
