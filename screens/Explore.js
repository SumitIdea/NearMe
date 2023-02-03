import { StyleSheet,SafeAreaView, FlatList, Text, StatusBar, View } from 'react-native'
import React,{useEffect,useState} from 'react'
import database from '@react-native-firebase/database';



const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

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
      renderItem={({item}) => <Item title={item.userName} />}
      keyExtractor={item => item.id}
    />
  </SafeAreaView>
  )
}

export default Explore

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
})