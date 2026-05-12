async function request(method, params) {
  return new Promise((resolve, reject) => {
    const httpMethod = $httpClient[method.toLowerCase()];
    httpMethod(params, (error, response, data) => {
      resolve({ error, response, data });
    });
  });
}

function httpStatus(response) {
  return (response && (response.status || response.statusCode)) || 0;
}

async function checkWeb() {
  const { error, response, data } = await request("GET", {
    url: "https://api.openai.com/compliance/cookie_requirements",
    headers: {
      Origin: "https://platform.openai.com",
      Referer: "https://platform.openai.com/",
      Accept: "*/*",
    },
  });
  if ((error && !response) || !response) {
    return { ok: false, msg: "Network Error" };
  }
  const status = httpStatus(response);
  if (status < 200 || status >= 300) {
    return { ok: false, msg: status ? `Error (${status})` : "Network Error" };
  }
  if ((data || "").toLowerCase().includes("unsupported_country")) {
    return { ok: false, msg: "Blocked" };
  }
  return { ok: true };
}

async function checkApp() {
  const { error, response, data } = await request("GET", {
    url: "https://ios.chat.openai.com/",
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "none",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });
  if ((error && !response) || !response) {
    return { ok: false, msg: "Network Error" };
  }
  const status = httpStatus(response);
  const body = (data || "").toLowerCase();
  if (body.includes("disallowed isp")) return { ok: false, msg: "ISP Block" };
  if (body.includes("been blocked")) return { ok: false, msg: "Blocked" };
  if (body.includes('"type":"dc"') || body.includes('"type": "dc"')) {
    return { ok: false, msg: "DC Block" };
  }
  if (status < 200 || status >= 300) {
    return { ok: false, msg: status ? `Error (${status})` : "Network Error" };
  }
  return { ok: true };
}

async function main() {
  const [w, a] = await Promise.all([checkWeb(), checkApp()]);

  const okGreen = "#88A788";

  if (w.ok && a.ok) {
    $done({ content: "Available (Web/App)", backgroundColor: okGreen });
    return;
  }
  if (w.ok && !a.ok) {
    $done({ content: "Available (Web)", backgroundColor: okGreen });
    return;
  }
  if (!w.ok && a.ok) {
    $done({ content: "Available (App)", backgroundColor: okGreen });
    return;
  }

  const left = w.msg;
  const right = a.msg;
  const content = left === right ? left : `${left} · ${right}`;
  $done({ content, backgroundColor: "" });
}

(async () => {
  main()
    .then((_) => {})
    .catch((_) => {
      $done({});
    });
})();
