import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

const PostsScreen = ({ route }) => {
    console.log("{*} ===> PostsScreen ===> route", route.params);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (route.params) {
            setPosts((prevState) => [...prevState, route.params]);
        }
    }, [route.params]);

    console.log("{*} ===> PostsScreen ===> posts", posts);

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
                        <Image
                            source={{ uri: item.photo }}
                            style={{ width: 350, height: 200 }}
                        />
                    </View>
                )}
            />


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default PostsScreen;
