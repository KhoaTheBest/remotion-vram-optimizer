import imageCompression from "browser-image-compression";

export const compressImage = async (imageUrl: string): Promise<string> => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const file = new File([blob], "image.jpg", { type: blob.type });

    const options = {
      maxSizeMB: 0.5, // Aggressive compression for proxy
      maxWidthOrHeight: 720, // 720p
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);
    return URL.createObjectURL(compressedFile);
  } catch (error) {
    console.error("Error compressing image:", error);
    return imageUrl; // Fallback to original
  }
};
