export default defineNuxtPlugin((nuxtApp) => {
  const cropper = defineAsyncComponent(
    async () => (await import("vue-advanced-cropper")).Cropper
  );
  nuxtApp.vueApp.component("image-cropper", cropper);
});
