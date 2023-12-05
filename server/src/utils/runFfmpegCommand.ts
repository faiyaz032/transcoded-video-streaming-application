import { exec } from 'child_process';
import path from 'path';
import { promisify } from 'util';
import getFileName from './getFileName';
import getResolution from './getResolution';

const execAsync = promisify(exec);

export default async function runFfmpegCommand( 
  fileName: string,
  quality: string,
) {
  const directory = path.join(__dirname, '../', 'uploads');
  const video = path.join(directory, fileName);
  const qualityFolder = path.join(directory, getFileName(fileName), quality);

  const ffmpegCommand = `ffmpeg -i ${video} -c:a aac -strict experimental -c:v libx264 -s ${getResolution(
    quality
  )} -aspect 16:9 -f hls -hls_list_size 1000000 -hls_time 2 ${qualityFolder}/${quality}_out.m3u8`;

  try {
    return await execAsync(ffmpegCommand);
  } catch (error) {
    console.log(error);
  }
}
