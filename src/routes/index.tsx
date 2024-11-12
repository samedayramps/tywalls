import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { HeroSection } from "~/components/sections/HeroSection";
import { AboutSection } from "~/components/sections/AboutSection";
import { VideoSection } from "~/components/sections/VideoSection";
import { PhotoSection } from "~/components/sections/PhotoSection";
// Import other sections...

export default component$(() => {
  const currentSection = useSignal(0);
  const isScrolling = useSignal(false);
  const scrollDelta = useSignal(0);
  const isMobileMenuOpen = useSignal(false);
  
  // Constants for scroll behavior
  const SCROLL_THRESHOLD = {
    DESKTOP: 100,
    MOBILE: 50  // Lower threshold for mobile for better responsiveness
  };
  const TRANSITION_DURATION = 700; // Slightly faster for mobile
  const SECTIONS = ['Home', 'About', 'Projects', 'Contact'];

  // Handle scroll events
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    let lastTouchY = 0;
    let touchStartTime = 0;
    const SWIPE_THRESHOLD = 0.3; // seconds

    const getIsMobile = () => window.innerWidth <= 768;
    const threshold = () => getIsMobile() ? SCROLL_THRESHOLD.MOBILE : SCROLL_THRESHOLD.DESKTOP;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.value || isMobileMenuOpen.value) return;

      scrollDelta.value += e.deltaY;

      if (Math.abs(scrollDelta.value) >= threshold()) {
        isScrolling.value = true;
        
        if (scrollDelta.value > 0 && currentSection.value < SECTIONS.length - 1) {
          currentSection.value++;
        } else if (scrollDelta.value < 0 && currentSection.value > 0) {
          currentSection.value--;
        }

        scrollDelta.value = 0;

        setTimeout(() => {
          isScrolling.value = false;
        }, TRANSITION_DURATION);
      } else {
        // Reset delta after a shorter delay on mobile
        setTimeout(() => {
          scrollDelta.value = 0;
        }, getIsMobile() ? 100 : 150);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0].clientY;
      touchStartTime = Date.now();
      scrollDelta.value = 0; // Reset delta on new touch
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isScrolling.value || isMobileMenuOpen.value) return;
      
      const touchDelta = lastTouchY - e.touches[0].clientY;
      const timeDelta = (Date.now() - touchStartTime) / 1000; // Convert to seconds

      // Add velocity-based scrolling
      if (timeDelta > 0) {
        const velocity = Math.abs(touchDelta / timeDelta);
        const isQuickSwipe = timeDelta < SWIPE_THRESHOLD && velocity > 200;

        if (isQuickSwipe) {
          isScrolling.value = true;
          
          if (touchDelta > 0 && currentSection.value < SECTIONS.length - 1) {
            currentSection.value++;
          } else if (touchDelta < 0 && currentSection.value > 0) {
            currentSection.value--;
          }

          setTimeout(() => {
            isScrolling.value = false;
          }, TRANSITION_DURATION);
          
          return;
        }
      }

      scrollDelta.value = touchDelta;

      if (Math.abs(scrollDelta.value) >= threshold()) {
        isScrolling.value = true;
        
        if (scrollDelta.value > 0 && currentSection.value < SECTIONS.length - 1) {
          currentSection.value++;
        } else if (scrollDelta.value < 0 && currentSection.value > 0) {
          currentSection.value--;
        }

        scrollDelta.value = 0;
        
        setTimeout(() => {
          isScrolling.value = false;
        }, TRANSITION_DURATION);
      }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling.value || isMobileMenuOpen.value) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (currentSection.value < SECTIONS.length - 1) {
          isScrolling.value = true;
          currentSection.value++;
          setTimeout(() => {
            isScrolling.value = false;
          }, TRANSITION_DURATION);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (currentSection.value > 0) {
          isScrolling.value = true;
          currentSection.value--;
          setTimeout(() => {
            isScrolling.value = false;
          }, TRANSITION_DURATION);
        }
      }
    };

    // Add event listeners
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('keydown', handleKeyDown);

    // Handle orientation change
    window.addEventListener('orientationchange', () => {
      // Reset scrolling state on orientation change
      isScrolling.value = false;
      scrollDelta.value = 0;
    });

    // Cleanup
    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('orientationchange', () => {});
    };
  });

  return (
    <div class="h-screen overflow-hidden touch-none">
      {/* Progress indicator */}
      <div class="fixed top-4 left-1/2 -translate-x-1/2 z-50 md:hidden">
        <div class="bg-base-200/80 backdrop-blur-sm rounded-full px-4 py-2">
          <span class="text-sm font-medium">
            {currentSection.value + 1} / {SECTIONS.length}
          </span>
        </div>
      </div>

      <div 
        class="transition-transform duration-700 ease-in-out will-change-transform"
        style={{ transform: `translateY(-${currentSection.value * 100}vh)` }}
      >
        <HeroSection />
        <AboutSection />
        <VideoSection />
        <PhotoSection />
        {/* Add other sections */}
      </div>

      {/* Navigation dots and mobile indicator remain the same */}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Portfolio - [Your Name]",
  meta: [
    {
      name: "description",
      content: "Personal portfolio showcasing my work and skills",
    },
  ],
};
