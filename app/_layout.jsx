import { Stack } from "expo-router";
import { UserContextProvider } from "../managments/userManagment";

const RootLayout = () => {
  const options = {headerShown:false}
  return (
    <UserContextProvider>
        <Stack >
             <Stack.Screen name="index" options={options}/>
             <Stack.Screen name="(auth)" options={options} />
             <Stack.Screen name="(tabs)" options={options} />
             <Stack.Screen name="search" options={options} />
        </Stack>
    </UserContextProvider>
  )
}

export default RootLayout


