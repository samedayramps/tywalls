import { component$ } from "@builder.io/qwik";

interface PageIndicatorProps {
  current: number;
  total: number;
}

export const PageIndicator = component$<PageIndicatorProps>(({ current, total }) => {
  return (
    <div class="fixed top-4 left-1/2 -translate-x-1/2 z-50 md:hidden">
      <div class="bg-base-200/80 backdrop-blur-sm rounded-full px-4 py-2">
        <span class="text-sm font-medium">
          {current + 1} / {total}
        </span>
      </div>
    </div>
  );
}); 