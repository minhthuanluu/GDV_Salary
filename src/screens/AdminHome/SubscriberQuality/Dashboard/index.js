import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StatusBar, ActivityIndicator, BackHandler, } from "react-native";
import { Body, DateView, Header, MenuItem } from "../../../../comps";
import { styles } from "../../../../comps/body/style";
import { colors } from "../../../../utils/Colors";
import { width } from "../../../../utils/Dimenssion";
import { fontScale } from "../../../../utils/Fonts";
import { images } from "../../../../utils/Images";
import { text } from "../../../../utils/Text";
import { getKPIByMonthDashboard, getProfile } from "../../../../api";
import { KPIByMonthDashboard, UserObj } from "../../../../models/Data";
import { useNavigation } from "@react-navigation/core";
import { backHandler, thoundsandSep, ToastNotif } from "../../../../utils/Logistics";
import { _retrieveData } from "../../../../utils/Storage";
import Toast from "react-native-toast-message";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { getAdminSubscriberQualityDashboard } from "../../../../adminapi";
import { Text } from "react-native";

const DashBoard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
//   const [user, setUserData] = useState(UserObj);
  const isFocused = useIsFocused();
  const route = useRoute();

  const navigation = useNavigation();

  const getData = async () => {
    await getAdminSubscriberQualityDashboard(navigation).then((res) => {
        // console.log(res.data[0])
      if (res.status == "success") {
        setData(res.data[0]!=undefined ? res.data[0] : []);
        setLoading(false);
      }

      if (res.status == "failed") {
        ToastNotif("Cảnh báo", res.message, "error", true);
        setLoading(false);
      }

      if (res.status == "v_error") {
        ToastNotif("Cảnh báo", res.message, "error", true);
        setTimeout(() => {
          navigation.navigate("Home");
        }, 1000);
      }
    });
  };

//   const _getProfile = async () => {
//     await getProfile(navigation).then((res) => {
//       if (res.status == "success") {
//         setLoading(false);
//         setUserData(res.data);
//       }
//       if (res.status == "failed") {
//         setLoading(false);
//       }
//     });
//   }



  useEffect(() => {
    let mounted = true;

    if (mounted) {
      getData();
    //   _getProfile();
    }
    return () => mounted = false;
  },[navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.primary} />
      <Header title={text.subscriberQuality} />
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <Text style={styles.text}>{data.notification}</Text>
      
      <Body
        // displayName={user.displayName}
        // maGDV={user.gdvId.maGDV}
        style={{ marginTop: fontScale(27) }}
      />
      <View style={styles.body}>
        {loading == true ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <>
            <MenuItem
              style={{ marginTop: fontScale(30) }}
              title={text.alert}
              icon={images.alert}
              value={thoundsandSep(data.violateEmp)}
              width={width - fontScale(60)}
              onPress={() => navigation.navigate("Achieve")}
            />

            <MenuItem
              titleMenuStyle={{ paddingTop: fontScale(17) }}
              style={{ marginTop: fontScale(60) }}
              title={text.summary}
              icon={images.summary}
              width={width - fontScale(60)}
              value={data.violateEmp}
              onPress={() => navigation.navigate("SubscriberList")}
            />
           

          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DashBoard;
