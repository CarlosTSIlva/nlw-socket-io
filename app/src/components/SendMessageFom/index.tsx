import React, { useState } from "react";

import { Alert, Keyboard, TextInput, View } from "react-native";
import { api } from "../../service/api";
import { COLORS } from "../../theme";
import { Button } from "../Button";

import { styles } from "./styles";

export function SendMessageFom() {
  const [message, setMessage] = useState("");
  const [sendMessage, setSendMessage] = useState(false);

  async function sendMessageSubmit() {
    setSendMessage(true);

    const messageFormatted = message.trim();
    if (messageFormatted.length > 0) {
      setMessage("");
      Keyboard.dismiss();
      await api.post("/messages", { message: messageFormatted });
      Alert.alert("Mensagem enviada com sucesso.");
    } else {
      Alert.alert("Escreva a mensagem para enviar.");
    }
    setSendMessage(false);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline={true}
        value={message}
        maxLength={140}
        onChangeText={(text) => setMessage(text)}
        editable={!sendMessage}
      />
      <Button
        title="ENVIAR MENSAGEM"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        isLoading={sendMessage}
        onPress={sendMessageSubmit}
      />
    </View>
  );
}
