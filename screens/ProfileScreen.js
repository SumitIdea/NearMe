import { StyleSheet, Text, View, Image, TouchableOpacity, PermissionsAndroid, Dimensions, } from 'react-native'
import React, { useRef, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useWindowDimensions } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const { width } = Dimensions.get('window');

const ITEM_LENGTH = width * 0.2; // Item is a square. Therefore, its height and width are of the same length.
const BORDER_RADIUS = 0;

const data = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    image: 'https://pixlr.com/images/index/remove-bg.webp'

  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    image: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/102709/ntorq-125-right-front-three-quarter.jpeg?isig=0&q=75'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://pixlr.com/images/index/filter-effect.webp'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://www.befunky.com/images/prismic/843b5ad1-aa0c-4d43-9aa5-530da39df46d_hero-background-remover-2.jpg?auto=avif,webp&format=jpg&width=900'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://fiverr-res.cloudinary.com/videos/t_main1,q_auto,f_auto/ebyskyykosmfn6hk4rtx/edit-photo-and-background-make-the-face-look-smother.png'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://cdn.retouchme.com/servcat/7s3hmganBYNJukuiPVQX8dCtjMc4DdkoxaSCZicv.jpg'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/102709/ntorq-125-right-front-three-quarter.jpeg?isig=0&q=75'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://pixlr.com/images/index/remove-bg.webp'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    image: 'https://pixlr.com/images/index/remove-bg.webp'

  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    image: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/102709/ntorq-125-right-front-three-quarter.jpeg?isig=0&q=75'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://pixlr.com/images/index/filter-effect.webp'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://www.befunky.com/images/prismic/843b5ad1-aa0c-4d43-9aa5-530da39df46d_hero-background-remover-2.jpg?auto=avif,webp&format=jpg&width=900'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://fiverr-res.cloudinary.com/videos/t_main1,q_auto,f_auto/ebyskyykosmfn6hk4rtx/edit-photo-and-background-make-the-face-look-smother.png'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://cdn.retouchme.com/servcat/7s3hmganBYNJukuiPVQX8dCtjMc4DdkoxaSCZicv.jpg'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/102709/ntorq-125-right-front-three-quarter.jpeg?isig=0&q=75'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://pixlr.com/images/index/remove-bg.webp'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    image: 'https://pixlr.com/images/index/remove-bg.webp'

  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    image: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/102709/ntorq-125-right-front-three-quarter.jpeg?isig=0&q=75'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://pixlr.com/images/index/filter-effect.webp'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://www.befunky.com/images/prismic/843b5ad1-aa0c-4d43-9aa5-530da39df46d_hero-background-remover-2.jpg?auto=avif,webp&format=jpg&width=900'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://fiverr-res.cloudinary.com/videos/t_main1,q_auto,f_auto/ebyskyykosmfn6hk4rtx/edit-photo-and-background-make-the-face-look-smother.png'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://cdn.retouchme.com/servcat/7s3hmganBYNJukuiPVQX8dCtjMc4DdkoxaSCZicv.jpg'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/102709/ntorq-125-right-front-three-quarter.jpeg?isig=0&q=75'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://pixlr.com/images/index/remove-bg.webp'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    image: 'https://pixlr.com/images/index/remove-bg.webp'

  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    image: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/102709/ntorq-125-right-front-three-quarter.jpeg?isig=0&q=75'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://pixlr.com/images/index/filter-effect.webp'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://www.befunky.com/images/prismic/843b5ad1-aa0c-4d43-9aa5-530da39df46d_hero-background-remover-2.jpg?auto=avif,webp&format=jpg&width=900'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://fiverr-res.cloudinary.com/videos/t_main1,q_auto,f_auto/ebyskyykosmfn6hk4rtx/edit-photo-and-background-make-the-face-look-smother.png'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://cdn.retouchme.com/servcat/7s3hmganBYNJukuiPVQX8dCtjMc4DdkoxaSCZicv.jpg'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/102709/ntorq-125-right-front-three-quarter.jpeg?isig=0&q=75'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://pixlr.com/images/index/remove-bg.webp'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    image: 'https://pixlr.com/images/index/remove-bg.webp'

  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    image: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/102709/ntorq-125-right-front-three-quarter.jpeg?isig=0&q=75'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://pixlr.com/images/index/filter-effect.webp'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://www.befunky.com/images/prismic/843b5ad1-aa0c-4d43-9aa5-530da39df46d_hero-background-remover-2.jpg?auto=avif,webp&format=jpg&width=900'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://fiverr-res.cloudinary.com/videos/t_main1,q_auto,f_auto/ebyskyykosmfn6hk4rtx/edit-photo-and-background-make-the-face-look-smother.png'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://cdn.retouchme.com/servcat/7s3hmganBYNJukuiPVQX8dCtjMc4DdkoxaSCZicv.jpg'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/102709/ntorq-125-right-front-three-quarter.jpeg?isig=0&q=75'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://pixlr.com/images/index/remove-bg.webp'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    image: 'https://pixlr.com/images/index/remove-bg.webp'

  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    image: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/102709/ntorq-125-right-front-three-quarter.jpeg?isig=0&q=75'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://pixlr.com/images/index/filter-effect.webp'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://www.befunky.com/images/prismic/843b5ad1-aa0c-4d43-9aa5-530da39df46d_hero-background-remover-2.jpg?auto=avif,webp&format=jpg&width=900'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://fiverr-res.cloudinary.com/videos/t_main1,q_auto,f_auto/ebyskyykosmfn6hk4rtx/edit-photo-and-background-make-the-face-look-smother.png'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://cdn.retouchme.com/servcat/7s3hmganBYNJukuiPVQX8dCtjMc4DdkoxaSCZicv.jpg'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/102709/ntorq-125-right-front-three-quarter.jpeg?isig=0&q=75'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: 'https://pixlr.com/images/index/remove-bg.webp'
  },
];
const ProfileScreen = () => {
  const { height, width } = useWindowDimensions();
  const refRBSheet = useRef();
  const [avatarSource, setAvatarSource] = useState(null);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
        takePhotoFromCamera();
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const takePhotoFromCamera = () => {
    console.log(".........", "gfgdfgdfdf");
  
    const options = {
      title: 'Select Avatar',
      takePhotoButtonTitle: 'Take photo from camera',
      cameraType: 'back',
      mediaType: 'photo',
      videoQuality: 'high',
      durationLimit: 10,
      maxWidth: 300,
      maxHeight: 300,
      aspectX: 2,
      aspectY: 1,
      quality: 0.8,
      angle: 0,
      allowsEditing: false,
      noData: false,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, (response) => {
      console.log(".........", response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.assets[0].uri };
        console.log("source............", source);
        setAvatarSource(source);
      }
    });
  }

  const choosePhotoFromLibrary = () => {
    const options = {
      title: 'Select Avatar',
    chooseFromLibraryButtonTitle: 'Choose from gallery',
      cameraType: 'back',
      mediaType: 'photo',
      quality: 0.8,
    };
    launchImageLibrary(options, (response) => {
      console.log(".........", response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.assets[0].uri };
        console.log("source............", source);
        setAvatarSource(source);
      }
    });
  }
  const YourOwnComponent = () =>
    <View style={styles.panel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={() => requestCameraPermission()}>
        <Text style={styles.panelButtonTitle} >Take Photo</Text>
      </TouchableOpacity>
      {/* <View style={{ alignItems: 'center' }}>
        {avatarSource && <Image source={avatarSource} />}
      </View> */}

      <TouchableOpacity style={styles.panelButton} onPress={() => choosePhotoFromLibrary()}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton} onPress={() => refRBSheet.current.close()}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>;

  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          marginLeft: 20
        }}>
        <Image
          style={{ height: 60, width: 60, backgroundColor: 'grey', borderRadius: 50 }}
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}>

        </Image>

        <View
          // style={{flexDirection:'row', alignItems:'center', marginTop:20, marginLeft:10}}
          style={{ marginLeft: 10 }}
        >
          <Text style={{ fontWeight: '400', fontSize: 20, color: 'blue', paddingHorizontal: 10, marginLeft: 10 }}>49</Text>
          <Text style={{ fontSize: 20, color: 'grey', paddingHorizontal: 10 }}>Post</Text>

        </View>
        <View
          // style={{flexDirection:'row', alignItems:'center', marginTop:20, marginLeft:10}}
          style={{ marginLeft: 10 }}

        >
          <Text style={{ fontWeight: '400', fontSize: 20, color: 'blue', paddingHorizontal: 10, marginLeft: 10 }}>49</Text>
          <Text style={{ fontSize: 20, color: 'grey', paddingHorizontal: 10 }}>Followers</Text>

        </View>
        <View
          // style={{flexDirection:'row', alignItems:'center', marginTop:20, marginLeft:10}}
          style={{ marginLeft: 10 }}
        >
          <Text style={{ fontWeight: '400', fontSize: 20, color: 'blue', paddingHorizontal: 10, marginLeft: 10 }}>49</Text>
          <Text style={{ fontSize: 20, color: 'grey', paddingHorizontal: 10 }}>Following</Text>

        </View>
        <View
          // style={{flexDirection:'row', alignItems:'center', marginTop:20, marginLeft:10}}
          style={{ marginLeft: 10 }}
        >
          <Text style={{ fontWeight: '400', fontSize: 20, color: 'blue', paddingHorizontal: 10, marginLeft: 10 }}>5</Text>
          <Text style={{ fontSize: 20, color: 'grey', paddingHorizontal: 10 }}>Block</Text>

        </View>
      </View>

      <Text style={{
        fontSize: 18,
        color: '#800000',
        paddingHorizontal: 10,
        marginTop: 10,
        fontWeight: 'bold',
        marginLeft: 20
      }}>Sumit</Text>
      <Text style={{
        fontSize: 18,
        color: '#800000',
        paddingHorizontal: 10,
        fontWeight: 'bold',
        marginLeft: 20
      }}>72099998990</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => refRBSheet.current.open()}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'black' }}>Edit Profile</Text>
      </TouchableOpacity>
      <Text style={{
        fontSize: 18,
        color: 'black',
        paddingHorizontal: 10,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 20
      }}>Gallery</Text>

      <View style={{ borderWidth: StyleSheet.hairlineWidth, borderColor: 'black', }} />
      <View style={styles.container}>

        <FlatList
          data={data}
          numColumns={3}
          // horizontal={true}
          keyExtractor={(item, index) => {
            return index.toString()
          }}
          style={{ backgroundColor: "yellow" }}
          renderItem={({ item }) => {
            return (
              <View style={{ backgroundColor: 'white', }}>
                <TouchableOpacity activeOpacity={.5} >

                  <Image
                    style={styles.itemImage}
                    // style={{ height: height/12, width: width/3.33, backgroundColor:'red',  }}
                    source={{ uri: item.image }}>
                  </Image>
                </TouchableOpacity>
              </View>
            )
          }} />
      </View>

      <RBSheet
        ref={refRBSheet}
        height={350}
        duration={250}
        customStyles={{
          container: {
            justifyContent: "center",
            alignItems: "center"
          },

        }}
      >
        <YourOwnComponent />

      </RBSheet>

    </View>

  )
}


export default ProfileScreen

const styles = StyleSheet.create({
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  button: {
    height: 50,
    width: 150,
    backgroundColor: '#FED8B1',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  itemImage: {
    width: 165,
    height: ITEM_LENGTH,
    borderRadius: BORDER_RADIUS,
    resizeMode: 'cover',
  },
  container: {
    marginTop: 5,
    marginBottom: 25
  },
})