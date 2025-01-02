
import {StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PostCard from '../../components/customCards/postCard'
import { colors,spaces } from '../../constands/appConstand'
import FlatHeaderComp from '../../components/pageComponents/home/homeFlatHeaderComp'
import FlatEmptyComp from '../../components/pageComponents/home/homeFlatEmptyComp'
import emptySearch from "../../assets/images/emptySearch.png"
import { useLocalSearchParams, usePathname } from 'expo-router'

const SearchQuery = () => {
  const {query} = useLocalSearchParams()
  const path = usePathname();
  console.log("path : ",path," X query : ",query)
  const DUMMY_DATA = [];
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
              ListHeaderComponent={<FlatHeaderComp title={"SEARCH USER"} subtitle={query} initialValue={query} placeholder={"Search User"} />}
              ListEmptyComponent={<FlatEmptyComp imgSource={emptySearch} description={"No data suitable for the query was found."} />}
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

export default SearchQuery