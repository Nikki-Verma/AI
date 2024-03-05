import Icon from "@ant-design/icons";

const JAXLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    role="img"
    width="1.73em"
    height="1em"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 451 260.81"
  >
    <g fill="#5e97f6">
      <path d="M50.5 130.4l-25 43.31h50l25-43.31h-50z"></path>
      <path d="M.5 217.01l25-43.3h50l-25 43.3H.5z"></path>
      <path d="M125.5 173.71h-50l-25 43.3h50l25-43.3z"></path>
      <path d="M175.5 173.71h-50l-25 43.3h50l25-43.3z"></path>
      <path d="M150.5 130.4l-25 43.31h50l25-43.31h-50z"></path>
      <path d="M175.5 87.1l-25 43.3h50l25-43.3h-50z"></path>
      <path d="M200.5 43.8l-25 43.3h50l25-43.3h-50z"></path>
      <path d="M225.5.5l-25 43.3h50l25-43.3h-50z"></path>
    </g>
    <g fill="#2a56c6">
      <path d="M.5 217.01l25 43.3h50l-25-43.3H.5z"></path>
      <path d="M125.5 260.31h-50l-25-43.3h50l25 43.3z"></path>
      <path d="M175.5 260.31h-50l-25-43.3h50l25 43.3z"></path>
    </g>
    <g fill="#00796b">
      <path d="M200.5 217.01l-25-43.3-25 43.3 25 43.3 25-43.3zm50-86.61l-25-43.3-25 43.3h50z"></path>
      <path d="M250.5 43.8l-25 43.3 25 43.3 25-43.3-25-43.3z"></path>
    </g>
    <path d="M125.5 173.71l-25-43.31-25 43.31h50z" fill="#3367d6"></path>
    <g fill="#26a69a">
      <path d="M250.5 130.4h-50l-25 43.31h50l25-43.31z"></path>
      <path d="M300.5 130.4h-50l-25 43.31h50l25-43.31z"></path>
    </g>
    <g fill="#9c27b0">
      <path d="M350.5 43.8L325.5.5l-25 43.3 25 43.3 25-43.3z"></path>
      <path d="M375.5 87.1l-25-43.3-25 43.3 25 43.3 25-43.3z"></path>
      <path d="M400.5 130.4l-25-43.3-25 43.3 25 43.31 25-43.31z"></path>
      <path d="M425.5 173.71l-25-43.31-25 43.31 25 43.3 25-43.3z"></path>
      <path d="M450.5 217.01l-25-43.3-25 43.3 25 43.3 25-43.3zM425.5.5l-25 43.3 25 43.3 25-43.3-25-43.3z"></path>
      <path d="M375.5 87.1l25-43.3 25 43.3-25 43.3-25-43.3zm-25 43.3l-25 43.31 25 43.3 25-43.3-25-43.31z"></path>
      <path d="M325.5 260.31l-25-43.3 25-43.3 25 43.3-25 43.3z"></path>
    </g>
    <path d="M275.5 260.31l-25-43.3h50l25 43.3h-50z" fill="#6a1b9a"></path>
    <g fill="#00695c">
      <path d="M225.5 173.71h-50l25 43.3h50l-25-43.3z"></path>
      <path d="M275.5 173.71h-50l25 43.3 25-43.3zm0-86.61l25 43.3h50l-25-43.3h-50z"></path>
      <path d="M300.5 43.8h-50l25 43.3h50l-25-43.3zm125 216.51l-25-43.3h-50l25 43.3h50z"></path>
      <path d="M375.5 173.71l-25 43.3h50l-25-43.3z"></path>
    </g>
    <g fill="#ea80fc">
      <path d="M325.5.5h-50l-25 43.3h50l25-43.3zm0 173.21h-50l-25 43.3h50l25-43.3z"></path>
      <path d="M350.5 130.4h-50l-25 43.31h50l25-43.31zM425.5.5h-50l-25 43.3h50l25-43.3z"></path>
      <path d="M375.5 87.1l-25-43.3h50l-25 43.3z"></path>
    </g>
  </svg>
);

const JAXIcon = ({ ...props }) => {
  return <Icon component={() => <JAXLogo />} {...props} />;
};

export default JAXIcon;
