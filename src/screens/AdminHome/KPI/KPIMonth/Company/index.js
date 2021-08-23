import React, { useState, useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import { Body, DatePicker, GeneralListItem, Header } from "../../../../../comps";
import { styles } from "./style";
import { images } from "../../../../../utils/Images";
import moment from "moment";
import { getKPIByMonth } from "../../../../../adminapi";
import { width } from "../../../../../utils/Dimenssion";
import { fontScale } from "../../../../../utils/Fonts";
import { StatusBar } from "react-native";
import { text } from "../../../../../utils/Text";
import { colors } from "../../../../../utils/Colors";
import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { checkn2, ToastNotif } from "../../../../../utils/Logistics";


const index = (props) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalData, setGeneralData] = useState({});
  const [month, setMonth] = useState(moment(new Date()).format("MM/YYYY"));
  const navigation = useNavigation();

  const getData = async (month, branchcode, shopCode) => {
    setLoading(true);
    await getKPIByMonth(month, branchcode, shopCode).then((data) => {
      if (data.status == "success") {
        setData(data.data.data);
        console.log(data.data)
        setGeneralData(data.data.general);
        setLoading(false);
      }
      if (data.status == "failed") {
        setLoading(false);
        ToastNotif("Thông báo", data.message, "error", true, null)
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
    getData(month, "", "");
  }, [""]);

  const _onChangeMonth = (value) => {
    setMonth(value);
    getData(value, "", "");
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.primary} />
      <Header title={text.kpiMonth} />
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
        {loading == true ? <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: fontScale(20) }} /> : null}
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ marginTop: fontScale(10)}}
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View>
                <GeneralListItem
                  style={{ marginTop:fontScale(30)}}
                  columns
                  rightIcon={images.branch}
                  titleArray={["TBTS", "TBTT", "VAS"]}
                  item={[checkn2(item.postPaid), checkn2(item.prePaid), checkn2(item.vas)]}
                  topCenterData={["KPI tổng",item.kpiValue]}
                  title={item.shopName}
                  onPress={() => navigation.navigate("AdminKPIMonthShop", {
                    branchItem: {
                      "branchCode": item.shopCode,
                      "month": month
                    }
                  })}
                />
                {index == data.length - 1 ? <GeneralListItem
                  company
                  style={{  marginBottom: fontScale(80),marginTop: -fontScale(10) }}
                  icon={images.company}
                  color={"#D19E01"}
                  topCenterData={["KPI tổng",item.kpiValue]}
                  titleArray={["TBTS", "TBTT", "Vas", "KHTT", "Bán lẻ", "% Lên gói", "TBTT", " TBTS thoại gói > =99k",]}
                  item={[checkn2(generalData.postPaid), checkn2(generalData.prePaid), checkn2(generalData.vas), generalData.importantPlan, generalData.retailRevenue, "", generalData.prePaidPck, generalData.postPaidOverNinetyNine]}
                  title={generalData.shopName}
                /> : null}
              </View>
            )}
          />
        </View>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

export default index;
