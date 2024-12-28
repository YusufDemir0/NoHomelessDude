import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import { borderRadius, colors, fonts, shadows, spaces } from '../../constands/appConstand';
import userAvatar from "../../assets/images/userAvatar1.png";
import PostCardOpanableSection from './postCardOpenableSection';
import MapView, { Marker } from 'react-native-maps'; // react-native-maps import

const PostCard = ({post:{adress,description,creater,needs,updateDate}, bottomButtonIcon=null, bottomButtonClick=() => {}}) => {

    // Konum tıklanırsa yönlendirme
    const handleLocationPress = (latitude, longitude) => {
        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        Linking.openURL(url);
    };

    // Konum adresini kontrol et ve latitude, longitude ayır
    const parseLocation = (address) => {
        const coordinates = address.split(',');
        if (coordinates.length === 2) {
            const latitude = parseFloat(coordinates[0].trim());
            const longitude = parseFloat(coordinates[1].trim());

            if (!isNaN(latitude) && !isNaN(longitude)) {
                return { latitude, longitude };
            }
        }
        return null; // Geçerli bir konum değilse null döner
    };

    // Konumu parse et
    const location = parseLocation(adress);

    return (
        <View style={styles.cardWrapper}>
            <View style={styles.cardHeader}>
                <View style={styles.headerDetailViewSyle}>
                    <Image style={styles.cardHeaderAvatarStyle} source={userAvatar} />
                    <Text numberOfLines={1} style={styles.cardHeaderTextStyle}>{creater.userName}</Text>
                </View>
                <Text style={styles.cardHeaderTimeTextStyle}>1h</Text>
            </View>

            {/* Konumun gösterimi */}
            {location ? (
                <TouchableOpacity onPress={() => handleLocationPress(location.latitude, location.longitude)}>
                    <View style={styles.mapWrapper}>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            zoomEnabled={true}
                            scrollEnabled={true}
                        >
                            <Marker coordinate={location} />
                        </MapView>
                    </View>
                </TouchableOpacity>
            ) : (
                <Text style={styles.noLocationText}>Konum bulunamadı</Text>
            )}

            <PostCardOpanableSection title={"Adress"} data={[adress]} activeHeight={80} sectionItemHeight={60} wrapperStyle={{marginBottom:spaces.middle}} />
            <PostCardOpanableSection title={"Description"} data={[description]} activeHeight={80} sectionItemHeight={60} wrapperStyle={{marginBottom:spaces.middle}} />
            <PostCardOpanableSection title={"Needs"} data={[...needs]} activeHeight={150} wrapperStyle={{marginBottom:spaces.middle}} />
            
            {bottomButtonIcon !== null && (
                <View style={styles.bottomWrapper}>
                    <TouchableOpacity style={styles.bottomButton} onPress={bottomButtonClick}>
                        <Image style={styles.bottomButtonIcon} source={bottomButtonIcon} />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    cardWrapper: {
        width: "100%",
        marginVertical: spaces.small,
        borderRadius: borderRadius.middleRadius,
        backgroundColor: colors.secondary,
        borderColor: colors.text,
        borderWidth: 2,
        shadowOffset: { height: 0, width: 0 },
        elevation: shadows.middleShhadow
    },
    cardHeader: {
        width: "100%",
        padding: spaces.small,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: spaces.small
    },
    headerDetailViewSyle: {
        overflow: "hidden",
        flex: 1,
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "center"
    },
    cardHeaderAvatarStyle: {
        width: 50,
        height: 50,
        marginRight: spaces.high,
        resizeMode: "cover",
        borderRadius: borderRadius.circleRadius(50)
    },
    cardHeaderTextStyle: {
        width: "100%",
        fontSize: fonts.smallMidFontSize,
        fontWeight: fonts.middleFontWeight,
        color: colors.text,
    },
    cardHeaderTimeTextStyle: {
        width: 50,
        height: 20,
        fontSize: fonts.smallFontSize,
        fontWeight: fonts.smallFontWeight,
        color: colors.text,
        textAlign: "center",
        borderRadius: borderRadius.middleRadius,
        backgroundColor: colors.primary,
        elevation: shadows.smallShadow
    },
    mapWrapper: {
        width: "100%",
        height: 200,
        borderRadius: borderRadius.smallRadius,
        overflow: "hidden",
        marginBottom: spaces.middle,
    },
    map: {
        width: "100%",
        height: "100%",
    },
    noLocationText: {
        fontSize: fonts.smallFontSize,
        color: colors.text,
        textAlign: "center",
        padding: spaces.middle,
    },
    bottomWrapper: {
        width: "100%", alignItems: "center", marginBottom: spaces.small
    },
    bottomButton: {
        justifyContent: "center", alignItems: "center", elevation: shadows.smallShadow,
        width: 35, height: 35, borderRadius: borderRadius.circleRadius(35), backgroundColor: colors.background
    },
    bottomButtonIcon: {
        width: 25, height: 25, resizeMode: "contain", tintColor: colors.primary, elevation: shadows.smallShadow
    }
});

export default PostCard;
