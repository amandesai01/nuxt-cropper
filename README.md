<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: Nuxt-Cropper
- Package name: nuxt-cropper
- Description: Simplify cropping images in Nuxt3
-->

# Nuxt Cropper

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Wrapper over [Vue Advanced Cropper](https://advanced-cropper.github.io/vue-advanced-cropper) to make it easily integrate with Nuxt3.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
- [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-cropper?file=playground%2Fapp.vue)
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- ⚡️ &nbsp;Lazily imported and pre-configured VueAdvancedCropper.
- 🚠 &nbsp;Handy composable - `useImageCropper()` to abstract away all the complexity.
- 🌲 &nbsp;Very stable thanks to [Vue Advanced Cropper](https://advanced-cropper.github.io/vue-advanced-cropper)

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add nuxt-cropper
```

That's it! You can now use Nuxt Cropper in your Nuxt app ✨


## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-cropper/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-cropper

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-cropper.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/nuxt-cropper

[license-src]: https://img.shields.io/npm/l/nuxt-cropper.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-cropper

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
