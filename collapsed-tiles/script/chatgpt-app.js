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
    "https://ios.chat.openai.com"
  );

  if (error) {
    $done({
      content: "Network Error",
      backgroundColor: "#999999",
    });
    return;
  }

  if (data.toLowerCase().includes("disallowed isp")) {
    $done({
      content: "ISP Block",
      backgroundColor: "#555555",
    });
    return;
  }

  if (data.toLowerCase().includes("been blocked")) {
    $done({
      content: "Blocked",
      backgroundColor: "#1A1A1A",
    });
    return;
  }

  $done({
    content: `Available`,
    backgroundColor: "#E8E8E8",
  });
}

(async () => {
  main()
    .then((_) => {})
    .catch((error) => {
      $done({});
    });
})();
