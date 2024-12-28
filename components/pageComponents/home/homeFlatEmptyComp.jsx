import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { colors, fonts, spaces } from '../../../constands/appConstand'


const FlatEmptyComp = ({imgSource,description,textStyle}) => {
  return (
    <View style={styles.wrapper}>
      <Image style={styles.imgStyle}  source={imgSource} />
      <Text style={{...styles.txtStyle,...textStyle}}>{description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
     wrapper:{
         marginTop:spaces.high
     },
     imgStyle : {
         marginVertical:spaces.high,
         width:"100%",
         height:200,
         resizeMode:"cover"
     },
     txtStyle : {
          marginTop:spaces.high,
          textAlign:"center",
          color:colors.text,
          fontSize:fonts.smallMidFontSize,
          fontWeight:fonts.middleFontWeight
     }
})

export default FlatEmptyComp