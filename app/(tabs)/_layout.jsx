

import { View, Text } from 'react-native'
import { Tabs,Redirect } from 'expo-router'

const TabLayout = () => {
  return (
    <>
       <Tabs>
           <Tabs.Screen 
           name='home'
           options={{
               title:"Home"
           }}
            />
             <Tabs.Screen 
           name='profile'
           options={{
               title:"Profile"
           }}
            />
       </Tabs>   
    </>
  )
}

export default TabLayout