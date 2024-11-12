import { component$ } from "@builder.io/qwik";
import { BaseSection } from "./BaseSection";
import { pushToDataLayer } from "~/constants/gtm";

export const HeroSection = component$(() => {
  return (
    <BaseSection background="bg-base-300">
      <div class="hero min-h-[calc(100vh-4rem)]">
        <div class="hero-content text-center">
          <div class="max-w-md">
            <h1 class="text-5xl font-bold mb-8">Hello, I'm [Your Name]</h1>
            <p class="text-xl mb-8">Full Stack Developer</p>
            <button 
              class="btn btn-primary"
              onClick$={() => {
                pushToDataLayer({
                  event: 'buttonClick',
                  buttonName: 'viewWork',
                  section: 'hero'
                });
              }}
            >
              View My Work
            </button>
          </div>
        </div>
      </div>
    </BaseSection>
  );
}); 