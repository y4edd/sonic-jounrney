"use client";

import BreadList from "@/components/top/BreadList/BreadList";
import Button from "@/components/user/Button/Button";
import ButtonStyles from "@/components/user/Button/Button.module.css";
import FormInput from "@/components/user/Form/FormInput";
import Guide from "@/components/user/Guide/Guide";
import Information from "@/components/user/Information/Information";
import { schema } from "@/lib/validation";
import type { FormData } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Router } from "next/router";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import styles from "./page.module.css";

const Login = () => {
  // useStateでサーバーエラー管理
  const [_serverError, _setServerError] = useState<string | null>(null);
  // React hook formでフォーム管理
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (_data: FormData) => {
    // ローカルストレージに遷移前のページを保存。
    // ログイン完了後に元のページに戻るように実装予定
    // router.push("/top");
  };
  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/login", title: "ログイン" },
        ]}
      />
      <div>
        <Information text="ログイン" />
      </div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="メールアドレス"
            id="mailAddress"
            type="email"
            name="mailAddress"
            placeholder="tani@example.com"
            register={register}
            error={errors.mailAddress}
          />
          <FormInput
            label="パスワード"
            id="password"
            type="password"
            name="password"
            placeholder="password"
            register={register}
            error={errors.password}
          />
          <Button type="submit" className={ButtonStyles.register} text={"ログイン"} />
        </form>
      </div>
      <Guide href="/user" message="新規登録はこちら" />
    </>
  );
};

export default Login;
