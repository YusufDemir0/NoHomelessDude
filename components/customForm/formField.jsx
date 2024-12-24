
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import openEye from "../../assets/icons/openEye.png"
import closeEye from "../../assets/icons/closeEye.png"


const FormField = ({value,labelText="",focusColor="black",placeholder,keyboardType,onChange,containerStyle,inputWrapper,textInputStyle}) => {
  const [isFocus,setIsFocus] = useState(false)
  const [isPasswordOpen , setIsPasswordOpen] = useState(false)
  const onPasswordChangeType = () => {
       setIsPasswordOpen(oldState => {
              return !oldState
       })
  }
  return (
    <View style={{...style.container,...containerStyle}}>
      <Text style={{...style.labelStyle,...textInputStyle}}>{labelText}</Text>
      <View style={{...style.wrapper,...{borderColor:isFocus ? focusColor : "transparent"},...inputWrapper}}>
       <TextInput style={{...style.input}} 
       value={value}
       placeholder={placeholder} 
       placeholderTextColor={"rgba(0, 0, 0,.3)"} 
       keyboardType={keyboardType}
       secureTextEntry = {labelText.toUpperCase() === "PASSWORD" ? isPasswordOpen : false}
       onChangeText={e => onChange(e)}
       onFocus={e => {setIsFocus(oldState => {return true})}}
       onBlur={e => setIsFocus(oldState => {return false})}      
       />
        {labelText.toUpperCase() === "PASSWORD" && <TouchableOpacity style={style.passwordIconWrapperStyle} onPress={onPasswordChangeType}>
        <Image style={style.passwordIconStyle} source={isPasswordOpen ? openEye : closeEye} />
        </TouchableOpacity> }
      </View> 
    </View>
  )
}

const style = StyleSheet.create({
      container : {
        width:"100%",
      },
      labelStyle:{
         color:"rgba(0, 0, 0,.6)",
         width:"100%",
         marginBottom:5
      }, 
      wrapper : {
           width:"100%",
           position:"relative",
           height:50,
           backgroundColor:"rgb(215, 206, 206)",
           elevation:4, 
           borderRadius:8,
           borderWidth:2,
                },
       passwordIconWrapperStyle:{
             position:"absolute",
             right:5,
             top:12.5
       },         
       passwordIconStyle : {
              width:25,
              height:25,
              tintColor:"rgba(0, 0, 0,.6)",
              resizeMode:"contain"
       },         
      input : {
          height:"100%",
          paddingRight:30
      }          

})

export default FormField