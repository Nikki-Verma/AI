import SignUpForm from "@/components/access/SignUpForm/SignUpForm";
import InfoBanner from "@/components/InfoBanner";
import { Col, Row } from "antd";

import styles from "../access.module.scss";

const SignUp = () => {
  return (
    <div className={styles.sign_up_container}>
      <Row
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
          padding: "0px 30px",
        }}
      >
        <Col
          xl={12}
          lg={12}
          md={12}
          sm={24}
          xs={24}
          style={{
            display: "flex",
            padding: "30px",
            textAlign: "left",
            flexDirection: "column",
            margin: "auto",
          }}
        >
          <InfoBanner />
        </Col>
        <Col
          xl={12}
          lg={12}
          md={12}
          sm={24}
          xs={24}
          style={{
            display: "flex",
            padding: "30px",
            textAlign: "left",
            flexDirection: "column",
            margin: "auto",
          }}
        >
          <SignUpForm />
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
