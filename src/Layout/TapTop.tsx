import { ArrowUp, ArrowUp2 } from "iconsax-react";
import { useEffect, useState } from "react";

const TapTop = () => {
  const [tapTopStyle, setTapTopStyle] = useState("none");

  const executeScroll = () => window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  const handleScroll = () => {
    if (window.scrollY > 0) setTapTopStyle("block");
    else setTapTopStyle("none");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="tap-top" style={{ display: tapTopStyle }}>
      <ArrowUp variant="Broken" onClick={() => executeScroll()} />
    </div>
  );
};

export default TapTop;
