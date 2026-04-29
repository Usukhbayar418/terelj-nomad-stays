// Curated Unsplash photo URLs used across the site.
// Swap these for your own photography when ready.
const u = (id: string, w = 1600, q = 80) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const images = {
  hero: u("photo-1469474968028-56623f02e42e", 2000),
  river: u("photo-1506905925346-21bda4d32df4", 1400),
  ger: u("photo-1518684079-3c830dcef090", 1200),
  gerInterior: u("photo-1542273917363-3b1817f69a2d", 1200),
  tent: u("photo-1504280390367-361c6d9f38f4", 1200),
  horse: u("photo-1553284965-4dcb6884cb73", 1200),
  food: u("photo-1504674900247-0877df9cc836", 1200),
  bonfire: u("photo-1475139441338-693e7dbe20b6", 1200),
  mountain: u("photo-1441974231531-c6227db76b6e", 1400),
  statue: u("photo-1551632436-cbf8dd35adfa", 1200),
  rocks: u("photo-1493246507139-91e8fad9978e", 1200),
};
