
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import openEye from "../../assets/icons/openEye.png"
import closeEye from "../../assets/icons/closeEye.png"
import { borderRadius, shadows, spaces } from '../../constands/appConstand'


const FormField = ({value,labelText="",focusColor="black",textAlignVertical="center",placeholder,keyboardType,rightIcon=null,onRightIconClick=() => {},onChange,containerStyle,inputWrapper,textInputStyle,isEditable=true,multiLine=false}) => {
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
       editable={isEditable}
       textAlignVertical={textAlignVertical}
       multiline={multiLine}
       value={value}
       placeholder={placeholder} 
       placeholderTextColor={"rgba(0, 0, 0,.3)"} 
       keyboardType={keyboardType}
       secureTextEntry = {labelText.toUpperCase() === "PASSWORD" ? isPasswordOpen : false}
       onChangeText={e => onChange(e)}
       onFocus={e => {setIsFocus(oldState => {return true})}}
       onBlur={e => setIsFocus(oldState => {return false})}      
       />
        {(labelText.toUpperCase() === "PASSWORD" && <TouchableOpacity style={style.rightIconWrapperStyle} onPress={onPasswordChangeType}>
        <Image style={style.rightIconStyle} source={isPasswordOpen ? openEye : closeEye} />
        </TouchableOpacity> )}
        {
          (labelText.toUpperCase() !== "PASSWORD" && rightIcon !== null) &&  <TouchableOpacity style={style.rightIconWrapperStyle} onPress={onRightIconClick}>
        <Image style={style.rightIconStyle} source={rightIcon} />
        </TouchableOpacity>
        } 
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
         marginBottom:spaces.small
      }, 
      wrapper : {
           width:"100%",
           position:"relative",
           height:50,
           backgroundColor:"rgb(202, 208, 226)",
           elevation:shadows.smallShadow, 
           borderRadius:borderRadius.middleRadius,
           borderWidth:2,
                },
       rightIconWrapperStyle:{
             position:"absolute",
             right:5,
             top:12.5
       },         
       rightIconStyle : {
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