
import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PostCard from '../../components/customCards/postCard'

const Home = () => {
   
  const DUMMY_DATA = [{id : 1 , needs : ["a","b","c"],adress:"yesil mah , 644 sok , ayazken koop , c blok",creater:{userName:"Egemen"},updateDate:"00/00/0000"},{id : 2, needs : ["a","b","c","a","b","c"],adress:"yesil mah , 644 sok , ayazken koop , c blok",creater:{userName:"Egemen"},updateDate:"00/00/0000"},{id:3, needs : ["a","b","c","a","b","c","a","b","c"],adress:"yesil mah , 644 sok , ayazken koop , c blok",creater:{userName:"Egemen"},updateDate:"00/00/0000"}]   
    
  return (
    <SafeAreaView style={styles.safeArea}>
            <FlatList
              data={DUMMY_DATA}
              keyExtractor={(item) => {
                    return item.id;
              }}   
              renderItem={({item}) => {
                    return <PostCard post={item}  />
              }}

            />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
      safeArea : {
           backgroundColor:"gray",
           width:"100%",
           height:"100%",
           borderColor:"white",
           borderWidth:3
      }
})

export default Home