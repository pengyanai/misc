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
    $done({ content: "Network Error", backgroundColor: "" });
    return;
  }

  const status = response?.status || response?.statusCode || 0;
  if (status >= 400) {
    $done({ content: `Error (${status})`, backgroundColor: "" });
    return;
  }

  const body = data || "";

  let country = "";
  const glMatch = body.match(/"GL"\s*:\s*"([A-Z]{2})"/);
  if (glMatch) {
    country = glMatch[1];
  } else if (body.indexOf("www.google.cn") !== -1) {
    country = "CN";
  }

  if (country) {
    $done({ content: `Available (${country})`, backgroundColor: "#FF0000" });
    return;
  }

  if (body.length > 800) {
    $done({ content: "Available", backgroundColor: "#FF0000" });
    return;
  }

  $done({ content: "Failed", backgroundColor: "" });
}

(async () => {
  main()
    .then((_) => {})
    .catch((_) => {
      $done({});
    });
})();
