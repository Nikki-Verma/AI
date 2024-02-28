import Icon from "@ant-design/icons";

const IntegrationLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g clipPath="url(#clip0_1533_36514)">
      <mask
        id="mask0_1533_36514"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <path d="M0 1.90735e-06H24V24H0V1.90735e-06Z" fill="white" />
      </mask>
      <g mask="url(#mask0_1533_36514)">
        <path
          d="M14.8125 12.8125C14.8125 13.9171 13.9171 14.8125 12.8125 14.8125H2.70313C1.59856 14.8125 0.703125 13.9171 0.703125 12.8125V2.70313C0.703125 1.59856 1.59856 0.703126 2.70313 0.703126H12.8125C13.9171 0.703126 14.8125 1.59856 14.8125 2.70313V12.8125Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23.2969 21.2969C23.2969 22.4014 22.4014 23.2969 21.2969 23.2969H11.1875C10.0829 23.2969 9.1875 22.4014 9.1875 21.2969V11.1875C9.1875 10.0829 10.0829 9.1875 11.1875 9.1875H21.2969C22.4014 9.1875 23.2969 10.0829 23.2969 11.1875V21.2969Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_1533_36514">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const IntegrationIcon = ({ ...props }) => {
  return <Icon component={() => <IntegrationLogo />} {...props} />;
};

export default IntegrationIcon;
