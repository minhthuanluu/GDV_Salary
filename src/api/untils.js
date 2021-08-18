import { Platform } from "react-native";
import { _retrieveData } from "../utils/Storage";

const protocol = Platform.OS == "android" ? "http://" : "https://";
export const baseUrl = `${protocol}hochiminh.mobifone.vn/luongGDV/api/`;
export const imgUrl = `https://hochiminh.mobifone.vn/luongGDV/`;

export const getToken = async (navigation) => {
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      return data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });
}