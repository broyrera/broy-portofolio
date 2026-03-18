import imageCompression from "browser-image-compression";
import { supabase } from "@/lib/supabase";

export interface UploadedImage {
  url: string;
  path: string;
}

/**
 * Compress and upload an image to Supabase Storage
 * @param file - The image file to upload
 * @param bucket - The Supabase storage bucket name (default: 'images')
 * @param folder - Optional folder path within the bucket
 * @returns The public URL of the uploaded image
 */
export async function compressAndUploadImage(
  file: File,
  bucket: string = "images",
  folder: string = "projects"
): Promise<string> {
  // Compression options
  const options = {
    maxSizeMB: 0.5, // Max 500KB
    maxWidthOrHeight: 1920, // Max dimension 1920px
    useWebWorker: true,
    fileType: "image/webp" as const, // Convert to WebP for better compression
  };

  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error("Supabase environment variables are missing. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
    }

    // Compress the image
    const compressedFile = await imageCompression(file, options);

    // Generate unique filename
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const normalizedFolder = folder.replace(/^\/+|\/+$/g, "");
    const filePath = `${normalizedFolder}/${timestamp}-${randomSuffix}.webp`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, compressedFile, {
        contentType: "image/webp",
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      const msg = uploadError.message || "Unknown storage upload error.";
      throw new Error(`Upload failed: ${msg}. Make sure bucket \"${bucket}\" exists and allows upload.`);
    }

    const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(filePath);
    if (!publicData?.publicUrl) {
      throw new Error("Upload succeeded but failed to get public URL.");
    }

    return publicData.publicUrl;
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
}

/**
 * Convert a File object to a data URL for preview
 */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
