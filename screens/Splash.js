import React, {useRef, useState} from 'react';
import {View, StyleSheet, Image, useWindowDimensions,Alert} from 'react-native';
import LottieView from 'lottie-react-native';
import {useEffect} from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
// import NetInfo from '@react-native-community/netinfo'
import AsyncStorage from '@react-native-async-storage/async-storage';



const Splash = props => {
  const [authLoaded, setAuthLoaded] = useState(false);
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const {height, width, fontScale} = useWindowDimensions();
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [email, setEmail] = useState("")
  const [lat, setLati] = useState("")
  const [long, setLong] = useState("")
  const [username, setUsername] =useState("")
  const [phoneNo, setPhoneNo] =useState("")
  const [city, setCity] =useState("")
  const [gender, setGender] = useState("")

  const ref = useRef(null);


  useEffect(() => {
    setTimeout(() => {
      setAuthLoaded(true);
    }, 5000);
    const checkFirstTime = async () => {
      const firstTime = await AsyncStorage.getItem('user_asyn');
      const currentUser = JSON.parse(firstTime);
      setEmail(currentUser.asyn_email)
      setLati(currentUser.asyn_lati)
      setLong(currentUser.asyn_long)
      setUsername(currentUser.asyn_username)
      setPhoneNo(currentUser.asyn_phoneNo)
      setCity(currentUser.asyn_cityName)
      setGender(currentUser.asyn_gender)

      console.log("asyn storage ====>>>>",currentUser);

      if (currentUser.firstTime !== null) {
        console.log("data......", currentUser.firstTime);
        setIsFirstTime(currentUser.firstTime);
      }
    };

    checkFirstTime();
  }, []);

  const onAnimationFinish = () => {
    setAnimationLoaded(true);
  };


  useEffect(() => {
  
    if (authLoaded && animationLoaded) {
      if (isFirstTime) {
        console.log("data......,,,,,,dash", isFirstTime);
        props.navigation.replace('Dashboard',{
          "userEmail":email,
          "userLatitude":lat,
          "userLongitude":long,
          "username":username,
          "user_phoneNo": phoneNo,
          "user_cityName":city,
          "user_gender": gender
        })
      }
      else{
        console.log("data......,,,,,,login", isFirstTime);

        props.navigation.replace('Login')
      }
      // props.navigation.replace('Login');
    }
  }, [authLoaded, animationLoaded, props.navigation]);

  return (
    <View style={styles(height,width).root}>
      <Image resizeMode={'contain'} style={{fontWeight:'bold', fontSize:26, width:200,height:height/8}}
     source={{
          uri: 'https://www.freelogoservices.com/api/main/images/1j+ojFVDOMkX9Wytexe43D6kh...SDrhFKnxvFwXs1M3EMoAJtlicsgfVu9Pg...',
        }}  / >
      <LottieView
        ref={animation => {
          ref.current = animation;
        }}
        style={styles(height,width).lottieView}
        source={require('../assets/radar_loader.json')}
        autoPlay
        loop={false}
        onAnimationFinish={onAnimationFinish}
      />
      
    </View>
  );
};

const styles =(height='',width='')=> StyleSheet.create({
  root: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieView: {
    width: width,
    height:height/2.5,
    // backgroundColor:'red'
    },
});

export default Splash;