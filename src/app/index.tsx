import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { JambiteText } from '../../assets/svg'
import { useRouter } from "expo-router";

const index = () => {
    const router = useRouter();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF", }}>
            <View style={{ paddingHorizontal: 20, justifyContent: "space-between", flex: 1, }}>
                <View></View>
                <View style={styles.container}>
                    <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                        <View style={styles.roundedContainer}>

                        </View>
                    </View>
                    <Text style={styles.firstText}>Welcome to Ited</Text>
                    <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                        <JambiteText />
                    </View>
                    <Text style={styles.secondText}>
                        Where education is simplified to help our student get a smooh and succesful educational journey
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { router.push("/signin") }}
                >
                    <Text style={styles.thirdText}>Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#0F065E',
        height: 40,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: 50,
        marginHorizontal: 50




    },
    container: {

    },
    roundedContainer: {
        height: 200,
        width: 200,
        borderRadius: 100,
        backgroundColor: "#D9D9D9"
    },
    firstText: {
        fontSize: 10,
        color: "#000000",
        fontWeight: "600",
        marginBottom: 10,
        marginTop: 10,
        textAlign: "center"

    },
    secondText: {
        fontSize: 10,
        color: "#000000",
        fontWeight: "600",
        marginTop: 10,
        textAlign: "center"

    },
    thirdText: {
        fontSize: 10,
        color: "#FFFFFF",
        fontWeight: "900",
        textAlign: "center"

    }
})

export default index