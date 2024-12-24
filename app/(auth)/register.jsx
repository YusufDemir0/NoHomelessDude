

import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomTouchableButton from '../../components/customButtons/customTouchableButton'
import FormField from '../../components/customForm/formField'
import { Link } from 'expo-router'
import {colors,fonts,spaces,} from "../../constands/appConstand"

const Register = () => {
 
const [formState , setFormState ] = useState({userName:"",email:"",password:""});

 const onSubmit = () => {

 } 

  return (
    <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.scrollVw}>
                <View style={styles.content}>
                      <Text style={styles.header}>Join Us</Text>
                      <Text style={styles.subTitle}>Create an account to get started.</Text>
                      <FormField labelText='UserName' placeholder={"UserName"} onChange={value => {setFormState(oldState => {
                         return {...oldState,userName:value}
                      })}} focusColor={colors.primary} containerStyle={styles.formContainerStyle} textInputStyle={styles.formLabelStyle} />
                     <FormField value={formState.email} labelText='E-mail' keyboardType="email-address" placeholder={"E-mail"} onChange={value => {setFormState(oldState => {
                         return {...oldState,email:value}
                      })}} focusColor={colors.primary} containerStyle={styles.formContainerStyle} textInputStyle={styles.formLabelStyle} />
                      <FormField value={formState.password} labelText='Password' keyboardType="numeric" placeholder={"Password"} onChange={value => {setFormState(oldState => {
                         return {...oldState,password:value}
                      })}}focusColor={colors.primary} containerStyle={styles.formContainerStyle} textInputStyle={styles.formLabelStyle}/>
                     <Text style={styles.infoText}>Already Have a Accound ? <Link href={"/login"} style={{color:colors.primary}}>Login</Link></Text> 
                      <CustomTouchableButton text="Register" onPress={onSubmit} textStyle={styles.btnTextStyle} buttonStyle={styles.btnStyle}/>
                </View>
          </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
        safeArea : {
            minHeight : "100%"
        },
        scrollVw:{
             height:"100%"
        }, 
        content : {
            height:"100%",
            paddingVertical:spaces.high,
            paddingHorizontal:spaces.middle,
            alignItems:"flex-start",
            justifyContent:"flex-start",
            backgroundColor:colors.background
        },
        header: {
           color:colors.text,
           fontSize :fonts.highFontSize,
           fontWeight:fonts.highFontWeight,
           marginBottom:spaces.middle
        },
        subTitle: {
           color:colors.text,
           fontSize:fonts.smallMidFontSize,
           fontWeight:fonts.smallFontWeight,
           marginBottom:spaces.middle 
        },
        formContainerStyle : {
            marginBottom:spaces.high
        },
        formLabelStyle:{
            color:colors.text
        },
        infoText:{
           color:colors.text,
           textAlign:"right",
           width:"100%",
           fontSize:fonts.smallFontSize,
           fontWeight:fonts.smallFontWeight,
           marginVertical:spaces.high, 
        },
        btnStyle:{
            backgroundColor:colors.primary,
            marginTop:spaces.high
        },
        btnTextStyle:{
          color:colors.background
        }
})

export default Register