import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import onBoard from "../assets/images/onBoard.png"
import CustomTouchableButton from '../components/customButtons/customTouchableButton';
import {colors,spaces,fonts,shadows} from "../constands/appConstand"

export default function App() {

  const onPress = () => {
      router.push("/login")
  }

  return (
        <SafeAreaView  style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollVw}>
               <View style={styles.container}>
                   <Image source={onBoard} style={styles.onBoardImg} />                   
                   <Text style={styles.subTitle}>Together, we can make a difference.</Text>
                   <Text style={styles.desc}>Join our mission to support individuals in need.Share locations, provide help, and connect with a compassionate community to fight homelessness.</Text>
                   <CustomTouchableButton text={"Start"} onPress={onPress} buttonStyle={styles.btnStyle} textStyle={styles.btnTextStyle} />
               </View>  
            </ScrollView>
       
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea :  {
       minHeight:"100%",
                },
    scrollVw :  {
       height : "100%",
       backgroundColor:`${colors.background}`  
                },            
    container : {
       width:"100%",
       height:"100%",
       alignItems:"center",
       paddingHorizontal:spaces.middle,
       paddingVertical:spaces.high,
                },         
    onBoardImg : {
       width:"100%",
       height:"360",
       resizeMode :'cover',
                 } ,
    subTitle :   {
          textAlign:"center",
          fontSize:fonts.highFontSize,
          color:colors.text, 
          fontWeight:fonts.highFontWeight,
          marginBottom:spaces.middle
                } ,
    desc :      {
            textAlign:"center",
            color:colors.text,
            fontSize:fonts.smallMidFontSize,
            fontWeight:fonts.smallFontWeight,
            marginBottom:spaces.high
                }     ,
    btnStyle:   {
           backgroundColor:colors.primary,
           elevation:shadows.smallShadow,
           marginTop:spaces.high 
                } ,
    btnTextStyle:{
           color:colors.background                   
    }                                                             
});
