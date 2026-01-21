# Remotion Proxy Image POC

## Purpose

This project demonstrates a solution for handling **High Resolution Images (4K+)** in [Remotion](https://www.remotion.dev/) without causing **Out of Memory (OOM)** crashes in the browser.

When loading multiple 4K images (e.g., 7360x4912) directly into `<Img />` tags, the browser's decoding process consumes massive amounts of VRAM and RAM, often crashing the Chrome instance used by Remotion Studio.

## The Solution: Proxy Pattern

We implement a **Client-Side Proxy Pattern**:

1.  **Intercept**: Instead of rendering the high-res URL directly, we pass it to a `ProxyImage` component.
2.  **Compress**: The component fetches the image as a Blob and uses `browser-image-compression` to create a lightweight (720p/1080p) proxy in a Web Worker.
3.  **Display**: The lightweight proxy is rendered in the Studio, ensuring smooth playback and low memory usage.
4.  **Sequential Rendering**: The render process is configured with `concurrency: 1` to ensure frames are processed one by one, keeping the memory footprint low even during export.

## Key Components

- `src/utils/image-proxy.ts`: Utility to compress images using a Web Worker.
- `src/components/ProxyImage.tsx`: React component that handles the async compression and rendering state.
- `src/ProxyDemo.tsx`: Demo composition loading 3 high-res sample images.

## Installation

```bash
npm install
```

## Running the Demo

1.  Start the Remotion Studio:
    ```bash
    npm run dev
    ```
2.  Select the **ProxyDemo** composition.
3.  Observe that 4K images load without crashing the browser.

## Rendering

To export a video:

```bash
npm run build
# or
npx remotion render ProxyDemo out/video.mp4
```

## Configuration

The project is configured in `remotion.config.ts` to use `Config.setConcurrency(1)` which is critical for stability when working with heavy assets.
