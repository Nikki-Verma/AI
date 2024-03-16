import { ReactNode } from "react";
import {
  StatisticsContainer,
  StatisticsDetails,
  StatisticsLabel,
  StatisticsValue,
} from "./style";

type StatisticsProps = {
  stats: { label: string; value: string | undefined | number; icon: ReactNode };
};

const Statistics = ({ stats }: StatisticsProps) => {
  return (
    <StatisticsContainer>
      {stats?.icon}
      <StatisticsDetails>
        <StatisticsValue>{stats?.value}</StatisticsValue>
        <StatisticsLabel>{stats?.label}</StatisticsLabel>
      </StatisticsDetails>
    </StatisticsContainer>
  );
};

export default Statistics;
