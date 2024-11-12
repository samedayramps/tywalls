import { component$, useSignal } from "@builder.io/qwik";
import { BaseSection } from "./BaseSection";

interface VideoItem {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
}

const VIDEOS: VideoItem[] = [
  {
    id: 1,
    title: "Project Demo 1",
    description: "A brief overview of the project's key features",
    videoUrl: "/videos/demo1.mp4",
    thumbnail: "/images/thumb1.jpg"
  },
  {
    id: 2,
    title: "Project Demo 2",
    description: "Showcasing the user interface and interactions",
    videoUrl: "/videos/demo2.mp4",
    thumbnail: "/images/thumb2.jpg"
  },
];

export const VideoSection = component$(() => {
  const activeVideo = useSignal<number>(0);
  const isPlaying = useSignal<boolean>(false);

  return (
    <BaseSection background="bg-base-100" class="relative">
      <div class="flex flex-col h-full">
        <h2 class="text-4xl font-bold mb-8">Featured Work</h2>
        
        {/* Video Carousel */}
        <div class="relative w-full overflow-hidden">
          <div class="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-6">
            {VIDEOS.map((video) => (
              <div 
                key={video.id}
                class="flex-none w-full md:w-2/3 lg:w-1/2 snap-center"
              >
                <div class="card bg-base-200 shadow-xl">
                  {/* Video Container */}
                  <div class="relative aspect-video">
                    <video
                      src={video.videoUrl}
                      poster={video.thumbnail}
                      class="w-full h-full object-cover rounded-t-xl"
                      onClick$={() => {
                        const videoEl = document.getElementById(`video-${video.id}`);
                        if (videoEl instanceof HTMLVideoElement) {
                          if (videoEl.paused) {
                            videoEl.play();
                            isPlaying.value = true;
                          } else {
                            videoEl.pause();
                            isPlaying.value = false;
                          }
                        }
                      }}
                      id={`video-${video.id}`}
                    />
                    
                    {/* Play/Pause Overlay */}
                    <div 
                      class="absolute inset-0 flex items-center justify-center 
                             bg-black/30 opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <button 
                        class="btn btn-circle btn-primary"
                        aria-label={isPlaying.value ? "Pause video" : "Play video"}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="currentColor" 
                          class="w-6 h-6"
                        >
                          {isPlaying.value ? (
                            <path d="M8 5v14l11-7z" />
                          ) : (
                            <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                          )}
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div class="card-body">
                    <h3 class="card-title">{video.title}</h3>
                    <p>{video.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick$={() => {
              if (activeVideo.value > 0) {
                activeVideo.value--;
                document.getElementById(`video-${VIDEOS[activeVideo.value].id}`)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
                  inline: 'center'
                });
              }
            }}
            class="absolute left-4 top-1/2 -translate-y-1/2 btn btn-circle btn-primary"
            disabled={activeVideo.value === 0}
            aria-label="Previous video"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
          </button>

          <button 
            onClick$={() => {
              if (activeVideo.value < VIDEOS.length - 1) {
                activeVideo.value++;
                document.getElementById(`video-${VIDEOS[activeVideo.value].id}`)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
                  inline: 'center'
                });
              }
            }}
            class="absolute right-4 top-1/2 -translate-y-1/2 btn btn-circle btn-primary"
            disabled={activeVideo.value === VIDEOS.length - 1}
            aria-label="Next video"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </button>
        </div>

        {/* Video Indicators */}
        <div class="flex justify-center gap-2 mt-4">
          {VIDEOS.map((video, i) => (
            <button
              key={video.id}
              class={`w-2 h-2 rounded-full transition-colors ${
                i === activeVideo.value ? 'bg-primary' : 'bg-base-content/20'
              }`}
              onClick$={() => {
                activeVideo.value = i;
                document.getElementById(`video-${VIDEOS[i].id}`)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
                  inline: 'center'
                });
              }}
              aria-label={`Go to video ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </BaseSection>
  );
}); 