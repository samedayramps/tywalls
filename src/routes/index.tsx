import { component$, useSignal, useComputed$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { HeroSection } from "~/components/sections/HeroSection";
import { AboutSection } from "~/components/sections/AboutSection";
import { VideoSection } from "~/components/sections/VideoSection";
import { PhotoSection } from "~/components/sections/PhotoSection";
import { PageIndicator } from "~/components/navigation/PageIndicator";
import { useFullPageScroll } from "~/hooks/useFullPageScroll";

const SECTIONS = ['Home', 'About', 'Projects', 'Contact'] as const;
const TRANSITION_DURATION = 1000;

export default component$(() => {
  const isMobileMenuOpen = useSignal(false);
  
  const { currentSection } = useFullPageScroll({
    sectionCount: SECTIONS.length,
    transitionDuration: TRANSITION_DURATION,
    isMobileMenuOpen
  });

  const transformStyle = useComputed$(() => ({
    transform: `translateY(-${currentSection.value * 100}vh)`
  }));

  return (
    <div class="h-screen w-screen overflow-hidden">
      <PageIndicator current={currentSection.value} total={SECTIONS.length} />

      <div 
        class="transition-transform duration-700 ease-in-out will-change-transform"
        style={transformStyle.value}
      >
        {[
          { id: 'home', Component: HeroSection },
          { id: 'about', Component: AboutSection },
          { id: 'projects', Component: VideoSection },
          { id: 'contact', Component: PhotoSection }
        ].map(({ id, Component }) => (
          <div key={id} class="h-screen">
            <Component />
          </div>
        ))}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Portfolio - Ty Walls",
  meta: [
    {
      name: "description",
      content: "Personal portfolio showcasing my work and skills",
    },
  ],
};
