
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { borderRadius, colors, fonts, shadows, spaces } from '../../../constands/appConstand'
import avatar from "../../../assets/images/defaultAvatar.png"
import logout from "../../../assets/icons/logout.png"

const FlatProfileHeader = ({title="Profile",subTitle="",avatarSource,postCount,onPress}) => {
  console.log("profile avatarSource : ",avatarSource)
  let imageSource ;
  if(avatarSource === null || avatarSource === "")
  {
      imageSource = avatar
  }
  else{
       imageSource = { uri: `data:image/jpeg;base64,${avatarSource}` }
  }
  return (
   <View style= {styles.container}>
    <View style={styles.topSectionWrapper}>
      <Text style={[styles.title]}>{title}</Text>
      <View style={styles.rightIconWrapper}>
        <TouchableOpacity style={styles.rightButton} onPress={onPress}>
          <Image source={logout} style={styles.rightIcon}  />
        </TouchableOpacity> 
      </View>
     
    </View>
    <View style={styles.detailWrapper}>
        <Image style={styles.detailAvatar} source={imageSource} /> 
        <Text style={styles.detailSubText}>{subTitle}</Text> 
        <View style={styles.detailTextsWrapper}>
                <View style={styles.detailTextContainer}>
                    <Text style={styles.detailUpText}>{postCount}</Text>
                    <Text style={styles.detailDownText}>Posts</Text>
                </View>
                <View style={styles.detailTextContainer}>
                   <Text style={styles.detailUpText}>1 Month</Text>
                   <Text style={styles.detailDownText} >Account Date</Text>
                </View>
        </View>
    </View>
   </View> 
    
  )
}

const styles = StyleSheet.create({
    container : {
        flexDirection:"column",marginBottom:spaces.high
    },
    topSectionWrapper : {
          width:"100%",flexDirection:"row",alignItems:"center"
                        },
     title : {
         flex:1,
         fontSize:fonts.highFontSize,
         fontWeight:fonts.highFontWeight,
         color:colors.text
     },
     rightIconWrapper : {
       flex:1
     },
     rightButton:{
        alignItems:"flex-end"
     },
     rightIcon : {
        width:30,height:30,resizeMode:"contain",tintColor:colors.primary
     },
     detailWrapper : {
         width:"100%",
         flexDirection:"column",
         alignItems:"center"
     },

     detailAvatar : {
        width:80,height:80,borderRadius:borderRadius.circleRadius(80),marginBottom:spaces.small,resizeMode:"cover"
     },
     detailSubText : {
          marginBottom:spaces.small,
          fontSize:fonts.middleFontSize,fontWeight:fonts.middleFontWeight,color:colors.text
     },
     detailTextsWrapper : {
           flexDirection:"row"
     },
     detailTextContainer : {
         width:"50%",
     },
     detailDownText : {
         textAlign:"center",fontSize:fonts.smallFontSize,fontWeight:fonts.smallFontWeight,color:colors.text
     },
     detailUpText : {
         textAlign:"center",fontSize:fonts.smallMidFontSize,fontWeight:fonts.smallFontWeight,color:colors.text
     }
})

export default FlatProfileHeader