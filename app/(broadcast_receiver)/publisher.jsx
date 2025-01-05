import React from 'react';
import { DeviceEventEmitter, Text, View, Button } from 'react-native';

// Yeni post yayınlamak için fonksiyon
const broadcastNewPost = (post) => {
  DeviceEventEmitter.emit('NEW_POST', post);
};

// Yeni post yayınlama bileşeni
const PostBroadcaster = () => {
  const post = { postId: 1, content: 'Bu yeni bir post içerği.' };

  return (
    <View>
      <Text>Yeni Post Yayınlayıcı</Text>
      <Button
        title="Yeni Post Gönder"
        onPress={() => {
          broadcastNewPost(post); // Yeni postu yayınla
          console.log('Yeni post yayınlandı:', post);
        }}
      />
    </View>
  );
};

export default PostBroadcaster;
