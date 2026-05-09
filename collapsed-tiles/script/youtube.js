async function request(method, params) {
  return new Promise((resolve) => {
    const httpMethod = $httpClient[method.toLowerCase()];
    httpMethod(params, (error, response, data) => {
      resolve({ error, response, data });
    });
  });
}

function extractCountry(body) {
  const patterns = [
    /"INNERTUBE_CONTEXT_GL"\s*:\s*"([A-Z]{2})"/,
    /"countryCode"\s*:\s*"([A-Z]{2})"/,
    /"GL"\s*:\s*"([A-Z]{2})"/,
    /"gl"\s*:\s*"([A-Z]{2})"/,
  ];
  for (const re of patterns) {
    const m = body.match(re);
    if (m) return m[1];
  }
  if (body.indexOf("www.google.cn") !== -1) return "CN";
  return "";
}

async function probe(url) {
  return request("GET", {
    url,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });
}

async function main() {
  let { error, response, data } = await probe("https://www.youtube.com/");

  // Fall back to m.youtube.com if the desktop site errors out
  if (error || !response) {
    const retry = await probe("https://m.youtube.com/");
    error = retry.error;
    response = retry.response;
    data = retry.data;
  }

  if (error || !response) {
    $done({ content: "Network Error", backgroundColor: "" });
    return;
  }

  const status = response.status || response.statusCode || 0;
  const body = data || "";

  if (status === 403 || status === 451) {
    $done({ content: "Unavailable", backgroundColor: "" });
    return;
  }

  const looksLikeYouTube =
    body.indexOf("ytInitialData") !== -1 ||
    body.indexOf("INNERTUBE_CONTEXT") !== -1 ||
    body.indexOf("youtube.com") !== -1;

  if (status >= 200 && status < 400 && looksLikeYouTube) {
    const country = extractCountry(body);
    $done({
      content: country ? `Available (${country})` : "Available",
      backgroundColor: "#FF0000",
    });
    return;
  }

  if (status >= 400) {
    $done({ content: `Error (${status})`, backgroundColor: "" });
    return;
  }

  $done({ content: "Unavailable", backgroundColor: "" });
}

(async () => {
  main()
    .then((_) => {})
    .catch((_) => {
      $done({});
    });
})();
