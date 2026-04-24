async function request(method, params) {
  return new Promise((resolve, reject) => {
    const httpMethod = $httpClient[method.toLowerCase()];
    httpMethod(params, (error, response, data) => {
      resolve({ error, response, data });
    });
  });
}

async function main() {
  const { error, response, data } = await request("GET", "https://gemini.google.com");

  if (error) {
    $done({
      content: "NetErr",
      backgroundColor: "",
    });
    return;
  }

  const body = (data || "").toLowerCase();
  if (
    body.includes("not available in your country") ||
    body.includes("unsupported country") ||
    body.includes("unavailable in your region")
  ) {
    $done({
      content: "N/A",
      backgroundColor: "",
    });
    return;
  }

  if (body.includes("gemini")) {
    $done({
      content: "Available",
      backgroundColor: "#7E83FF",
    });
    return;
  }

  $done({
    content: "Unknown",
    backgroundColor: "",
  });
}

(async () => {
  main()
    .then((_) => {})
    .catch((error) => {
      $done({});
    });
})();
