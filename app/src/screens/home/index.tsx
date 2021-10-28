import React from "react";

import { View, KeyboardAvoidingView, Platform } from "react-native";
import { useAnimatedReaction } from "react-native-reanimated";
import { Header } from "../../components/Header";
import { MessageList } from "../../components/MessageList";
import { SendMessageFom } from "../../components/SendMessageFom";
import { SigninBox } from "../../components/SigninBox";
import { useAuth } from "../../hooks/Auth";

import { styles } from "./styles";

export const Home = () => {
  const { user } = useAuth();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <Header />
        <MessageList />
        {user ? <SendMessageFom /> : <SigninBox />}
      </View>
    </KeyboardAvoidingView>
  );
};
