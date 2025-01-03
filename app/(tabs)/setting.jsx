import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, Alert } from 'react-native';
import React, { useCallback, useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { borderRadius, colors, fonts, shadows, spaces } from '../../constands/appConstand';
import FormField from '../../components/customForm/formField';
import CustomTouchableButton from '../../components/customButtons/customTouchableButton';
import camIcon from "../../assets/icons/cam.png";
import avatar from "../../assets/images/defaultAvatar.png"; 
import * as ImagePicker from 'expo-image-picker'; 
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator'; 
import { UserContext } from '../../managments/userManagment';
import { useFocusEffect } from 'expo-router';

const Setting = () => {
  const { userState, setUserState } = useContext(UserContext);
  const [userData, setUserData] = useState({
    photo: userState.photo,
    username: userState.username,
    mail: userState.mail,
    password: userState.password,
  });

  useFocusEffect(useCallback(()=> {
              setUserData(oldState => {
                   return {
                    photo: userState.photo,
                    username: userState.username,
                    mail: userState.mail,
                    password: userState.password,
                  }
              })
  },[]))

  const [modalVisible, setModalVisible] = useState(false); 

  const compressAndConvertToBase64 = async (uri) => {
    try {
      const manipulatedImage = await manipulateAsync(
        uri,
        [{ resize: { width: 200 } }],
        { compress: 0.7, format: SaveFormat.JPEG } 
      );

      const response = await fetch(manipulatedImage.uri);
      const blob = await response.blob();
      return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Image compression failed:', error);
      return null;
    }
  };

  const imgPickerClick = async () => {
    setModalVisible(false);

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access the camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const base64Photo = await compressAndConvertToBase64(result.assets[0].uri);
      if (base64Photo) {
        console.log("new base64 : ",base64Photo)
        setUserData((oldState) => ({ ...oldState, photo: base64Photo }));
      }
    }
  };

  const onDeleteAvatar = () => {
    setUserData((oldState) => ({ ...oldState, photo: "" }));
    setModalVisible(false);
  };

  const getImageSource = (base64String) => {
    return base64String ? { uri: `data:image/jpeg;base64,${base64String}` } : avatar;
  };

  const onSave =  () => {
    let jsonFormData = "" ;
    if(userData.photo === null)
    {
       jsonFormData = JSON.stringify({username:userData.username,password:userData.password})  
    }
       jsonFormData = JSON.stringify({username:userData.username,password:userData.password,photo:userData.photo}) 
       console.log("jsonFormData : ",jsonFormData) 
       console.log("user token : ",userState.token) 
       console.log("url  : ",`${process.env.BASE_URL}users/${userState.mail}`) 
    fetch(`${process.env.BASE_URL}users/${userState.mail}`,{
        method:"PUT",
        body:jsonFormData,
        headers:{
           "Content-Type":"application/json",
           "Authorization":`Bearer ${userState.token}`
        }
    }) 
    .then(res => {
        return res.json()
    })
    .then(data => {
         console.log("setting data : ",data)
         setUserState(oldState => {
             return {...oldState , username:userData.username,photo:userData.photo,password:userData.password}
         })
    })
    .catch(err => {
        console.log("err : ",err)
    })
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <ScrollView contentContainerStyle={styles.contentScroll}>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerText}>Setting</Text>
        </View>

        {/* Avatar Seçimi */}
        <TouchableOpacity style={styles.avatarWrapper} onPress={() => setModalVisible(true)}>
          <Image
            style={styles.avatarImg}
            source={getImageSource(userData.photo)}
          />
          <Image style={styles.avatarIcon} source={camIcon} />
        </TouchableOpacity>

        {/* Avatar Seçim / Silme seçeneklerini içeren widget */}
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Select an action</Text>
              <TouchableOpacity onPress={onDeleteAvatar} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={imgPickerClick} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Change</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Form Fields */}
        <FormField
          labelText="UserName"
          textInputStyle={styles.formText}
          containerStyle={styles.formContainer}
          value={userData.username}
          onChange={(value) => {
            setUserData((oldState) => ({ ...oldState, username: value }));
          }}
          placeholder={"UserName"}
          focusColor={colors.primary}
        />

        <FormField
          labelText="E-Mail"
          isEditable={false}
          textInputStyle={styles.formText}
          containerStyle={styles.formContainer}
          value={userData.mail}
          placeholder={"E-Mail"}
          focusColor={colors.primary}
          keyboardType={"email-address"}
        />

        <FormField
          labelText="Password"
          textInputStyle={styles.formText}
          containerStyle={styles.formContainer}
          value={userData.password}
          onChange={(value) => {
            setUserData((oldState) => ({ ...oldState, password: value }));
          }}
          placeholder={"Password"}
          focusColor={colors.primary}
        />

        <CustomTouchableButton
          onPress={onSave}
          text={"Save"}
          buttonStyle={styles.buttonContainer}
          textStyle={styles.buttonText}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    width: "100%",
    height: "100%",
  },
  contentScroll: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: colors.background,
    paddingVertical: spaces.high,
    paddingHorizontal: spaces.middle,
  },
  headerTextWrapper: {
    width: "100%",
  },
  headerText: {
    color: colors.text,
    fontSize: fonts.highFontSize,
    fontWeight: fonts.highFontWeight,
    paddingBottom: spaces.high,
  },
  avatarWrapper: {
    position: "relative",
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spaces.middle,
  },
  avatarImg: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderStyle: "dotted",
    borderWidth: 1,
    borderColor: colors.text,
    borderRadius: borderRadius.circleRadius(100),
  },
  avatarIcon: {
    width: 40,
    height: 40,
    fontSize: fonts.smallFontSize,
    fontWeight: fonts.smallFontWeight,
    tintColor: colors.text,
    resizeMode: "contain",
    position: "absolute",
    right: 5,
    top: 75,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: colors.background,
    padding: spaces.middle,
    borderRadius: borderRadius.mediumRadius,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: fonts.mediumFontSize,
    marginBottom: spaces.middle,
    color: colors.text,
  },
  modalButton: {
    padding: spaces.small,
    marginVertical: spaces.small,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.smallRadius,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: colors.background,
    fontSize: fonts.mediumFontSize,
  },
  formContainer: {
    marginBottom: spaces.high,
  },
  formText: {
    fontSize: fonts.smallFontSize,
    fontWeight: fonts.smallFontWeight,
    color: colors.text,
  },
  buttonContainer: {
    marginVertical: spaces.high,
    backgroundColor: colors.primary,
    elevation: shadows.smallShadow,
  },
  buttonText: {
    color: colors.background,
  },
});

export default Setting;