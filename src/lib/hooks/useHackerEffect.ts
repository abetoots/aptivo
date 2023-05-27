import { useRef } from "react";

const useHackerEffect = () => {
  const screenRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLElement>(null);

  let interval: NodeJS.Timer;

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  if (screenRef.current) {
    screenRef.current.onmouseenter = (event) => {
      let iteration = 0;

      clearInterval(interval);

      interval = setInterval(() => {
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
            clearInterval(interval);
          }

          iteration += 1 / 3;
        }
      }, 20);
    };
  }

  return { screenRef, textRef };
};

export default useHackerEffect;
