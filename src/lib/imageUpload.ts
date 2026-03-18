import imageCompression from "browser-image-compression";

export interface UploadedImage {
  url: string;
  path: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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
    // Compress the image
    const compressedFile = await imageCompression(file, options);
    
    // Generate unique filename
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const fileName = `${folder}/${timestamp}-${randomSuffix}.webp`;

    // Upload to Supabase Storage
    const formData = new FormData();
    formData.append("file", compressedFile);

    const response = await fetch(
      `${supabaseUrl}/storage/v1/object/${bucket}/${fileName}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${supabaseAnonKey}`,
          "Content-Type": compressedFile.type,
        },
        body: compressedFile,
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    // Return the public URL
    return `${supabaseUrl}/storage/v1/object/public/${bucket}/${fileName}`;
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
