import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import placeholder from "../assets/images/placeholder.png"
import CustomTouchableButton from '../components/customButtons/customTouchableButton';

export default function App() {

  const onPress = () => {
      router.push("/login")
  }

  return (
        <SafeAreaView  style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollVw}>
               <View style={styles.container}>
                   <Text style={styles.header}>No Homeless People</Text>
                   <Image source={placeholder} style={styles.onBoardImg} />
                   <Text style={styles.subTitle}>Together, we can make a difference.</Text>
                   <Text style={styles.desc}>Join our mission to support individuals in need. Share locations, provide help, and connect with a compassionate community to fight homelessness.</Text>
                   <CustomTouchableButton text={"Start"} onPress={onPress} buttonStyle={{marginVertical:"auto"}} />
               </View>  
            </ScrollView>
       
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea :  {
       minHeight:"100%",
       backgroundColor:"gray"
                },
    scrollVw :  {
       height : "100%",
       backgroundColor:"white"  
                },            
    container : {
       width:"100%",
       height:"100%",
       alignItems:"center",
       paddingHorizontal:10,
       paddingTop:20,
                },       
    header:     {
       textAlign:"center",
       fontSize:32,
       fontWeight:'800',
       alignItems:"center"
                } ,    
    headerIcon : {
            resizeMode:"cover",
            width:60,
            height:60,
    }  ,         
    onBoardImg : {
       width:"100%",
       height:"360",
       resizeMode :'cover',
       marginVertical:10
                 } ,
    subTitle :   {
          textAlign:"center",
          fontSize:27,
          paddingHorizontal:10,
          marginVertical:10, 
          fontWeight:"600"
                } ,
    desc :      {
            textAlign:"center",
            fontSize:20,
            fontWeight:"400",
            paddingHorizontal:10,   
            marginVertical:10,
                }                                               
});
