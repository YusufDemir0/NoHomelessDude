
import {StyleSheet, FlatList} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PostCard from '../../components/customCards/postCard'
import { colors, spaces } from '../../constands/appConstand'
import FlatHeaderComp from '../../components/pageComponents/home/homeFlatHeaderComp'
import FlatEmptyComp from '../../components/pageComponents/home/homeFlatEmptyComp'
import emptyData from "../../assets/images/emptyData.png"
import { router } from 'expo-router'
import appIcon from "../../assets/images/appImage.png"
import { UserContext } from '../../managments/userManagment'
import PostCard2 from '../../components/customCards/postCard2'


const Home = () => {
  const {userState} = useContext(UserContext)
  const [postsState,setPostsState] = useState({posts:[]})
  
  const onSearch = (query) => {
       router.push(`/search/${query}`)
  }
 
  const getPosts = async () => {
    
      await fetch(`${process.env.BASE_URL}posts`,{
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
              ListHeaderComponent={<FlatHeaderComp onSearch={onSearch} placeholder={"Search User"} subtitle={userState.username} title={"WELCOME BACK"} rightIcon={appIcon} />}
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