import React from "react";

import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";

import LogoSvg from "../../assets/logo.svg";
import { UserPhoto } from "../UserPhoto";
import { useAuth } from "../../hooks/Auth";

export function Header() {
  const { user, sigOut } = useAuth();
  return (
    <View style={styles.container}>
      <LogoSvg />
      <View style={styles.logoutButtom}>
        {user && (
          <TouchableOpacity onPress={sigOut}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        )}

        <UserPhoto imageUri={user?.avatar_url} />
      </View>
    </View>
  );
}
