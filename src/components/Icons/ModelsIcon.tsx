import Icon from "@ant-design/icons";

const ModelsLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <mask
      id="mask0_1533_36429"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="24"
      height="24"
    >
      <path d="M0 1.90735e-06H24V24H0V1.90735e-06Z" fill="white" />
    </mask>
    <g mask="url(#mask0_1533_36429)">
      <path
        d="M10.2296 12.7144L2.56785 8.55052C2.31192 8.4114 2.00024 8.5967 2.00024 8.88807V18.5472C2.00024 18.6854 2.07445 18.8129 2.19459 18.8812L9.85631 23.2368C10.1124 23.3824 10.4303 23.1975 10.4303 22.9029V13.0519C10.4303 12.9111 10.3533 12.7816 10.2296 12.7144Z"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.4022 5.07921L12.0473 0.747822C11.9356 0.689931 11.8028 0.690353 11.6916 0.748853L3.4598 5.08029C3.18647 5.2241 3.186 5.61527 3.45891 5.75979L11.6907 10.1182C11.8024 10.1773 11.9361 10.1778 12.0481 10.1193L20.4031 5.76087C20.6787 5.61706 20.6783 5.22237 20.4022 5.07921Z"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.4322 8.55052L13.7704 12.7144C13.6467 12.7816 13.5697 12.9111 13.5697 13.0519V22.9029C13.5697 23.1975 13.8876 23.3824 14.1437 23.2368L21.8055 18.8812C21.9255 18.8129 21.9997 18.6854 21.9997 18.5472V8.88807C21.9997 8.5967 21.6882 8.4114 21.4322 8.55052Z"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

const ModelsIcon = ({ ...props }) => {
  return <Icon component={() => <ModelsLogo />} {...props} />;
};

export default ModelsIcon;
