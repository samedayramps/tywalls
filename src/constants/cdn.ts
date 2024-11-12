export const CDN_URL = "https://ty-walls.b-cdn.net";
export const PULL_ZONE_ID = "2963357";

// Optional: Helper functions for CDN URLs
export const getCDNImageUrl = (path: string) => `${CDN_URL}/images/${path}`;
export const getCDNVideoUrl = (path: string) => `${CDN_URL}/videos/${path}`;

// Optional: Add image optimization parameters
export const getOptimizedImageUrl = (path: string, width: number, height: number) => 
  `${CDN_URL}/images/${path}?width=${width}&height=${height}&optimize=medium`; 