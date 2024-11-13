import { Slot, component$, type PropFunction } from "@builder.io/qwik";
import type { ClassList } from '@builder.io/qwik';

interface BaseSectionProps {
  class?: ClassList;
  background?: string;
  onClick$?: PropFunction<() => void>;
}

export const BaseSection = component$<BaseSectionProps>(({ 
  background = "bg-base-300", 
  class: className = "",
  onClick$
}) => {
  return (
    <section 
      class={`h-screen w-full relative ${background} ${className}`}
      onClick$={onClick$}
    >
      <Slot />
    </section>
  );
}); 