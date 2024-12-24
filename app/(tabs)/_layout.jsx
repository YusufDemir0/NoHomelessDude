import TabBarIconAndText from '../../components/customTabBar/tabBarIconAndText'
import userIcon from "../../assets/icons/user.png"
import homeIcon from "../../assets/icons/home.png"
import { Tabs } from 'expo-router'
import { colors } from '../../constands/appConstand'

const TabLayout = () => {

  const tabScreenOptions = {
               tabBarShowLabel:false,
               tabBarActiveTintColor:colors.primary,
               tabBarInactiveTintColor:colors.secondary, 
               
  } 
 
  return (
    <>
       <Tabs>
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
       </Tabs>   
    </>
  )
}

export default TabLayout