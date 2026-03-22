export default {
  async fetch(request, env, ctx) {
    return new Response("Hello jiuguan-helper!", {
      headers: { "Content-Type": "text/plain" }
    });
  }
};
