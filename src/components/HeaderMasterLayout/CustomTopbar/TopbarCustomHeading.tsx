import { useAppStore } from "@/store";
import { TopbarHeadingText } from "./style";

const TopbarHeading = () => {
  const { headerTitle } = useAppStore();

  return <TopbarHeadingText>{headerTitle}</TopbarHeadingText>;
};

export default TopbarHeading;
