import React, {useState, useEffect} from 'react';
import {FlatList, TextInput, View, Alert} from 'react-native';

import {ThreadRow, Separator} from '../components/ThreadRow';
import {listenToThreads, listenToThreadTracking} from '../firebase';

const isThreadUnread = (thread, threadTracking) => {
  console.log("...................thread", threadTracking);
  console.log(".....",
    threadTracking[thread._id] < thread.latestMessage.createdAt,
    thread.latestMessage.createdAt,
    threadTracking[thread._id],
  );
  if (
    threadTracking[thread._id] &&
    threadTracking[thread._id] < thread.latestMessage.createdAt
  ) {
    return true;
  }

  return false;
};

export default ({navigation}) => {
  const [threads, setThreads] = useState([]);
  const [threadTracking, setThreadTracking] = useState({});

  useEffect(() => {
    const unsubscribe = listenToThreads().onSnapshot(querySnapshot => {
      // console.log(querySnapshot.docs);
      const allThreads = querySnapshot.docs.map(snapshot => {
        return {
          _id: snapshot.id,
          name: '',
          latestMessage: {text: ''},
          ...snapshot.data(),
        };
      });

      setThreads(allThreads);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = listenToThreadTracking().onSnapshot(snapshot => {
      console.log("snapshot.......",snapshot);
      setThreadTracking(snapshot.data() || {});
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const handlerClick = () => {
    Alert.alert(
      'wooME Alert',
      'Are you sure want to Delete ?',
      [
        {
          text: 'Cancel',
          onPress: () => { cancelable: true },
          style: 'cancel',
        },
        { text: 'OK', onPress: () => "" },
      ],
      { cancelable: false },
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff', paddingBottom: 50}}>
      <FlatList
        data={threads}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <ThreadRow
            {...item}
            onPress={() => navigation.navigate('Messages', {thread: item})}
            onLongPress={()=>handlerClick()}
            unread={isThreadUnread(item, threadTracking)}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
    </View>
  );
};
