import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { BaseSection } from "./BaseSection";
import { getOptimizedImageUrl } from "~/constants/cdn";

interface PhotoItem {
  id: number;
  src: string;
  alt: string;
  gridArea: string;
}

const PHOTOS: PhotoItem[] = [
  {
    id: 1,
    src: getOptimizedImageUrl('photo1.jpg', 800, 600),
    alt: "Project 1",
    gridArea: "1 / 1 / 3 / 3"
  },
  {
    id: 2,
    src: getOptimizedImageUrl('photo2.jpg', 800, 600),
    alt: "Project 2",
    gridArea: "1 / 3 / 2 / 4"
  },
  {
    id: 3,
    src: getOptimizedImageUrl('photo3.jpg', 800, 600),
    alt: "Project 3",
    gridArea: "2 / 3 / 3 / 4"
  },
  {
    id: 4,
    src: getOptimizedImageUrl('photo4.jpg', 800, 600),
    alt: "Project 4",
    gridArea: "3 / 1 / 4 / 2"
  },
  {
    id: 5,
    src: getOptimizedImageUrl('photo5.jpg', 800, 600),
    alt: "Project 5",
    gridArea: "3 / 2 / 4 / 4"
  }
];

export const PhotoSection = component$(() => {
  const containerRef = useSignal<Element>();
  const isVisible = useSignal(false);

  // Detect when section comes into view
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          isVisible.value = true;
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.value) {
      observer.observe(containerRef.value);
    }

    return () => observer.disconnect();
  });

  return (
    <BaseSection background="bg-base-200">
      <div class="flex flex-col h-full" ref={containerRef}>
        <h2 class="text-4xl font-bold mb-8">Photo Gallery</h2>
        
        <div class="grid grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[300px] w-full max-w-6xl mx-auto p-4">
          {PHOTOS.map((photo, index) => (
            <div
              key={photo.id}
              style={{
                gridArea: photo.gridArea,
                transitionDelay: `${index * 150}ms`,
              }}
              class={`
                relative overflow-hidden rounded-lg shadow-xl
                transform transition-all duration-700 ease-out
                ${isVisible.value 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
                }
              `}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                width="600"
                height="400"
                class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 class="text-lg font-bold">{photo.alt}</h3>
                  <p class="text-sm">Click to view project</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseSection>
  );
}); 