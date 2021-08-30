import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StatusBar, ActivityIndicator, } from "react-native";
import { Body, DateView, Header, MenuItem } from "../../../../comps";
// import { styles } from "../../../../comps/body/style";
import { colors } from "../../../../utils/Colors";
import { width } from "../../../../utils/Dimenssion";
import { fontScale } from "../../../../utils/Fonts";
import { images } from "../../../../utils/Images";
import { text } from "../../../../utils/Text";
import { getKPIByMonthDashboard, getProfile } from "../../../../api";
import { KPIByMonthDashboard, UserObj } from "../../../../models/Data";
import { useNavigation } from "@react-navigation/core";
import { thoundsandSep, ToastNotif } from "../../../../utils/Logistics";
import { _retrieveData } from "../../../../utils/Storage";
import Toast from "react-native-toast-message";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { styles } from "./style";

const DashBoard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(KPIByMonthDashboard);
  const [user, setUserData] = useState(UserObj);
  const isFocused = useIsFocused();
  const route = useRoute();

  const navigation = useNavigation();

  const getData = async () => {
    await getKPIByMonthDashboard(navigation).then((res) => {
      if (res.status == "success") {
        setData(res.data);
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

  const _getProfile = async () => {
    await getProfile(navigation).then((res) => {
      if (res.status == "success") {
        setLoading(false);
        setUserData(res.data);
      }
      if (res.status == "failed") {
        setLoading(false);
      }
    });
  }



  useEffect(() => {
    let mounted = true;

    if (mounted) {
      getData();
      _getProfile();
    }
    return () => mounted = false;
  },[navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.primary} />
      <Header title={text.kpiByMonth} />
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <DateView dateLabel={data.dateRange} />
      <Body
        displayName={user.displayName}
        maGDV={user.gdvId.maGDV}
        style={{ marginTop: fontScale(27) }}
      />
      <View style={styles.body}>
        {loading == true ? <ActivityIndicator size="small" color={colors.primary} /> :null}
       
          <View style={styles.subContainer}>
            <MenuItem
              style={{ marginTop: fontScale(30) }}
              title={text.kpiAchieved}
              icon={images.kpiByMonth}
              value={thoundsandSep(data.achieveKPI)}
              width={width - fontScale(60)}
              onPress={() => navigation.navigate("Achieve")}
            />

            <MenuItem
              titleMenuStyle={{ paddingTop: fontScale(17) }}
              style={{ marginTop: fontScale(60) }}
              title={text.subscriberList}
              icon={images.simlist}
              width={width - fontScale(60)}
              onPress={() => navigation.navigate("SubscriberList")}
            />
            <MenuItem
              titleMenuStyle={{ paddingTop: fontScale(17) }}
              style={{ marginTop: fontScale(60) }}
              title={text.productivitySub}
              icon={images.productivitySub}
              width={width - fontScale(60)}
              onPress={() => navigation.navigate("ProductivitySub")}
            />
            <MenuItem
              style={{ marginTop: fontScale(60) }}
              title={text.expectedSalaryMenu}
              icon={images.salaryByMonth}
              value={thoundsandSep(data.provSal)}
              width={width - fontScale(60)}
              onPress={() => navigation.navigate("ExpectedSalary")}
            />

          </View>
      </View>
    </SafeAreaView>
  );
};

export default DashBoard;
