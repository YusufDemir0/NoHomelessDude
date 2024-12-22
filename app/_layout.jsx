
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';

const RootLayout = () => {
  return (
    <>
        <Stack >
             <Stack.Screen name="index" options={{headerShown:false}}/>
             <Stack.Screen name="(auth)" options={{headerShown:false}} />
        </Stack>
    </>
  )
}

export default RootLayout


