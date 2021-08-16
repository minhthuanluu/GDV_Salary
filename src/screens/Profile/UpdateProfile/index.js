import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Image,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert
} from "react-native";
import { getProfile, updateAvatar, updateProfile } from "../../../api";
import { Button, Header, ProfileItem } from "../../../comps";
import { UserObj } from "../../../models/Data";
import { colors } from "../../../utils/Colors";
import { images } from "../../../utils/Images";
import { text } from "../../../utils/Text";
import { styles } from "./styles";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/core";
import mime from "mime";
import { imgUrl } from "../../../api/untils";
import { _storeData } from "../../../utils/Storage";
import { useIsFocused } from "@react-navigation/native";
import { fontScale } from "../../../utils/Fonts";
import { backHandler, ToastNotif } from "../../../utils/Logistics";
import Toast from "react-native-toast-message";

const UpdateProfile = (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(UserObj);
  const [displayName, setDisplayName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [formData, setFormData] = useState(new FormData());
  const [pickAvatar, setPickAvatar] = useState(false);
  const isFocused = useIsFocused();
  const [onChangeDisplayName, setOnChangeDisplayName] = useState(false)

  const getData = async () => {
    await getProfile(navigation).then((res) => {
      if (res.status == "success") {
        setUserData(res.data);
      }
      if (res.status == "failed") {
      }
    });
  };

  const _updateProfile = async (displayName) => {
    if (pickAvatar == true) {
      formData.append('avatar', avatar);
      await updateAvatar(formData, navigation).then(async (res) => {
        if (res.status == "success") {

          if (onChangeDisplayName == true) {
            await updateProfile(displayName, navigation).then(async (res) => {
              if (res.status == "success") {
                Alert.alert(
                  text.notif,
                  text.updateInfoSuccess,
                  [
                    { text: "OK", onPress: () => navigation.navigate('Profile') }
                  ],
                  { cancelable: false }
                );
                setOnChangeDisplayName(false)
                setLoading(false);
              } else {

              }
            });
          } else {
            Alert.alert(
              text.notif,
              text.updateInfoSuccess,
              [
                { text: "OK", onPress: () => navigation.navigate('Profile') }
              ],
              { cancelable: false }
            );
          }

        }
        if (res.status == "failed") {
          alert(res.status)
        }
      })

    } else {
      await updateProfile(displayName, navigation).then(async (res) => {
        if (res.status == "success") {
          setLoading(false);
          Toast.show({
            text1: "Thông báo",
            text2: res.message,
            type: "success",
            visibilityTime: 500,
            autoHide: true,
            onHide: () => navigation.navigate("Profile")
          })

        }
        if (res.status == "failed") {
          ToastNotif('Cảnh báo', res.message, 'error', true);
        }
      });

    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {


      let localUri = "file:///" + result.uri.split("file:/").join("");
      let filename = localUri.split("/").pop();

      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      let fData = new FormData();
      fData.append("avatar", {
        uri: localUri,
        type: mime.getType(localUri),
        name: filename,
      });
      setFormData(fData);
      setPickAvatar(true);
      setAvatar(result.uri);
    } else {
      setPickAvatar(false)
    }
  };

  useEffect(() => {
    getData();
    backHandler(navigation, "Profile");
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.primary} />
      <Header title={text.updateProfile} />
      <Image
        source={images.profileHeader}
        resizeMode="stretch"
        style={styles.headerShape}
      />
      <View style={styles.personInfo}>
        <Text style={styles.staffName}>{userData.displayName}</Text>
        <Text style={styles.staffCode}>{userData.gdvId ? userData.gdvId.maGDV : userData.shopId.shopCode}</Text>
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={() => pickImage()}>
          <Image
            style={styles.avatar}
            source={pickAvatar == true ? { uri: avatar } : userData.avatar != null ? { uri: imgUrl + userData.avatar } : images.avatar} />
        </TouchableOpacity>
      </View>
      <View>
        {loading == true ? (
          <ActivityIndicator size="small" color={color.primary} />
        ) : (
          <>
            <ProfileItem
              editMode
              defaultValue={userData.displayName}
              icon={images.man}
              title={text.staffName}
              size={fontScale(25)}
              onChangeText={(value) => [setDisplayName(value), setOnChangeDisplayName(true)]} />
            <Button
              style={styles.button}
              label={text.saveChange}
              onPress={() => _updateProfile(displayName)} />
          </>
        )}
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

export default UpdateProfile;
