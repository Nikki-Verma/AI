import Icon from "@ant-design/icons";

const PyTorchLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    role="img"
    width="1em"
    height="1em"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 32 32"
  >
    <defs>
      <clipPath id="a">
        <rect x="3.05" y="0.5" width="25.73" height="31" fill="none"></rect>
      </clipPath>
    </defs>
    <g clip-path="url(#a)">
      <path
        d="M24.94,9.51a12.81,12.81,0,0,1,0,18.16,12.68,12.68,0,0,1-18,0,12.81,12.81,0,0,1,0-18.16l9-9V5l-.84.83-6,6a9.58,9.58,0,1,0,13.55,0ZM20.44,9a1.68,1.68,0,1,1,1.67-1.67A1.68,1.68,0,0,1,20.44,9Z"
        fill="#ee4c2c"
      ></path>
    </g>
  </svg>
);

const PyTorchIcon = ({ ...props }) => {
  return <Icon component={() => <PyTorchLogo />} {...props} />;
};

export default PyTorchIcon;
