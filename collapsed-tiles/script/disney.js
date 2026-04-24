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
    "https://www.disneyplus.com"
  );

  if (error) {
    $done({
      content: "NetErr",
      backgroundColor: "",
    });
    return;
  }

  const body = (data || "").toLowerCase();
  if (
    body.includes("not available in your region") ||
    body.includes("not available in your country") ||
    body.includes("service is unavailable")
  ) {
    $done({
      content: "N/A",
      backgroundColor: "",
    });
    return;
  }

  if (body.includes("disney") || body.includes("disney+")) {
    $done({
      content: "Available",
      backgroundColor: "#0E1E4F",
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
