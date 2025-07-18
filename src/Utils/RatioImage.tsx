import { RatioImageProp } from "@/Types/CoreComponents";
import { FC, useEffect, useRef } from "react";

const RatioImage: FC<RatioImageProp> = (props) => {
  const bgImg = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = bgImg.current;
    if (image && image.classList.contains("bg-img")) {
      const parentElement = image.parentElement;
      if (parentElement) {
        parentElement.classList.add("bg-size");
        image.style.display = "none";
        parentElement.setAttribute(
          "style",
          `
          background-image: url(${props.src});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: block;
          `
        );
      }
    }
  }, [props.src]);

  return <img ref={bgImg} {...props} alt={props.alt || "image"} />;
};
export default RatioImage;
