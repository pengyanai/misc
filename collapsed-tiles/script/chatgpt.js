async function request(method, params) {
  return new Promise((resolve, reject) => {
    const httpMethod = $httpClient[method.toLowerCase()];
    httpMethod(params, (error, response, data) => {
      resolve({ error, response, data });
    });
  });
}

async function checkWeb() {
  const { error, data } = await request(
    "GET",
    "https://api.openai.com/compliance/cookie_requirements"
  );
  if (error) return { ok: false, msg: "Network Error" };
  if ((data || "").toLowerCase().includes("unsupported_country")) {
    return { ok: false, msg: "Blocked" };
  }
  return { ok: true };
}

async function checkApp() {
  const { error, data } = await request("GET", "https://ios.chat.openai.com");
  if (error) return { ok: false, msg: "Network Error" };
  const body = (data || "").toLowerCase();
  if (body.includes("disallowed isp")) return { ok: false, msg: "ISP Block" };
  if (body.includes("been blocked")) return { ok: false, msg: "Blocked" };
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
