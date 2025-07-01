"use client";
import { useRouter } from "next/navigation";
import { FunctionComponent, useEffect, useState } from "react";

const Login = () => {
  const [IsClient, setClient] = useState<FunctionComponent>();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined") {
        const newClient = (await import("@/Components/Auth/Login")).default;
        setClient(() => newClient);
      }
    })();
  }, []);
  return IsClient ? <IsClient /> : "";
};

export default Login;
