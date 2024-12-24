
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

const PostCard = ({post:{adress,creater,needs,updateDate}}) => {
    console.log("creater : ",creater);
    return (
    <View style={styles.wrapper}>
            <Text>{creater.userName}</Text>
            <Text>{adress}</Text>
            <Text>{updateDate}</Text>
            <ScrollView showsVerticalScrollIndicator={false} style={{height:40}} contentContainerStyle={styles.scrollViewContainerStyle}>
             <Text >a</Text>
             <Text >b</Text>
             <Text >c</Text>
             <Text >d</Text>
             <Text >e</Text>
             <Text >f</Text>
            </ScrollView>
    </View>
  )
}

const styles =StyleSheet.create({
      
     wrapper : {
         borderColor:"white",
         margin:5,
         borderWidth:5       
     },
     scrollViewContainerStyle : {
        width:"100%",
        margin:2,
        backgroundColor:"white"
     }
     

})

export default PostCard