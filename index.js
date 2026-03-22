export default {
  async fetch(request) {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    return new Response(JSON.stringify({
      code: 200,
      msg: "云端连接成功",
      autoPlayInterval: 3000,
      maxPlayTimes: 10
    }), { headers });
  }
};
