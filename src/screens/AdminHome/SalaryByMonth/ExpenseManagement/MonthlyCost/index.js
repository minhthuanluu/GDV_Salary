import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, ScrollView } from "react-native";
import { Body, DatePicker, GeneralListItem, Header } from "../../../../../comps";
import { styles } from "./style";
import { images } from "../../../../../utils/Images";
import moment from "moment";
import { getKPIByMonth, getMonthCost, getMonthSalary, getSummarySubQuality, getTransactionStatistics } from "../../../../../adminapi";
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
import { TouchableOpacity } from "react-native";


const index = (props) => {
  const [data, setData] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [generalData, setGeneralData] = useState({});
  const [month, setMonth] = useState(moment(new Date()).subtract(1, "months").format("MM/YYYY"));
  const navigation = useNavigation();

  const getData = async (month) => {
    setLoading(true);
    setMessage("")
    console.log(month)
    await getMonthCost(month).then((data) => {
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
      {/* <Text style={styles.text}>{notification}</Text> */}
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
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        {loading == true ? <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: -fontScale(25) }} /> : null}
        <Text style={{ color: colors.primary, textAlign: "center" }}>{message && message}</Text>
        <ScrollView showsVerticalScrollIndicator={false} style={{marginVertical:fontScale(20)}}>
          <TouchableOpacity style={styles.outcomeSal}
            onPress={() => navigation.navigate("AdminPastMonthlyCostGeneral", { "month": month })}>
            <Text style={[props.textTitle, { fontSize: fontScale(17), textAlign: "center", fontWeight: "bold", color: "#151515" }]}>{"Chi phí lương tháng " + month}</Text>
            <NoftiContent title="Số dư đầu kỳ:" content={data.remainSalary} left={fontScale(10) }/>
            <View style={{ flexDirection: "row", flex: 1, marginRight: fontScale(20) }}>
              <View style={{ flex: 1 }}>
                {["", "Tổng chi ", "Cố định", "Khoán sp", "Chi khác"].map((item, index) => <Item item={item} index={index} />)}
              </View>
              <View style={{ flex:1 }}>
                {[text.businessCoop, data.outcomeBusiness, data.permanentBusiness, data.contractBusiness, data.othersBusiness].map((item, index) => <ItemContent item={item} index={index} />)}
              </View>
              <View style={{ flex: 1 }}>
                {[text.teller, data.outcomeEmp, data.permanentEmp, data.contractEmp, data.othersEmp].map((item, index) => <ItemContent item={item} index={index} />)}
              </View>
              <View style={{ flex: 1 }}>
                {[text.different, data.outcomeEmp, data.permanentEmp, data.contractEmp, data.othersEmp].map((item, index) => <ItemContent item={item} index={index} />)}
              </View>

            </View>
            <View style={{ flexDirection: "row", marginVertical: fontScale(10) }}>
              <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: colors.black, marginLeft: fontScale(18) }}>Số dư cuối kỳ:</Text>
              <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: "#1AC4D1", marginLeft: fontScale(21) }}>{data.remain}</Text>
            </View>
            <View style={{ flexDirection: "row", marginVertical: fontScale(10) }}>
              <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: colors.grey , marginLeft: fontScale(35) }}>Số tiền dùng chi hỗ trợ:</Text>
              <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: "#1AC4D1", marginLeft: fontScale(21) }}>{data.totalSupport}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.outcomeSal}
          itemAmountTwo={[generalData.cusAmount,generalData.transAmount,generalData.blocking2CAmount]}
          itemPercent={[]}
          item={[data.remainSupport,data.supportRemain]}
          onPress={() => navigation.navigate("AdminSupportPastMonthlyCostGeneral", {
            "month": month})}>
            {/* // navigation.navigate("AdminSupportPastMonthlySalary", { "month": month })}> */}
            <Text style={[props.textTitle, { fontSize: fontScale(17), textAlign: "center", fontWeight: "bold", color: "#151515" }]}>Tổng chi hỗ trợ tháng {month}</Text>
            <View style={[{ flexDirection: "row", marginVertical: fontScale(15) }]}>
              <Text style={styles.remainSalaryTitle}>{"Số dư đầu kỳ:"}</Text>
              <Text style={styles.remainSalaryContent}>{data.remainSupport}</Text>
            </View>
            <View style={{ flexDirection: "row", flex: 1, marginRight: fontScale(20) }}>
              <View style={{ flex: 1 }}>
                {["", "CF hỗ trợ CHT ", "CF hỗ trợ khác", "Thu"].map((item, index) => <Item item={item} index={index} />)}
              </View>
              <View style={{ flex: 1 }}>
                {[text.totalOutcome, data.outcomeMaster, data.otherOutcomeMaster, data.incomeTotalOutcome].map((item, index) => <ItemContent item={item} index={index} />)}
              </View>
              <View style={{ flex: 1 }} />
            </View>
            <View style={{ flexDirection: "row", marginVertical: fontScale(10) }}>
              <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: colors.black, marginLeft: fontScale(18) }}>Còn lại:</Text>
              <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: "#1AC4D1", marginLeft: fontScale(21) }}>{data.supportRemain}</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

const Item = ({ item, index }) => {
  return (
    <View key={index.toString()} style={{ marginVertical: fontScale(10) }}>
      <Text style={{ fontSize: fontScale(13), color: index == 0 ? '#D19E01' : index == 1 ? colors.black : colors.grey, fontWeight: "bold" }}>{item}</Text>
    </View>
  )
}

const ItemContent = ({ item, index }) => {
  return (
    <View style={{ marginVertical: fontScale(10) }}>
      <Text key={index.toString()} style={{ fontSize: fontScale(13), color: index == 0 ? '#D19E01' : index == 1 ? colors.red : colors.lightBlue, textAlign: "right", fontWeight: "bold" }}>{item}</Text>
    </View>
  )
}

const NoftiContent = ({ title, content,left }) => {
  return (
    <View style={{ flexDirection: "row", marginVertical: fontScale(10) }}>
      <Text style={{ textAlign: "center", fontSize: fontScale(13), fontWeight: "bold", color: colors.black,marginLeft:left}}>{title}</Text>
      <Text style={{ textAlign: "center", fontSize: fontScale(13), fontWeight: "bold", color: "#1AC4D1", marginLeft: fontScale(10) }}>{content}</Text>
    </View>
  )
}

export default index;