
import {StyleSheet, FlatList} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PostCard from '../../components/customCards/postCard'
import { colors, spaces } from '../../constands/appConstand'
import FlatEmptyComp from '../../components/pageComponents/home/homeFlatEmptyComp'
import emptyData from "../../assets/images/emptyData.png"
import { router } from 'expo-router'
import FlatProfileHeader from '../../components/pageComponents/profile/flatProfileHeader'
import deleteIcon from "../../assets/icons/delete.png";


const Profile = () => {
   
  const DUMMY_DATA = [{id : 1 , needs : ["a","b","c"],adress:"45.15555,23.689",creater:{userName:"Egemen"},updateDate:"00/00/0000"},{id : 2, needs : ["a","b","c","a","b","c"],adress:"yesil mah , 644 sok , ayazken koop , c blok",creater:{userName:"Egemen"},updateDate:"00/00/0000"},{id:3, needs : ["a","b","c","a","b","c","a","b","c"],adress:"yesil mah , 644 sok , ayazken koop , c blok",creater:{userName:"Egemen"},updateDate:"00/00/0000"}]   
  


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
                    return <PostCard post={item} bottomButtonIcon={deleteIcon} />
              }}
              ListHeaderComponent={<FlatProfileHeader />}
              ListEmptyComponent={<FlatEmptyComp  description={"User's Posts not found."} imgSource={emptyData} />}
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
export default Profile