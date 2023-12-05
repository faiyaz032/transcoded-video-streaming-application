export default function getResolution(quality: string) {
  switch (quality) {
    case '360':
      return '640x360';
    case '480':
      return '854x480';
    case '720':
      return '1280x720';
    case '1080':
      return '1920x1080';
    default:
      return '1280x720';
  }
}
