import DotIcon from "../Icons/DotIcon";
import {
  StatisticsContainer,
  StatisticsDetails,
  StatisticsLabel,
  StatisticsValue,
} from "./style";

type StatisticsProps = {
  stats: { label: string; value: string | undefined | number };
};

const Statistics = ({ stats }: StatisticsProps) => {
  return (
    <StatisticsContainer>
      <DotIcon style={{ color: "red" }} />
      <StatisticsDetails>
        <StatisticsValue>{stats?.value}</StatisticsValue>
        <StatisticsLabel>{stats?.label}</StatisticsLabel>
      </StatisticsDetails>
    </StatisticsContainer>
  );
};

export default Statistics;
