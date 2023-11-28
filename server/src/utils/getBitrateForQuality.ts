export default function getBitrateForQuality(quality: string) {
  switch (quality) {
    case '1080p':
      return '2500k';
    case '720p':
      return '1500k';
    default:
      return '1500k';
  }
}
