import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import upArrow from "../../assets/icons/upArrow.png"
import downArrow from "../../assets/icons/downArrow.png"
import { borderRadius, colors, fonts, shadows, spaces } from '../../constands/appConstand'


const PostCardOpanableSection = ({title,data=[],activeHeight,sectionItemHeight=40,wrapperStyle}) => {
  const [isOpen,setIsOpen] = useState({isOpen:false})
  const onClick = () => {
       setIsOpen(oldState => {
           const isOpen = !oldState.isOpen;
           return {isOpen}
       })
  };
  const wrapperHeight = {height : isOpen.isOpen ? activeHeight : 25};
  return (
    <View style={[styles.wrapper,wrapperHeight,wrapperStyle]}>
        <View style={styles.staticSecionStyle}>
            <TouchableOpacity onPress={e => onClick()}>
                <Image style={styles.staticSectionIconStyle} source={isOpen.isOpen ? upArrow : downArrow } />
            </TouchableOpacity>   
            <Text numberOfLines={1} style={[styles.staticSectionTextStyle]}>{title}</Text>              
        </View>
        <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false} style={{height:activeHeight,marginTop:25}} >
          {data.map((value,index) => {
               return  <Text numberOfLines={2} style={[styles.scrollItemStyle,{height:sectionItemHeight}]} key={index} >{value}</Text>
          })}  
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
      wrapper : {
           position:"relative",
           backgroundColor:"transparent",
           marginHorizontal:spaces.small,
           borderRadius:borderRadius.middleRadius,
           overflow:"hidden"
      },
      staticSecionStyle:{
           position:"absolute",
           zIndex:2,
           flexDirection:"row",
           top:0,left:0,
           width:"100%",
           backgroundColor:colors.light,
           borderRadius:borderRadius.middleRadius,
           elevation:shadows.middleShhadow,
           overflow:"hidden"
           
      },
      staticSectionIconStyle:{
           tintColor:colors.dark,
           width:25,height:25,resizeMode:"cover",
      },
      staticSectionTextStyle : {
           textAlign:'center',
           flexGrow:1,
           color:colors.text,
           fontSize:fonts.smallFontSize,
           fontWeight:fonts.smallFontWeight
      },
      
      scrollItemStyle : {
           width:"100%",
           marginVertical:spaces.small,
           padding:spaces.small-2 ,
           backgroundColor:colors.background,
           fontSize:fonts.smallFontSize,
           fontWeight:fonts.smallFontWeight,
           color:colors.text,
           borderRadius:borderRadius.middleRadius,
           elevation:shadows.smallShadow
      }
})

export default PostCardOpanableSection