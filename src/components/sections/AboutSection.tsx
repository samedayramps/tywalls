import { component$ } from "@builder.io/qwik";
import { BaseSection } from "./BaseSection";

export const AboutSection = component$(() => {
  return (
    <BaseSection background="bg-base-200">
      <div class="h-full w-full flex flex-col justify-center">
        <h2 class="text-4xl font-bold mb-8">About Me</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div class="space-y-4">
            <p class="text-lg">
              I'm a passionate developer with expertise in modern web technologies.
              I love creating elegant solutions to complex problems.
            </p>
            <div class="flex gap-4 flex-wrap">
              <div class="badge badge-lg">React</div>
              <div class="badge badge-lg">Node.js</div>
              <div class="badge badge-lg">TypeScript</div>
              <div class="badge badge-lg">Qwik</div>
            </div>
          </div>
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h3 class="card-title">Experience Highlights</h3>
              <ul class="list-disc list-inside space-y-2">
                <li>5+ years of web development</li>
                <li>Led multiple successful projects</li>
                <li>Open source contributor</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </BaseSection>
  );
}); 