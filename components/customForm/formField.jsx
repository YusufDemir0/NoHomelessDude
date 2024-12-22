
import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'

const FormField = ({value,labelText="",placeholder,keyboardType,onChange,containerStyle,textInputStyle}) => {
  const [isFocus,setIsFocus] = useState(false)

  return (
    <View style={{...style.container,...containerStyle}}>
     <Text style={style.labelStyle}>{labelText}</Text>
     <View style={{...style.wrapper,...{borderColor:isFocus ? "orange" : "transparent"},...textInputStyle}}>
      <TextInput style={{...style.input}} 
      value={value}
      placeholder={placeholder} 
      placeholderTextColor={"rgba(0, 0, 0,.3)"} 
      keyboardType={keyboardType}
      secureTextEntry = {labelText.toUpperCase() === "PASSWORD" ? true : false}
      onChangeText={e => onChange(e)}
      onFocus={e => {setIsFocus(oldState => {return true})}}
      onBlur={e => setIsFocus(oldState => {return false})}      
       />
    </View> 
    </View>
    
  )
}

const style = StyleSheet.create({
      container : {
        width:"100%"
      },
      labelStyle:{
         color:"rgb(2, 2, 2)",
         width:"100%"
      }, 
      wrapper : {
           width:"100%",
           height:50,
           backgroundColor:"rgb(215, 206, 206)", 
           borderRadius:8,
           borderWidth:2,
           marginBottom:10
                },
      input : {
          height:"100%",
      }          

})

export default FormField