import React, { useState, useEffect } from 'react';
import { View, Button, Text, Platform } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

const PostWithNfc = () => {
  const [post, setPost] = useState(null);
  const [nfcData, setNfcData] = useState(null);

  useEffect(() => {
    // NFC Manager'ı başlat
    NfcManager.start();
    NfcManager.setEventListener('stateChange', 'onStateChange', (state) => {
      console.log('NFC Durumu:', state);
    });

    // Cleanup NFC Manager
    return () => {
      NfcManager.stop();
      NfcManager.setEventListener('stateChange', 'off');
    };
  }, []);

  // Postu NFC etiketiyle paylaşmak
  const sharePostWithNfc = () => {
    const newPost = {
      id: 1,
      content: 'Bu bir örnek post! İhtiyacınız var mı?',
      latitude: 37.7749,
      longitude: -122.4194,
    };
    
    // Burada NFC etiketi üzerine veriyi yazmak
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

  // NFC etiketi okuma
  const readNfcTag = () => {
    NfcManager.requestTechnology(NfcTech.NfcA)
      .then(() => {
        NfcManager.setEventListener('stateChange', 'onStateChange', (state) => {
          console.log('NFC Durumu:', state);
        });

        // NFC tag'ini oku
        NfcManager.readNfcTag().then((tag) => {
          setNfcData(tag);
          console.log('Okunan NFC Tag:', tag);
          alert('NFC tag okundu. Post detayları görüntüleniyor.');
        });
      })
      .catch((err) => console.error('NFC Okuma Hatası:', err));
  };

  // Kaybolan postu paylaşan kişi yakınlarındaki kişilere aktaracak
  const handlePostTransfer = () => {
    // Burada NFC aracılığıyla post aktarımı yapılacak. 
    // Paylaşılan postu başka kişilere aktarma için NFC etiketini okutmaya başla.
    sharePostWithNfc();
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
