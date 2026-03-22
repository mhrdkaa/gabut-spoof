const CACHE_NAME = 'spoof-v1';
self.addEventListener('install', event => {
    event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
    const requestUrl = new URL(event.request.url);
    if (requestUrl.hostname === 'www.google.com') {

        console.log(`[SW JAHAT] Mencegat request ke Google: ${event.request.url}`);
        event.respondWith(
            new Response('', {
                status: 204,
                statusText: 'No Content',
                headers: {
                    'Content-Type': 'text/html',
                    'Server': 'gws',
                    'Access-Control-Allow-Origin': '*'
                }
            })
        );
        return;
    }
    event.respondWith(fetch(event.request));
});