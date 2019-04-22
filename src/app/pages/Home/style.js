import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  content: {
    // paddingBottom: 10
  },
  imageBackground: {
    width: "100%",
    height: 1600
  },
  imageBackground1:{
    marginTop : 15,
    backgroundColor: "rgba(244,255,254,0.6499537)",
    height:500,
    alignItems: "center",
  },
  imageBackgroud2: {
    width: "100%",
    height: 400,
    backgroundColor: "rgba(0,0,0,0.6)"
  },
  categoryText: {
    height: 500,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  paragraph: {
    margin:8,
    color: "#fff",
    textAlign: "center",
    fontSize: 16
  },
  yellowText: {
    fontSize: 36,
    fontWeight: "700",
    marginVertical: 15,
    textAlign: "center",
    color: "#f9b020",
  },
  categoryButton: {
    fontSize: 24,
    color: "white",
    borderWidth: 1,
    borderColor: "#fff",
    margin: 5,
    padding: 5
  }
});
