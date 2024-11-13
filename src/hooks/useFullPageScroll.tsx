import { $, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik";

interface UseFullPageScrollProps {
  sectionCount: number;
  transitionDuration: number;
  isMobileMenuOpen: Signal<boolean>;
}

export const useFullPageScroll = ({
  sectionCount,
  transitionDuration,
  isMobileMenuOpen
}: UseFullPageScrollProps) => {
  const currentSection = useSignal(0);
  const isScrolling = useSignal(false);
  const scrollDelta = useSignal(0);
  const accumulatedDelta = useSignal(0);
  const lastScrollTime = useSignal(Date.now());
  const lastTouchY = useSignal(0);
  const touchStartTime = useSignal(0);

  // Constants
  const SCROLL_THRESHOLD = {
    DESKTOP: 200,
    MOBILE: 100
  };
  const VELOCITY_THRESHOLD = 400;
  const SWIPE_THRESHOLD = 0.5;

  // Shared scroll logic
  const handleScroll = $((direction: 1 | -1) => {
    if (isScrolling.value || isMobileMenuOpen.value) return;

    isScrolling.value = true;
    const newSection = currentSection.value + direction;

    if (newSection >= 0 && newSection < sectionCount) {
      currentSection.value = newSection;
    }

    setTimeout(() => {
      isScrolling.value = false;
    }, transitionDuration);
  });

  const getThreshold = $(() => {
    if (typeof window === 'undefined') return SCROLL_THRESHOLD.DESKTOP;
    return window.innerWidth <= 768 ? SCROLL_THRESHOLD.MOBILE : SCROLL_THRESHOLD.DESKTOP;
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    // Wheel handler
    const handleWheel = async (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.value || isMobileMenuOpen.value) return;

      const currentTime = Date.now();
      const timeDelta = currentTime - lastScrollTime.value;
      
      if (timeDelta > 200) {
        accumulatedDelta.value = 0;
      }
      
      accumulatedDelta.value += Math.abs(e.deltaY);
      lastScrollTime.value = currentTime;
      scrollDelta.value += e.deltaY;

      const threshold = await getThreshold();
      if (accumulatedDelta.value >= threshold) {
        handleScroll(scrollDelta.value > 0 ? 1 : -1);
        scrollDelta.value = 0;
        accumulatedDelta.value = 0;
      }
    };

    // Touch handlers
    const handleTouchStart = (e: TouchEvent) => {
      lastTouchY.value = e.touches[0].clientY;
      touchStartTime.value = Date.now();
      scrollDelta.value = 0;
      accumulatedDelta.value = 0;
    };

    const handleTouchMove = async (e: TouchEvent) => {
      if (isScrolling.value || isMobileMenuOpen.value) return;
      
      const touchDelta = lastTouchY.value - e.touches[0].clientY;
      const timeDelta = (Date.now() - touchStartTime.value) / 1000;
      accumulatedDelta.value += Math.abs(touchDelta);

      const threshold = await getThreshold();

      if (timeDelta > 0) {
        const velocity = Math.abs(touchDelta / timeDelta);
        const isQuickSwipe = timeDelta < SWIPE_THRESHOLD && velocity > VELOCITY_THRESHOLD;

        if (isQuickSwipe && accumulatedDelta.value >= threshold / 2) {
          handleScroll(touchDelta > 0 ? 1 : -1);
          return;
        }
      }

      if (accumulatedDelta.value >= threshold) {
        handleScroll(touchDelta > 0 ? 1 : -1);
        accumulatedDelta.value = 0;
      }
    };

    // Keyboard handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        handleScroll(1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        handleScroll(-1);
      }
    };

    // Orientation change handler
    const handleOrientationChange = () => {
      isScrolling.value = false;
      scrollDelta.value = 0;
    };

    // Add event listeners
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('orientationchange', handleOrientationChange);

    // Cleanup
    cleanup(() => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('orientationchange', handleOrientationChange);
    });
  });

  return {
    currentSection,
    isScrolling
  };
}; 