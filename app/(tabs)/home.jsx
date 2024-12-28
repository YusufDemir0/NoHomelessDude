
import {StyleSheet, FlatList} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PostCard from '../../components/customCards/postCard'
import { colors, spaces } from '../../constands/appConstand'
import FlatHeaderComp from '../../components/pageComponents/home/homeFlatHeaderComp'
import FlatEmptyComp from '../../components/pageComponents/home/homeFlatEmptyComp'
import emptyData from "../../assets/images/emptyData.png"
import { router } from 'expo-router'
import appIcon from "../../assets/images/appImage.png"


const Home = () => {
   
  const DUMMY_DATA = [{id : 1 , needs : ["a","b","c"],description:"some one needs in there !!!",adress:"yesil mah , 644 sok , ayazken koop , c blok",creater:{userName:"Egemen"},updateDate:"00/00/0000"},{id : 2,description:"some one needs in there !!!", needs : ["a","b","c","a","b","c"],adress:"yesil mah , 644 sok , ayazken koop , c blok",creater:{userName:"Egemen"},updateDate:"00/00/0000"},{id:3,description:"some one needs in there !!!", needs : ["a","b","c","a","b","c","a","b","c"],adress:"yesil mah , 644 sok , ayazken koop , c blok",creater:{userName:"Egemen"},updateDate:"00/00/0000"}]   
  
  const onSearch = (query) => {
       router.replace(`/search/${query}`)
  }

  return (
    <SafeAreaView  style={styles.safeArea}>
            <FlatList
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              style={styles.flatListStyle} 
              data={DUMMY_DATA}
              keyExtractor={(item) => {
                    return item.id;
              }}   
              renderItem={({item}) => {
                    return <PostCard post={item}  />
              }}
              ListHeaderComponent={<FlatHeaderComp onSearch={onSearch} placeholder={"Search User"} subtitle={"Egemen"} title={"WELCOME BACK"} rightIcon={appIcon} />}
              ListEmptyComponent={<FlatEmptyComp  description={"Post not found. Try Again Later"} imgSource={emptyData} />}
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