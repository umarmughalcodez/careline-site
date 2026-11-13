"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import styles from "./Hero.module.css";

export const FlipWords = ({
  words,
  duration = 2500,
}: {
  words: string[];
  duration?: number;
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating) {
      const t = setTimeout(startAnimation, duration);
      return () => clearTimeout(t);
    }
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence onExitComplete={() => setIsAnimating(false)}>
      <motion.span
        key={currentWord}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        exit={{
          opacity: 0,
          y: -40,
          x: 40,
          filter: "blur(8px)",
          scale: 2,
          position: "absolute",
        }}
        className={styles.flipWord}
      >
        {currentWord.split(" ").map((word, wi) => (
          <motion.span
            key={word + wi}
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: wi * 0.3, duration: 0.3 }}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {word.split("").map((letter, li) => (
              <motion.span
                key={word + li}
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: wi * 0.3 + li * 0.05, duration: 0.2 }}
                style={{ display: "inline-block" }}
              >
                {letter}
              </motion.span>
            ))}
            <span style={{ display: "inline-block" }}>&nbsp;</span>
          </motion.span>
        ))}
      </motion.span>
    </AnimatePresence>
  );
};