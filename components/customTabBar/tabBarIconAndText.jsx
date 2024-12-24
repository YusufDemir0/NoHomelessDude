
import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const TabBarIconAndText = ({color,icon,focused,label}) => {
  return (
    <View>
      <Image source={icon} style={{...styles.iconStyle,...{color,tintColor:color}}}/>
      <Text style={{...styles.textStyle,...{color,fontWeight:focused ? "800" : "400"}}}>{label}</Text>
    </View>
  )
}

const styles =StyleSheet.create({
      
      wrapper :{
          
          backgroundColor:"red",
          justifyContent:"center",
          alignItems:"center"
      },
      iconStyle : { 
            width:30,
            height:30,
            resizeMode:"contain"
      },
      textStyle : {
          fontSize:10
      }
});

export default TabBarIconAndText