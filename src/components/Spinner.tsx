import { MutatingDots } from "react-loader-spinner";
import styles from "../styles/connected.module.css";

export const Spinner = () => (
  <div className={styles.spinner}>
    <MutatingDots
      visible={true}
      height="100"
      width="100"
      color="#7041DE"
      secondaryColor="#B84383"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  </div>
);
