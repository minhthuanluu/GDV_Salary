import React, { useState } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Body, Header, MenuItem } from '../../../../comps';
import { colors } from '../../../../utils/Colors';
import { width } from '../../../../utils/Dimenssion';
import { fontScale } from '../../../../utils/Fonts';
import { images } from '../../../../utils/Images';
import { text } from '../../../../utils/Text';
import { styles } from './style';
import { useNavigation } from "@react-navigation/native";
import { User } from '../../../../models/Admin';
import { _retrieveData } from '../../../../utils/Storage';
import moment from 'moment';
import { ROLE } from '../../../../utils/Roles';

const KPIHome = (props) => {
  const [user, setUser] = useState(User);
  const [month, setMonth] = useState(moment(new Date()).format("MM/YYYY"));
  const navigation = useNavigation();
  const checkAdminKPIMonthRole = async () => {
    await _retrieveData("userInfo").then((item) => {
      if (item.userId.userGroupId.code == ROLE.VP_CTY || item.userId.userGroupId.code == ROLE.VMS_CTY || item.userId.userGroupId.code == ROLE.ADMIN) {
        navigation.navigate("AdminKPIMonth")
      }
      if (item.userId.userGroupId.code == ROLE.MBF_CHINHANH) {
        navigation.navigate("AdminKPIMonthShop", { branchItem: { "branchCode": item?.userId.shopId.shopCode, "month": month } })
      }
      if (item.userId.userGroupId.code == ROLE.MBF_CUAHANG) {
        navigation.navigate("AdminKPIMonthGDV", { branchItem: { "branchCode": item?.userId.shopId.parentShopId.shopCode, "shopCode": item?.userId.shopId.shopCode, "month": month } })
      }
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.primary} />
      {
        <Header title={text.kpi} />
      }
      <Body style={{ marginTop: fontScale(27) }} showInfo={false} />
      <View style={styles.body}>
        <MenuItem style={{ marginTop: fontScale(30) }} title={text.topTellers} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.toptellers} width={width - fontScale(60)} onPress={() => navigation.navigate("AdminTopTellersKPI")} />
        <MenuItem style={{ marginTop: fontScale(60) }} title={text.groupKPI} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.groupkpi} iconStyle={{ width: fontScale(70), height: fontScale(80) }} width={width - fontScale(60)} onPress={() => navigation.navigate("AdminKPIGroupKPI")} />
        <MenuItem style={{ marginTop: fontScale(60) }} title={text.kpiMonth} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.kpiByMonth} width={width - fontScale(60)} onPress={() => checkAdminKPIMonthRole()} />
        <MenuItem style={{ marginTop: fontScale(60) }} title={text.productivityAverage} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.productivitySub} width={width - fontScale(60)} onPress={() => navigation.navigate("AdminProductivitySub")} />
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
}

export default KPIHome;