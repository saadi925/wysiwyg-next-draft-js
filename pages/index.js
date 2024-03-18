import { useRouter } from "next/router";
import React from "react";

const index = () => {
  const router = useRouter();

  const r = {
    login: "auth/login",
    create: "create/",
  };
  return (
    <div>
      <p
        style={{ cursor: "pointer", color: "blue", fontSize: "32px" }}
        onClick={() => {
          router.isReady && router.push(r.login);
        }}
      >
        login : {r.login}
      </p>
      <p
        style={{ cursor: "pointer", color: "blue", fontSize: "32px" }}
        onClick={() => {
          router.isReady && router.push(r.create);
        }}
      >
        create : {r.create}
      </p>
    </div>
  );
};
export default index;
