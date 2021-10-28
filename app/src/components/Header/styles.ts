import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoutButtom: {
    flexDirection: "row",

    alignItems: "center",
  },

  logoutText: {
    color: COLORS.WHITE,
    fontSize: 15,
    fontFamily: FONTS.REGULAR,
    marginRight: 20,
  },
});
