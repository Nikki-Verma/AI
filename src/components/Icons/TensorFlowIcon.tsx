import Icon from "@ant-design/icons";

const TensorFlowLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    role="img"
    width="1em"
    height="1em"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 534.01 508.99"
  >
    <defs>
      <clipPath id="clipPath" transform="translate(23.09 1.92)">
        <polygon points="452.23 123.16 235.73 0 235.73 506.11 322.33 456.07 322.33 313.67 387.76 351.2 386.8 254.02 322.33 216.49 322.33 159.72 452.23 235.73 452.23 123.16"></polygon>
      </clipPath>
      <linearGradient
        id="linear-gradient"
        x1="-20.21"
        y1="-48.36"
        x2="510.92"
        y2="-48.36"
        gradientTransform="matrix(1, 0, 0, -1, 0, 204.21)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#ff6f00"></stop>
        <stop offset="1" stopColor="#ffa800"></stop>
      </linearGradient>
      <clipPath id="clipPath-2" transform="translate(23.09 1.92)">
        <polygon points="0 123.16 216.49 0 216.49 506.11 129.89 456.07 129.89 159.72 0 235.73 0 123.16"></polygon>
      </clipPath>
      <linearGradient
        id="linear-gradient-2"
        x1="-23.09"
        y1="-48.36"
        x2="508.03"
        y2="-48.36"
      ></linearGradient>
    </defs>
    <title>google-tensorflow</title>
    <g>
      <path
        d="M-20.21-1.92H510.92v509H-20.21Z"
        transform="translate(23.09 1.92)"
      ></path>
    </g>
    <g>
      <path
        d="M-23.09-1.92H508v509H-23.09Z"
        transform="translate(23.09 1.92)"
      ></path>
    </g>
  </svg>
);

const TensorFlowIcon = ({ ...props }) => {
  return <Icon component={() => <TensorFlowLogo />} {...props} />;
};

export default TensorFlowIcon;
