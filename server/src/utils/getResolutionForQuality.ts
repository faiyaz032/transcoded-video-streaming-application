export default function getResolutionForQuality(quality: string) {
  switch (quality) {
    case '1080p':
      return '1920x1080';
    case '720p':
      return '1280x720';
    default:
      return '1280x720';
  }
}
