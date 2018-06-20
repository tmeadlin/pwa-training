if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // navigator.serviceWorker.register('/sw-lifecycle.js', { scope: '/' })
    navigator.serviceWorker.register('/sw-cache.js', { scope: '/' })
      .then(registration => console.log("SW Registration Complete"));
  });
}