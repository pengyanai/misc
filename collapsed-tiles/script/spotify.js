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
    url: "https://spclient.wg.spotify.com/signup/public/v1/account?validate=1&email=test%40test.com",
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
  const body = data || "";

  let json;
  try {
    json = JSON.parse(body);
  } catch (e) {
    json = null;
  }

  if (!json) {
    $done({ content: `Error (${status})`, backgroundColor: "" });
    return;
  }

  const country = json.country || "";
  const launched = json.is_country_launched;

  if (launched === false) {
    const label = country ? `N/A (${country})` : "N/A";
    $done({ content: label, backgroundColor: "" });
    return;
  }

  if (country) {
    $done({ content: `Available (${country})`, backgroundColor: "#1DB954" });
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
