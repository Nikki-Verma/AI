import { Tooltip } from "antd";
import InfoIcon from "../Icons/InfoIcon";

const InfoIconTooltip = ({ title }: { title: string }) => {
  return (
    <Tooltip trigger="hover" title={title}>
      <div>
        <InfoIcon />
      </div>
    </Tooltip>
  );
};

export default InfoIconTooltip;
