
import {StyleSheet, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PostCard from '../../components/customCards/postCard'
import { colors,spaces } from '../../constands/appConstand'
import FlatHeaderComp from '../../components/pageComponents/home/homeFlatHeaderComp'
import FlatEmptyComp from '../../components/pageComponents/home/homeFlatEmptyComp'
import emptySearch from "../../assets/images/emptySearch.png"
import { router, useLocalSearchParams, usePathname } from 'expo-router'
import { UserContext } from '../../managments/userManagment'
import PostCard2 from '../../components/customCards/postCard2'

const SearchQuery = () => {
  const {userState} = useContext(UserContext)
  const {query} = useLocalSearchParams()
  const [postsState,setPostsState] = useState({posts:[]})
 
  const onSearch = (query) => {
         router.replace(`/search/${query}`)
    }

   const getPosts = async () => {
      
        await fetch(`${process.env.BASE_URL}posts/user/${query}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${userState.token}`
            }
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            setPostsState(oldState => {
                return {posts:data}
            })
        })
        .catch(err => {
            console.log("err : ",err)
        })
  
    }
  
    useEffect(()=> {
              getPosts()
    },[])
  return (
    <SafeAreaView  style={styles.safeArea}>
            <FlatList
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              style={styles.flatListStyle} 
              data={postsState.posts}
              keyExtractor={(item) => {
                    return item.id;
              }}   
              renderItem={({item}) => {
                    return <PostCard2 post={item}  />
              }}
              ListHeaderComponent={<FlatHeaderComp  onSearch={onSearch} title={"SEARCH USER"} subtitle={query} initialValue={query} placeholder={"Search User"} />}
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