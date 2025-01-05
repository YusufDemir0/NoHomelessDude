/*import React, { useState } from 'react';
import { View, TextInput, Button, DeviceEventEmitter, Text } from 'react-native';

// Veritabanına yeni post ekleme fonksiyonu (örnek olarak burada kullanılıyor)
const addPost = (content, latitude, longitude, callback) => {
  // Bu kısmı gerçek veritabanı işlemi ile değiştirebilirsiniz
  // Örneğin, SQLite veya bir API ile post ekleyebilirsiniz
  const result = { insertId: Math.floor(Math.random() * 1000) }; // Simüle edilen sonuç
  callback(result);
};

// Yeni post yayınlama fonksiyonu
const broadcastNewPost = (post) => {
  DeviceEventEmitter.emit('NEW_POST', post);
};

const NewPost = () => {
  const [content, setContent] = useState('');

  // Yeni postu eklemek ve yayımlamak için kullanılan işlev
  const handleAddPost = () => {
    const latitude = 37.7749; // Örnek konum
    const longitude = -122.4194;

    // Veritabanına yeni post ekleniyor
    addPost(content, latitude, longitude, (result) => {
      console.log('Yeni post eklendi:', result.insertId);

      // Yeni post, DeviceEventEmitter ile yayınlanıyor
      broadcastNewPost({
        id: result.insertId,
        content,
        latitude,
        longitude,
      });
    });
  };

  return (
    <View>
      <TextInput
        placeholder="Bir şeyler yaz..."
        value={content}
        onChangeText={setContent}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <Button title="Post Paylaş" onPress={handleAddPost} />
    </View>
  );
};

export default NewPost;
*/
