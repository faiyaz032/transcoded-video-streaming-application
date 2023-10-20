import cloudinary from '../config/cloudinary';

export default async function uploadFileToCloudinary(filePath: string) {
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_large(
        filePath,
        {
          resource_type: 'video',
        },
        (error: any, result: any) => {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });

    return result;
  } catch (error) {
    console.log('error file uploading file', error);
  }
}
