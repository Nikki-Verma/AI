import Icon from "@ant-design/icons";

const ExpandLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M6.16667 6.66659L5 7.83325L10 12.8333L15 7.83325L13.8333 6.66659L10 10.4999L6.16667 6.66659Z"
      fill="#718BAE"
    />
  </svg>
);

const ExpandIcon = ({ ...props }) => {
  return <Icon component={() => <ExpandLogo />} {...props} />;
};

export default ExpandIcon;
