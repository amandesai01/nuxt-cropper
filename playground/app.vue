<script setup>
import { CircleStencil } from 'vue-advanced-cropper';
const cropperCompRef = ref();
const cropper = useImageCropper(cropperCompRef, { maxInputFileSizeInBytes: 500000 }); // 500kb
</script>

<template>
  <div class="w-full flex justify-center p-4 gap-8">
    <div class="flex flex-col space-y-2 w-1/3">
      <FileInput
        class="rounded-full h-10"
        accept="image/*"
        @file-received="cropper.loadImageFromEvent"
      />
      <div
        v-if="cropper.image.value"
        class="flex w-full justify-center"
      >
        <image-cropper
          ref="cropperCompRef"
          :src="cropper.blobURL.value"
          :stencil-component="CircleStencil"
        />
      </div>
      <button
        v-if="cropper.image.value"
        class="btn btn-primary btn-sm"
        @click="cropper.crop"
      >
        Crop
      </button>
      <button
        v-if="cropper.image.value"
        class="btn btn-secondary btn-sm"
        @click="cropper.reset"
      >
        Reset
      </button>
    </div>
    <div
      v-if="cropper.croppedBlob.value"
      class=""
    >
      <img
        :src="cropper.croppedBlobURL.value"
        class="w-32 h-32"
      >
    </div>
  </div>
</template>
