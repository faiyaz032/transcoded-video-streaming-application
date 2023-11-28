import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import { MULTER_UPLOAD_FOLDER } from './multer';

export const HLS_OUTPUT_FOLDER = path.join(MULTER_UPLOAD_FOLDER, 'hls');

export async function generateHlsSegments(inputFilePath: string, outputFileName: string) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(HLS_OUTPUT_FOLDER)) {
      fs.mkdirSync(HLS_OUTPUT_FOLDER);
    }

    ffmpeg(inputFilePath)
      .outputOptions([
        '-c:v h264',
        '-hls_time 10', // Set the duration of each segment (in seconds)
        '-hls_list_size 0', // Do not limit the number of playlist entries
        '-hls_segment_filename ' + path.join(HLS_OUTPUT_FOLDER, 'segment%d.ts'),
      ])
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
