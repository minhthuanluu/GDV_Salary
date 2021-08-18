// This is functions use local storage include store,get,remove data

import AsyncStorage from "@react-native-async-storage/async-storage";

export const _storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(
      key,
      JSON.stringify(value)
    );
  } catch (error) { }
};

export const _retrieveData = async (key) => {
  try {
    var value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) { }
};

export const _removeData = async (key) => {
  try {
    var value = await AsyncStorage.removeItem(key);
    if (value == null) {
      return value
    }
  } catch (error) { }
};