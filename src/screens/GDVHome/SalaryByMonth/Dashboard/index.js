import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, View, StatusBar, ScrollView, BackHandler } from 'react-native';
import { Body, Header, MenuItem, MetricStatus, TotalSalary,DatePicker } from '../../../../comps';
import { colors } from '../../../../utils/Colors';
import { width } from '../../../../utils/Dimenssion';
import { fontScale } from '../../../../utils/Fonts';
import { images } from '../../../../utils/Images';
import { text } from '../../../../utils/Text';
import { styles } from "./styles";
import { useNavigation } from '@react-navigation/core';
import { getProfile, getSalaryByMonth } from '../../../../api';
import { SalaryByMonth, UserObj } from '../../../../models/Data';
import { thoundsandSep } from '../../../../utils/Logistics';
import { useIsFocused } from "@react-navigation/native";
import { _retrieveData } from '../../../../utils/Storage';
import Toast from 'react-native-toast-message';

const Dashboard = (props) => {
  const isFocused = useIsFocused();
  const [month, setMonth] = useState(moment(new Date()).subtract(1, "months").format("MM/YYYY"));
  const navigation = useNavigation();
  const [data, setData] = useState(SalaryByMonth);
  const [loading, setLoading] = useState(true);
  const [user, setUserData] = useState(UserObj);

  const getData = async (month) => {
    setLoading(true);
    setMonth(month);
    await getSalaryByMonth(month,navigation).then((res) => {
      if (res.status == "success") {
        setData(res.data);
        setLoading(false);
      }
      if (res.status == "v_error") {
        Toast.show({
          text1: "Cảnh báo",
          text2: res.message,
          type: "error",
          visibilityTime: 100,
          autoHide: true,
          onHide: () => navigation.navigate("Home")
        });
      }
      if (res.status == "failed") {
        setLoading(false);
        Toast.show({
          text1: "Cảnh báo",
          text2: res.message,
          type: "error",
          visibilityTime: 100,
          autoHide: true,
          onHide: () => navigation.navigate("Home")
        });
      }
    });
  }

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
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    if (isFocused) {
      getData(month);
      _getProfile();

    }

    return () => {
      backHandler.remove();
    };
  }, [])

  const _onChangeMonth = async (month) => {
    await getData(month);
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.primary} />
      <Header title={text.salaryByMonth} />
      <DatePicker month={month} width={width - fontScale(120)} style={{ alignSelf: "center" }} onChangeDate={(date) => _onChangeMonth(date)} />
      <MetricStatus title={text.numberStatus} status={data.status} style={{ alignSelf: 'center', marginTop: fontScale(13) }} />
      <Body style={{ marginTop: fontScale(10), zIndex: -10 }} displayName={user.displayName} maGDV={user.gdvId.maGDV} />
      <View style={styles.body}>
        {
          loading == true ? <ActivityIndicator color={colors.primary} size="small" /> :
            <View>
              <TotalSalary style={{ alignSelf: 'center', marginTop: -fontScale(15), zIndex: 50 }} title={text.total} value={thoundsandSep(data.monthlySalary)} />
              <ScrollView showsVerticalScrollIndicator={false}>
                <MenuItem style={{ marginTop: fontScale(25) }} title={text.fixedSalary} icon={images.salaryByMonth} value={thoundsandSep(data.permanentSalary)} width={width - fontScale(60)} onPress={() => { }} />
                <MenuItem style={{ marginTop: fontScale(39) }} title={text.contractSalary} icon={images.contractSalary} value={thoundsandSep(data.contractSalary)} width={width - fontScale(60)} onPress={() => navigation.navigate("SalaryByMonthContract", { "month": month })} />
                <MenuItem style={{ marginTop: fontScale(39) }} title={text.incentiveCost} icon={images.incentiveCost} value={thoundsandSep(data.incentiveCost)} width={width - fontScale(60)} onPress={() => { }} />
                <MenuItem style={{ marginTop: fontScale(39) }} title={text.punishment} icon={images.punishment} value={thoundsandSep(data.sanctionCost)} width={width - fontScale(60)} onPress={() => { }} />
                <MenuItem style={{ marginTop: fontScale(39), marginBottom: fontScale(20) }} title={text.otherExpenses} icon={images.otherExpenses} value={thoundsandSep(data.others)} width={width - fontScale(60)} onPress={() => { }} />
                <MenuItem style={{ marginTop: fontScale(39), marginBottom: fontScale(20) }} title={text.skynet} icon={images.skynet} iconStyle={{width: fontScale(70), height: fontScale(60), marginTop: -fontScale(5)}} value={thoundsandSep(data.skynet)} width={width - fontScale(60)} onPress={() => { }} />
              </ScrollView>
            </View>
        }
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
}

export default Dashboard;