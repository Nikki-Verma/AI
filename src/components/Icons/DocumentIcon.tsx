import Icon from "@ant-design/icons";

const DocumentLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M20.3343 4.98131L15.8145 0.705281C15.3337 0.250453 14.7045 0 14.0427 0H5.4375C4.01592 0 2.85938 1.15655 2.85938 2.57812V21.4219C2.85938 22.8435 4.01592 24 5.4375 24H18.5625C19.9841 24 21.1406 22.8435 21.1406 21.4219V6.85416C21.1406 6.14873 20.8467 5.46609 20.3343 4.98131ZM18.9685 5.625H15.4688C15.3395 5.625 15.2344 5.51986 15.2344 5.39062V2.09231L18.9685 5.625ZM18.5625 22.5938H5.4375C4.79133 22.5938 4.26562 22.068 4.26562 21.4219V2.57812C4.26562 1.93195 4.79133 1.40625 5.4375 1.40625H13.8281V5.39062C13.8281 6.29527 14.5641 7.03125 15.4688 7.03125H19.7344V21.4219C19.7344 22.068 19.2087 22.5938 18.5625 22.5938Z"
      fill="#602EDF"
    />
    <path
      d="M17.0156 9.375H6.70312C6.31481 9.375 6 9.68981 6 10.0781C6 10.4664 6.31481 10.7812 6.70312 10.7812H17.0156C17.4039 10.7812 17.7188 10.4664 17.7188 10.0781C17.7188 9.68981 17.4039 9.375 17.0156 9.375Z"
      fill="#602EDF"
    />
    <path
      d="M17.0156 13.125H6.70312C6.31481 13.125 6 13.4398 6 13.8281C6 14.2164 6.31481 14.5312 6.70312 14.5312H17.0156C17.4039 14.5312 17.7188 14.2164 17.7188 13.8281C17.7188 13.4398 17.4039 13.125 17.0156 13.125Z"
      fill="#602EDF"
    />
    <path
      d="M10.1119 16.875H6.70312C6.31481 16.875 6 17.1898 6 17.5781C6 17.9664 6.31481 18.2812 6.70312 18.2812H10.1119C10.5002 18.2812 10.815 17.9664 10.815 17.5781C10.815 17.1898 10.5002 16.875 10.1119 16.875Z"
      fill="#602EDF"
    />
  </svg>
);

const DocumentIcon = ({ ...props }) => {
  return <Icon component={() => <DocumentLogo />} {...props} />;
};

export default DocumentIcon;
