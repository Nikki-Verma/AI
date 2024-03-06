import Icon from "@ant-design/icons";

const CoreMLLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    role="img"
    width="1em"
    height="1em"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 734 734"
  >
    <path
      d="M476.841 682.161L685.922 532.632C707.042 517.527 718.051 495.675 718.941 473.535V259.914H16.1792V473.535C17.0788 495.915 28.3135 518.001 49.8743 533.109L263.968 683.123C326.853 727.186 414.437 726.791 476.841 682.161Z"
      fill="#02C0A8"
    ></path>
    <path
      d="M476.841 581.103L685.922 431.573C707.042 416.468 718.051 394.616 718.941 372.476V268.5H16.1792V372.476C17.0788 394.856 28.3135 416.942 49.8743 432.05L263.968 582.065C326.853 626.128 414.437 625.732 476.841 581.103Z"
      fill="url(#paint0_linear_333_277)"
    ></path>
    <path
      d="M49.8739 326.114C4.93902 294.628 4.85527 232.827 49.7047 201.241L263.624 50.5795C326.643 6.19495 414.642 6.59392 477.176 51.5461L686.09 201.722C730.039 233.314 729.957 294.144 685.922 325.637L476.841 475.166C414.437 519.796 326.853 520.192 263.968 476.128L49.8739 326.114Z"
      fill="url(#paint1_linear_333_277)"
    ></path>
    <path
      d="M527.914 280.62L349.792 152.852L381.876 129.116L534.552 238.199L616.975 178.607L643.527 198.303L527.914 280.62Z"
      fill="white"
    ></path>
    <path
      d="M353.111 407.378L320.474 433.134L140.139 301.326L178.861 274.055L371.366 330.111L288.943 194.263L328.218 166.992L508 295.265L478.128 317.486L353.111 224.059L425.024 354.352L404.556 371.522L222.562 317.486L353.111 407.378Z"
      fill="white"
    ></path>
    <defs>
      <linearGradient
        id="paint0_linear_333_277"
        x1="367.56"
        y1="325.566"
        x2="367.56"
        y2="748.767"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#CBF3FF"></stop>
        <stop offset="1" stopColor="#CBF3FF" stop-opacity="0"></stop>
      </linearGradient>
      <linearGradient
        id="paint1_linear_333_277"
        x1="156.734"
        y1="113.461"
        x2="488.495"
        y2="473.957"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#02C5A8"></stop>
        <stop offset="1" stopColor="#0186A7"></stop>
      </linearGradient>
    </defs>
  </svg>
);

const CoreMLIcon = ({ ...props }) => {
  return <Icon component={() => <CoreMLLogo />} {...props} />;
};

export default CoreMLIcon;
