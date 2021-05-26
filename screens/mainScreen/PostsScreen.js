import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DefaultScreenPosts from "../nestedScreens/DefaultScreenPosts";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
    return (
        <NestedScreen.Navigator>
            <NestedScreen.Screen component={DefaultScreenPosts} name="DefaultScreen" />
            <NestedScreen.Screen component={CommentsScreen} name="Comments" />
            <NestedScreen.Screen component={MapScreen} name="Map" />
        </NestedScreen.Navigator>
    );
};

export default PostsScreen;
