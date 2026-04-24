async function request(method, params) {
  return new Promise((resolve, reject) => {
    const httpMethod = $httpClient[method.toLowerCase()];
    httpMethod(params, (error, response, data) => {
      resolve({ error, response, data });
    });
  });
}

async function main() {
  const { error, response, data } = await request(
    "GET",
    "https://copilot.microsoft.com"
  );

  if (error) {
    $done({
      content: "Network Error",
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

  if (body.includes("copilot") || body.includes("microsoft")) {
    $done({
      content: "Available",
      backgroundColor: "#0078D4",
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
