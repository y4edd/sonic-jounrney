import type { InformationProps } from "@/types/user";
import styles from "./Information.module.css";

const Information: React.FC<InformationProps> = ({ text }) => {
  return <div className={styles.information}>{text}</div>;
};

export default Information;
