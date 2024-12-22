

import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomTouchableButton from '../../components/customButtons/customTouchableButton'
import FormField from '../../components/customForm/formField'
import { Link } from 'expo-router'

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
                      })}} containerStyle={{marginTop:10,marginBottom:10}} />
                      <FormField labelText='E-mail' keyboardType="email-address" placeholder={"E-mail"} onChange={value => {setFormState(oldState => {
                         return {...oldState,email:value}
                      })}} containerStyle={{marginTop:10,marginBottom:10}} />
                      <FormField labelText='Password' keyboardType="numeric" placeholder={"Password"} onChange={value => {setFormState(oldState => {
                         return {...oldState,password:value}
                      })}} containerStyle={{marginTop:10,marginBottom:10}} />  
                     <Text style={styles.infoText}>Already Have a Accound ? <Link href={"/login"} style={{color:"orange"}}>Login</Link></Text> 
                      <CustomTouchableButton text="Login" onPress={onSubmit} buttonStyle={{marginTop:40}}/>
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
            paddingTop:30,
            paddingHorizontal:10,
            alignItems:"center",
            backgroundColor:"white"
        },
        header: {
           textAlign:"center",
           fontSize : 32,
           fontWeight:"800",
           marginVertical:20
        },
        subTitle: {
           textAlign:"center",
           fontSize:20,
           fontWeight:"400",
           marginBottom:10 
        },
        infoText:{
           textAlign:"right",
           width:"100%",
           fontSize:14,
           fontWeight:"400",
           marginBottom:10, 
           marginTop:10
        }
})

export default Register