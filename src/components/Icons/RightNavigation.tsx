import Icon from "@ant-design/icons";

const RightNavigationLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <g opacity="0.7">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.0565 24.9415C11.5772 25.4622 12.4215 25.4622 12.9422 24.9415L20.9422 16.9415C21.4628 16.4208 21.4628 15.5766 20.9422 15.0559L12.9422 7.0559C12.4215 6.53523 11.5772 6.53523 11.0565 7.0559C10.5358 7.57656 10.5358 8.42083 11.0565 8.9415L18.1137 15.9987L11.0565 23.0559C10.5358 23.5766 10.5358 24.4208 11.0565 24.9415Z"
        fill="black"
      />
    </g>
  </svg>
);

const RightNavigationIcon = ({ ...props }) => {
  return <Icon component={() => <RightNavigationLogo />} {...props} />;
};

export default RightNavigationIcon;
