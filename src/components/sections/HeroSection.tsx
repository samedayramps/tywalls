import { component$ } from "@builder.io/qwik";
import { BaseSection } from "./BaseSection";
import ImgTyWallsCoffee from '~/media/ty-walls-coffee.webp?jsx';

export const HeroSection = component$(() => {
  return (
    <BaseSection background="bg-base-300" class="overflow-hidden p-0">
      <div class="absolute inset-0 m-0 p-0">
        {/* Text container - at top */}
        <div class="absolute top-[25vh] left-1/2 -translate-x-1/2 z-10">
          <h1 class="text-5xl font-bold">Hi, I'm Ty.</h1>
        </div>

        {/* Image container - at bottom */}
        <div class="absolute inset-0 m-0 p-0">
          <ImgTyWallsCoffee
            alt="Ty Walls with coffee"
            style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              width: 'auto',
              height: 'auto',
              maxHeight: '100vh',
              objectFit: 'contain',
              opacity: '0.9',
              pointerEvents: 'none',
              margin: '0',
              padding: '0'
            }}
          />
        </div>
      </div>
    </BaseSection>
  );
}); 