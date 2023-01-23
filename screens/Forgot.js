import { StyleSheet,Alert,ActivityIndicator, Text, TextInput, TouchableOpacity,ToastAndroid, View,StatusBar,Image } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '@react-native-firebase/auth'
import { primary } from '../constants/Colors';


const Forgot = () => {
    const navigation = useNavigation()
    const [email, setEmail]= useState('')
    const [isloading, setloading]= useState(false)


    const forgotPassword = async( email) => {
        if(email=='')
        {
          Alert.alert('Please Enter Email Id!')
        }else{
            setloading(true)      
            firebase.auth().sendPasswordResetEmail(email)
            .then(function (user) {
            alert('Please check your email...')
            setloading(false)
            setEmail('')

            }).catch(function (e) {
                setloading(false)
                alert(e)
            console.log(e)
            })
           
    }
}
    return (
        <View style={styles.conatiner}>
        <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#FED8B1" translucent = {true}/>
    
    <Image style={{fontWeight:'bold', fontSize:26, marginBottom:20,width:200,height:50}}
    source={{
      uri: 'https://www.freelogoservices.com/api/main/images/1j+ojFVDOMkX9Wytexe43D6kh...SDrhFKnxvFwXs1M3EMoAJtlicsgfVu9Pg...',
    }}   >
    </Image>
    
    <View style={styles.card}>
    <>
    {/* back button */}
    <View style={{flexDirection:"row",alignItems:'center',justifyContent:'center'}}>
        <Text style={{flex:.8, fontWeight:'bold'}}>Forgot Password</Text>
        <TouchableOpacity style={{flex:.2,alignItems:'center',justifyContent:'center'}} 
           onPress={()=> navigation.navigate('Login')}
>
        <Image     
        source={{uri:"https://creazilla-store.fra1.digitaloceanspaces.com/icons/3204354/arrow-back-icon-md.png"}}
        resizeMode='contain' style={{width:35, height:25 }} />
    </TouchableOpacity>
    </View>
   
    <TextInput
    style={styles.textInput}
    placeholder="Email"
    onChangeText={(email) => setEmail(email)}
    autoCapitalize="none"
    autoCorrect={false}>
    </TextInput>    
    {/* <TextInput
    style={styles.textInput}
    placeholder="Mobile No"
    // onChangeText={(email) => setEmail(email)}
    autoCapitalize="none"
    autoCorrect={false}>
    </TextInput> */}

    
    <TouchableOpacity
    onPress={()=>forgotPassword(email)}
    style={styles.button}>
    <Text style={{fontWeight:'bold', fontSize:22, color:'black'}}>Send</Text>
    </TouchableOpacity>
    
    
    {/* <TouchableOpacity
    onPress={()=> navigation.navigate('Login')}
    style={{marginTop:20, alignSelf:'center'}}>
    <Text style={{fontWeight:'bold', fontSize:16, color:'#fc8c19'}}></Text>
    </TouchableOpacity> */}
   { isloading == true?
        <View style={{position:'absolute',alignSelf:'center',justifyContent:'center',alignItems:'center',zIndex:2,top:'50%'}}>
        <ActivityIndicator size={70} color={primary}/>
        </View>:null}
      
</>
    </View>
    </View>
    )
    }
    
    export default Forgot
    
    
    const styles = StyleSheet.create({
    conatiner:{
    flex:1,
    backgroundColor:'#FED8B1',
    justifyContent:'center',
    alignItems:'center',
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
    textInput:{
    paddingTop:20,
    paddingBottom:10,
    width:400,
    fontSize:16,
    borderBottomColor:'#000',
    borderBottomWidth: 1,
    marginBottom:20,
    textAlign:'center'
    },
    button:{
    marginTop:50,
    height:50,
    width:150,
    backgroundColor:'#FED8B1',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
    borderRadius:50,
    }
    })
    
    