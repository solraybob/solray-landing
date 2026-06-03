/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // The app lived on this domain in early 2026, so old links, bookmarks,
    // and devices healing off that era's service worker can land on app
    // routes here. Forward them to the real app.
    const appRoutes = ['/today', '/login', '/chat', '/souls', '/profile', '/onboard', '/subscribe'];
    return appRoutes.map((path) => ({
      source: path,
      destination: `https://app.solray.ai${path}`,
      permanent: true,
    }));
  },
  async headers() {
    return [
      {
        // The kill-switch worker must never be cached, so every device's
        // update check sees the latest version immediately.
        source: '/sw.js',
        headers: [{ key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' }],
      },
    ];
  },
};

export default nextConfig;
