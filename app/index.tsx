import React, { useEffect, useState } from "react";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { SafeAreaView } from "react-native-safe-area-context";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable } from "react-native";
import { setRecord } from "./redux/slices/timeSlice";
import { useDispatch } from "react-redux";

const Index = () => {
  GoogleSignin.configure({
    webClientId:
      "129226935546-iqsj0lrn6a9mteeh35abbmeun4d50neu.apps.googleusercontent.com",
  });

  const [initializing, setInitializing] = useState<boolean>(true);
  const dispatch = useDispatch();
  const router = useRouter();

  const SignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const response = await GoogleSignin.signIn();
      if (response?.data?.idToken) {
        const googleCredentials = auth.GoogleAuthProvider.credential(
          response.data.idToken
        );
        await auth().signInWithCredential(googleCredentials);

        const firebaseIdToken = await auth().currentUser?.getIdToken();
        if (firebaseIdToken) {
          await AsyncStorage.setItem("jwt", firebaseIdToken);

          const newUser = {
            id: auth().currentUser?.uid,
            email: auth().currentUser?.email,
          };

          const jwt = await AsyncStorage.getItem("jwt");
          const response = await fetch("http://10.0.2.2:5000/auth/sign-in", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ id: newUser.id, email: newUser.email }),
          });

          const { record } = await response.json();
          dispatch(setRecord(record));

          router.push({ pathname: "/screens/StartScreen" });
        } else {
          console.error("Firebase ID token is null or undefined");
        }
      } else {
        console.error("Google sign-in failed, no idToken found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onAuthStateChanged = async (
    firebaseUser: FirebaseAuthTypes.User | null
  ) => {
    if (initializing) setInitializing(false);
    if (firebaseUser) console.log("on");
    else console.log("off");
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <SafeAreaView className="h-screen bg-gray-400 flex items-center justify-center">
      <GoogleSigninButton onPress={SignIn} />
      <Pressable
        onPress={async () => {
          await GoogleSignin.signOut();
          await auth().signOut();
          await AsyncStorage.removeItem("jwt");
          router.push("/");
        }}
        className="h-10 w-10 bg-red-400"
      ></Pressable>
    </SafeAreaView>
  );
};

export default Index;
