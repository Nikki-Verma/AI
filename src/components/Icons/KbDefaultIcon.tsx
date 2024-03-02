import Icon from "@ant-design/icons";

const KbDefaultLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <mask
      id="mask0_1765_22233"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="16"
      height="16"
    >
      <path d="M0 9.53674e-07H16V16H0V9.53674e-07Z" fill="white" />
    </mask>
    <g mask="url(#mask0_1765_22233)">
      <path
        d="M9.76512 4.27969L12.4986 1.34406L10.2695 7.62063H13.5639L6.05262 15.6875L8.28168 9.41094H4.9873L6.6623 7.61188"
        stroke="black"
        strokeWidth="0.7"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      <path
        d="M7.51239 0.59025C8.84177 1.14206 9.77667 2.45275 9.77667 3.98175C9.77667 6.00897 8.1333 7.65234 6.10611 7.65234C4.07889 7.65234 2.43555 6.00897 2.43555 3.98175C2.43555 2.45275 3.37045 1.14206 4.69986 0.590219"
        stroke="black"
        strokeWidth="0.7"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.41895 0.3125C6.41895 0.485063 6.27901 0.625 6.10645 0.625C5.93385 0.625 5.79395 0.485063 5.79395 0.3125C5.79395 0.139938 5.93385 5.96046e-08 6.10645 5.96046e-08C6.27901 5.96046e-08 6.41895 0.139938 6.41895 0.3125Z"
        fill="black"
      />
      <path
        d="M4.71289 5.64062L6.03848 2.16013C6.06558 2.09391 6.15933 2.09381 6.18655 2.15997L7.50008 5.64062"
        stroke="black"
        strokeWidth="0.7"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.12598 4.77344H7.09301"
        stroke="black"
        strokeWidth="0.7"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

const KbDefaultIcon = ({ ...props }) => {
  return <Icon component={() => <KbDefaultLogo />} {...props} />;
};

export default KbDefaultIcon;
