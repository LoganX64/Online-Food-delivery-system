import cloudinary from '../config/cloudinary.js';

/**
 * Uploads an image buffer to Cloudinary and returns the secure URL.
 */
export const uploadImage = async (fileBuffer: Buffer, folder: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        if (result) return resolve(result.secure_url);
        reject(new Error('Upload failed'));
      }
    );
    uploadStream.end(fileBuffer);
  });
};

/**
 * Extracts the public ID from a Cloudinary URL and deletes the image.
 */
export const deleteImage = async (imageUrl: string) => {
  try {
    // Cloudinary URLs typically look like:
    // https://res.cloudinary.com/<cloud_name>/image/upload/v1234567890/<folder>/<public_id>.<ext>
    const regex = /\/v\d+\/(.+)\.\w+$/;
    const match = imageUrl.match(regex);
    if (match && match[1]) {
      const publicId = match[1];
      await cloudinary.uploader.destroy(publicId);
    }
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
  }
};
