
import { View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {borderRadius, colors, fonts, shadows, spaces } from '../../constands/appConstand'
import FormField from '../../components/customForm/formField'
import CustomTouchableButton from '../../components/customButtons/customTouchableButton'
import deleteIcon from "../../assets/icons/delete.png";
import addIcon from "../../assets/icons/add.png"


const Share = () => {
    const [values , setValues ] = useState({adress:"",description:"",need:"",needs : []}) 
    const onNeedsAdd = () => {
      if(values.need !== "")  
      {
        setValues(oldState => {
            const newNeeds = [...values.needs,values.need]
            return {...oldState,needs:newNeeds,need:""}
       })
      }
    }

    const onDeleteNeed = (deleteItemIndex) => {
        setValues(oldState => {
            const newNeeds = oldState.needs.filter((value,index) => deleteItemIndex !== index)
            return {...oldState,needs:newNeeds}
       })
    }

    const onSend = () => {
 
    }
 
   return (
       <SafeAreaView style={styles.safeView}>
             <ScrollView contentContainerStyle = {styles.contentScroll}>
                     <View style={styles.headerTextWrapper}>
                      <Text style={styles.headerText}>Share Post</Text>
                     </View> 
            
                     <FormField labelText='Adress' textInputStyle={styles.formText} inputWrapper={styles.formInput} containerStyle={styles.formContainer}  value={values.adress} onChange={value => {return setValues(oldState => {return {...oldState,adress:value}})}} placeholder={"Adress"} focusColor={colors.primary} textAlignVertical='top' multiLine={true} />

                     <FormField labelText='Description' textInputStyle={styles.formText} inputWrapper={styles.formInput} containerStyle={styles.formContainer}  value={values.description} onChange={value => {return setValues(oldState => {return {...oldState,description:value}})}} placeholder={"Description"} focusColor={colors.primary} textAlignVertical='top' multiLine={true} />

                     <FormField labelText='Needs' textInputStyle={styles.formText}  containerStyle={styles.formContainer}  value={values.need} onChange={value => {
                         setValues(oldState => {
                             return {...oldState,need:value}
                         })
                     }} placeholder={"Need"} focusColor={colors.primary} rightIcon={addIcon} onRightIconClick={onNeedsAdd} />
                     <ScrollView style={styles.needsScrollView} contentContainerStyle={styles.needsScrollViewContent} showsVerticalScrollIndicator={false} >
                             { values.needs.map((need , index) => {
                                  return <View key={index} style={styles.needWrapper}>
                                           <Text numberOfLines={2} style={styles.needText}>
                                              {need}
                                           </Text>
                                           <TouchableOpacity onPress={() => onDeleteNeed(index)}>
                                             <Image style={styles.needIcon} source={deleteIcon} />
                                           </TouchableOpacity>
                                         </View>
                             })}   
                     </ScrollView>
                     <CustomTouchableButton onPress={onSend} text={"Send"} buttonStyle={styles.buttonContainer} textStyle={styles.buttonText} />
             </ScrollView>
       </SafeAreaView>
   )
 }
 
 const styles = StyleSheet.create({
      safeView : {
          width:"100%",height:"100%"
      },
      contentScroll : {
          width:"100%",height:"100%",
          alignItems:"center",
          backgroundColor:colors.background,
          paddingVertical:spaces.high,paddingHorizontal:spaces.middle
      },
      headerTextWrapper :{
         width:"100%"
      },
      headerText : {
         color:colors.text, fontSize:fonts.highFontSize,fontWeight:fonts.highFontWeight,paddingBottom:spaces.high
      },
      formContainer:{
          marginBottom:spaces.high,elevation:shadows.smallShadow
      },
      formInput : {
            height: 80
      },
      formText:{
          fontSize:fonts.smallFontSize , fontWeight:fonts.smallFontWeight,color:colors.text
      },
      needsScrollView : {
          width:"100%",maxHeight:180,
      },
      needsScrollViewContent : {
           paddingHorizontal:spaces.high
        },
      needWrapper : {
          width:"100%",height:50,marginBottom:spaces.middle,flexDirection:"row",alignItems:"center",padding:spaces.small,
          backgroundColor:colors.secondary,borderRadius:borderRadius.middleRadius,elevation:shadows.smallShadow 
      },
      needIcon : {
          width:25,height:25,resizeMode:"contain",tintColor:colors.primary
      },
      needText : {
          flex:1
      },
      buttonContainer : {
              marginVertical :"auto",backgroundColor:colors.primary,elevation:shadows.smallShadow,
      },
      buttonText : {
              color:colors.background
      }
 }) 
 
export default Share