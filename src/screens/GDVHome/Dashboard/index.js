import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StatusBar, BackHandler, ToastAndroid } from 'react-native';
import { MenuItem, Header, Body } from '../../../comps';
import { images } from '../../../utils/Images';
import { text } from '../../../utils/Text';
import { width } from '../../../utils/Dimenssion';
import { fontScale } from '../../../utils/Fonts';
import { colors } from '../../../utils/Colors';
import { useNavigation } from '@react-navigation/core';
import { _retrieveData } from '../../../utils/Storage';
import { UserObj } from "../../../models";
import { imgUrl } from '../../../api/untils';
import { getProfile } from '../../../api';
import { styles } from './style';
import { ToastNotif } from '../../../utils/Logistics';
import Toast from 'react-native-toast-message';
import { useIsFocused } from '@react-navigation/native';

const Dashboard = (route) => {
  const navigation = useNavigation();

  const [user, setUserData] = useState(UserObj);
  const [loading, setLoading] = useState(false);
  const isFocus = useIsFocused();

  const getData = async () => {
    setLoading(true)
    await getProfile(navigation).then((res) => {
      if (res.status == "success") {
        setLoading(false)
        setUserData(res.data)
      }
      if (res.status == "v_error") {
        ToastNotif('Cảnh báo', res.message, 'error', true);
        setLoading(false)
      }
      if (res.status == "failed") {
        ToastNotif('Cảnh báo', res.message, 'error', true);
        setLoading(false)
      }
    })

  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (!navigation.isFocused()) {
        return false;
      } else {
        BackHandler.exitApp();
        return true;
      }
    });
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (!navigation.isFocused()) {
        return false;
      } else {
        BackHandler.exitApp();
        return true;
      }
    });
    getData();
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        if (!navigation.isFocused()) {
          return false;
        } else {
          BackHandler.exitApp();
          return true;
        }
      });
    };
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.primary} />
      {
        user&&<Header showBack={false} profile avatar={{ uri: imgUrl + user.avatar }} fullName={user && user.displayName} maGDV={user && user.userGroupId.code} />
      }
      <Body style={{ marginTop: fontScale(27) }} showInfo={false} />
      <View style={styles.body}>
        <MenuItem style={{ marginTop: fontScale(30) }} title={text.kpiByMonth} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.kpiByMonth} width={width - fontScale(60)} onPress={() => navigation.navigate("KPIByMonthDashboard")} />
        <MenuItem style={{ marginTop: fontScale(60) }} title={text.salaryByMonth} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.salaryByMonth} width={width - fontScale(60)} onPress={() => navigation.navigate("SalaryByMonthDashboard")} />
        <MenuItem style={{ marginTop: fontScale(60) }} title={text.averageIncome} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.avgIcome} width={width - fontScale(60)} onPress={() => navigation.navigate("AvgIncomeByMonth")} />
        <MenuItem style={{ marginTop: fontScale(60) }} title={text.subscriberQuality} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.subscriberQuality} width={width - fontScale(60)} onPress={() => navigation.navigate("SubscriberQuality")} />
        <MenuItem style={{ marginTop: fontScale(60) }} title={text.transactionInformation} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.transactionInformation} width={width - fontScale(60)} onPress={() => navigation.navigate("TransactionInfo")} />
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
}

export default Dashboard;