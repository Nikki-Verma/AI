import Icon from "@ant-design/icons";

const WhatsappLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
  >
    <path
      d="M22 44C34.1503 44 44 34.1503 44 22C44 9.84974 34.1503 0 22 0C9.84974 0 0 9.84974 0 22C0 34.1503 9.84974 44 22 44Z"
      fill="#29A71A"
    />
    <path
      d="M31.7003 12.3007C29.4114 9.98891 26.3717 8.57118 23.1295 8.30322C19.8874 8.03525 16.6562 8.93468 14.0188 10.8393C11.3814 12.7439 9.51141 15.5282 8.74614 18.6901C7.98086 21.852 8.37068 25.1834 9.84527 28.0832L8.39777 35.1107C8.38276 35.1806 8.38233 35.2529 8.39653 35.323C8.41072 35.3931 8.43923 35.4596 8.48027 35.5182C8.5404 35.6071 8.62622 35.6756 8.72629 35.7144C8.82635 35.7533 8.93589 35.7607 9.04027 35.7357L15.9278 34.1032C18.8194 35.5404 22.1272 35.9052 25.2626 35.1325C28.3979 34.3598 31.1575 32.4999 33.0502 29.8836C34.9429 27.2673 35.846 24.0643 35.5988 20.8446C35.3516 17.625 33.9702 14.5974 31.7003 12.3007ZM29.5528 29.4407C27.9691 31.0199 25.9298 32.0624 23.7222 32.4212C21.5146 32.78 19.2501 32.437 17.2478 31.4407L16.2878 30.9657L12.0653 31.9657L12.0778 31.9132L12.9528 27.6632L12.4828 26.7357C11.4597 24.7263 11.0988 22.4448 11.4517 20.2178C11.8047 17.9908 12.8535 15.9326 14.4478 14.3382C16.451 12.3355 19.1677 11.2105 22.0003 11.2105C24.8329 11.2105 27.5495 12.3355 29.5528 14.3382C29.5698 14.3577 29.5882 14.3761 29.6078 14.3932C31.5862 16.401 32.6907 19.1095 32.6804 21.9282C32.6701 24.747 31.5458 27.4474 29.5528 29.4407Z"
      fill="white"
    />
    <path
      d="M29.1781 26.3231C28.6606 27.1381 27.8431 28.1356 26.8156 28.3831C25.0156 28.8181 22.2531 28.3981 18.8156 25.1931L18.7731 25.1556C15.7506 22.3531 14.9656 20.0206 15.1556 18.1706C15.2606 17.1206 16.1356 16.1706 16.8731 15.5506C16.9897 15.4511 17.128 15.3802 17.2768 15.3437C17.4257 15.3072 17.5811 15.306 17.7305 15.3403C17.8799 15.3745 18.0192 15.4433 18.1373 15.541C18.2554 15.6387 18.349 15.7627 18.4106 15.9031L19.5231 18.4031C19.5954 18.5652 19.6222 18.7439 19.6006 18.9201C19.579 19.0963 19.5099 19.2633 19.4006 19.4031L18.8381 20.1331C18.7174 20.2838 18.6446 20.4672 18.629 20.6597C18.6134 20.8522 18.6557 21.0449 18.7506 21.2131C19.0656 21.7656 19.8206 22.5781 20.6581 23.3306C21.5981 24.1806 22.6406 24.9581 23.3006 25.2231C23.4772 25.2953 23.6714 25.3129 23.8581 25.2737C24.0448 25.2344 24.2155 25.1402 24.3481 25.0031L25.0006 24.3456C25.1265 24.2215 25.2831 24.1329 25.4544 24.089C25.6256 24.0451 25.8055 24.0474 25.9756 24.0956L28.6181 24.8456C28.7639 24.8903 28.8975 24.9678 29.0087 25.0721C29.12 25.1763 29.2059 25.3046 29.2599 25.4472C29.314 25.5898 29.3347 25.7428 29.3205 25.8946C29.3063 26.0465 29.2576 26.193 29.1781 26.3231Z"
      fill="white"
    />
  </svg>
);

const WhatsappIcon = ({ ...props }) => {
  return <Icon component={() => <WhatsappLogo />} {...props} />;
};

export default WhatsappIcon;
