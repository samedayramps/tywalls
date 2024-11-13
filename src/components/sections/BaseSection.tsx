import { Slot, component$ } from "@builder.io/qwik";

interface BaseSectionProps {
  class?: string;
  background?: string;
}

export const BaseSection = component$<BaseSectionProps>(({ background = "bg-base-300", class: className = "" }) => {
  return (
    <section 
      class={`h-screen w-full relative ${background} ${className}`}
    >
      <Slot />
    </section>
  );
}); 