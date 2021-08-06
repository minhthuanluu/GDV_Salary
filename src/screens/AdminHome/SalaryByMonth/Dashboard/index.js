import { useNavigation } from '@react-navigation/core';
import moment from 'moment';
import React, { useState } from 'react';
import { SafeAreaView, View, StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import { Body, Header, MenuItem } from '../../../../comps';
import { User } from '../../../../models/Admin';
import { colors } from '../../../../utils/Colors';
import { width } from '../../../../utils/Dimenssion';
import { fontScale } from '../../../../utils/Fonts';
import { images } from '../../../../utils/Images';
import { _retrieveData } from '../../../../utils/Storage';
import { text } from '../../../../utils/Text';
import { styles } from './style';

const AdminSalaryByMontHome = (props) => {
  const navigation = useNavigation();
  const [month, setMonth] = useState(moment(new Date()).format("MM/YYYY"));
  const [user, setUser] = useState(User)

  const checkAdminSalaryByMonthRole = async () => {
    await _retrieveData("userInfo").then((item) => {
      let role = item?.userId.userGroupId.code;
      setUser(item)
      if (role == "VMS_CTY") {
        navigation.navigate("AdminMonthSalary")
      }
      if (role == "MBF_CHINHANH") {
        navigation.navigate("AdminMonthSalaryShop", {
          item: {
            "branchCode": item?.userId.shopId.shopCode,
            "month": month
          }
        })
      }
      if (role == "MBF_CUAHANG") {
        navigation.navigate("AdminMonthSalaryGDV", {
          item: {
            branchCode: user?.userId.shopId.parentShopId.shopCode,
            shopCode: user?.userId.shopId.shopCode,
            month: month
          }
        })
      }
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.primary} />
      {
        <Header title={text.salaryByMonth} />
      }
      {/* <Text>{JSON.stringify(user)}</Text> */}
      <Body style={{ marginTop: fontScale(27) }} showInfo={false} />
      <View style={styles.body}>
        <MenuItem style={{ marginTop: fontScale(30) }} title={text.costManagement} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.otherExpenses} width={width - fontScale(60)} onPress={() => navigation.navigate("AdminExpenseManagement")} />
        <MenuItem style={{ marginTop: fontScale(60) }} title={text.topTellers} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.toptellers} iconStyle={{ width: fontScale(60), height: fontScale(80), marginTop: -15 }} width={width - fontScale(60)} onPress={() => navigation.navigate("AdminTopTellers")} />
        <MenuItem style={{ marginTop: fontScale(60) }} title={text.groupSalary} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.salaryByMonth} width={width - fontScale(60)} onPress={() => navigation.navigate("AdminSalaryGroup")} />
        <MenuItem style={{ marginTop: fontScale(60) }} title={text.salaryMonth} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.incentiveCost} width={width - fontScale(60)} onPress={() => checkAdminSalaryByMonthRole()} />


      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
}

export default AdminSalaryByMontHome;