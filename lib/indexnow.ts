const INDEXNOW_KEY = "38a1c47c470d4e8ebe4ea62573ea7265";
const SITE_HOST = "suitepacific.com";

export async function pingIndexNow(urls: string[]) {
  try {
    await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: SITE_HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    });
  } catch {
    // Non-critical — indexing will happen via sitemap crawl if this fails
  }
}
