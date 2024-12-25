import { View, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native'
import React, { useState } from 'react'
import search from "../../assets/icons/search.png"


const SearchField = ({initialValue="",focusColor="black",placeholder,onSearch=(value) => {},inputWrapper}) => {
  const [isFocus,setIsFocus] = useState(false)
  const [searchValue,setSearchValue] = useState(initialValue)
  return (
      <View style={{...style.wrapper,...{borderColor:isFocus ? focusColor : "transparent"},...inputWrapper}}>
         <TextInput style={{...style.input}} 
       value={searchValue}
       placeholder={placeholder} 
       placeholderTextColor={"rgba(0, 0, 0,.3)"} 
       onChangeText={e => {setSearchValue(e)}}
       onFocus={e => {setIsFocus(oldState => {return true})}}
       onBlur={e => setIsFocus(oldState => {return false})}      
       />
        <TouchableOpacity style={style.searchIconWrapperStyle} onPress={(event) => {onSearch(searchValue)}}>
        <Image style={style.searchIconStyle} source={search} />
        </TouchableOpacity>      
      </View> 
  )
}

const style = StyleSheet.create({

      wrapper : {
           width:"100%",
           position:"relative",
           height:50,
           backgroundColor:"rgb(215, 206, 206)",
           elevation:4, 
           borderRadius:8,
           borderWidth:2,
                },
       searchIconWrapperStyle:{
             position:"absolute",
             right:5,
             top:12.5
       },         
       searchIconStyle : {
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

export default SearchField