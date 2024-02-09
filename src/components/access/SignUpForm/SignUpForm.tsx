"use client";

import { PRIMARY_BRAND_COLOR } from "@/_utils/theme.antd";
import { Button, Checkbox, Col, Form, Input, Row, Space } from "antd";
import useToken from "antd/es/theme/useToken";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import uiStyles from "../../UIComponents/ui.module.scss";
import styles from "../access.module.scss";

const SignUpForm = () => {
  const router = useRouter();
  const [theme, token] = useToken();
  const [signUpForm] = Form.useForm();
  const [resetForm] = Form.useForm();

  return (
    <div className={styles.sign_up_container}>
      <Form
        name="SignUp"
        layout="vertical"
        form={signUpForm}
        style={{ width: "100%" }}
      >
        <div
          className={styles.main_heading}
          style={{ color: token.colorPrimary }}
        >
          SimplAi
        </div>
        <div className={styles.form_heading}>Create your account</div>
        <Row gutter={[20, 0]} style={{ display: "flex" }}>
          <Col span={24}>
            <Form.Item
              name="email"
              label="Work email address"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please Enter Valid email",
                },
              ]}
            >
              <Input placeholder="Enter work email address" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Password is required",
                },
              ]}
            >
              <Input placeholder="Enter password" />
            </Form.Item>
          </Col>
          <Col
            span={24}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: "8px",
            }}
          >
            <Checkbox></Checkbox>
            <div className={styles.checkbox_label}>
              I agree to SimplAi's{" "}
              <a style={{ color: "#602EDF", cursor: "pointer" }}>
                terms and conditions
              </a>{" "}
              and consent to{" "}
              <a style={{ color: PRIMARY_BRAND_COLOR, cursor: "pointer" }}>
                data privacy policy
              </a>
              .
            </div>
          </Col>
        </Row>
        <Button
          type="primary"
          style={{ width: "100%", margin: "28px 0px" }}
          onClick={signUpForm.submit}
        >
          Create Account
        </Button>
        <Button type="default" style={{ width: "100%", marginBottom: "16px" }}>
          <Space align="center">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={"/assets/Images/googleIcon.svg"}
                alt="check-icon"
                width={14}
                height={14}
              />
            </div>
            Continue with Google
          </Space>
        </Button>

        <div className={uiStyles.form_footer}>
          {`Already have an account? `}
          <Link href={"/login"} className={uiStyles.form_footer_action}>
            Sign in
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default SignUpForm;
