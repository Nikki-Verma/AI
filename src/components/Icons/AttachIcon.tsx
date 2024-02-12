import Icon from "@ant-design/icons";

const AttachLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <g clipPath="url(#clip0_123_11825)">
      <path
        d="M15.1771 5.82381L7.04568 13.865C5.69836 15.1974 3.51371 15.1974 2.16639 13.865C0.819062 12.5325 0.819062 10.3724 2.16639 9.03992L9.48506 1.80296C10.3835 0.914815 11.8393 0.914815 12.7378 1.80296C13.6362 2.69108 13.6362 4.13153 12.7378 5.01965L5.41906 12.2566C4.97014 12.701 4.24193 12.701 3.79244 12.2566C3.34352 11.8129 3.34352 11.0927 3.79244 10.6483L10.2978 4.21546L9.48449 3.4113L2.97971 9.84468C2.0813 10.7328 2.0813 12.1732 2.97971 13.0614C3.87812 13.9495 5.33398 13.9495 6.23239 13.0614L13.5511 5.82438C14.8984 4.49192 14.8984 2.33184 13.5511 0.999349C12.2037 -0.333116 10.0191 -0.333116 8.67179 0.999349L0.946425 8.6384L0.97442 8.66637C-0.428895 10.4506 -0.305528 13.03 1.35309 14.6697C3.0117 16.3094 5.61897 16.4322 7.42378 15.0438L7.45177 15.0718L15.9899 6.62854L15.1771 5.82381Z"
        fill="#444444"
      />
    </g>
    <defs>
      <clipPath id="clip0_123_11825">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const AttachIcon = ({ ...props }) => {
  return <Icon component={() => <AttachLogo />} {...props} />;
};

export default AttachIcon;
