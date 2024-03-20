import Icon from "@ant-design/icons";

const CalendarLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M19.4145 23.25H4.5855C2.4705 23.25 0.75 21.5295 0.75 19.4145V7.5855C0.75 5.4705 2.4705 3.75 4.5855 3.75H19.4145C21.5295 3.75 23.25 5.4705 23.25 7.5855V19.4137C23.25 21.5287 21.5295 23.25 19.4145 23.25ZM4.5855 5.25C3.29775 5.25 2.25 6.29775 2.25 7.5855V19.4137C2.25 20.7015 3.29775 21.7493 4.5855 21.7493H19.4145C20.7022 21.7493 21.75 20.7015 21.75 19.4137V7.5855C21.75 6.29775 20.7022 5.25 19.4145 5.25H4.5855Z"
      fill="#020E2D"
    />
    <path
      d="M8.25 2.25C8.25 1.83579 7.91421 1.5 7.5 1.5C7.08579 1.5 6.75 1.83579 6.75 2.25V6.75C6.75 7.16421 7.08579 7.5 7.5 7.5C7.91421 7.5 8.25 7.16421 8.25 6.75V2.25Z"
      fill="#020E2D"
    />
    <path
      d="M17.25 2.25C17.25 1.83579 16.9142 1.5 16.5 1.5C16.0858 1.5 15.75 1.83579 15.75 2.25V6.75C15.75 7.16421 16.0858 7.5 16.5 7.5C16.9142 7.5 17.25 7.16421 17.25 6.75V2.25Z"
      fill="#020E2D"
    />
    <path
      d="M6.62109 14.25C7.03531 14.25 7.37109 13.9142 7.37109 13.5C7.37109 13.0858 7.03531 12.75 6.62109 12.75C6.20688 12.75 5.87109 13.0858 5.87109 13.5C5.87109 13.9142 6.20688 14.25 6.62109 14.25Z"
      fill="#020E2D"
    />
    <path
      d="M12.0371 14.25C12.4513 14.25 12.7871 13.9142 12.7871 13.5C12.7871 13.0858 12.4513 12.75 12.0371 12.75C11.6229 12.75 11.2871 13.0858 11.2871 13.5C11.2871 13.9142 11.6229 14.25 12.0371 14.25Z"
      fill="#020E2D"
    />
    <path
      d="M17.25 14.25C17.6642 14.25 18 13.9142 18 13.5C18 13.0858 17.6642 12.75 17.25 12.75C16.8358 12.75 16.5 13.0858 16.5 13.5C16.5 13.9142 16.8358 14.25 17.25 14.25Z"
      fill="#602EDF"
    />
    <path
      d="M6.62109 18.8828C7.03531 18.8828 7.37109 18.547 7.37109 18.1328C7.37109 17.7186 7.03531 17.3828 6.62109 17.3828C6.20688 17.3828 5.87109 17.7186 5.87109 18.1328C5.87109 18.547 6.20688 18.8828 6.62109 18.8828Z"
      fill="#020E2D"
    />
    <path
      d="M12.0371 18.8828C12.4513 18.8828 12.7871 18.547 12.7871 18.1328C12.7871 17.7186 12.4513 17.3828 12.0371 17.3828C11.6229 17.3828 11.2871 17.7186 11.2871 18.1328C11.2871 18.547 11.6229 18.8828 12.0371 18.8828Z"
      fill="#020E2D"
    />
    <path
      d="M17.25 18.8828C17.6642 18.8828 18 18.547 18 18.1328C18 17.7186 17.6642 17.3828 17.25 17.3828C16.8358 17.3828 16.5 17.7186 16.5 18.1328C16.5 18.547 16.8358 18.8828 17.25 18.8828Z"
      fill="#602EDF"
    />
    <path
      d="M18.75 9.02344H5.25C4.83579 9.02344 4.5 9.35922 4.5 9.77344C4.5 10.1877 4.83579 10.5234 5.25 10.5234H18.75C19.1642 10.5234 19.5 10.1877 19.5 9.77344C19.5 9.35922 19.1642 9.02344 18.75 9.02344Z"
      fill="#602EDF"
    />
  </svg>
);

const CalendarIcon = ({ ...props }) => {
  return <Icon component={() => <CalendarLogo />} {...props} />;
};

export default CalendarIcon;
