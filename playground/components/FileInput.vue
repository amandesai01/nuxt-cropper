<script setup lang="ts">
import { useVModel } from '@vueuse/core';

const fileInputRef = ref<HTMLInputElement | null>(null);

const props = defineProps<{
  modelValue?: File
  label?: string
  accept?: string,
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: File): void
  (e: 'fileReceived', payload: Event): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
})

const openFileInput = () => {
  if (!fileInputRef.value) {
    return;
  }
  fileInputRef.value.click();
};

const handleFileChange = (event: Event) => {
  event.preventDefault();
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) {
    modelValue.value = file;
    emits('fileReceived', event);
  }
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer!.dropEffect = "copy";
};

const handleDragLeave = (event: DragEvent) => {
  event.preventDefault();
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  const file = event.dataTransfer!.files[0];
  if (file) {
    modelValue.value = file;
    emits('fileReceived', event);
  }
};
</script>


<template>
  <div
    class="flex flex-col items-center justify-center h-48 border border-dashed border-gray-300 rounded-md p-4"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <input
      ref="fileInputRef"
      type="file"
      class="hidden"
      :accept="accept"
      @change="handleFileChange"
    >
    <div class="text-gray-600 text-sm mb-2">
      {{ label ? label : 'Drag and drop a file here or click to browse' }}
    </div>
    <button
      class="btn btn-sm"
      @click="openFileInput"
    >
      Browse
    </button>
    <div
      v-if="modelValue"
      class="mt-2"
    >
      Selected File: {{ modelValue.name }}
    </div>
  </div>
</template>