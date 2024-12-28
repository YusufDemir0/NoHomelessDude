import React, { useState, useEffect } from 'react';
import { View, Button, Text, Alert, Platform, NetInfo } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import { useIsConnected } from 'react-native-offline'; // Library to detect internet connectivity

const PostWithNfc = () => {
  const [post, setPost] = useState(null);
  const [nfcData, setNfcData] = useState(null);
  const isConnected = useIsConnected(); // Use hook to check internet connection

  useEffect(() => {
    NfcManager.start();
    NfcManager.setEventListener('stateChange', 'onStateChange', (state) => {
      console.log('NFC Durumu:', state);
    });

    return () => {
      NfcManager.stop();
      NfcManager.setEventListener('stateChange', 'off');
    };
  }, []);

  const sharePostWithNfc = () => {
    const newPost = {
      id: 1,
      content: 'Bu bir örnek post! İhtiyacınız var mı?',
      latitude: 37.7749,
      longitude: -122.4194,
    };
    
    // Check if NFC is available
    NfcManager.requestTechnology(NfcTech.NfcA)
      .then(() => {
        NfcManager.writeNfcTag({
          content: newPost.content,
          latitude: newPost.latitude,
          longitude: newPost.longitude,
        });
        setPost(newPost);
        alert('Post NFC etiketiyle paylaşıldı');
      })
      .catch((err) => console.error('NFC Yazma Hatası:', err));
  };

  const readNfcTag = () => {
    NfcManager.requestTechnology(NfcTech.NfcA)
      .then(() => {
        NfcManager.readNfcTag().then((tag) => {
          setNfcData(tag);
          console.log('Okunan NFC Tag:', tag);
          alert('NFC tag okundu. Post detayları görüntüleniyor.');
        });
      })
      .catch((err) => console.error('NFC Okuma Hatası:', err));
  };

  const handlePostTransfer = () => {
    if (!isConnected) {
      Alert.alert(
        'İnternet Bağlantısı Yok',
        'NFC ile yakındaki cihazlara paylaşmak ister misiniz?',
        [
          {
            text: 'Evet',
            onPress: () => {
              sharePostWithNfc();
            },
          },
          { text: 'Hayır', onPress: () => console.log('User chose not to share via NFC') },
        ]
      );
    } else {
      Alert.alert('İnternet Bağlantısı Var', 'Post NFC ile paylaşılacak!', [
        { text: 'Tamam', onPress: () => sharePostWithNfc() },
      ]);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Postu NFC ile Paylaş" onPress={handlePostTransfer} />
      <Button title="NFC Etiketini Oku" onPress={readNfcTag} />
      
      {nfcData && (
        <View>
          <Text>Post İçeriği: {nfcData.content}</Text>
          <Text>Konum: Lat: {nfcData.latitude}, Lon: {nfcData.longitude}</Text>
        </View>
      )}

      {post && (
        <View>
          <Text>Paylaşılan Post İçeriği: {post.content}</Text>
          <Text>Konum: Lat: {post.latitude}, Lon: {post.longitude}</Text>
        </View>
      )}
    </View>
  );
};

export default PostWithNfc;
