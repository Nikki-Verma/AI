import Icon from "@ant-design/icons";

const FeatureLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C19.9936 4.47982 15.5202 0.00642897 10 0Z"
      fill="white"
    />
    <path
      d="M15.7722 6.83362L10.068 14.5745C9.93197 14.7549 9.72912 14.8732 9.50503 14.9027C9.28094 14.9321 9.05441 14.8703 8.87634 14.7311L4.80301 11.4745C4.44356 11.1868 4.38536 10.6622 4.67301 10.3028C4.96066 9.94334 5.48523 9.88514 5.84468 10.1728L9.24134 12.8903L14.4305 5.84778C14.6007 5.59244 14.8974 5.45127 15.2029 5.48032C15.5083 5.50936 15.7731 5.70393 15.8921 5.98676C16.0111 6.2696 15.965 6.59494 15.7722 6.83362Z"
      fill="url(#paint0_linear_2648_44533)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_2648_44533"
        x1="10.2238"
        y1="5.47656"
        x2="10.2238"
        y2="14.9099"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#8640A2" />
        <stop offset="1" stop-color="#602EDF" />
      </linearGradient>
    </defs>
  </svg>
);

const FeatureIcon = ({ ...props }) => {
  return <Icon component={() => <FeatureLogo />} {...props} />;
};

export default FeatureIcon;
