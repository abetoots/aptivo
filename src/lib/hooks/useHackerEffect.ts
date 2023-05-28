import { useEffect, useRef } from "react";

const useHackerEffect = () => {
  const screenRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLElement>(null);

  const intervalRef = useRef<NodeJS.Timer>();

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    if (screenRef.current) {
      screenRef.current.onmouseenter = () => {
        let iteration = 0;

        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
          if (textRef.current) {
            textRef.current.innerText = textRef.current.innerText
              .split("")
              .map((letter, index) => {
                if (index < iteration) {
                  return textRef.current?.dataset.value?.[index];
                }

                return letters[Math.floor(Math.random() * 26)];
              })
              .join("");

            if (
              textRef.current.dataset.value?.length &&
              iteration >= textRef.current.dataset.value?.length
            ) {
              clearInterval(intervalRef.current);
            }

            iteration += 1 / 3;
          }
        }, 20);
      };
    }
  }, [textRef.current, screenRef.current]);

  return { screenRef, textRef };
};

export default useHackerEffect;
