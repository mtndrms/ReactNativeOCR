import React, {useState} from 'react';
import {
  Image,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNTextDetector from 'rn-text-detector';
import OCRAppButton from '../components/OCRAppButton';

function ScanScreen() {
  const [state, setState] = useState<{
    loading: boolean;
    image: string | null;
    toast: {
      message: string;
      isVisible: boolean;
    };
    textRecognition: [] | null;
  }>({
    loading: false,
    image: null,
    textRecognition: null,
    toast: {
      message: '..',
      isVisible: false,
    },
  });

  function onPress(type: 'capture' | 'library') {
    setState({...state, loading: true});
    if (type === 'capture') {
      requestCameraPermission();
      launchCamera({mediaType: 'photo', saveToPhotos: false}, onImageSelect);
    } else {
      launchImageLibrary(
        {
          mediaType: 'photo',
          selectionLimit: 1,
        },
        onImageSelect,
      );
    }
  }

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      const grantedGallery = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'App Gallery Permission',
          message: 'App needs access to your photos',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (
        granted === PermissionsAndroid.RESULTS.GRANTED &&
        grantedGallery === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Camera permission given');
        launchCamera({mediaType: 'photo', saveToPhotos: true}, onImageSelect);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  async function onImageSelect(media: {assets: [{uri: string}]}) {
    try {
      if (!media) {
        setState({...state, loading: false});
        return;
      }
      if (!!media && media.assets) {
        const file = media.assets[0].uri;
        const textRecognition = await RNTextDetector.detectFromUri(file);
        const KEYWORD = 'Wege';
        //if match toast will appear
        const matchText = textRecognition.findIndex((item: {text: string}) =>
          item.text.match(KEYWORD),
        );
        setState({
          ...state,
          textRecognition,
          image: file,
          toast: {
            message: matchText > -1 ? 'Toast message' : '',
            isVisible: matchText > -1,
          },
          loading: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.sourceImageContainer}>
        <Image
          style={styles.sourceImage}
          resizeMode="contain"
          resizeMethod="auto"
          source={{uri: state.image ? state.image : 'null'}}
        />
        <Text style={styles.title}>Result</Text>
      </View>
      {!!state.textRecognition &&
        state.textRecognition.map((item: {text: string}, i: number) => (
          <Text key={i}>{item.text}</Text>
        ))}
      {state.toast.isVisible &&
        ToastAndroid.showWithGravityAndOffset(
          state.toast.message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50,
        )}
      <View style={styles.options}>
        <OCRAppButton text="Take Photo" onPress={() => onPress('capture')} />
        <OCRAppButton text="Pick Photo" onPress={() => onPress('library')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  options: {
    width: '100%',
    height: 75,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginTop: 16,
    marginBottom: 8,
  },
  sourceImageContainer: {
    justifyContent: 'center',
  },
  sourceImage: {
    width: '100%',
    height: 300,
  },
});

export default ScanScreen;
