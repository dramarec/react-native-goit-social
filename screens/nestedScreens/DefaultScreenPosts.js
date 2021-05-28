import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Image, Button } from "react-native";
import db from "../../firebase/config";

const DefaultScreenPosts = ({ route, navigation }) => {

    const [posts, setPosts] = useState([]);

    const getAllPost = async () => {
        await db
            .firestore()
            .collection("posts")
            .onSnapshot((data) =>
                setPosts(data.docs.map((doc) =>
                    ({ ...doc.data(), id: doc.id })))
            );
    };

    useEffect(() => {
        getAllPost();
    }, []);
    
    // useEffect(() => {
    //     if (route.params) {
    //         setPosts((prevState) => [...prevState, route.params]);
    //     }
    // }, [route.params]);


    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                keyExtractor={(item, indx) => indx.toString()}
                renderItem={({ item }) => (
                    <View
                        style={{
                            marginBottom: 10,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image style={{ width: 350, height: 200 }} source={{ uri: item.photo }} />
                    </View>
                )}
            />
            <Button title="go to map" onPress={() => navigation.navigate("Map")} />
            <Button title="go to Comments" onPress={() => navigation.navigate("Comments")} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
});

export default DefaultScreenPosts;
