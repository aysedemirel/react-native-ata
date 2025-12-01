declare module '*.png' {
  import { ImageSourcePropType } from 'react-native';

  const value: ImageSourcePropType;
  export default value;
}

declare module '*.webp' {
  import { ImageSourcePropType } from 'react-native';

  const value: ImageSourcePropType;
  export default value;
}

declare module '*.ttf' {
  const value: string;
  export default value;
}

declare module '*.mp3' {
  import { AudioSource } from 'expo-audio';

  const value: AudioSource;
  export default value;
}
