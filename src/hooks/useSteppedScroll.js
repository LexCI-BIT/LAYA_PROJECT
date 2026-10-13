import { useCallback, useEffect, useRef, useState } from 'react';

const WHEEL_THRESHOLD = 30;
const SWIPE_THRESHOLD = 40;

// Turns wheel / swipe / arrow-key input into discrete steps 0..last while the hero sits at the top of the page.
// One step past `last` scrolls the page to the section after the hero. Once the visitor has left the finished hero,
// it stays finished and scrolls like a normal section until the page is reloaded or the hero is mounted again.
// `lockMs` covers the step animation plus trackpad inertia.
const useSteppedScroll = (last, lockMs) => {
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [stage, setStage] = useState(reduced ? last : 0);
  const stageRef = useRef(stage);
  const busyRef = useRef(false);
  const finishedRef = useRef(false);
  const sectionRef = useRef(null);

  const goTo = useCallback((target) => {
    if (busyRef.current || target < 0) return;
    if (target > last) {
      busyRef.current = true;
      const navbar = document.querySelector('.navbar');
      const offset = navbar && getComputedStyle(navbar).position === 'fixed' ? navbar.offsetHeight : 0;
      const top = sectionRef.current.getBoundingClientRect().bottom + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      setTimeout(() => { busyRef.current = false; }, lockMs);
      return;
    }
    if (target === stageRef.current) return;
    busyRef.current = true;
    stageRef.current = target;
    setStage(target);
    setTimeout(() => { busyRef.current = false; }, lockMs);
  }, [last, lockMs]);

  useEffect(() => {
    if (reduced) return;

    // Steps only take over scrolling while the hero is at the very top of the page.
    const shouldCapture = (dir) => !finishedRef.current && window.scrollY <= 2 && (dir > 0 || stageRef.current > 0);

    const onScroll = () => {
      if (stageRef.current === last && window.scrollY > 2) finishedRef.current = true;
    };

    let wheelDelta = 0;
    const onWheel = (e) => {
      const dir = Math.sign(e.deltaY);
      if (!dir || !shouldCapture(dir)) {
        wheelDelta = 0;
        return;
      }
      e.preventDefault();
      if (busyRef.current) return;
      wheelDelta += e.deltaY;
      if (Math.abs(wheelDelta) >= WHEEL_THRESHOLD) {
        wheelDelta = 0;
        goTo(stageRef.current + dir);
      }
    };

    let touchStartY = null;
    const onTouchStart = (e) => { touchStartY = e.touches[0].clientY; };
    const onTouchMove = (e) => {
      if (touchStartY === null) return;
      const dir = Math.sign(touchStartY - e.touches[0].clientY);
      if (dir && shouldCapture(dir)) e.preventDefault();
    };
    const onTouchEnd = (e) => {
      if (touchStartY === null) return;
      const dy = touchStartY - e.changedTouches[0].clientY;
      touchStartY = null;
      const dir = Math.sign(dy);
      if (Math.abs(dy) >= SWIPE_THRESHOLD && shouldCapture(dir)) goTo(stageRef.current + dir);
    };

    const onKey = (e) => {
      if (e.target.closest('input, textarea, select, [contenteditable]')) return;
      const dir = ['ArrowDown', 'PageDown', ' '].includes(e.key) ? 1
        : ['ArrowUp', 'PageUp'].includes(e.key) ? -1 : 0;
      if (!dir || !shouldCapture(dir)) return;
      e.preventDefault();
      goTo(stageRef.current + dir);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKey);
    };
  }, [goTo, last, reduced]);

  return { stage, sectionRef };
};

export default useSteppedScroll;
