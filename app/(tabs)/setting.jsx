import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { borderRadius, colors, fonts, shadows, spaces } from '../../constands/appConstand'
import FormField from '../../components/customForm/formField'
import CustomTouchableButton from '../../components/customButtons/customTouchableButton'
import camIcon from "../../assets/icons/cam.png";
import userAvatar from "../../assets//images/userAvatar1.png"

const Setting = () => {
   const [values , setValues ] = useState({userName:"Egemen",email:"user2@gmail.com",password:"123123"}) 
   
   const imgPickerClick = () => {

   }

   const onSave = () => {

   }

  return (
      <SafeAreaView style={styles.safeView}>
            <ScrollView contentContainerStyle = {styles.contentScroll}>
                    <View style={styles.headerTextWrapper}>
                     <Text style={styles.headerText}>Setting</Text>
                    </View> 
                    <TouchableOpacity style={styles.avatarWrapper} onPress={imgPickerClick}>
                           <Image style={styles.avatarImg} source={userAvatar}/>
                           <Image style={styles.avatarIcon} source={camIcon} /> 
                    </TouchableOpacity>
                    <FormField labelText='UserName' textInputStyle={styles.formText} containerStyle={styles.formContainer}  value={values.userName} onChange={value => {return setValues(oldState => {return {...oldState,userName:value}})}} placeholder={"UserName"} focusColor={colors.primary} />
                    <FormField labelText='E-Mail' textInputStyle={styles.formText} containerStyle={styles.formContainer}  value={values.email} onChange={value => {return setValues(oldState => {return {...oldState,userName:value}})}} placeholder={"E-Mail"} focusColor={colors.primary} keyboardType={"email-address"} />
                    <FormField labelText='Password' isEditable={false} textInputStyle={styles.formText} containerStyle={styles.formContainer}  value={values.password} onChange={value => {return setValues(oldState => {return {...oldState,password:value}})}} placeholder={"Password"} focusColor={colors.primary} />
                    <CustomTouchableButton onPress={onSave} text={"Save"} buttonStyle={styles.buttonContainer} textStyle={styles.buttonText} />
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
     avatarWrapper : {
         position:"relative",width:120,height:120,justifyContent:"center",alignItems:"center",marginBottom:spaces.middle
     },
     avatarImg : {
          width:100,height:100,resizeMode:"contain",borderStyle:"dotted",borderWidth:1,borderColor:colors.text,borderRadius:borderRadius.circleRadius(100),
     },
     avatarIcon : {
          width:40,height:40,fontSize:fonts.smallFontSize,fontWeight:fonts.smallFontWeight,tintColor:colors.text,resizeMode:"contain",position:"absolute",right:5,top:75
     },
     formContainer:{
         marginBottom:spaces.high
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

export default Setting