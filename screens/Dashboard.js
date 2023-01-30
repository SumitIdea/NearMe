import { StyleSheet, Text, View, Image, StatusBar, ToastAndroid, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef,useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { primary } from '../constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, AnimatedRegion, Circle } from 'react-native-maps'
import { firebase } from '@react-native-firebase/auth'
import database from '@react-native-firebase/database';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProfileScreen from './ProfileScreen';
import MyRoom from './MyRoom';
import Explore from './Explore';
// let itemsRef = database().ref('/User_Details');


const Dashboard = (route) => {
  var userLongitude = route.route.params.userLongitude
  var userLatitude = route.route.params.userLatitude
  var userlong = parseFloat(userLongitude)
  var userlat = parseFloat(userLatitude)
  console.log("..latlong.....",userlat+"::::::"+userlong+".........."+typeof(userlat));
 

  const navigation = useNavigation()
  const mapRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState({userlat,userlong}); 
  const [getName, setName] = useState('')

  // function FeedScreen() {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <Text>Feed!</Text>
  //     </View>
  //   );
  // }
  
  // function NotificationsScreen() {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <Text>Notifications!</Text>
  //     </View>
  //   );
  // }
  
  // function ProfileScreen() {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <Text>Profile!</Text>
  //     </View>
  //   );
  // }
  
  const Tab = createMaterialTopTabNavigator();
  
  function MyTabs() {
    return (
      <Tab.Navigator
        initialRouteName="MyRoom"
        screenOptions={{
          tabBarActiveTintColor: '#800000',
          tabBarLabelStyle: { fontSize: 14 },
          tabBarStyle: { backgroundColor: 'white' },
        }}
      >
        <Tab.Screen
          name="MyRoom"
          component={MyRoom}
          options={{ tabBarLabel: 'MyRoom' }}
        />
        <Tab.Screen
          name="Explore"
          component={Explore}
          options={{ tabBarLabel: 'Explore' }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ tabBarLabel: 'Profile' }}
        />
      </Tab.Navigator>
    );
  }

  useEffect (() => {
    database()
    .ref('/User_SignUp')
    .once('value')
    .then(snapshot => {
      console.log('User data: ', snapshot.val());
      // setName(snapshot.val().userName)
    });
    
  },[])

  const logOut = () => {
    Alert.alert(
      'wooME Alert',
      'Are you sure want to Logout ?',
      [
        {
          text: 'Cancel',
          onPress: () => { cancelable: true },
          style: 'cancel',
        },
        { text: 'OK', onPress: () => signOut() },
      ],
      { cancelable: false },
    );

  }

  signOut = () => {
    firebase.auth().signOut().then(() => {
      navigation.navigate('Login')
      ToastAndroid.showWithGravity(
        "user account logout successfully",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    })
      .catch(error => Alert.alert(error))
  }

  // useEffect(() => {
  //   itemsRef.on('value', snapshot => {
  //     let data = snapshot.val();
  //     const items = Object.values(data);
  //     console.log(",,,,dataaaa",items[0] );

  //     var userLongitude = items[0].userLongitude
  //     var userLatitude = items[0].userLatitude
  //     var long = parseFloat(userLongitude)
  //     var lat = parseFloat(userLatitude)
  //     setUserEmail(items[0].userEmailID);
  //     setCurrentLocation({lat, long})
  //     console.log(".......dd......", lat+" : "+long+"::::::"+userEmailId);

  //     console.log(".............", currentLocation);
  //   });

  // },[])

  useEffect(() => {
    //   if (mapRef.current) {
    //     mapRef.current.fitToCoordinates([
    //       {
    //         latitude: lat,
    //         longitude: long,
    //       },
    //     ], {
    //       edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    //       animated: true,
    //     });
    //   }
    // }, []);
    if (mapRef.current && currentLocation) {
      mapRef.current.fitToCoordinates([currentLocation], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [currentLocation]);


  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: primary }}>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#FED8B1" translucent={true} />

      <TouchableOpacity
        style={{ backgroundColor: primary }}
        onPress={() => logOut()}>
        <Image
          resizeMode='contain'
          source={{
            uri: 'https://img.icons8.com/ios-filled/512/logout-rounded-up.png',
          }}
          style={{
            width: 30,
            height: 30,
            borderRadius: 50,
            justifyContent: 'flex-end',
            alignContent: 'flex-end',
            alignSelf: 'flex-end',
            marginEnd: 20
          }}>

        </Image>
      </TouchableOpacity>

      <View style={{ justifyContent: 'space-evenly', backgroundColor: primary, alignItems: 'center', paddingVertical: 10, flexDirection: 'column' }}>


        <Image
          source={{
            uri: 'https://www.freelogoservices.com/api/main/images/1j+ojFVDOMkX9Wytexe43D6kh...SDrhFKnxvFwXs1M3EMoAJtlicsgfVu9Pg...',

          }}
          style={{ width: 250, height: 90, borderRadius: 50, marginTop: -40 }}>

        </Image>

        <View>
          {/* <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'grey' }}>{route.route.params.userEmail} */}
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'grey' }}>{getName}

          </Text>
        </View>

      </View>


        <MapView
          ref={mapRef}
          showsUserLocation={true}
          showsIndoors={true}
          zoomTapEnabled={true}
          showsScale={true}
          showsBuildings={true}
          zoomEnabled={true}
          followUserLocation={true}
          zoomControlEnabled={true}
          // onMapReady={zoomToLocation()}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          //  region={{
          //    latitude: 28.78825,
          //    longitude: 78.4324,
          //    latitudeDelta: 30.0015,
          //    longitudeDelta: 30.0121,
          //  }}
          initialRegion={{
            latitude: userlat,
            longitude: userlong,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {currentLocation &&
            (<>   
             <Circle
              center={{ latitude: userlat, longitude: userlong }}
              radius={1000}
              strokeColor="rgba(158, 158, 255, 1.0)"
              fillColor="rgba(158, 158, 255, 0.3)"
            />
              <Marker
                  //   image={{uri: 'https://www.freelogoservices.com/api/main/images/1j+ojFVDOMkX9Wytexe43D6kh...SDrhFKnxvFwXs1M3EMoAJtlicsgfVu9Pg...',
                  // }}
                  coordinate={{ latitude: userlat, longitude: userlong }}
                  // coordinate={currentLocation}
                  title={"My Location"}
                  description={"I am here"}
                  // pinColor="gold"
              >
                <Callout tooltip>

                  <View style={styles.bubble}>
                    {/* <Text>A short description</Text> */}
                    {/* <Image 
                  style={styles.image}
                  source={require('../assets/app_icon.png')}            
                  ></Image> */}
                    <Text style={{ height: 120, width: 120}}>
                    <Text style={styles.name}>Hello , Sumit</Text>

                      <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
                        resizeMode="center"
                        style={styles.image} />

                    </Text>


                  </View>
                  <View style={styles.arrowBorder} />
                  <View style={styles.arrow} />

                </Callout>

              </Marker>
            </>
            )}  
        </MapView>
        {/* <View style = {styles.container}>
         <View>
         <TouchableOpacity
            style={styles.button}>
            <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'black' }}>My Room</Text>
          </TouchableOpacity>
         </View>

         <View>
         <TouchableOpacity
            style={styles.button}>
            <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'black' }}>Explore</Text>
          </TouchableOpacity>
         </View>

         <View>
         <TouchableOpacity
            style={styles.button}
            onPress={()=>getProfile()}>
            <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'black' }}>Profile</Text>
          </TouchableOpacity>
         </View>

      </View> */}
   
                  

    <NavigationContainer
      independent={true}>
      <MyTabs />
    </NavigationContainer>

    </SafeAreaView>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fff'
 },
 button: {
  height: 50,
  width: 150,
  backgroundColor: '#fff',
  alignItems: 'center',
  alignSelf: 'center',
  justifyContent: 'center',
  borderRadius: 50,
},
  // container: {
  //   ...StyleSheet.absoluteFillObject,
  //   height: 400,
  //   width: 400,
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  // },
  map: {
    height: '30%',
    
    // ...StyleSheet.absoluteFillObject,

  },
  // Callout bubble
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 115,
    height:130
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    // marginBottom: -15
  },
  // Character name
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
  // Character image
  image: {
    width: 60,
    height: 50,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    backgroundColor: '#fff',
  },
})