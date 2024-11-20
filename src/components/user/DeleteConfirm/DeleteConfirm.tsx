import styles from "./DeleteConfirm.module.css";
import { type DeleteConfirm } from "@/types/user";

const DeleteConfirm = ({ choiceDelete, deleteProcessing, cancelDelete }: DeleteConfirm) => {
  return (
    <div className={styles.modal}>
      <p className={styles.warning}>本当に退会しますか？</p>
      <p className={styles.message}>
        このアカウントのデータ及び、
        <br />
        プレイリストはすべて削除されます
      </p>
      <div className={styles.buttonContainer}>
        <button
          type="submit"
          className={styles.deleteButton}
          onClick={choiceDelete}
          disabled={deleteProcessing}
        >
          退会する
        </button>
        <button type="button" className={styles.cancelButton} onClick={cancelDelete}>
          キャンセル
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirm;
