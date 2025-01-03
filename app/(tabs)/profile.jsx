
import {StyleSheet, FlatList} from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, spaces } from '../../constands/appConstand'
import FlatEmptyComp from '../../components/pageComponents/home/homeFlatEmptyComp'
import emptyData from "../../assets/images/emptyData.png"
import { router, useFocusEffect } from 'expo-router'
import FlatProfileHeader from '../../components/pageComponents/profile/flatProfileHeader'
import deleteIcon from "../../assets/icons/delete.png";
import { UserContext } from '../../managments/userManagment'
import PostCard2 from '../../components/customCards/postCard2'


const Profile = () => {
   const {userState,setUserState} = useContext(UserContext)
   console.log("userStaet : ",userState)
   const [userPosts,setUserPosts] = useState({posts:[]})
    
   const getPosts = async () => {
         
           await fetch(`${process.env.BASE_URL}posts/user/${userState.username}`,{
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
               setUserPosts(oldState => {
                   return {posts:data}
               })
           })
           .catch(err => {
               console.log("err : ",err)
           })
     
       }
     
       const deletePost =  (postId) => {
        console.log("postId : ",postId)
         fetch(`${process.env.BASE_URL}posts/${postId}`,{
          method:"DELETE",
          headers:{
              "Authorization":`Bearer ${userState.token}`
          }
      })
      .then(res => {
          return res.text()
      })
      .then(data => {
          console.log("deletePost : ",data)
          setUserPosts(oldState => {
              const newPosts = userPosts.posts.filter(post => {
                    return post.id !== postId
              })
              console.log("newPosts : ",newPosts)
              return {posts:newPosts}
          })
      })
      .catch(err => {
          console.log("err : ",err)
      })
       }

       useFocusEffect(useCallback(()=>{
        getPosts()
       },[]))
  
  const logout = () => {
       setUserState(oldStaet => {
             return {token:null,username:null,mail:null,password:null,photo:null} 
       })
       router.replace("/login")
  }

  return (
    <SafeAreaView  style={styles.safeArea}>
            <FlatList
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              style={styles.flatListStyle} 
              data={userPosts.posts}
              keyExtractor={(item) => {
                    return item.id;
              }}   
              renderItem={({item}) => {
                    return <PostCard2 post={item}  bottomButtonIcon={deleteIcon} bottomButtonClick={deletePost} />
              }}
              ListHeaderComponent={<FlatProfileHeader onPress={logout} postCount={userPosts.posts.length} avatarSource={userState.photo}  subTitle={userState.username} />}
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