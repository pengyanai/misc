async function request(method, params) {
  return new Promise((resolve, reject) => {
    const httpMethod = $httpClient[method.toLowerCase()];
    httpMethod(params, (error, response, data) => {
      resolve({ error, response, data });
    });
  });
}

async function main() {
  const { error, response, data } = await request("GET", {
    url: "https://www.spotify.com/premium/",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      "Accept-Language": "en",
    },
  });

  if (error) {
    $done({ content: "NetErr", backgroundColor: "" });
    return;
  }

  const body = data || "";
  const bodyLower = body.toLowerCase();

  if (
    bodyLower.includes("spotify is currently not available in your country") ||
    bodyLower.includes("isn't available in your country") ||
    bodyLower.includes("spotify is not available in your country")
  ) {
    $done({ content: "N/A", backgroundColor: "" });
    return;
  }

  let country = "";
  const urlMatch = body.match(
    /spotify\.com\/([a-z]{2})(?:-[a-z]+)?\/premium/i
  );
  if (urlMatch) {
    country = urlMatch[1].toUpperCase();
  }

  if (country) {
    $done({ content: `Available (${country})`, backgroundColor: "#1DB954" });
    return;
  }

  if (
    bodyLower.includes("premium individual") ||
    bodyLower.includes("premium student")
  ) {
    $done({ content: "Available", backgroundColor: "#1DB954" });
    return;
  }

  $done({ content: "Unknown", backgroundColor: "" });
}

(async () => {
  main()
    .then((_) => {})
    .catch((_) => {
      $done({});
    });
})();
