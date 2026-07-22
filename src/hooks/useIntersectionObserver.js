import { useEffect, useRef, useState } from "react";

/**
 * Custom hook that uses Intersection Observer to detect when an element
 * enters or leaves the viewport. Used primarily to pause/play videos
 * for performance optimization.
 *
 * @param {Object} options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.rootMargin - Root margin for early/late triggering
 * @returns {{ ref: React.RefObject, isVisible: boolean }}
 */
export default function useIntersectionObserver({
  threshold = 0.25,
  rootMargin = "0px",
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}
