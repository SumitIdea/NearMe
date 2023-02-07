import { StyleSheet,SafeAreaView, FlatList, Text, StatusBar,TouchableOpacity,Image, Alert, View } from 'react-native'
import React,{useEffect,useState} from 'react'
import database from '@react-native-firebase/database';



const Item = ({title, gender}) => (
  // <View style={styles.item}>
  //   <Text style={styles.title}>{title}</Text>
  // </View>
  <TouchableOpacity
  style={styles.card}
  onPress={() => {
    clickEventListener()
  }}>
  <View style={styles.cardHeader}>
    <Image
      style={styles.icon}
      source={{ uri: 'https://img.icons8.com/flat_round/64/000000/hearts.png' }}
    />
  </View>
  <Image style={styles.userImage} 
  // source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar7.png' }} />

  source={  gender === 'Male'
  ? {uri: 'https://bootdey.com/img/Content/avatar/avatar7.png'}
  : {uri: 'https://img.freepik.com/premium-vector/face-cute-girl-avatar-young-girl-portrait-vector-flat-illustration_192760-82.jpg?w=740'} }
/>
  <View style={styles.cardFooter}>
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.name}>{title}</Text>
      <Text style={styles.position}>{gender}</Text>
      <TouchableOpacity
        style={styles.followButton}
        onPress={() => clickEventListener()}>
        <Text style={styles.followButtonText}>Follow</Text>
      </TouchableOpacity>
    </View>
  </View>
</TouchableOpacity>
);

const clickEventListener = () => {
  Alert.alert('Option selected')
}


const Explore = () => {
  const [getName, setName] = useState([])

  useEffect(() => {

    const fetchData = async () => {
  
      const userData =database().ref('/User_SignUp')
      const data = userData.on('value', snapshot => {
        setName([]);
        snapshot.forEach(function(childSnapshot) {
          setName(users_name => [...users_name, childSnapshot.val()])
          // console.log("name....",childSnapshot.val());

        });
      })
    };
    fetchData();
  }, []);

 

  return (
    <SafeAreaView style={styles.container}>
    <FlatList
      data={getName}
      style={styles.list}
      contentContainerStyle={styles.listContainer}
      horizontal={false}
      numColumns={2}
      keyExtractor={item => {
        return item.id
      }}
      renderItem={({item}) => <Item title={item.userName} gender={item.gender}/>}
      // keyExtractor={(item, index) => {
      //   return index.toString()
      // }}    
      />
  </SafeAreaView>
  )
}

export default Explore

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: '#E6E6E6',
  },
  listContainer: {
    alignItems: 'center',
  },
  /******** card **************/
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 5,
    backgroundColor: 'white',
    flexBasis: '46%',
    marginHorizontal: 5,
  },
  cardFooter: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  userImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    alignSelf: 'center',
    borderColor: '#DCDCDC',
    borderWidth: 3,
  },
  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: '#008080',
    fontWeight: 'bold',
  },
  position: {
    fontSize: 14,
    flex: 1,
    alignSelf: 'center',
    color: '#696969',
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  followButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  icon: {
    height: 20,
    width: 20,
  },
})