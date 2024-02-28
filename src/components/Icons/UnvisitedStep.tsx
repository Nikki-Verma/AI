import Icon from "@ant-design/icons";

const UnvisitedStepLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
  >
    <circle
      cx="9"
      cy="9"
      r="8.75"
      fill="white"
      stroke="black"
      strokeWidth="0.5"
    />
  </svg>
);

const UnvisitedStepIcon = ({ ...props }) => {
  return <Icon component={() => <UnvisitedStepLogo />} {...props} />;
};

export default UnvisitedStepIcon;
