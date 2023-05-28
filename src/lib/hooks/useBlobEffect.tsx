import { useEffect, useRef } from "react";

const useBlobEffect = (
  blobBackground: string,
  blobBackgroundColor = "white"
) => {
  const blobRef = useRef<HTMLElement>(null);
  const blurRef = useRef<HTMLElement>(null);
  const pointerRef = useRef<HTMLElement>(null);

  const styles = (
    <style type="text/css">
      {`
        @keyframes rotate {
          from {
            rotate: 0deg;
          }

          50% {
            scale: 1 1.5;
          }

          to {
            rotate: 360deg;
          }
        }
      `}
    </style>
  );

  useEffect(() => {
    if (blobRef.current) {
      console.log("hello");
      blobRef.current.style.background = blobBackground;
      blobRef.current.style.height = "34vmax";
      blobRef.current.style.aspectRatio = "1";
      blobRef.current.style.position = "absolute";
      blobRef.current.style.left = "50%";
      blobRef.current.style.top = "50%";
      blobRef.current.style.translate = "-50% -50%";
      blobRef.current.style.borderRadius = "50%";
      blobRef.current.style.backgroundColor = blobBackgroundColor;
      blobRef.current.style.animation = "rotate 20s infinite";
      blobRef.current.style.opacity = "0.5";
      blobRef.current.style.zIndex = "1";
      if (!blurRef.current) {
        blobRef.current.style.filter = "blur(12vmax)";
      }
    }

    if (blurRef.current) {
      blurRef.current.style.height = "100%";
      blurRef.current.style.width = "100%";
      blurRef.current.style.position = "absolute";
      blurRef.current.style.zIndex = "2";
      blurRef.current.style.backdropFilter = "blur(12vmax)";
    }

    if (blobRef.current && pointerRef.current) {
      pointerRef.current.onpointermove = (event) => {
        const { clientX, clientY } = event;

        blobRef.current?.animate(
          {
            left: `${clientX}px`,
            top: `${clientY}px`,
          },
          { duration: 3000, fill: "forwards" }
        );
      };
    }
  }, []);

  return { blobRef, blurRef, pointerRef, styles };
};

export default useBlobEffect;
