import { useRouter } from "next/router";
import React from "react";
import useAuthentication from "../../components/useAuth";

const index = () => {
  const router = useRouter();
  const { auth } = useAuthentication();
  const r = {
    login: "/post/auth/login",
    create: "/post/create",
  };
  if (auth) {
    router.isReady && router.push(r.create);
  } else {
    router.isReady && router.push(r.login);
  }
  return <div>loading</div>;
};
export default index;
