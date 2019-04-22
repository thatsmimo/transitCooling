import { StyleSheet } from "react-native";
import { Constants } from "@common";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    justifyContent: "center",
    alignItems: "center"
  },
  textheader: {
    marginTop: 15,
    fontSize: Constants.FontSize.big,
    color: "white"
  },
  btn: {
    backgroundColor: "#B2D9F6",
    padding: 0,
    height: 35,
    borderRadius: 17,
    paddingVertical: 10,
    paddingHorizontal: 25,
    justifyContent: "center",
    marginTop: 10
  },
  textBtn: {
    color: "#007AFF",
    fontWeight: "500"
  },
  headerLogged: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginHorizontal: 10
  },
  userInfo: {
    flex: 1
  },
  btnLogout: {
    paddingVertical: 5
  },
  username: {
    color: "white",
    fontSize: Constants.FontSize.big
  },
  txtLogout: {
    color: "white",
    fontSize: Constants.FontSize.medium
  }
});
