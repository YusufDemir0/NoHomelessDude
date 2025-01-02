import { Image, StyleSheet, Text, View } from "react-native"
import { colors,fonts,shadows,spaces } from "../../../constands/appConstand"
import SearchField from '../../customForm/searchField'


const FlatHeaderComp = ({placeholder,onSearch,initialValue,title,subtitle,rightIcon=null}) => {
    return <>
               <View style={styles.flatHeaderCompWrapperStyle}>
                   <View>
                     <Text style={styles.flactHeaderCompTitleStyle}>{title}</Text>
                     <Text style={styles.flatHeaderCompSubTitleStyle}>{subtitle}</Text>
                   </View>
                   {rightIcon != null && <Image style={styles.flatHeaderCompAppIconStyle} source={rightIcon} />}
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
      fontSize:fonts.smallFontSize,
      fontWeight:fonts.smallFontWeight,
      color:colors.text
},
flatHeaderCompSubTitleStyle:{
      fontSize:fonts.highFontSize,
      fontWeight:fonts.highFontWeight,
      color:colors.text
},
flatHeaderCompSearchStyle : {
      marginBottom:spaces.high,
      elevation:shadows.smallShadow
}
})

export default FlatHeaderComp;
