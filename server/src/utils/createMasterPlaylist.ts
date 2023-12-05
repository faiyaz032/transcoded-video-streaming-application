import fs from 'fs/promises';
import path from 'path';

export default async function createMasterPlaylist(videoDirectory: string) {
  const content = `
  #EXTM3U
  #EXT-X-VERSION:3
  #EXT-X-INDEPENDENT-SEGMENTS
  
  #EXT-X-STREAM-INF:BANDWIDTH=1000000,AVERAGE-BANDWIDTH=800000,RESOLUTION=640x360
  ${path.join(videoDirectory, '360', '360_out.m3u8')}
  
  #EXT-X-STREAM-INF:BANDWIDTH=2500000,AVERAGE-BANDWIDTH=2000000,RESOLUTION=854x480
  ${path.join(videoDirectory, '480', '480_out.m3u8')}
  
  #EXT-X-STREAM-INF:BANDWIDTH=5000000,AVERAGE-BANDWIDTH=4000000,RESOLUTION=1280x720
  ${path.join(videoDirectory, '720', '720_out.m3u8')}
  
  #EXT-X-STREAM-INF:BANDWIDTH=8000000,AVERAGE-BANDWIDTH=6000000,RESOLUTION=1920x1080
  ${path.join(videoDirectory, '1080', '1080_out.m3u8')}`.trim();
  try {
    await fs.appendFile(path.join(videoDirectory, 'master.m3u8'), content);
  } catch (error) {
    console.log(error);
  }
}
