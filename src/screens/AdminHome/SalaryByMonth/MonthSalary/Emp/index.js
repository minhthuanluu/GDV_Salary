import React, { useState, useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import { Body, DatePicker, GeneralListItem, Header } from "../../../../../comps";
import { styles } from "./style";
import { images } from "../../../../../utils/Images";
import moment from "moment";
import {getMonthSalary } from "../../../../../adminapi";
import { width } from "../../../../../utils/Dimenssion";
import { fontScale } from "../../../../../utils/Fonts";
import { StatusBar } from "react-native";
import { text } from "../../../../../utils/Text";
import { colors } from "../../../../../utils/Colors";
import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const index = (props) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalData, setGeneralData] = useState({});
  const [month, setMonth] = useState(moment(new Date()).subtract(1, "months").format("MM/YYYY"));
  const navigation = useNavigation();
  const route = useRoute();
  const [message, setMessage] = useState('');

  const getData = async (month, branchcode, shopCode) => {
    setLoading(true);
    setMessage('')
    setData([])
    await getMonthSalary(month, branchcode, shopCode).then((data) => {
      if (data.status == "success") {
        setLoading(false);
        if (data.length == 0) {
          setData([])
          setMessage(data.message);
        } else {
          setData(data.data.data);
          setGeneralData(data.data.general);
        }
      }

      if (data.status == "failed") {
        setLoading(false);
      }
      if (data.status == "v_error") {
        Toast.show({
          text1: "Cảnh báo",
          text2: data.message,
          type: "error",
          visibilityTime: 1000,
          autoHide: true,
          onHide: () => navigation.goBack()
        })
      }
    });
  };

  useEffect(() => {
    const { month, branchCode, shopCode } = route.params?.item;
    setMonth(month);
    getData(month, branchCode, shopCode);
  }, [""]);

  const _onChangeMonth = (value) => {
    setMonth(value);
    const { branchCode, shopCode } = route.params?.item
    getData(value, branchCode, shopCode);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.primary} />
      <Header title={text.salaryMonth} />
      <DatePicker
        month={month}
        width={width - fontScale(120)}
        style={{ alignSelf: "center" }}
        onChangeDate={(date) => _onChangeMonth(date)}
      />
      <Body
        showInfo={false}
        style={{ marginTop: fontScale(15), zIndex: -10 }}
      />
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        {loading == true ? <ActivityIndicator size="small" color={colors.primary} style={{ marginVertical: fontScale(10) }} /> : null}
        <Text style={{ color: colors.primary, textAlign: "center" }}>{message && message}</Text>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ marginTop: -fontScale(30) }}
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={{marginTop:index==0 ? -fontScale(50) : 0}}>
                <GeneralListItem
                  style={{ marginTop: fontScale(5)}}
                  monthSalaryEmpItem
                  rightIcon={images.store}
                  titleArray={["KPI", "Tổng", "Cố định", "Khoán sp","Vas Affiliate", "Chi hỗ trợ", "CFKK", "Khác"]}
                  item={[item.kpi, item.totalSalary, item.permanentSalary, item.incentiveSalary,item.vasAffiliate, item.supportOutcome, item.encouSalary, item.other]}
                  title={item.shopName}
                  onPress={() => navigation.navigate("AdminMonthSalaryGDV", {
                    item: {
                      branchCode: route.params?.item.branchCode,
                      shopCode: item.shopCode,
                      month: month
                    },
                  })}
                />
                { index == data.length - 1 ?
                  <GeneralListItem
                    style={{ marginBottom: fontScale(80), marginTop: fontScale(35) }}
                    monthSalaryGeneral
                    key={index}
                    title={generalData.shopName}
                    titleArray={["Tổng chi 1 tháng", "Cố định", "Khoán sp","Vas Affiliate", "Chi hỗ trợ", "CFKK", "Khác"]}
                    item={generalData&&[generalData.monthOutcome, generalData.permanentSalary, generalData.incentiveSalary,generalData.vasAffiliate, generalData.supportOutcome, generalData.encouSalary, generalData.other]}
                    icon={images.store} /> : null
                }
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;
