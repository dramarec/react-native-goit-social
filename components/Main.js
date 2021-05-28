import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useRoute } from "../router";
import db from "../firebase/config";

const Main = () => {
    const [user, setUser] = useState(null);

    const state = useSelector(state => state)
    console.log("{*} ===> Main ===> state", state);

    db.auth()
        .onAuthStateChanged(user => setUser(user));

    const routing = useRoute(user);

    return (
        <NavigationContainer>
            {routing}
        </NavigationContainer>
    )
}

export default Main