
import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { fonts } from '../../constands/appConstand';

const TabBarIconAndText = ({color,icon,focused,label}) => {
  return (
    <View style={styles.wrapper}>
      <Image source={icon} style={{...styles.iconStyle,...{color,tintColor:color}}}/>
      <Text style={{...styles.textStyle,...{color,fontWeight:focused ? "800" : "400"}}}>{label}</Text>
    </View>
  )
}

const styles =StyleSheet.create({
      
      wrapper :{
          justifyContent:"center",
          alignItems:"center"
      },
      iconStyle : { 
            width:25,
            height:25,
            resizeMode:"contain",
      },
      textStyle : {
          fontSize:fonts.smallFontSize
      }
});

export default TabBarIconAndText