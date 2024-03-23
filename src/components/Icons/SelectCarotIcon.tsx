import Icon from "@ant-design/icons";

const SelectCarotLogo = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 3L6 9L12 3H0Z" fill="#5B5B5B" />
  </svg>
);

const SelectCarotIcon = ({ ...props }) => {
  return <Icon component={() => <SelectCarotLogo />} {...props} />;
};

export default SelectCarotIcon;
