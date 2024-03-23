import Icon from "@ant-design/icons";

const SelectPayGroundLogo = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6 0C2.69063 0 0 2.69063 0 6C0 9.30937 2.69063 12 6 12C9.30937 12 12 9.30937 12 6C12 2.69063 9.30937 0 6 0Z"
      fill="#602EDF"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.90155 3.97732C9.04686 4.12263 9.04686 4.36169 8.90155 4.50701L5.38593 8.02263C5.31327 8.09529 5.21718 8.13279 5.12108 8.13279C5.02499 8.13279 4.92889 8.09529 4.85624 8.02263L3.09843 6.26482C2.95311 6.11951 2.95311 5.88044 3.09843 5.73513C3.24374 5.58982 3.4828 5.58982 3.62811 5.73513L5.12108 7.2281L8.37186 3.97732C8.51718 3.82966 8.75624 3.82966 8.90155 3.97732Z"
      fill="white"
    />
  </svg>
);

const SelectPayGroundIcon = ({ ...props }) => {
  return <Icon component={() => <SelectPayGroundLogo />} {...props} />;
};

export default SelectPayGroundIcon;
