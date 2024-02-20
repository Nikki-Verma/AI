import Icon from "@ant-design/icons";

const TelegramLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
  >
    <path
      d="M17.2648 27.8319L16.537 38.0693C17.5783 38.0693 18.0293 37.6219 18.5702 37.0848L23.4523 32.4189L33.5687 39.8274C35.424 40.8614 36.7312 40.3169 37.2317 38.1206L43.872 7.00526L43.8738 7.00343C44.4623 4.26076 42.882 3.18826 41.0743 3.86109L2.04266 18.8046C-0.621174 19.8386 -0.580841 21.3236 1.58983 21.9964L11.5687 25.1003L34.7475 10.5968C35.8383 9.87443 36.8302 10.2741 36.0143 10.9964L17.2648 27.8319Z"
      fill="#039BE5"
    />
  </svg>
);

const TelegramIcon = ({ ...props }) => {
  return <Icon component={() => <TelegramLogo />} {...props} />;
};

export default TelegramIcon;
