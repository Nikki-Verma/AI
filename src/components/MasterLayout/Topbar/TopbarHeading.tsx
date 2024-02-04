import { useAppStore } from "@/store";
import { HeaderSubTitle, HeaderTitle, PageHeader } from "./style";

const TopbarHeading = () => {
  const { pageConfig } = useAppStore();

  return (
    <PageHeader>
      <HeaderTitle>{pageConfig?.pageTitle}</HeaderTitle>
      <HeaderSubTitle>{pageConfig?.pageDescription}</HeaderSubTitle>
    </PageHeader>
  );
};

export default TopbarHeading;
