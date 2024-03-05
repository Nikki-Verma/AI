import Icon from "@ant-design/icons";

const GGUFLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    role="img"
    width="1em"
    height="1em"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 17 14"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2.668 1.076v1.078H1.5v9.692h1.168v1.078h11.666v-1.078H15.5V2.154h-1.166V1.076Zm.986 1.615h4.307v2.694H6.885V3.77H4.732v4.306h2.153V7H5.809V5.924H7.96v3.23H3.654ZM9.04 4.846h4.309v2.691H12.27V5.924h-2.155v4.306h2.155V9.154h-1.077V8.076h2.155v3.233H9.039Z"
      fill="currentColor"
    ></path>
  </svg>
);

const GGUFIcon = ({ ...props }) => {
  return <Icon component={() => <GGUFLogo />} {...props} />;
};

export default GGUFIcon;
