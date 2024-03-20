import Icon from "@ant-design/icons";

const DotLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
  >
    <circle cx="5" cy="5" r="5" fill="currentColor" />
  </svg>
);

const DotIcon = ({ ...props }) => {
  return <Icon component={() => <DotLogo />} {...props} />;
};

export default DotIcon;
