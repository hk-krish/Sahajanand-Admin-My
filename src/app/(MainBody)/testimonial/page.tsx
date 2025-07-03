"use client";
import { FunctionComponent, useEffect, useState } from "react";

const Testimonial = () => {
  const [IsClient, setClient] = useState<FunctionComponent>();
  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined") {
        const newClient = (await import("@/Components/Testimonial")).default;
        setClient(() => newClient);
      }
    })();
  }, []);
  return IsClient ? <IsClient /> : "";
};

export default Testimonial;