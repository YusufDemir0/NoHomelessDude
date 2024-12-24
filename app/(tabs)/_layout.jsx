import TabBarIconAndText from '../../components/customTabBar/tabBarIconAndText'
import userIcon from "../../assets/icons/person.png"
import homeIcon from "../../assets/icons/home.png"
import { Tabs } from 'expo-router'


const TabLayout = () => {

  const tabScreenOptions = {
               tabBarShowLabel:false,
               tabBarActiveTintColor:"orange",
               tabBarInactiveTintColor:"gray", 
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