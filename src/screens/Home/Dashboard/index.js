import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StatusBar, TouchableOpacity, BackHandler } from 'react-native';
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
import { Alert } from 'react-native';

const Dashboard = (props) => {
  const navigation = useNavigation();

  const [user, setUserData] = useState(UserObj);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true)
    await getProfile().then((res) => {
      if (res.status == "success") {
        setLoading(false)
        setUserData(res.data)
      }
      if (res.status == "v_error") {

      }
      if (res.status == "failed") {
        setLoading(false)
      }
    })

  }

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    getData();

    return () => {
      backHandler
    };
  }, [""])
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.primary} />
      {
        <Header showBack={false} profile avatar={user.avatar != null ? { uri: imgUrl + user.avatar } : images.avatar} fullName={user.displayName} maGDV={user.gdvId.maGDV} />
      }
      <Body style={{ marginTop: fontScale(27) }} showInfo={false}/>
      <View style={styles.body}>
          <MenuItem style={{ marginTop: fontScale(30) }} title={text.kpiByMonth} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.kpiByMonth} width={width - fontScale(60)} onPress={() => navigation.navigate("KPIByMonthDashboard")} />
          <MenuItem style={{ marginTop: fontScale(60) }} title={text.salaryByMonth} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.salaryByMonth} width={width - fontScale(60)} onPress={() => navigation.navigate("SalaryByMonthDashboard")} />
          <MenuItem style={{ marginTop: fontScale(60) }} title={text.averageIncome} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.avgIcome} width={width - fontScale(60)} onPress={() => navigation.navigate("AvgIncomeByMonth")} />
          <MenuItem style={{ marginTop: fontScale(60) }} title={text.subscriberQuality} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.subscriberQuality} width={width - fontScale(60)} onPress={() => navigation.navigate("SubscriberQuality")} />
          <MenuItem style={{ marginTop: fontScale(60) }} title={text.transactionInformation} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.transactionInformation} width={width - fontScale(60)} onPress={() => navigation.navigate("TransactionInfo")} />
      </View>
    </SafeAreaView>
  );
}

export default Dashboard;