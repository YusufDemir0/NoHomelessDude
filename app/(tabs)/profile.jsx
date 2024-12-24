
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  return (
       <SafeAreaView style={styles.safeArea}>
                
       </SafeAreaView>
  )
}

const styles = StyleSheet.create({
      safeArea : {
           backgroundColor:"gray",
           width:"100%",
           height:"100%"
      }
})

export default Profile