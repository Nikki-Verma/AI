import Icon from "@ant-design/icons";

const CustomWalletLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M10.6582 8.5343C11.145 7.1797 12.4407 6.21094 13.9626 6.21094C15.488 6.21094 16.7862 7.18411 17.2703 8.54363"
      stroke="#602EDF"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.0396 18.6203H15.923C14.6344 18.6203 13.5898 17.5755 13.5898 16.2867C13.5898 14.9979 14.6344 13.9531 15.923 13.9531H22.0396"
      stroke="#602EDF"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.2168 16.2852H17.647"
      stroke="#602EDF"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.78002 5.02734H3.62194C2.55033 5.02734 1.68164 5.89622 1.68164 6.96806"
      stroke="black"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.7472 8.92896L20.7848 8.8841C21.5002 8.17545 21.5002 7.02654 20.7848 6.31788L15.4639 1.04712C14.7485 0.338461 13.5886 0.338461 12.8732 1.04712L5.00391 8.84229"
      stroke="black"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.2026 8.90705H3.62194C2.57597 8.90705 1.72336 8.07928 1.68314 7.04297H1.68164V21.5422C1.68164 22.614 2.55881 23.4829 3.64083 23.4829H20.2026C21.3718 23.4829 22.3196 22.544 22.3196 21.3858V11.0041C22.3196 9.84591 21.3718 8.90705 20.2026 8.90705Z"
      stroke="black"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CustomWalletIcon = ({ ...props }) => {
  return <Icon component={() => <CustomWalletLogo />} {...props} />;
};

export default CustomWalletIcon;
