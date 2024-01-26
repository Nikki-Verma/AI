"use client";

import SignInForm from "@/components/access/SignInForm/SignInForm";
import InfoBanner from "@/components/InfoBanner";
import { Col, Row } from "antd";
import { useSession } from "next-auth/react";
import React from "react";

import styles from "../access.module.scss";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const App: React.FC = () => {
  const { status } = useSession();

  return (
    <div className={styles.login_container}>
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
          <SignInForm />
        </Col>
      </Row>
    </div>
  );
};

export default App;
