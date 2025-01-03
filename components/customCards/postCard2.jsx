import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Linking} from 'react-native';
import { borderRadius, colors, fonts, shadows, spaces } from '../../constands/appConstand';
import avatar from "../../assets/images/defaultAvatar.png";
import PostCardOpanableSection from './postCardOpenableSection';
import MapView, { Marker } from 'react-native-maps';
import { UserContext } from '../../managments/userManagment';

const PostCard2 = ({
  post: {location,description, creator={username:"",photo:null}, needs, createTime,id
},bottomButtonIcon=null,
bottomButtonClick = (id) => {}}) => {
  const {userState} = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [dynamicDesc,setDynamicDesc] = useState({desc:description})
  
    let imageSource ;
    if(avatar === null || avatar === "")
    {
        imageSource = avatar
    }
    else{
         imageSource = { uri: `data:image/jpeg;base64,${creator.photo}` }
    }

  const calculateHourDifference = (inputDate) => {
    const now = new Date();
  
    const parsedDate = new Date(inputDate);
  
    const timeDifferenceMs = now - parsedDate;
  
    const hourDifference = timeDifferenceMs / (1000 * 60 * 60);
  
    return `${hourDifference.toFixed(1)} h`;
  };

  const handleLocationPress = (latitude, longitude) => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    Linking.openURL(url)
  };

  const parseLocation = (location) => {
    const coordinates = location.split(',');
    if (coordinates.length === 2) {
      const latitude = parseFloat(coordinates[0].trim());
      const longitude = parseFloat(coordinates[1].trim());
      if (!isNaN(latitude) && !isNaN(longitude)) {
        return { latitude, longitude };
      }
    }
    return null; 
  };

  const translateFetch = (language) => {
         const jsonTranslateData = JSON.stringify({text:dynamicDesc.desc,targetLanguage:language})
         console.log("jsonTranslateData : ",jsonTranslateData)
         fetch(`${process.env.BASE_URL}translate`,{
             method:"POST",
             body:jsonTranslateData,
             headers:{
                 "Content-Type":"application/json",
                 "Authorization":`Bearer ${userState.token}`
             }
         })
         .then(res => {
             return res.text()
         })
         .then(data => {
            console.log("translate data : ",data)
              setDynamicDesc(oldState => {
                  return {desc:data}
              })
              setModalVisible(false)
         })
         .catch(err => {
            console.log("err : ",err)
         })
  }
 
  const lastParseLocation = parseLocation(location);

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.cardHeader}>
        <View style={styles.headerDetailViewSyle}>
          <Image style={styles.cardHeaderAvatarStyle} source={imageSource} />
          <Text numberOfLines={1} style={styles.cardHeaderTextStyle}>
            {creator?.username || "Unknown User"}
          </Text>
        </View>
        <Text style={styles.cardHeaderTimeTextStyle}>{calculateHourDifference(createTime)}</Text>
      </View>

      <PostCardOpanableSection
        title={"Description"}
        data={[dynamicDesc.desc]}
        activeHeight={80}
        sectionItemHeight={60}
        wrapperStyle={{ marginBottom: spaces.middle }}
      />
      <PostCardOpanableSection
        title={"Needs"}
        data={[...needs]}
        activeHeight={150}
        wrapperStyle={{ marginBottom: spaces.middle }}
      />

    
      <PostCardOpanableSection
        title={"Location"}
        data={[]}
        activeHeight={200}
        sectionItemHeight={200}
        wrapperStyle={{ marginBottom: spaces.middle }}
        >
        { lastParseLocation ? (
            <TouchableOpacity onPress={() => handleLocationPress(lastParseLocation.latitude, lastParseLocation.longitude)}>
              <View style={styles.mapWrapper}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: lastParseLocation.latitude,
                    longitude: lastParseLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  zoomEnabled={true}
                  scrollEnabled={true}
                >
                  <Marker coordinate={lastParseLocation} />
                </MapView>
              </View>
            </TouchableOpacity>
          ) : (
            <Text style={styles.noLocationText}>Konum bulunamadı</Text>
          )}
        </PostCardOpanableSection>

    
      <View style={styles.bottomWrapper}>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.bottomButtonText}>Translate</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Language</Text>
            <TouchableOpacity
              style={styles.languageButton}
              onPress={() => {
                translateFetch("en")
              }}
            >
              <Text style={styles.languageText}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.languageButton}
              onPress={() => {
                translateFetch("tr")
              }}
            >
              <Text style={styles.languageText}>Turkish</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.languageButton}
              onPress={() => {
                translateFetch("ru")
              }}
            >
              <Text style={styles.languageText}>Russian</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.languageButton}
              onPress={() => {
                translateFetch("ja")
              }}
            >
              <Text style={styles.languageText}>Japanese</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {bottomButtonIcon !== null && (
        <View style={styles.bottomWrapper}>
          <TouchableOpacity style={styles.bottomButton} onPress={() =>{
             console.log("post id : ",id)
             bottomButtonClick(id)}}>
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
    elevation: shadows.middleShhadow,
  },
  cardHeader: {
    width: "100%",
    padding: spaces.small,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spaces.small,
  },
  headerDetailViewSyle: {
    overflow: "hidden",
    flex: 1,
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
  },
  cardHeaderAvatarStyle: {
    width: 50,
    height: 50,
    marginRight: spaces.high,
    resizeMode: "cover",
    borderRadius: borderRadius.circleRadius(50),
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
    elevation: shadows.smallShadow,
  },
  mapWrapper: {
    flex: 1,
    height: 200,
  },
  map: {
    flex: 1,
  },
  noLocationText: {
    fontSize: fonts.smallFontSize,
    color: colors.text,
    textAlign: "center",
    padding: spaces.middle,
  },
  bottomWrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: spaces.small,
  },
  bottomButton: {
    justifyContent: "center",
    alignItems: "center",
    elevation: shadows.smallShadow,
    width: 150,
    height: 35,
    borderRadius: borderRadius.circleRadius(35),
    backgroundColor: colors.background,
  },
  bottomButtonText: {
    color: colors.primary,
    fontSize: fonts.smallFontSize,
  },
  bottomButtonIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    tintColor: colors.primary,
    elevation: shadows.smallShadow,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: spaces.middle,
    backgroundColor: colors.background,
    borderRadius: borderRadius.middleRadius,
  },
  modalTitle: {
    fontSize: fonts.middleFontSize,
    fontWeight: fonts.middleFontWeight,
    color: colors.text,
    textAlign: "center",
    marginBottom: spaces.middle,
  },
  languageButton: {
    marginVertical: spaces.small,
    padding: spaces.small,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.smallRadius,
    alignItems: "center",
  },
  languageText: {
    fontSize: fonts.smallFontSize,
    color: colors.text,
  },
});

export default PostCard2;