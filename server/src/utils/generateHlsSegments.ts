import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import getFfmpegOptions from './getFfmpegOptions';
import getFileName from './getFileName';
import { MULTER_UPLOAD_FOLDER } from './multer';

export async function generateHlsSegments(
  inputFilePath: string,
  outputFileName: string,
  qualities: string[]
) {
  return new Promise((resolve, reject) => {
    const HLS_OUTPUT_FOLDER = path.join(MULTER_UPLOAD_FOLDER, getFileName(outputFileName));

    if (!fs.existsSync(HLS_OUTPUT_FOLDER)) {
      fs.mkdirSync(HLS_OUTPUT_FOLDER);
    }

    const ffmpegOptions = getFfmpegOptions(qualities, 10, HLS_OUTPUT_FOLDER);

    ffmpeg(inputFilePath)
      .outputOptions(ffmpegOptions)
      .output(path.join(HLS_OUTPUT_FOLDER, outputFileName + '.m3u8'))
      .on('end', () => {
        console.log('HLS segments generated successfully');
        resolve(true);
      })
      .on('error', err => {
        console.error('Error generating HLS segments:', err);
        reject(err);
      })
      .run();
  });
}
