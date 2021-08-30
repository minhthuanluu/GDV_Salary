import React, { useState, useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import { Body, DatePicker, GeneralListItem, Header } from "../../../../../../comps";
import { styles } from "./style";
import { images } from "../../../../../../utils/Images";
import moment from "moment";
import { getTotalSalaryMonthCost } from "../../../../../../adminapi";
import { width } from "../../../../../../utils/Dimenssion";
import { fontScale } from "../../../../../../utils/Fonts";
import { StatusBar } from "react-native";
import { text } from "../../../../../../utils/Text";
import { colors } from "../../../../../../utils/Colors";
import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useRoute } from "@react-navigation/core";

const index = (props) => {
  const route = useRoute();
  const [data, setData] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [generalData, setGeneralData] = useState({});
  const [month, setMonth] = useState(route.params?.month || moment(new Date()).subtract(1, "months").format("MM/YYYY"));
  const navigation = useNavigation();
  const [notification, setNotification] = useState({})



  const getData = async (month) => {
    setLoading(true);
    setMessage("")
    console.log(month)
    await getTotalSalaryMonthCost(month).then((data) => {
      console.log()
      if (data.status == "success") {
        setLoading(false);
        if (data.length == 0) {
          setData([])
          setMessage(data.message);
        } else {

          setData(data.data.data);
          // setGeneralData(data.data.general);
        }
      }

      if (data.status == "failed") {
        setLoading(false);
        Toast.show({
          text1: "Cảnh báo",
          text2: data.message,
          type: "error",
          visibilityTime: 1000,
          autoHide: true,
          onHide: () => navigation.goBack()
        })
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
  }, [month])

  const _onChangeMonth = (value) => {
    setMonth(value);
    getData(value, "", "");
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.primary} />
      <Header title={text.monthlyExpenses} />
      <DatePicker
        month={month}
        width={width - fontScale(120)}
        style={{ alignSelf: "center" }}
        onChangeDate={(date) => _onChangeMonth(date)}
      />

      <Body
        showInfo={false}
        style={{ marginTop: fontScale(12), zIndex: -10 }}
      />
      <View style={{ flex: 1, backgroundColor: colors.white, marginTop: -fontScale(15) }}>
        {loading == true ? <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: -fontScale(25) }} /> : null}
        <Text style={{ color: colors.primary, textAlign: "center" }}>{message && message}</Text>
        <View>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View>
                {/*  */}

                <GeneralListItem
                  style={{ marginBottom: fontScale(100), marginTop: index == 0 ? -fontScale(36) : -fontScale(55) }}
                  backgroundColor={"#FFFFFF"}
                  textTitle={{ fontSize: fontScale(18), fontWeight: "bold", color: props.textColor || "#151515" }}
                  contentStyle={{ fontSize: fontScale(12), textAlign: "right", marginVertical: fontScale(8) }}
                  contentStyle1={{ fontSize: fontScale(12), textAlign: "right", marginVertical: fontScale(8) }}
                  contentStyle2={{ fontSize: fontScale(12), textAlign: "right", marginVertical: fontScale(8) }}
                  titleStyle={{ fontSize: fontScale(12), marginVertical: fontScale(8) }}
                  titleArrOneStyle={{ textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: "#CC9B02", marginLeft: fontScale(145) }}
                  titleArrTwoStyle={{ textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: "#CC9B02", marginLeft: fontScale(51) }}
                  titleArrThreeStyle={{ textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: "#CC9B02", marginLeft: fontScale(51) }}
                  viewContentStyle={{ justifyContent: "space-between", marginLeft: -fontScale(309), textAlign: "right" }}
                  viewOneContentStyle={{ justifyContent: "space-between", marginLeft: -fontScale(131), textAlign: "right" }}
                  viewTwoContentStyle={{ justifyContent: "space-between", marginLeft: -fontScale(110), textAlign: "right" }}
                  twentyFourColumnCompany
                  // title={generalData.shopName}
                  title={item.branchCode}
                  titleArr={["HTKD", "GDV", "Chênh lệch"]}
                  titleArray={["Tổng chi ", "Cố định", "Khoán sp", "Chi khác"]}
                  // titleArrayOne={["Số dư đầu kỳ:","Số dư cuối kỳ:","Số tiền dùng chi hỗ trợ:"]}
                  itemAmountOne={[item.outcomeBusiness, item.permanentBusiness, item.contractBusiness, item.othersBusiness]}
                  itemAmountTwo={[item.outcomeEmp, item.permanentEmp, item.contractEmp, item.othersEmp]}
                  itemPercent={[item.outcomeDiff, item.permanentDiff, item.contractDiff, item.othersDiff]}

                  // item={["15 tỷ ( số tồn cuối kỳ của tháng 6 )","12 tỷ","0,5 tỷ"]}
                  icon={images.branch}
                // onPress={() => navigation.navigate("AdminPastMonthlyCostGeneral")} 

                />

                {/* <GeneralListItem
                    style={{ marginBottom: fontScale(90), marginTop: -fontScale(55) }}
                    backgroundColor={"#FFFFFF"}
                    textTitle={{fontSize: fontScale(18), textAlign: "center", fontWeight: "bold", color: props.textColor || "#151515"}}
                    contentStyle={{ fontSize: 12,textAlign:"right", marginVertical: fontScale(😎 }}
                    contentStyle1={{ fontSize: 12,textAlign:"right", marginVertical: fontScale(😎 }}
                    contentStyle2={{ fontSize: 12,textAlign:"right", marginVertical: fontScale(😎 }}
                    titleStyle={{fontSize: 12, marginVertical: fontScale(😎 }}
                    titleArrOneStyle={{textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: "#CC9B02", marginLeft: fontScale(155)}}
                    titleArrTwoStyle={{textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: "#CC9B02", marginLeft: fontScale(51)}}
                    viewContentStyle={{justifyContent: "space-between", marginLeft: -fontScale(250),textAlign:"right"}}
                    viewOneContentStyle={{justifyContent: "space-between", marginLeft: -fontScale(105),textAlign:"right"}}
                    twentyFourColumnCompany
                    // title={generalData.shopName}
                    title={"Tổng chi hỗ trợ tháng 7"}
                    titleArr={["Tổng chi","BQ 1 tháng"]}
                    titleArray={["CF hỗ trợ CHT ", "CF hỗ trợ khác", "Thu"]}
                    titleArrayOne={["Số dư đầu kỳ:","Số dư cuối kỳ:"]}
                    itemAmountOne={[generalData.cusAmount,generalData.transAmount,generalData.blocking2CAmount]}
                    itemAmountTwo={[generalData.cusAmount,generalData.transAmount,generalData.blocking2CAmount]}
                    itemPercent={[]}
                    item={["0,5 tỷ","10 tỷ"]}
                    onPress={() => navigation.navigate("AdminSupportSalaryCostGeneral")}
                     // icon={images.company}  />  */}

                {/* />  */}
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