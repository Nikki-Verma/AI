import { Col, Row } from "antd";
import Image from "next/image";

import styles from "./InfoBanner.module.scss";

const InfoBanner = () => {
  return (
    <div className={styles.info_container}>
      <div className={styles.info_banner_heading}>
        Unlock Your Enterprise's Potential with SimplAI's GenAI Solutions Today!
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
              Seamless Integration
            </div>
            <div className={styles.info_banner_details}>
              Easily connect with existing systems using our platform to enhance
              efficiency and innovation in your workflows.
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
              Diverse AI Models
            </div>
            <div className={styles.info_banner_details}>
              Access a wide range of GenAI models, from LLMs to RAGs, tailored
              for diverse enterprise applications.
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
              Rapid Deployment
            </div>
            <div className={styles.info_banner_details}>
              Deploy cutting-edge AI applications swiftly, transforming business
              processes with minimal effort and high scalability.
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default InfoBanner;
