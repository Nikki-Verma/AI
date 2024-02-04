import { Col, Row } from "antd";

import styles from "./InfoBanner.module.scss";

const InfoBanner = () => {
  return (
    <div className={styles.info_container}>
      <div className={styles.info_banner_heading}>
        Join millions worldwide who automate their work using SimplAi
      </div>
      <Row gutter={[10, 30]}>
        <Col
          span={24}
          style={{ display: "flex", flexDirection: "row", gap: "11px" }}
        >
          <img
            src={process.env.NEXT_PUBLIC_BASE_URL + "/assets/Images/check.svg"}
            alt="check-icon"
            style={{ height: "24px", width: "24px" }}
          />
          <Col>
            <div className={styles.info_banner_sub_heading}>
              Save development time
            </div>
            <div className={styles.info_banner_details}>
              Add authentication and user management to your app with just a few
              lines of code
            </div>
          </Col>
        </Col>
        <Col
          span={24}
          style={{ display: "flex", flexDirection: "row", gap: "11px" }}
        >
          <img
            src={process.env.NEXT_PUBLIC_BASE_URL + "/assets/Images/check.svg"}
            alt="check-icon"
            style={{ height: "24px", width: "24px" }}
          />
          <Col>
            <div className={styles.info_banner_sub_heading}>
              Apply AI with Tailored Solutions
            </div>
            <div className={styles.info_banner_details}>
              Add authentication and user management to your app with just a few
              lines of code
            </div>
          </Col>
        </Col>
        <Col
          span={24}
          style={{ display: "flex", flexDirection: "row", gap: "11px" }}
        >
          <img
            src={process.env.NEXT_PUBLIC_BASE_URL + "/assets/Images/check.svg"}
            alt="check-icon"
            style={{ height: "24px", width: "24px" }}
          />
          <Col>
            <div className={styles.info_banner_sub_heading}>
              Increase engagement
            </div>
            <div className={styles.info_banner_details}>
              Add authentication and user management to your app with just a few
              lines of code
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default InfoBanner;
