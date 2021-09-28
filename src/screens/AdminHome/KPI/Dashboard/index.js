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

const KPIHome=(props)=> {
  const [user,setUser] = useState(User)
  const navigation = useNavigation();
  const checkAdminKPIMonthRole = async () => {
    await _retrieveData("userInfo").then((item) => {
      let role = user?.userId.userGroupId.code;
      setUser(item)
      if (role == "VMS_CTY" || role=="VP_CTY") {
        navigation.navigate("AdminKPIMonth")
      } 
      if (role == "MBF_CHINHANH") {
        navigation.navigate("AdminKPIMonthShop",{ branchItem: {shopCode: user?.userId.shopId.shopCode}})
      } 
      if (role == "MBF_CUAHANG") {
        navigation.navigate("AdminKPIMonthGDV",{ branchItem: {shopCode:user?.userId.shopId.parentShopId.shopCode}, shopItem: {shopCode: user?.userId.shopId.shopCode}})
      }
    })
  }
    return (   
        <SafeAreaView style={styles.container}>
        <StatusBar translucent backgroundColor={colors.primary} />
        {
          <Header title={text.kpi}/>
        }
        <Body style={{ marginTop: fontScale(27) }} showInfo={false} />
        <View style={styles.body}>
          <MenuItem style={{ marginTop: fontScale(30) }} title={text.topTellers} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.toptellers} width={width - fontScale(60)} onPress={() => navigation.navigate("AdminTopTellersKPI")} />
          <MenuItem style={{ marginTop: fontScale(60) }} title={text.groupKPI} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.groupkpi} iconStyle={{width: fontScale(70), height: fontScale(80)}} width={width - fontScale(60)} onPress={() => navigation.navigate("AdminKPIGroupKPI")} />
          <MenuItem style={{ marginTop: fontScale(60) }} title={text.kpiMonth} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.kpiByMonth} width={width - fontScale(60)} onPress={() => navigation.navigate("AdminKPIMonth")} />
          <MenuItem style={{ marginTop: fontScale(60) }} title={text.productivityAverage} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.productivitySub} width={width - fontScale(60)} onPress={() => navigation.navigate("AdminProductivitySub")} />
        </View>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </SafeAreaView>
    );
}

export default KPIHome;