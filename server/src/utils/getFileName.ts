import path from 'path';

export default function getFileName(fileName: string): string {
  const extName = path.extname(fileName);
  return fileName.replace(extName, '');
}
