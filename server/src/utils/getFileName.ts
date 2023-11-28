import path from 'path';
/**
 * This function takes a filename and remove the file extension and only returns the name
 * @param fileName name of the file
 * @returns only filename removing the extension
 */
export default function getFileName(fileName: string): string {
  const extName = path.extname(fileName);
  return fileName.replace(extName, '');
}
