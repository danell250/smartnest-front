import { useEffect } from 'react';

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

export default function LiveChat() {
  useEffect(() => {
    // Load Tawk.to script
    const script = document.createElement('script');
    script.src = 'https://embed.tawk.to/YOUR_TAWK_TO_ID/default';
    script.async = true;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    document.head.appendChild(script);

    // Initialize Tawk API
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_API.onLoad = function() {
      console.log('Tawk.to loaded');
    };

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector(`script[src="https://embed.tawk.to/YOUR_TAWK_TO_ID/default"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
}
