export const GTM_ID = 'GTM-W6ZBVGS4';

// Helper function to push events to dataLayer
export const pushToDataLayer = (event: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push(event);
  }
}; 