import React from "react";

import { View } from "react-native";

import { styles } from "./styles";

import { Button } from "../Button";
import { COLORS } from "../../theme";
import { useAuth } from "../../hooks/Auth";

export function SigninBox() {
  const { sigIn, isSigningIng } = useAuth();
  return (
    <View style={styles.container}>
      <Button
        onPress={sigIn}
        title="ENTRAR COM O GITHUB"
        color={COLORS.BLACK_PRIMARY}
        backgroundColor={COLORS.YELLOW}
        icon="github"
        isLoading={isSigningIng}
      />
    </View>
  );
}
