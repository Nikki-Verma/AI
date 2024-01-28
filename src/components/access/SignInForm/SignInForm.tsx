// "use client";

import { getErrorFromApi } from "@/utils/helperFunction";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, notification, Row, Space } from "antd";
import useToken from "antd/es/theme/useToken";
import { signIn, useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import uiStyles from "../../UIComponents/ui.module.scss";
import styles from "../access.module.scss";
const { Item } = Form;

const SignInForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [passwordSent, setPasswordSent] = useState(false);
  const [signInForm] = Form.useForm();
  const [resetForm] = Form.useForm();
  const [theme, token] = useToken();
  const { status, data } = useSession();
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const response = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      if (response?.error) {
        notification.error({
          message: "Error while signin",
          description: response?.error,
        });
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      notification.error({
        message: "Error while signin",
        description: getErrorFromApi(error),
      });
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {};

  return (
    <div className={styles.signin_container}>
      {!showResetPassword ? (
        <Form
          name="SignIn"
          layout="vertical"
          form={signInForm}
          onFinishFailed={onFinishFailed}
          style={{ width: "100%" }}
          onFinish={onFinish}
        >
          <div
            className={styles.main_heading}
            style={{ color: token.colorPrimary }}
          >
            Thetechia.ai
          </div>
          <div className={styles.form_heading}>Sign in to your account</div>
          <Row gutter={[20, 0]}>
            <Col span={24}>
              <Item
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
              </Item>
            </Col>
            <Col span={24}>
              <Item
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
              </Item>
            </Col>
          </Row>
          <div
            className={styles.forgot_password_container}
            onClick={() => {
              setShowResetPassword(true);
            }}
          >
            Forgot your password?
          </div>
          <Item noStyle>
            <Button
              type="primary"
              style={{ width: "100%", margin: "28px 0px" }}
              htmlType="submit"
              loading={loading}
            >
              Log in
            </Button>
          </Item>

          <Button
            type="default"
            style={{ width: "100%", marginBottom: "16px" }}
          >
            <Space align="center">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={
                    process.env.NEXT_PUBLIC_BASE_URL +
                    "/assets/Images/googleIcon.svg"
                  }
                  alt="google"
                  width={14}
                  height={14}
                />
              </div>
              Continue with Google
            </Space>
          </Button>

          <div className={uiStyles.form_footer}>
            {`Don't have an account? `}
            <Link href={"/register"} className={uiStyles.form_footer_action}>
              Sign up
            </Link>
          </div>
        </Form>
      ) : (
        <Form
          name="SignUp"
          layout="vertical"
          form={resetForm}
          style={{ width: "100%" }}
        >
          <div
            className={styles.main_heading}
            style={{ color: token.colorPrimary }}
          >
            Thetechia.ai
          </div>
          {!passwordSent ? (
            <>
              <div
                className={styles.back}
                onClick={() => {
                  setShowResetPassword(false);
                }}
                style={{ marginTop: "20px" }}
              >
                <ArrowLeftOutlined /> Back to sign in
              </div>
              <div
                className={styles.form_heading}
                style={{ paddingTop: "16px", paddingBottom: "6px" }}
              >
                Reset your password
              </div>
              <div
                className={styles.form_details}
                style={{ marginBottom: "16px" }}
              >
                Enter the email address associated with your account, and we'll
                send you a link to reset your password.
              </div>
              <Row gutter={[20, 20]} style={{ display: "flex" }}>
                <Col span={24}>
                  <Item
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
                  </Item>
                </Col>
              </Row>
              <Button
                type="primary"
                onClick={() => {
                  setPasswordSent(true);
                }}
                style={{ width: "100%", margin: "28px 0px" }}
              >
                Continue
              </Button>
            </>
          ) : (
            <>
              <img
                src={
                  process.env.NEXT_PUBLIC_BASE_URL +
                  "/assets/Images/mailSent.svg"
                }
                alt="check-icon"
                style={{ width: "50%" }}
              />
              <div
                className={styles.form_heading}
                style={{
                  paddingTop: "16px",
                  paddingBottom: "6px",
                  width: "70%",
                  marginBottom: "24px",
                }}
              >
                Thanks, check your email for instructions to reset your password
              </div>
              <div className={styles.resend_details} style={{ width: "70%" }}>
                If you haven't received an email in 5 minutes, check your spam
                or{" "}
                <span style={{ color: "#602EDF", cursor: "pointer" }}>
                  retry.
                </span>
              </div>
            </>
          )}
        </Form>
      )}
    </div>
  );
};

export default SignInForm;
