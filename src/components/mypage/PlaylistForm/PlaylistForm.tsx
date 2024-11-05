"use client";

import { playlistTitleSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import type { z } from "zod";
import styles from "./PlaylistForm.module.css";

type PlayListFormData = z.infer<typeof playlistTitleSchema>;

const PlaylistForm = ({ user_id }: { user_id: string }) => {
  // NOTE: React Hook Formのフック
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlayListFormData>({
    resolver: zodResolver(playlistTitleSchema),
  });
  const router = useRouter();
  const [formData, setFormData] = useState<PlayListFormData | null>(null);

  const onSubmit: SubmitHandler<PlayListFormData> = (
    data: PlayListFormData
  ) => {
    setFormData(data);
  };
  useEffect(() => {
    const createPlaylist = async () => {
      if (!formData) return;

      try {
        const res = await fetch("http://localhost:3000/api/createPlaylist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.playlistTitle,
            user_id: user_id,
          }),
          cache: "no-cache",
        });

        if (res.status === 409) {
          alert("同名のプレイリストが既に作成されています");
        } else if (!res.ok) {
          throw new Error("データが見つかりませんでした");
        } else {
          alert("プレイリストが新規作成されました");
          router.back();
        }
      } catch (error) {
        console.error(error);
      }
    };

    createPlaylist();
  }, [formData]);

  const onDismiss = () => {
    router.back();
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend className={styles.formTitle}>プレイリスト作成</legend>
          <div className={styles.formInput}>
            <label htmlFor="playlistTitle">タイトル</label>
            <input
              type="text"
              id="playlistTitle"
              placeholder="マイプレイリスト"
              {...register("playlistTitle")}
            />
            <div className={styles.errorMessage}>
              {errors.playlistTitle?.message && (
                <span>{errors.playlistTitle.message}</span>
              )}
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button
              type="button"
              onClick={onDismiss}
              className={styles.cancelButton}
            >
              キャンセル
            </button>
            <button type="submit" className={styles.createButton}>
              作成
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default PlaylistForm;
