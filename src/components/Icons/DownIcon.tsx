import Icon from "@ant-design/icons";

const DownLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.41107 6.91107C4.08563 7.23651 4.08563 7.76414 4.41107 8.08958L9.41108 13.0896C9.73649 13.415 10.2642 13.415 10.5896 13.0896L15.5896 8.08958C15.915 7.76414 15.915 7.23651 15.5896 6.91107C15.2642 6.58563 14.7365 6.58563 14.4111 6.91107L10.0003 11.3218L5.58958 6.91107C5.26414 6.58563 4.73651 6.58563 4.41107 6.91107Z"
      fill="black"
    />
  </svg>
);

const DownIcon = ({ ...props }) => {
  return <Icon component={() => <DownLogo />} {...props} />;
};

export default DownIcon;
