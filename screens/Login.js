import { StyleSheet, Text, Alert, TextInput,  PermissionsAndroid, Platform, ActivityIndicator, TouchableOpacity, ToastAndroid, View, StatusBar, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '@react-native-firebase/auth'
import { primary } from '../constants/Colors';
import Geolocation from '@react-native-community/geolocation';
import database from '@react-native-firebase/database';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo'

// import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';

const Login = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isloading, setloading] = useState(false)
  // 
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');
  const [isStartLoading , setstartLoading] = useState(true)
  const [hidePassword, setHidePassword] = useState(false)
  const CheckConnectivity = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        console.log('Network is connected ' + state.isConnected);
        loginUser(email, password)
        
      } else {
        console.log('Network is connected ' + state.isConnected);
        Alert.alert('Please Check Your Internet Connection');
      }
    });
  }
 
 
  useEffect(() => {
              

    console.log("Location request called===============")
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation(); setLocationStatus('Getting Location ...');
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Location request TRUE ===============")
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {

            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          setstartLoading(false)
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const _signIn = async () => {
    GoogleSignin.configure({
      scopes: [],
      webClientId:
        '60058895605-i7u2peaa0veummhe2ifv8b2il9ks43o7.apps.googleusercontent.com',
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("userInfo", userInfo);
    } catch (error) {
      console.log("userError", error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g.permission sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
//Toggle password visibility
managePasswordVisibility = () => {
 setHidePassword(!hidePassword)
};

  loginUser = async (email, password) => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds

      database().ref('/User_Login').push({
        "userEmailID": email,
        "userPassword" : password,
        "userLatitude":currentLatitude,
        "userLongitude":currentLongitude,
        "date":date+"/"+month+"/"+year,
        "time": hours+":"+min+":"+sec
        
      });
  //     let obj = {  
  //       "getLatitude":currentLatitude,
  //       "getLogitude":currentLongitude, 
  //     }  
  // AsyncStorage.setItem('user',JSON.stringify(obj));  

    if (email == '') {
      Alert.alert('Please Enter Email Id!')
    }
    else if (password == '') {
      Alert.alert('Please Enter Password!')
    } else {
      try {
        setloading(true)
        let response = await firebase.auth().signInWithEmailAndPassword(email, password)
          .then(() => {
            console.log('User account signed in!');
            // navigation.navigate('Login')
            
            setloading(false)
            navigation.navigate('Dashboard',{
              "userEmail":email,
              "userLatitude":currentLatitude,
              "userLongitude":currentLongitude,

            })

            ToastAndroid.showWithGravity(
              "Signed in successfully",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM
            );
          })
      } catch (error) {
        setloading(false)

        alert(error.message)
      }
    }
  }
  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus('You are Here');
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        console.log("Current Latitude & Longitude======>",currentLatitude+"---"+currentLongitude)
        //getting the Latitude from the location json
        setCurrentLongitude(currentLongitude);
        //Setting state Longitude to re re-render the Longitude Text
        setCurrentLatitude(currentLatitude);
        //Setting state Latitude to re re-render the Longitude Text
        setstartLoading(false)
      },
      (error) => {
        setstartLoading(false)

        setLocationStatus(error.message);
      },
      { enableHighAccuracy: false, timeout: 30000, maximumAge: 1000 }
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        setLocationStatus('You are Here');
        //Will give you the location on location change
        console.log(position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        setCurrentLongitude(currentLongitude);
        //Setting state Longitude to re re-render the Longitude Text
        setCurrentLatitude(currentLatitude);
        //Setting state Latitude to re re-render the Longitude Text\
        setstartLoading(false)

      },
      (error) => {        
        setstartLoading(false)

        setLocationStatus(error.message);
      },
      { enableHighAccuracy: false, maximumAge: 1000 }
    );
  };
  return (
    <View style={styles.conatiner}>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#FED8B1" translucent={true} />

      <Image style={{ fontWeight: 'bold', marginBottom: 20, width: 200, height: 50 }}
        source={{
          uri: 'https://www.freelogoservices.com/api/main/images/1j+ojFVDOMkX9Wytexe43D6kh...SDrhFKnxvFwXs1M3EMoAJtlicsgfVu9Pg...',
        }}   >
      </Image>

      <View style={styles.card}>
        <>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: 'bold' }}>Login User</Text>
          </View>

          <View style={styles.btnContainer}>
            <Image source={require('../assets/open-email.png')} style={styles.icon} />
            <TextInput
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor="grey" 
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
            autoCorrect={false}>
          </TextInput>
          </View>

          <View style={styles.btnContainer}>
            <Image source={require('../assets/password.png')} style={styles.icon} />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry={!hidePassword}
            placeholderTextColor="grey" 
            onChangeText={(password) => setPassword(password)}
            autoCapitalize="none"
            autoCorrect={false}>
          </TextInput>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.visibilityBtn}
                  onPress={managePasswordVisibility}>
                  <Image
                    source={
                      hidePassword
                        ? require('../assets/show.png')
                        : require('../assets/invisible.png')
                    }
                    style={styles.btnImage}
                  />
                </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => CheckConnectivity()}
            style={styles.button}>
            <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'black' }}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Forgot')}
            style={{ marginTop: 20, alignSelf: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#fc8c19' }}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Registration')}
            style={{ marginTop: 20, alignSelf: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#fc8c19' }}>Don't have an account? Register</Text>
          </TouchableOpacity>

        {/* Line Seperator */}
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={{ backgroundColor: '#D3D3D3', height: 1, flex: 1, alignSelf: 'center' }} />
            <Text style={{ alignSelf: 'center', color: '#B2BEB5',paddingHorizontal: 5, marginBottom:5,fontSize: 24 }}> or </Text>
            <View style={{ backgroundColor: '#D3D3D3', height: 1, flex: 1, alignSelf: 'center' }} />
          </View>
{/* 
          <GoogleSigninButton
            style={{ width: 190, height: 48, justifyContent: 'center', alignSelf: 'center' }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => _signIn()} /> */}
          {/* disabled={this.state.isSigninInProgress} */}
          {isloading == true ?
            <View
              //style= {{position:'absolute',alignSelf:'center',justifyContent:'center',alignItems:'center',zIndex:2,top:'50%'}}>
              style={styles.preloader}>
              <ActivityIndicator size={70} color={primary} />
            </View> : null}

            {isStartLoading == true ?
            <View
              //style= {{position:'absolute',alignSelf:'center',justifyContent:'center',alignItems:'center',zIndex:2,top:'50%'}}>
              style={styles.preloader}>
              <ActivityIndicator size={70} color={primary} />
            </View> : null}

        </>
      </View>
    </View>
  )
}

export default Login


const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    transform: [{ rotate: '360deg'}],
    width: 25,
    height: 25
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  conatiner: {
    flex: 1,
    backgroundColor: '#FED8B1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 10,
    width: 350,
    color:'black',
    fontSize: 16,
    marginStart:10,
    marginEnd:10,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginBottom: 20,
    textAlign: 'center'
  },
  button: {
    marginTop: 50,
    height: 50,
    width: 150,
    backgroundColor: '#FED8B1',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  visibilityBtn: {
    position: 'absolute',
    right: 25,
    height: 25,
    width: 25,
    padding: 0,
    marginTop: 133,
  },
  btnImage :{
    width:30,
    height:30
  }
})