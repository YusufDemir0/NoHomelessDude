/*import React, { useEffect, useState } from 'react';
import { View, Text, DeviceEventEmitter } from 'react-native';

// Veritabanından tüm postları getiren fonksiyon
const getPosts = (setPosts) => {
  // Bu kısmı gerçek veritabanı işlemi ile değiştirebilirsiniz
  const mockPosts = [
    { id: 1, content: 'İlk post', latitude: 37.7749, longitude: -122.4194 },
    { id: 2, content: 'İkinci post', latitude: 40.7128, longitude: -74.0060 },
  ];
  setPosts(mockPosts);
};

// Yeni postları dinlemek için fonksiyon
const listenForNewPosts = (callback) => {
  DeviceEventEmitter.addListener('NEW_POST', callback);
};

// Dinleyiciyi temizlemek için fonksiyon
const removeNewPostListener = () => {
  DeviceEventEmitter.removeAllListeners('NEW_POST');
};

const PostFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Veritabanından tüm postları çek
    getPosts(setPosts);

    // Yeni postları dinle
    const newPostListener = (newPost) => {
      console.log('Yeni post alındı:', newPost);
      setPosts((prevPosts) => [...prevPosts, newPost]);
    };
    listenForNewPosts(newPostListener);

    // Dinleyiciyi temizle
    return () => removeNewPostListener();
  }, []);

  return (
    <View>
      {posts.map((post) => (
        <Text key={post.id}>
          {post.content} (Lat: {post.latitude}, Lon: {post.longitude})
        </Text>
      ))}
    </View>
  );
};

export default PostFeed;*/
