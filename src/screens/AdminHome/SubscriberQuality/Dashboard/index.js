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
import { Text } from "react-native";
import { getAdminSubscriberQualityDashboard } from "../../../../adminapi";

const DashBoard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  const route = useRoute();

  const navigation = useNavigation();

  const checkAdminSubscriberQualityRole = async () => {
    await _retrieveData("userInfo").then((item) => {
      if (item.userId.userGroupId.code == "VMS_CTY") {
        navigation.navigate("AdminSubscriberQualitySummaryBranch")
      }
      if (item.userId.userGroupId.code == "MBF_CHINHANH") {
        navigation.navigate("AdminSubscriberQualitySummaryShop", { item: { "branchCode": item?.userId.shopId.shopCode } })
      }
      if (item.userId.userGroupId.code == "MBF_CUAHANG") {
        navigation.navigate("AdminSubscriberQualitySummaryEmp", { item: { "branchCode": item?.userId.shopId.parentShopId.shopCode,"shopCode" :item?.userId.shopId.shopCode}})
      }
    })
  }

  const getData = async () => {
    await getAdminSubscriberQualityDashboard(navigation).then((res) => {
      if (res.status == "success") {
        setData(res.data.data);
        setLoading(false);
      }

      if (res.status == "failed") {
        ToastNotif("Cảnh báo", res.message, "error", true);
        setLoading(false);
      }

      if (res.status == "v_error") {
        ToastNotif("Cảnh báo", res.message, "error", true);
        setTimeout(() => {
          navigation.goBack()
        }, 1000);
      }
    });
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      getData();
      //   _getProfile();
    }
    return () => mounted = false;
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.primary} />
      <Header title={text.subscriberQuality} />
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <Text style={{color:colors.white,textAlign:"center"}}>{data.notification}</Text>

      <Body
        style={{ marginTop: fontScale(27) }}
      />
      <View style={styles.body}>
        {loading == true ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <>
            <MenuItem
              style={{ marginTop: fontScale(30) }}
              title={text.violateWarning}
              icon={images.warning}
              value={thoundsandSep(data.violateEmp)}
              width={width - fontScale(60)}
              onPress={() => console.log("Chức năng đang phát triển")}
            />

            <MenuItem
              titleMenuStyle={{ paddingTop: fontScale(17) }}
              style={{ marginTop: fontScale(60) }}
              title={text.statistical}
              icon={images.growthday}
              width={width - fontScale(60)}
              value={data.violateEmp}
              onPress={() => checkAdminSubscriberQualityRole()}
            />


          </>
        )}
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

export default DashBoard;
