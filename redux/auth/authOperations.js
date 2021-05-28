import db from "../../firebase/config";
import { authSlice } from './authReducer'

export const authSignUpUser = ({ email, password, nickname }) =>
    async (dispatch, getSatte) => {
        try {

            await db
                .auth()
                .createUserWithEmailAndPassword(email, password);
            const user = await db
                .auth().currentUser;

            await user
                .updateProfile({ displayName: nickname });

            const { uid, displayName } = await db
                .auth().currentUser;

            const userUpdateProfile = {
                userId: uid,
                nickName: displayName,
            };

            dispatch(authSlice.actions
                .updateUserProfile(userUpdateProfile))

        } catch (error) {
            console.log("!*=> error =>", error);
            console.log("!*=> error.message =>", error.message);
        }
    };

export const authSignInUser = ({ email, password }) =>
    async (dispatch, getSatte) => {
        try {
            const user = await db
                .auth()
                .signInWithEmailAndPassword(email, password);
            console.log("user=>", user);
        } catch (error) {
            console.log("*=> error", error);
            console.log("*=> error.code", error.code);
            console.log("*=> error.message", error.message);
        }
    };

export const authStateCahngeUser = () =>
    async (dispatch, getState) => {
        await db
            .auth()
            .onAuthStateChanged(user => setUser(user));
    };

export const authSignOutUser = () =>
    async (dispatch, getSatte) => { };

