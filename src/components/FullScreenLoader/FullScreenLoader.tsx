import { Spin } from "antd";
import styles from "./FullScreenLoader.module.scss";
function FullScreenLoader() {
  return (
    <div className={styles.container}>
      <Spin spinning />
    </div>
  );
}

export default FullScreenLoader;
