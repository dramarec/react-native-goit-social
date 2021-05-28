import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, FlatList, Image } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";

import db from "../../firebase/config";


const ProfileScreen = () => {
    const dispatch = useDispatch();
    const [userPosts, setUserPosts] = useState([]);
    const { userId } = useSelector(state => state.auth);

    useEffect(() => {
        getUserPosts();
    }, []);

    const getUserPosts = async () => {
        await db
            .firestore()
            .collection("posts")
            .where("userId", "==", userId)
            .onSnapshot(data =>
                setUserPosts(data.docs.map(doc =>
                    ({ ...doc.data(), id: doc.id })
                ))
            );
    };

    const signOut = () => {
        dispatch(authSignOutUser());
    };

    return (
        <View style={styles.container}>
            <View style={styles.btn}>
                <Button title="signOut"
                    onPress={signOut}
                />
            </View>
            <View>
                <FlatList
                    data={userPosts}
                    keyExtractor={item => item.id}
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
                            <View>
                                <Text>{item.comment}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    btn: {
        marginTop: 100,
    },
});

export default ProfileScreen;
