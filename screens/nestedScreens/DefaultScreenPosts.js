import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Image, Button } from "react-native";

const DefaultScreenPosts = ({ route, navigation }) => {
    // console.log("route.params===>", route.params);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (route.params) {
            setPosts((prevState) => [...prevState, route.params]);
        }
    }, [route.params]);

    // console.log("posts===>", posts);

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
