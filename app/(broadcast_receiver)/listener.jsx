import React, { useEffect } from 'react';
import { DeviceEventEmitter, Text, View, Button } from 'react-native';

// Yeni postları dinlemek için custom hook
const useNewPostListener = (callback) => {
  useEffect(() => {
    // Yeni postları dinlemeye başla
    const listener = DeviceEventEmitter.addListener('NEW_POST', callback);

    // Component unmount olduğunda listener'ı kaldır
    return () => {
      listener.remove();
    };
  }, [callback]);
};

// Yeni postlar için dinleyici bileşeni
const NewPostListenerComponent = () => {
  const handleNewPost = (postData) => {
    console.log('Yeni post geldi:', postData);
  };

  // Hook'u kullanarak yeni postları dinle
  useNewPostListener(handleNewPost);

  return (
    <View>
      <Text>Yeni Post Dinleyicisi</Text>
      <Button
        title="Post Gönder"
        onPress={() => {
          // Yeni post göndermek için örnek bir event yayma
          DeviceEventEmitter.emit('NEW_POST', { postId: 1, content: 'Yeni post içerği' });
        }}
      />
    </View>
  );
};

export default NewPostListenerComponent;
