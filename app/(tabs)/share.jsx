import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { borderRadius, colors, fonts, shadows, spaces } from '../../constands/appConstand';
import FormField from '../../components/customForm/formField';
import CustomTouchableButton from '../../components/customButtons/customTouchableButton';
import deleteIcon from "../../assets/icons/delete.png";
import addIcon from "../../assets/icons/add.png";
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import NetInfo from '@react-native-community/netinfo';  
import { UserContext } from '../../managments/userManagment';

const Share = () => {
  const {userState} = useContext(UserContext)
  const [values, setValues] = useState({
    address: '',
    description: '',
    need: '',
    needs: [],
    location: null,
  });

  const router = useRouter(); 

  const onNeedsAdd = () => {
    if (values.need !== '') {
      setValues((oldState) => {
        const newNeeds = [...values.needs, values.need];
        return { ...oldState, needs: newNeeds, need: '' };
      });
    }
  };

  const onDeleteNeed = (deleteItemIndex) => {
    setValues((oldState) => {
      const newNeeds = oldState.needs.filter((_, index) => deleteItemIndex !== index);
      return { ...oldState, needs: newNeeds };
    });
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      Alert.alert('Konum İzni Verilmedi', 'Konum iznini vererek devam edin.');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setValues((oldState) => ({ ...oldState, location }));
    console.log('Location fetched:', location);
  };

  const onSend = async () => {
    console.log('Sending post with data:', values);

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        const jsonShareData = JSON.stringify({creator:{username:userState.username,photo:userState.photo},needs:values.needs,description:values.description,location:`${values.location.coords.latitude},${values.location.coords.longitude}`,address:""})
         fetch(`${process.env.BASE_URL}posts`,{
             method:"POST",
             body:jsonShareData,
             headers : {
                 "Content-Type":"application/json",
                 "Authorization":`Bearer ${userState.token}`
             }
         })
         .then(res => {
             return res.json()
         })
         .then(data => {
             console.log("share data : ",data) 
             setValues(oldState => {
                  return { address: '',description: '',need: '',needs: [],location: null}
             })
         })
         .catch(err => {
             console.log("err : ",err)
         })
      } else {
        Alert.alert('İnternet Bağlantısı Yok', 'NFC ekranına yönlendiriliyorsunuz.');
        router.push('/(connectivity)/nfc');
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <ScrollView contentContainerStyle={styles.contentScroll}>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerText}>Share Post</Text>
        </View>

       
        <FormField
          labelText="Description"
          textInputStyle={styles.formText}
          inputWrapper={styles.formInput}
          containerStyle={styles.formContainer}
          value={values.description}
          onChange={(value) =>
            setValues((oldState) => ({ ...oldState, description: value }))
          }
          placeholder="Description"
          focusColor={colors.primary}
          textAlignVertical="top"
          multiLine={true}
        />

        
        <FormField
          labelText="Needs"
          textInputStyle={styles.formText}
          containerStyle={styles.formContainer}
          value={values.need}
          onChange={(value) => setValues((oldState) => ({ ...oldState, need: value }))}
          placeholder="Need"
          focusColor={colors.primary}
          rightIcon={addIcon}
          onRightIconClick={onNeedsAdd}
        />

        <ScrollView
          style={styles.needsScrollView}
          contentContainerStyle={styles.needsScrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {values.needs.map((need, index) => (
            <View key={index} style={styles.needWrapper}>
              <Text numberOfLines={2} style={styles.needText}>
                {need}
              </Text>
              <TouchableOpacity onPress={() => onDeleteNeed(index)}>
                <Image style={styles.needIcon} source={deleteIcon} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

       
        <CustomTouchableButton
          onPress={getLocation}
          text="Get Location"
          buttonStyle={styles.buttonContainer}
          textStyle={styles.buttonText}
        />
        {values.location && (
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: values.location.coords.latitude,
                longitude: values.location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: values.location.coords.latitude,
                  longitude: values.location.coords.longitude,    
                }}
                title="Current Location"
                description={`Latitude: ${values.location.coords.latitude}, Longitude: ${values.location.coords.longitude}`}
              />
            </MapView>
            <Text style={styles.locationText}>
              Location: {values.location.coords.latitude}, {values.location.coords.longitude}
            </Text>
          </View>
        )}

       
        <CustomTouchableButton
          onPress={onSend}
          text="Share"
          buttonStyle={styles.buttonContainer}
          textStyle={styles.buttonText}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    width: '100%',
    height:"100%",
    backgroundColor: colors.background,
  },
  contentScroll: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: spaces.high,
    paddingHorizontal: spaces.middle,
  },
  headerTextWrapper: {
    width: '100%',
  },
  headerText: {
    color: colors.text,
    fontSize: fonts.highFontSize,
    fontWeight: fonts.highFontWeight,
    paddingBottom: spaces.high,
  },
  formContainer: {
    marginBottom: spaces.high,
    elevation: shadows.smallShadow,
  },
  formInput: {
    height: 80,
  },
  formText: {
    fontSize: fonts.smallFontSize,
    fontWeight: fonts.smallFontWeight,
    color: colors.text,
  },
  needsScrollView: {
    width: '100%',
    maxHeight: 180,
  },
  needsScrollViewContent: {
    paddingHorizontal: spaces.high,
  },
  needWrapper: {
    width: '100%',
    height: 50,
    marginBottom: spaces.middle,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spaces.small,
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.middleRadius,
    elevation: shadows.smallShadow,
  },
  needIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: colors.primary,
  },
  needText: {
    flex: 1,
  },
  buttonContainer: {
    marginVertical: spaces.middle,
    backgroundColor: colors.primary,
    elevation: shadows.smallShadow,
  },
  buttonText: {
    color: colors.background,
  },
  locationText: {
    marginTop: spaces.middle,
    color: colors.text,
    fontSize: fonts.smallFontSize,
  },
  mapContainer: {
    width: '100%',
    height: 250,
    marginTop: spaces.high,
    borderRadius: borderRadius.smallRadius,
    overflow: 'hidden',
    elevation: shadows.smallShadow,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Share;