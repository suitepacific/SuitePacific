const INDEXNOW_KEY = "38a1c47c470d4e8ebe4ea62573ea7265";
const SITE_HOST = "suitepacific.com";

const ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
];

export async function pingIndexNow(urls: string[]) {
  const body = JSON.stringify({
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  });

  await Promise.allSettled(
    ENDPOINTS.map((endpoint) =>
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      })
    )
  );
}
