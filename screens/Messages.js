import React, {useState, useEffect} from 'react';
import {View,Image,StyleSheet,TouchableOpacity} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';

import {
  listenToMessages,
  createMessage,
  currentUser,
  markThreadLastRead,
} from '../firebase';

export default ({route}) => {
  const [messages, setMessages] = useState([]);
  const user = currentUser();
  const thread = route?.params?.thread || {};

  useEffect(() => {
    const unsubscribe = listenToMessages(thread._id).onSnapshot(
      querySnapshot => {
        const formattedMessages = querySnapshot.docs.map(doc => {
          return {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            user: {},
            ...doc.data(),
          };
        });

        setMessages(formattedMessages);
      },
    );

    return () => {
      unsubscribe();
      markThreadLastRead(thread._id);
    };
  }, []);

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>

{/* <Image source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar1.png'}} style={styles.userPic} /> */}

      <GiftedChat
        messages={messages}
        onSend={newMessages => {
          const text = newMessages[0].text;

          createMessage(thread._id, text);
        }}
        alwaysShowSend
        showUserAvatar
        isAnimated
        showAvatarForEveryMessage
        renderActions={() => (
          <TouchableOpacity style={{ padding: 10 }} >
            <Image  style={styles.userPic}   
             source={{ uri: 'https://w7.pngwing.com/pngs/529/527/png-transparent-computer-icons-emoticon-smiley-sad-emoji-miscellaneous-cdr-face.png' }} />
          </TouchableOpacity>
        )}
        user={{
          _id: user.uid,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
userPic: {
  height: 25,
  width: 25,
  borderRadius: 20,
  backgroundColor: '#f8f8f8',
},
})