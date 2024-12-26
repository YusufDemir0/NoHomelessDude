
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { borderRadius, colors, fonts, shadows, spaces } from '../../constands/appConstand'
import FormField from '../../components/customForm/formField'
import CustomTouchableButton from '../../components/customButtons/customTouchableButton'
import camIcon from "../../assets/icons/cam.png";
import userAvatar from "../../assets//images/userAvatar1.png"

const Share = () => {
    const [values , setValues ] = useState({adress:"******",description:"******",needs:[]}) 
   
    const imgPickerClick = () => {
 
    }
 
    const onSave = () => {
 
    }
 
   return (
       <SafeAreaView style={styles.safeView}>
             <ScrollView contentContainerStyle = {styles.contentScroll}>
                     <View style={styles.headerTextWrapper}>
                      <Text style={styles.headerText}>Share Post</Text>
                     </View> 
            
                     <FormField labelText='Adress' textInputStyle={styles.formText} inputWrapper={styles.formInput} containerStyle={styles.formContainer}  value={values.adress} onChange={value => {return setValues(oldState => {return {...oldState,adress:value}})}} placeholder={"Adress"} focusColor={colors.primary} />
                     <FormField labelText='Description' textInputStyle={styles.formText} inputWrapper={styles.formInput} containerStyle={styles.formContainer}  value={values.description} onChange={value => {return setValues(oldState => {return {...oldState,description:value}})}} placeholder={"Description"} focusColor={colors.primary} keyboardType={"email-address"} />
                    
                     <CustomTouchableButton onPress={onSave} text={"Send"} buttonStyle={styles.buttonContainer} textStyle={styles.buttonText} />
             </ScrollView>
       </SafeAreaView>
   )
 }
 
 const styles = StyleSheet.create({
      safeView : {
          width:"100%",height:"100%"
      },
      contentScroll : {
          width:"100%",height:"100%",
          alignItems:"center",
          backgroundColor:colors.background,
          paddingVertical:spaces.high,paddingHorizontal:spaces.middle
      },
      headerTextWrapper :{
         width:"100%"
      },
      headerText : {
         color:colors.text, fontSize:fonts.highFontSize,fontWeight:fonts.highFontWeight,paddingBottom:spaces.high
      },
      formContainer:{
          marginBottom:spaces.high,backgroundColor:"red"
      },
      formInput : {
            height: 100
      },
      formText:{
          fontSize:fonts.smallFontSize , fontWeight:fonts.smallFontWeight,color:colors.text
      },
      buttonContainer : {
              marginVertical : spaces.high,backgroundColor:colors.primary,elevation:shadows.smallShadow,
      },
      buttonText : {
              color:colors.background
      }
 }) 
 
export default Share