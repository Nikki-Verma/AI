import Icon from "@ant-design/icons";

const BillingLogo = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.5 23.4844H4.5C3.20559 23.4844 2.15625 22.4176 2.15625 21.1017V2.89828C2.15625 1.58236 3.20559 0.515625 4.5 0.515625H19.5C18.2056 0.515625 17.1562 1.58236 17.1562 2.89828V21.1017C17.1562 22.4176 18.2056 23.4844 19.5 23.4844Z"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.8438 5.28094H17.1562V2.89828C17.1562 1.58236 18.2056 0.515625 19.5 0.515625C20.7944 0.515625 21.8438 1.58236 21.8438 2.89828V5.28094Z"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.8438 18.7191H17.1562V21.1018C17.1562 22.4177 18.2056 23.4844 19.5 23.4844C20.7944 23.4844 21.8438 22.4177 21.8438 21.1018V18.7191Z"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 14.1954C9.49941 14.5221 9.76523 14.5582 10.3337 14.5544C11.7906 14.5447 12.32 12.5249 10.8878 12.0187C10.2479 11.7924 9.77306 11.589 9.45755 11.3415C8.90798 10.9104 9.10884 9.80386 9.91753 9.56025C10.0654 9.51567 10.2046 9.4935 10.3338 9.48736C10.3338 9.48736 10.9337 9.45202 11.3697 9.82195"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.3339 15.0997V14.5547"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.3339 9V9.48769"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BillingIcon = ({ ...props }) => {
  return <Icon component={() => <BillingLogo />} {...props} />;
};

export default BillingIcon;
