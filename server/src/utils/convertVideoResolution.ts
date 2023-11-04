import ffmpeg from 'fluent-ffmpeg';
import path from 'path';

// Set the path to the ffmpeg executable
ffmpeg.setFfmpegPath('C:\\PATH_Programs\\ffmpeg');

export default async function convertVideoResolution(
  inputPath: string,
  outputPath: string,
  fileName: string
) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .output(path.join(outputPath, `${fileName}-1080p.mp4`))
      .size('1920x1080')
      .output(path.join(outputPath, `${fileName}-720p.mp4`))
      .size('1280x720')
      .on('end', () => resolve(true))
      .on('error', err => reject(err))
      .run();
  });
}
