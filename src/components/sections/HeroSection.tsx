import { component$ } from "@builder.io/qwik";
import { BaseSection } from "./BaseSection";

export const HeroSection = component$(() => {
  return (
    <BaseSection background="bg-base-300" class="overflow-hidden">
      <div class="absolute inset-0">
        <img 
          src="/ty-walls-coffee.webp"
          alt="Ty Walls with coffee"
          width={500}
          height={889}
          loading="eager"
          decoding="async"
          class="absolute bottom-0 right-0 h-auto max-h-screen w-auto object-contain opacity-90 pointer-events-none"
        />
        
        <div class="relative h-full flex items-start justify-center pt-[25vh]">
          <div class="text-center">
            <h1 class="text-5xl font-bold">Hello, I'm Ty Walls</h1>
          </div>
        </div>
      </div>
    </BaseSection>
  );
}); 