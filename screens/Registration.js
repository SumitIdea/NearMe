import { StyleSheet,Alert, Text, TextInput, TouchableOpacity, ActivityIndicator, ToastAndroid, View, StatusBar, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '@react-native-firebase/auth'
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { primary } from '../constants/Colors';
import { height } from '../constants/Constants';
import database from '@react-native-firebase/database';


const Registration = () => {

  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userCPassword, setUserCPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [userPhoneNo, setUser_PhoneNo] = useState('')
  const [userCity, setUser_City] = useState('')

  const [isloading, setloading]= useState(false)
  const navigation = useNavigation()

  const register = async(name, email, password, c_password, phone_no, city) => {
  
    database().ref('/User_SignUp').push({
      "userName": name,
      "userEmail": email,
      "userPhone" : phone_no,
      "userCity":city,
    });
    
    if(userEmail=='')
    {
      Alert.alert('Please Enter Email Id!')
    }
    if(userCity=='')
    {
      Alert.alert('Please Enter City Name!')
    }
    else if(userPassword=='')
    {
      Alert.alert('Please Enter Password!')
    }
    else if(userCPassword=='')
    {
      Alert.alert('Please Enter Confirm Password!')
    }
    else if(userPassword!=userCPassword)
    {
      Alert.alert('Password Not Match!')
    }
    else if(userName=='')
    {
      Alert.alert('Please Enter Username!')
    }
    else if(userPhoneNo=='')
    {
      Alert.alert('Please Enter Phone No!')

    }
    else{
      setloading(true)
 

    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        res.user.updateProfile({
          userName: name
        })
        console.log('User account created & signed in!');
        // navigation.navigate('Login')
        ToastAndroid.showWithGravity(
          "user account created successfully",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
          setloading(false)
          setUserName('')
          setUserEmail('')
          setUserPassword('')
          navigation.navigate('Login')
      })
      .catch(error => {
        setloading(false)

        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        Alert.alert(e)
        console.error(error);
      });
  }
}

  return (
    
    <View style={styles.conatiner}>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#FED8B1" translucent={true} />

      <Image style={{ fontWeight: 'bold', fontSize: 26, marginBottom: 20, width: 200, height: 50 }}
        source={{
          uri: 'https://www.freelogoservices.com/api/main/images/1j+ojFVDOMkX9Wytexe43D6kh...SDrhFKnxvFwXs1M3EMoAJtlicsgfVu9Pg...',
        }}   >
      </Image>
   
      <View style={styles.card}>   
    <>
      <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ flex: .8, fontWeight: 'bold' }}>Register User</Text>
          <TouchableOpacity style={{ flex: .2, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => navigation.navigate('Login')}
          >
            <Image
              source={{ uri: "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3204354/arrow-back-icon-md.png" }}
              resizeMode='contain' style={{ width: 35, height: 25 }} />
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          placeholderTextColor="grey" 
          onChangeText={(userName) => setUserName(userName)}
          autoCapitalize="none"
          autoCorrect={false}>
        </TextInput>

        <TextInput
          style={styles.textInput}
          placeholder="Phone No"
          placeholderTextColor="grey" 
          onChangeText={(userPhoneNo) => setUser_PhoneNo(userPhoneNo)}
          autoCorrect={false}>
        </TextInput>
        <TextInput
          style={styles.textInput}
          placeholder="City Name"
          placeholderTextColor="grey" 

          onChangeText={(userCity) => setUser_City(userCity)}
          autoCorrect={false}>
        </TextInput>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          placeholderTextColor="grey" 
          onChangeText={(userEmail) => setUserEmail(userEmail)}
          autoCapitalize="none"
          autoCorrect={false}>
        </TextInput>

        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="grey" 
          onChangeText={(userPassword) => setUserPassword(userPassword)}
          autoCapitalize="none"
          autoCorrect={false}>
        </TextInput>
        <TextInput
          style={styles.textInput}
          placeholder="Confirm Password"
          placeholderTextColor="grey" 
          onChangeText={(userCPassword) => setUserCPassword(userCPassword)}
          autoCapitalize="none"
          autoCorrect={false}>
        </TextInput>

        <TouchableOpacity
          onPress={() => register(userName, userEmail, userPassword, userPhoneNo,userCity)}
          style={styles.button}>
          <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'black' }}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{ marginTop: 20, alignSelf: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#fc8c19' }}>Have an account? Login</Text>
        </TouchableOpacity>
        { isloading == true?
        <View style={{position:'absolute',alignSelf:'center',justifyContent:'center',alignItems:'center',zIndex:2,top:'50%'}}>
        <ActivityIndicator size={70} color={primary}/>
        </View>:null}
      
</>
      </View>
    </View>
  )
}

export default Registration


const styles = StyleSheet.create({
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
    width: 400,
    fontSize: 16,
    color:'black',
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
  }
})

