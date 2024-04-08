export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          type: "text/css",
          href: "https://unpkg.com/vue-advanced-cropper@^2.0.0/dist/style.css",
        },
      ],
    },
  },
  modules: ["../src/module", "@nuxtjs/tailwindcss"],
  myModule: {},
  devtools: { enabled: true },
});
