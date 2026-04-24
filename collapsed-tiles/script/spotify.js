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
    "https://www.spotify.com/premium/"
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
    body.includes("isn't available in your country") ||
    body.includes("not available in your region")
  ) {
    $done({
      content: "N/A",
      backgroundColor: "",
    });
    return;
  }

  if (body.includes("spotify")) {
    $done({
      content: "Available",
      backgroundColor: "#1DB954",
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
