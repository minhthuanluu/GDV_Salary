import { useNavigation } from '@react-navigation/core';
import moment from 'moment';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { SafeAreaView, View, StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import { Body, Header, MenuItem } from '../../../../comps';
import { colors } from '../../../../utils/Colors';
import { width } from '../../../../utils/Dimenssion';
import { fontScale } from '../../../../utils/Fonts';
import { images } from '../../../../utils/Images';
import { ROLE } from '../../../../utils/Roles';
import { _retrieveData } from '../../../../utils/Storage';
import { text } from '../../../../utils/Text';
import { styles } from './style';

const AdminSalaryByMontHome = (props) => {
  const navigation = useNavigation();
  const [month, setMonth] = useState(moment(new Date()).subtract(1, "months").format("MM/YYYY"));
  const [role, setRole] = useState('')

  const checkAdminSalaryByMonthRole = async () => {
    await _retrieveData("userInfo").then((item) => {
      if (item?.userId.userGroupId.code == ROLE.VMS_CTY || item?.userId.userGroupId.code == ROLE.VP_CTY || item?.userId.userGroupId.code == ROLE.ADMIN) {
        navigation.navigate("AdminMonthSalary")
      }
      if (item?.userId.userGroupId.code == "MBF_CHINHANH") {
        navigation.navigate("AdminMonthSalaryShop", {
          item: {
            "branchCode": item?.userId.shopId.shopCode,
            "month": month
          }
        })
      }
      if (item?.userId.userGroupId.code == "MBF_CUAHANG") {
        navigation.navigate("AdminMonthSalaryGDV", {
          item: {
            branchCode: item?.userId.shopId.parentShopId.shopCode,
            shopCode: item?.userId.shopId.shopCode,
            month: month
          }
        })
      }
    })
  }

  useEffect(() => {
    const check = async () => {
      await _retrieveData("userInfo").then((item) => {
        setRole(item?.userId.userGroupId.code);
      })
    }
    check();
  })

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.primary} />
      {
        <Header title={text.salaryByMonth} />
      }
      <Body style={{ marginTop: fontScale(27) }} showInfo={false} />
      <View style={styles.body}>
        {role == ROLE.VMS_CTY || role == ROLE.ADMIN ? <MenuItem style={{ marginTop: fontScale(30) }} title={text.costManagement} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.otherExpenses} width={width - fontScale(60)} onPress={() => navigation.navigate("AdminExpenseManagementDashboard")} /> : null}
        <MenuItem style={{ marginTop: role == ROLE.VMS_CTY || role == ROLE.ADMIN ?fontScale(60):fontScale(30) }} title={text.topTellers} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.toptellers} iconStyle={{ width: fontScale(60), height: fontScale(80), marginTop: -15 }} width={width - fontScale(60)} onPress={() => navigation.navigate("AdminTopTellers")} />
        <MenuItem style={{ marginTop: fontScale(60) }} title={text.grocontractSalary} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.salaryByMonth} width={width - fontScale(60)} onPress={() => navigation.navigate("AdminSalaryGroup")} />
        <MenuItem style={{ marginTop: fontScale(60) }} title={text.salaryMonth} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.incentiveCost} width={width - fontScale(60)} onPress={() => checkAdminSalaryByMonthRole()} />
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
}

export default AdminSalaryByMontHome;