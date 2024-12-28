import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { borderRadius, colors, fonts, shadows, spaces } from '../../constands/appConstand';
import FormField from '../../components/customForm/formField';
import CustomTouchableButton from '../../components/customButtons/customTouchableButton';
import deleteIcon from "../../assets/icons/delete.png";
import addIcon from "../../assets/icons/add.png";
import * as Location from 'expo-location';

const Share = () => {
  const [values, setValues] = useState({
    adress: '',
    description: '',
    need: '',
    needs: [],
    location: null,
  });

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
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setValues((oldState) => ({ ...oldState, location }));
    console.log('Location fetched:', location);
  };

  const onSend = () => {
    console.log('Sending post with data:', values);
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <ScrollView contentContainerStyle={styles.contentScroll}>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerText}>Share Post</Text>
        </View>

        {/* Text Input Section */}
        <FormField
          labelText="Adress"
          textInputStyle={styles.formText}
          inputWrapper={styles.formInput}
          containerStyle={styles.formContainer}
          value={values.adress}
          onChange={(value) =>
            setValues((oldState) => ({ ...oldState, adress: value }))
          }
          placeholder="Adress"
          focusColor={colors.primary}
          textAlignVertical="top"
          multiLine={true}
        />

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

        {/* Form Section */}
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

        {/* Location Section */}
        <CustomTouchableButton
          onPress={getLocation}
          text="Get Location"
          buttonStyle={styles.buttonContainer}
          textStyle={styles.buttonText}
        />
        {values.location && (
          <Text style={styles.locationText}>
            Location: {values.location.coords.latitude}, {values.location.coords.longitude}
          </Text>
        )}

        {/* Submit Button */}
        <CustomTouchableButton
          onPress={onSend}
          text="Send"
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
    height: '100%',
  },
  contentScroll: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.background,
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
});

export default Share;
