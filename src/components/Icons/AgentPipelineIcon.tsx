import Icon from "@ant-design/icons";

const PipelineLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g clipPath="url(#clip0_1533_36375)">
      <mask
        id="mask0_1533_36375"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <path d="M0 0H24V24H0V0Z" fill="white" />
      </mask>
      <g mask="url(#mask0_1533_36375)">
        <path
          d="M9.18408 6.375H0.465332V0.46875H9.18408V6.375Z"
          stroke="currentColor"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <path
        d="M16.2153 12V14.8125H7.77783V9.1875H16.2153V12Z"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <mask
        id="mask1_1533_36375"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <path d="M0 0H24V24H0V0Z" fill="white" />
      </mask>
      <g mask="url(#mask1_1533_36375)">
        <path
          d="M23.5313 23.5312H14.8125V17.625H23.5313V23.5312Z"
          stroke="currentColor"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.1875 3.42187H19.5C20.018 3.42187 20.4375 3.8414 20.4375 4.35937V11.0625C20.4375 11.5805 20.018 12 19.5 12H16.2188"
          stroke="currentColor"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.78125 12.0017H4.5C3.98203 12.0017 3.5625 12.4212 3.5625 12.9392V19.6423C3.5625 20.1603 3.98203 20.5798 4.5 20.5798H14.8125"
          stroke="currentColor"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.1528 21.5173C17.1528 21.7762 16.9429 21.9861 16.6841 21.9861C16.4252 21.9861 16.2153 21.7762 16.2153 21.5173C16.2153 21.2584 16.4252 21.0486 16.6841 21.0486C16.9429 21.0486 17.1528 21.2584 17.1528 21.5173Z"
          fill="currentColor"
        />
        <path
          d="M18.7986 21.5139H21.658"
          stroke="currentColor"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_1533_36375">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const PipelineIcon = ({ ...props }) => {
  return <Icon component={() => <PipelineLogo />} {...props} />;
};

export default PipelineIcon;
