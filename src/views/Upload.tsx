import {Controller, useForm} from 'react-hook-form';
import {Button, Card, Image, Input} from '@rneui/base';
import {NavigatorType, UploadInputs} from '../types/LocalTypes';
import {Alert, StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useEffect, useState} from 'react';
import VideoPlayer from '../components/VideoPlayer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFile, useMedia} from '../hooks/apiHooks';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const Upload = () => {
  const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(
    null,
  );

  const initValues: UploadInputs = {title: '', description: ''};
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    reset,
  } = useForm({
    defaultValues: initValues,
  });

  const {postExpoFile, loading} = useFile();
  const {postMedia} = useMedia();
  const navigation = useNavigation<NativeStackNavigationProp<NavigatorType>>();

  const resetForm = () => {
    reset();
    setImage(null);
  };

  const doUpload = async (inputs: UploadInputs) => {
    console.log(inputs);
    // if image is not selected, Alert error message and stop running this function
    if (!image || !image.assets) {
      Alert.alert('Error', 'No image selected');
      return;
    }
    // read token
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Alert.alert('Error', 'No token found');
      return;
    }
    // call postExpoFile() with image uri and token
    const fileResponse = await postExpoFile(image.assets[0].uri, token);
    // TODO: get response and call postMedia() with the response data included
    const mediaResponse = await postMedia(fileResponse, inputs, token);
    // TODO: run context update (covered later)
    // TODO: reset the form and navigate to Home tab
    Alert.alert('Success', 'Media uploaded');
    navigation.navigate('All Media');
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      quality: 0.6,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result);
    }
  };

  useEffect(() => {
    const unSubscribe = navigation.addListener('blur', () => {
      resetForm();
    });
    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <Card>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          minLength: {value: 3, message: 'minimum 3 characters'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.title?.message}
          />
        )}
        name="title"
      />

      <Controller
        control={control}
        rules={{
          maxLength: 300,
          required: false,
          minLength: {value: 5, message: 'Type more please...'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.description?.message}
          />
        )}
        name="description"
      />
      {image?.assets && image.assets[0].type === 'video' ? (
        <VideoPlayer videoFile={image.assets[0].uri} style={styles.image} />
      ) : (
        <Image
          source={{
            uri:
              image?.assets![0].uri ||
              'https://placehold.co/500x200@2x/grey/white/png?text=Choose+File',
          }}
          style={styles.image}
          onPress={pickImage}
        />
      )}
      <Button
        loading={loading}
        disabled={!isValid || !image}
        title="Upload"
        onPress={handleSubmit(doUpload)}
      />
      <Button title="Reset" color="warning" onPress={resetForm} />
    </Card>
  );
};

const styles = StyleSheet.create({
  image: {height: 200},
});

export default Upload;
