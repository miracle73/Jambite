import { Stack } from "expo-router"
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react';


const RootLayout = () => {

    return (
        <>
            <StatusBar style="dark" />
            <Stack >
                <Stack.Screen
                    name="index"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="signin"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="signup"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="verification"
                    options={{
                        headerShown: false,
                    }}
                />


            </Stack >

        </>



    )


}

export default RootLayout