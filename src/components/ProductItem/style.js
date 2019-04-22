import {StyleSheet} from 'react-native'
import {Constants,Colors} from '@common'

export default StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: Colors.Gray,
    backgroundColor: "black",
    width: 170,
    height: 290
  },
  image: {
    justifyContent: "flex-end",
    padding: 10,
    marginTop: 5,
    width: 169,
    height: 169
  },
  percent: {
    height: 20,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.Red
  },
  percentText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white"
  },
  name: {
    fontSize: 15,
    marginTop: 10,
    marginHorizontal: 7,
    color: "#f9b020",
    fontWeight: "bold"
  },
  sale_price: {
    fontSize: 13,
    marginTop: 7,
    marginHorizontal: 10,
    color: Colors.Gray,
    textDecorationLine: "line-through"
  },
  price: {
    fontSize: 15,
    marginTop: 7,
    marginHorizontal: 10,
    color: "black"
  },
  freeShipping: {
    fontSize: 15,
    marginTop: 7,
    marginHorizontal: 10,
    color: "black"
  },
  bottomView: {
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 10
  },
  icon: {
    width: 22,
    height: 22,
    margin: 4,
    resizeMode: "contain",
    tintColor: Colors.Gray
  },
  regular_price: {
    fontSize: 13,
    marginLeft: 5,
    color: Colors.DarkGray,
    textDecorationLine: "line-through"
  }
});
