import Image from "next/image";
import styles from "./FullScreenLoader.module.scss";
function FullScreenLoader() {
  return (
    <div className={styles.container}>
      <Image
        src={"/assets/Images/fullScreenLoader.gif"}
        width={140}
        height={140}
        alt="models"
      />
    </div>
  );
}

export default FullScreenLoader;
