import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { useRoute } from "../router";
import { authStateCahngeUser } from "../redux/auth/authOperations";


const Main = () => {
    const dispatch = useDispatch()

    const { stateChange } = useSelector(state => state.auth)
    console.log("{*} ===> Main ===> state=>stateChange=>", stateChange);

    useEffect(() => {
        dispatch(authStateCahngeUser());
    }, []);

    const routing = useRoute(stateChange);

    return (
        <NavigationContainer>
            {routing}
        </NavigationContainer>
    )
}

export default Main