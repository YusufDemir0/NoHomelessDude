
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PostCard from '../../components/customCards/postCard'
import { colors, fonts, spaces } from '../../constands/appConstand'
import FlatHeaderComp from '../../components/pageComponents/home/homeFlatHeaderComp'
import FlatEmptyComp from '../../components/pageComponents/home/homeFlatEmptyComp'



const Home = () => {
   
  const DUMMY_DATA = [{id : 1 , needs : ["a","b","c"],adress:"yesil mah , 644 sok , ayazken koop , c blok",creater:{userName:"Egemen"},updateDate:"00/00/0000"},{id : 2, needs : ["a","b","c","a","b","c"],adress:"yesil mah , 644 sok , ayazken koop , c blok",creater:{userName:"Egemen"},updateDate:"00/00/0000"},{id:3, needs : ["a","b","c","a","b","c","a","b","c"],adress:"yesil mah , 644 sok , ayazken koop , c blok",creater:{userName:"Egemen"},updateDate:"00/00/0000"}]   
    
  return (
    <SafeAreaView  style={styles.safeArea}>
            <FlatList
              keyboardShouldPersistTaps="handled"
              style={styles.flatListStyle} 
              data={DUMMY_DATA}
              keyExtractor={(item) => {
                    return item.id;
              }}   
              renderItem={({item}) => {
                    return <PostCard post={item}  />
              }}
              ListHeaderComponent={<FlatHeaderComp placeholder={"Search User"} />}
              ListEmptyComponent={<FlatEmptyComp />}
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
    
})

export default Home