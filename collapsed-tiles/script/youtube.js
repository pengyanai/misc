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
    url: "https://www.youtube.com/premium",
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
    bodyLower.includes("premium is not available in your country") ||
    bodyLower.includes("youtube premium is not available in your country")
  ) {
    $done({ content: "Not Available", backgroundColor: "" });
    return;
  }

  let country = "";
  const glMatch = body.match(/"GL"\s*:\s*"([A-Z]{2})"/);
  if (glMatch) {
    country = glMatch[1];
  }

  if (bodyLower.includes("ad-free")) {
    const label = country ? `Available (${country})` : "Available";
    $done({ content: label, backgroundColor: "#FF0000" });
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
