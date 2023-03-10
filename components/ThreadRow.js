import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity,Image} from 'react-native';

const styles = StyleSheet.create({
  row: {
    paddingRight: 10,
    paddingLeft: 5,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flexShrink: 1,
    marginStart:5
  },
  header: {
    flexDirection: 'row',
  },
  nameText: {
    fontWeight: '600',
    fontSize: 18,
    color: '#000',
  },
  dateText: {},
  contentText: {
    color: '#949494',
    fontSize: 16,
    marginTop: 2,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
    marginRight: 5,
  },
  dotUnread: {
    backgroundColor: '#2196F3',
  },
  separator: {
    backgroundColor: '#eee',
    height: 1,
    flex: 1,
    marginLeft: 20,
  },
  userPic: {
    height: 40,
    width: 40,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
});

export const Separator = () => <View style={styles.separator} />;

export const ThreadRow = ({name, latestMessage, unread, onPress, onLongPress}) => (
  
  <TouchableOpacity onPress={onPress}
   onLongPress={onLongPress}>
    <View style={styles.row}>
      {unread ? (
        <View style={[styles.dot, styles.dotUnread]} />
      ) : (
        <View style={styles.dot} />
      )}
            <Image source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar1.png'}} style={styles.userPic} />

      <View style={styles.content}>

        <View style={styles.header}>
          <Text style={styles.nameText}>{name}</Text>
        </View>
        <Text style={styles.contentText}>
          {latestMessage.text.slice(0, 90)}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);
