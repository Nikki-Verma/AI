import { Col, Row } from "antd";
import Image from "next/image";

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
          <Image
            src={"/assets/Images/check.svg"}
            height={24}
            width={24}
            alt="check-icon"
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
          <Image
            src={"/assets/Images/check.svg"}
            alt="check-icon"
            height={24}
            width={24}
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
          <Image
            src={"/assets/Images/check.svg"}
            alt="check-icon"
            height={24}
            width={24}
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
