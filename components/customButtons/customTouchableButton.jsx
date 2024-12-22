
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const CustomTouchableButton = ({text,onPress,buttonStyle={},textStyle={}}) => {
  return (
      <TouchableOpacity activeOpacity={0.7} style={{...styles.btn,...buttonStyle}} onPress={onPress}>
            <Text style={{...styles.txt,...textStyle}}>{text}</Text> 
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
      btn : {
            backgroundColor:"orange",
            borderRadius:10,
            display:"flex",
            justifyContent:"center",
            width:"100%",
            height:"50",
      },
      txt : {
          textAlign:"center",
          alignContent:"center",
          fontSize:20,
          fontWeight:400,
          color:"white"
      }
});

export default CustomTouchableButton