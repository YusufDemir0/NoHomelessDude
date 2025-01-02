import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { borderRadius, colors, fonts, shadows, spaces } from '../../constands/appConstand';
import FormField from '../../components/customForm/formField';
import CustomTouchableButton from '../../components/customButtons/customTouchableButton';
import camIcon from "../../assets/icons/cam.png";
import userAvatar from "../../assets/images/userAvatar1.png"; // Default avatar image
import * as ImagePicker from 'expo-image-picker'; // Expo Image Picker import
import { UserContext } from '../../managments/userManagment';

const Setting = () => {
  const {userState,setUserState} = useContext(UserContext)
  const [userData,setUserData] = useState({photo:userState.photo,username:userState.username,mail:userState.mail,password:userState.password})
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility for options

  // Fotoğraf değiştirme işlevi
  const imgPickerClick = async () => {
    setModalVisible(true); // Widget açılacak

    // Galeriye fotoğraf seçme iznini al
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access the camera roll is required!');
      return;
    }

    // Fotoğraf seçme işlemi
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.CameraType.Images, // Medya tipi olarak sadece resim seçiyoruz
      quality: 1,
    });

    // Eğer kullanıcı fotoğraf seçerse, avatar'ı güncelle
    if (!result.canceled) {
      setValues((oldState) => ({ ...oldState, avatar: { uri: result.assets[0].uri } }));
    }

    setModalVisible(false); // Widget kapatılır
  };

  // Fotoğrafı silme işlemi
  const onDeleteAvatar = () => {
    setValues((oldState) => ({ ...oldState, avatar: userAvatar }));
    setModalVisible(false); // Widget kapatılır
  };

  const onSave = () => {
    console.log('Saving data...', values);
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <ScrollView contentContainerStyle={styles.contentScroll}>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerText}>Setting</Text>
        </View>

        {/* Avatar Seçimi */}
        <TouchableOpacity style={styles.avatarWrapper} onPress={() => setModalVisible(true)}>
          <Image style={styles.avatarImg} source={(userData.photo === null || userData.photo === "") ? userAvatar : userData.photo } />
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

        <CustomTouchableButton onPress={onSave} text={"Save"} buttonStyle={styles.buttonContainer} textStyle={styles.buttonText} />
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
    resizeMode: "contain",
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
