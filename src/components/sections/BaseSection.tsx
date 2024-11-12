import { Slot, component$ } from "@builder.io/qwik";

interface BaseSectionProps {
  class?: string;
  background?: string;
}

export const BaseSection = component$<BaseSectionProps>(({ background = "bg-base-300", class: className = "" }) => {
  return (
    <section 
      class={`min-h-screen w-full flex items-center justify-center ${background} ${className}`}
    >
      <div class="container mx-auto px-4 py-8 md:py-16 overflow-y-auto">
        <Slot />
      </div>
    </section>
  );
}); 