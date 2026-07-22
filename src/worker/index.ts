interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  TURNSTILE_SECRET: string;
  BUTTONDOWN_API_KEY: string;
}

// Astro build ra static file cho các route .ts (blog/*.md, llms.txt, robots.txt). Cloudflare tự
// suy Content-Type theo đuôi file khi serve static asset và KHÔNG kèm charset, khiến trình duyệt
// đoán sai encoding (Latin-1) cho tiếng Việt. _headers không match được path có dấu gạch ngang
// trong slug (":placeholder" không khớp ký tự "-"), nên sửa trực tiếp ở đây thay vì _headers.
const TEXT_CHARSET_BY_EXT: Record<string, string> = {
  ".md": "text/markdown; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (request.method === "POST" && url.pathname === "/api/subscribe") {
      return handleSubscribe(request, env);
    }

    const response = await env.ASSETS.fetch(request);
    const ext = Object.keys(TEXT_CHARSET_BY_EXT).find((e) => url.pathname.endsWith(e));
    if (ext && !response.headers.get("Content-Type")?.includes("charset")) {
      const headers = new Headers(response.headers);
      headers.set("Content-Type", TEXT_CHARSET_BY_EXT[ext]);
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }
    return response;
  },
};

async function handleSubscribe(request: Request, env: Env): Promise<Response> {
  const origin = new URL(request.url).origin;
  const redirectTo = (status: "ok" | "error"): Response => {
    let target: URL;
    try {
      target = new URL(request.headers.get("Referer") ?? origin);
    } catch {
      target = new URL(origin);
    }
    target.searchParams.set("newsletter", status);
    return Response.redirect(target.toString(), 303);
  };

  const formData = await request.formData();
  const email = formData.get("email");
  const token = formData.get("cf-turnstile-response");

  if (typeof email !== "string" || !email || typeof token !== "string" || !token) {
    return redirectTo("error");
  }

  const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: env.TURNSTILE_SECRET,
      response: token,
      remoteip: request.headers.get("CF-Connecting-IP") ?? "",
    }),
  });
  const verifyData = (await verifyRes.json()) as { success: boolean };
  if (!verifyData.success) {
    return redirectTo("error");
  }

  // Double opt-in (mặc định của Buttondown khi không truyền "type") — Buttondown tự gửi email
  // xác nhận trước khi kích hoạt subscriber, đúng tinh thần chống spam của NĐ 91/2020.
  const subscribeRes = await fetch("https://api.buttondown.com/v1/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Token ${env.BUTTONDOWN_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_address: email,
      ip_address: request.headers.get("CF-Connecting-IP") ?? undefined,
    }),
  });

  // 400 từ Buttondown thường nghĩa là email đã đăng ký rồi — vẫn coi là "ok" để tránh lộ
  // thông tin ai đã đăng ký (email enumeration) qua thông báo khác nhau.
  if (!subscribeRes.ok && subscribeRes.status !== 400) {
    return redirectTo("error");
  }

  return redirectTo("ok");
}
