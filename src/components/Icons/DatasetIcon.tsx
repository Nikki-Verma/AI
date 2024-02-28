import Icon from "@ant-design/icons";

const DatasetLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M2.12329 13.9268L10.0299 18.8738C11.2447 19.6339 12.7554 19.6339 13.9702 18.8738L21.8768 13.9268"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.12329 10.0732L10.0299 15.0203C11.2447 15.7804 12.7554 15.7804 13.9702 15.0203L21.8768 10.0732"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.37366 6.37646L10.0299 11.1668C11.2447 11.927 12.7554 11.927 13.9702 11.1668L21.6264 6.37646"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.12329 7.37918C2.12329 6.66048 2.48236 5.99508 3.06793 5.6287L10.0298 1.27272C11.2446 0.512608 12.7554 0.512608 13.9702 1.27272L20.9321 5.6287C21.5177 5.99508 21.8767 6.66048 21.8767 7.37918V16.6208C21.8767 17.3395 21.5177 18.0049 20.9321 18.3712L13.9702 22.7272C12.7554 23.4873 11.2446 23.4873 10.0298 22.7272L3.06793 18.3712C2.48236 18.0049 2.12329 17.3395 2.12329 16.6208V7.37918Z"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DatasetIcon = ({ ...props }) => {
  return <Icon component={() => <DatasetLogo />} {...props} />;
};

export default DatasetIcon;
