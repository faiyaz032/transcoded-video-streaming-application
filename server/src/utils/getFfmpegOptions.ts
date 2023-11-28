import path from 'path';
import getBitrateForQuality from './getBitrateForQuality';
import getResolutionForQuality from './getResolutionForQuality';

/**
 * @param qualities  array of qualities
 * @param segmentDuration segmentDuration must be provided in seconds
 */
export default function getFfmpegOptions(
  qualities: string[],
  segmentDuration: number = 10,
  hlsOutputFolder: string
): Array<string> {
  const ffmpegOptions = [
    '-c:v h264',
    `-hls_time ${segmentDuration}`, // Set the duration of each segment (in seconds)
    '-hls_list_size 0',
    '-hls_segment_filename ' + path.join(hlsOutputFolder, 'segment%d.ts'),
  ];
  const qualityOptions = qualities.map(quality => [
    '-b:v ' + getBitrateForQuality(quality),
    '-s ' + getResolutionForQuality(quality),
  ]);
  return ffmpegOptions.concat(...qualityOptions);
}
