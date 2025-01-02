import TabBarIconAndText from '../../components/customTabBar/tabBarIconAndText'
import userIcon from "../../assets/icons/user.png"
import homeIcon from "../../assets/icons/home.png"
import settingsIcon from "../../assets/icons/settings.png"
import shareIcon from "../../assets/icons/share.png"
import { Tabs } from 'expo-router'
import { colors } from '../../constands/appConstand'

const TabLayout = () => {

  const tabScreenOptions = {
               tabBarShowLabel:false,
               tabBarActiveTintColor:colors.primary,
               tabBarInactiveTintColor:colors.secondary, 
               tabBarIconStyle:{
                   width:"100%",height:"100%",
               },     
  } 
 
  return (
    <>
       <Tabs screenOptions={{
               tabBarHideOnKeyboard:true
       }}>
             <Tabs.Screen 
           name='home'
           options={{
               title:"Home",
               headerShown:false,
               ...tabScreenOptions,
               tabBarIcon :({color , focused}) => {
                   return <TabBarIconAndText color={color} focused={focused} label={"Home"} icon={homeIcon} />
               },
           }}
            />
             <Tabs.Screen 
           name='share'
           options={{
               title:"Share",
               headerShown:false,
               ...tabScreenOptions,
               tabBarIcon :({color , focused}) => {
                   return <TabBarIconAndText color={color} focused={focused} label={"Share"} icon={shareIcon} />
               }
           }}
            />
             <Tabs.Screen 
           name='profile'
           options={{
               title:"Profile",
               headerShown:false,
               ...tabScreenOptions,
               tabBarIcon :({color , focused}) => {
                   return <TabBarIconAndText color={color} focused={focused} label={"Profile"} icon={userIcon} />
               }
           }}
            />
             <Tabs.Screen 
           name='setting'
           options={{
               title:"Setting",
               headerShown:false,
               ...tabScreenOptions,
               tabBarIcon :({color , focused}) => {
                   return <TabBarIconAndText color={color} focused={focused} label={"Setting"} icon={settingsIcon} />
               }
           }}
            />
       </Tabs>   
    </>
  )
}

export default TabLayout