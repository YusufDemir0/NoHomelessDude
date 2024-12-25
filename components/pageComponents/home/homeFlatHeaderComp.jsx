import { Image, StyleSheet, Text, View } from "react-native"
import appIcon from "../../../assets/images/appImage.png"
import { colors,fonts,spaces } from "../../../constands/appConstand"
import SearchField from '../../customForm/searchField'


const FlatHeaderComp = ({placeholder,onSearch,initialValue}) => {
    return <>
               <View style={styles.flatHeaderCompWrapperStyle}>
                   <View>
                     <Text style={styles.flactHeaderCompTitleStyle}>Welcome Back</Text>
                     <Text style={styles.flatHeaderCompSubTitleStyle}>Egemen</Text>
                   </View>
                   <Image style={styles.flatHeaderCompAppIconStyle} source={appIcon} />
               </View>
               <SearchField inputWrapper={styles.flatHeaderCompSearchStyle} onSearch={onSearch} placeholder={placeholder} initialValue={initialValue} focusColor={colors.primary}  />
           </>
}

const styles = StyleSheet.create({
    flatHeaderCompWrapperStyle : {
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:spaces.middle
},
flatHeaderCompAppIconStyle : {
       width:50,
       height:50,
       resizeMode:"cover"
},
flactHeaderCompTitleStyle:{
      fontSize:fonts.smallMidFontSize,
      fontWeight:fonts.smallFontWeight,
      color:colors.text
},
flatHeaderCompSubTitleStyle:{
      fontSize:fonts.highFontSize,
      fontWeight:fonts.highFontWeight,
      color:colors.text
},
flatHeaderCompSearchStyle : {
      marginBottom:spaces.high
}
})

export default FlatHeaderComp;
