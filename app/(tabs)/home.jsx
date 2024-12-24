
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PostCard from '../../components/customCards/postCard'
import { colors, fonts, spaces } from '../../constands/appConstand'
import appIcon from "../../assets/icons/appIcon.png"


const FlatHeaderComp = () => {
       return <>
                  <View style={styles.flatHeaderCompWrapperStyle}>
                      <View>
                        <Text style={styles.flactHeaderCompTitleStyle}>Welcome Back</Text>
                        <Text style={styles.flatHeaderCompSubTitleStyle}>Egemen</Text>
                      </View>
                      <Image style={styles.flatHeaderCompAppIconStyle} source={appIcon} />
                  </View>
              </>
}

const Home = () => {
   
  const DUMMY_DATA = [{id : 1 , needs : ["a","b","c"],adress:"yesil mah , 644 sok , ayazken koop , c blok",creater:{userName:"Egemen"},updateDate:"00/00/0000"},{id : 2, needs : ["a","b","c","a","b","c"],adress:"yesil mah , 644 sok , ayazken koop , c blok",creater:{userName:"Egemen"},updateDate:"00/00/0000"},{id:3, needs : ["a","b","c","a","b","c","a","b","c"],adress:"yesil mah , 644 sok , ayazken koop , c blok",creater:{userName:"Egemen"},updateDate:"00/00/0000"}]   
    
  return (
    <SafeAreaView style={styles.safeArea}>
            <FlatList
              style={styles.flatListStyle}
              data={DUMMY_DATA}
              keyExtractor={(item) => {
                    return item.id;
              }}   
              renderItem={({item}) => {
                    return <PostCard post={item}  />
              }}
              ListHeaderComponent={<FlatHeaderComp />}
            />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
      safeArea : {
           backgroundColor:colors.background,
           width:"100%",
           height:"100%",
           paddingVertical:spaces.high,
           paddingHorizontal:spaces.middle
      },
      flatListStyle:{
         width:"100%",
         height:"100%" 
      },
      flatHeaderCompWrapperStyle : {
              flexDirection:"row",
              justifyContent:"space-between",
              alignItems:"center",
              marginBottom:spaces.middle
      },
      flatHeaderCompAppIconStyle : {
             width:50,
             height:50,
             resizeMode:"cover"
      },
      flactHeaderCompTitleStyle:{
            fontSize:fonts.smallMidFontSize,
            fontWeight:fonts.smallFontWeight,
            color:colors.text
      },
      flatHeaderCompSubTitleStyle:{
            fontSize:fonts.highFontSize,
            fontWeight:fonts.highFontWeight,
            color:colors.text
      }
})

export default Home