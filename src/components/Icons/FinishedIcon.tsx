import Icon from "@ant-design/icons";

const FinishedLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
  >
    <g clip-path="url(#clip0_140_27207)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9 0C4.03594 0 0 4.03594 0 9C0 13.9641 4.03594 18 9 18C13.9641 18 18 13.9641 18 9C18 4.03594 13.9641 0 9 0Z"
        fill="#4BAE4F"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.3523 5.96592C13.5703 6.18389 13.5703 6.54248 13.3523 6.76045L8.07886 12.0339C7.96987 12.1429 7.82573 12.1991 7.68159 12.1991C7.53745 12.1991 7.39331 12.1429 7.28433 12.0339L4.64761 9.39717C4.42964 9.1792 4.42964 8.82061 4.64761 8.60264C4.86558 8.38467 5.22417 8.38467 5.44214 8.60264L7.68159 10.8421L12.5578 5.96592C12.7757 5.74443 13.1343 5.74443 13.3523 5.96592Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_140_27207">
        <rect width="18" height="18" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const FinishedIcon = ({ ...props }) => {
  return <Icon component={() => <FinishedLogo />} {...props} />;
};

export default FinishedIcon;
