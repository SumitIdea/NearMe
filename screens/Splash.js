import React, {useRef, useState} from 'react';
import {View, StyleSheet, Image, useWindowDimensions,Alert} from 'react-native';
import LottieView from 'lottie-react-native';
import {useEffect} from 'react';
// import NetInfo from '@react-native-community/netinfo'



const Splash = props => {
  const [authLoaded, setAuthLoaded] = useState(false);
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const {height, width, fontScale} = useWindowDimensions();
 
   
  const ref = useRef(null);


  useEffect(() => {
    setTimeout(() => {
      setAuthLoaded(true);
    }, 5000);
  }, []);

  const onAnimationFinish = () => {
    setAnimationLoaded(true);
  };

  useEffect(() => {
    
    // NetInfo.fetch().then(state => {
    //   if (state.isConnected) {
    //     console.log('true ' + state.isConnected);
        
    //   } else {
    //     console.log('false ' + state.isConnected);
    //     Alert.alert('Please Check Your Internet Connection');
    //   }
    // });
   
    if (authLoaded && animationLoaded) {
      props.navigation.replace('Login');
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