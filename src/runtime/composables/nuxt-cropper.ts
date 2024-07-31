import { ref, type Ref, useHead } from "#imports";

import type { Cropper } from "vue-advanced-cropper";

export const CSS_HEAD = {
  rel: "stylesheet",
  type: "text/css",
  href: "https://unpkg.com/vue-advanced-cropper@^2.0.0/dist/style.css",
};

function getMimeType(file: ArrayBuffer, fallback = null) {
  const byteArray = new Uint8Array(file).subarray(0, 4);
  let header = "";
  for (let i = 0; i < byteArray.length; i++) {
    header += byteArray[i].toString(16);
  }
  switch (header) {
    case "89504e47":
      return "image/png";
    case "47494638":
      return "image/gif";
    case "ffd8ffe0":
    case "ffd8ffe1":
    case "ffd8ffe2":
    case "ffd8ffe3":
    case "ffd8ffe8":
      return "image/jpeg";
    default:
      return fallback;
  }
}

export function useImageCropper(
  cropperRef: Ref<InstanceType<typeof Cropper> | null>,
  options?: {
    maxInputFileSizeInBytes?: number;
  }
) {
  useHead({
    link: [CSS_HEAD],
  })
  const _image = ref<{ src: string | null; type?: string | null } | null>(null);
  const _blobURL = ref<string | null>(null);
  const _croppedBlob = ref<Blob | null>(null);
  const _croppedBlobURL = ref<string | null>(null);
  const _validationError = ref<boolean>(false);
  const _validationMessage = ref<string>("");

  const MAX_INPUT_FILE_SIZE = options?.maxInputFileSizeInBytes || 0;

  const _crop = () => {
    if (!cropperRef.value) {
      throw new Error("[nuxt-cropper] cropperRef value cannot be null");
    }
    const { canvas } = cropperRef.value.getResult();
    if (canvas) {
      canvas.toBlob((blob) => {
        if (!blob) {
          return;
        }
        _croppedBlob.value = blob;
        _croppedBlobURL.value = URL.createObjectURL(blob);
      });
    }
  };

  const _reset = () => {
    _image.value = { src: null, type: null };
    _croppedBlob.value = null;
    _croppedBlobURL.value = null;
    _validationError.value = false;
    _validationMessage.value = "";
  };

  const _loadImageFromFile = (file: File) => {
    if (!file) {
      throw new Error("[nuxt-cropper] file cannot be " + typeof file);
    }
    if (_image.value?.src) {
      URL.revokeObjectURL(_image.value.src);
    }

    _reset();

    if (MAX_INPUT_FILE_SIZE > 0) {
      if (file.size > MAX_INPUT_FILE_SIZE) {
        _validationError.value = true;
        _validationMessage.value = "File size exceeds limit.";
        return;
      }
    }

    const blob = URL.createObjectURL(file);

    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target?.result) {
        _image.value = {
          src: blob,
          type: getMimeType(e.target?.result as ArrayBuffer),
        };

        _blobURL.value = blob;
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const _loadImageFromEvent = (event: Event | DragEvent) => {
    let files: FileList | null = null;
    if (event.type == "drop") {
      files = (event as DragEvent).dataTransfer?.files || null;
    } else if (event.type == "change") {
      files = ((event as Event)?.target as HTMLInputElement)?.files || null;
    } else {
      throw new Error("Event of type: " + event.type + " is not supported.");
    }

    if (files && files[0]) {
      const file = files[0];
      _loadImageFromFile(file);
    }
  };

  return {
    image: _image,
    blobURL: _blobURL,
    croppedBlob: _croppedBlob,
    croppedBlobURL: _croppedBlobURL,
    crop: _crop,
    reset: _reset,
    loadImageFromEvent: _loadImageFromEvent,
    loadImageFromFile: _loadImageFromFile,
    validationError: _validationError,
    validationMessage: _validationMessage,
  };
}
