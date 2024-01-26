import { useAppStore } from "@/store";

const TopbarHeading = () => {
  const { pageConfig } = useAppStore();

  return (
    <>
      <span>{pageConfig?.pageTitle}</span>
      <span>{pageConfig?.pageDescription}</span>
    </>
  );
};

export default TopbarHeading;
