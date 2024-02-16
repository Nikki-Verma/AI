import Icon from "@ant-design/icons";

const CurrentStepLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
  >
    <circle cx="9" cy="9" r="9" fill="#D7CEEC" />
    <circle cx="9" cy="9" r="5" fill="#602EDF" />
  </svg>
);

const CurrentStepIcon = ({ ...props }) => {
  return <Icon component={() => <CurrentStepLogo />} {...props} />;
};

export default CurrentStepIcon;
