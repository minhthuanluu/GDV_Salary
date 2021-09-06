import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, ScrollView } from "react-native";
import { Body, DatePicker, GeneralListItem, Header } from "../../../../../comps";
import { styles } from "./style";
import { images } from "../../../../../utils/Images";
import moment from "moment";
import { getAccumulatedCost, getKPIByMonth, getMonthSalary, getSummarySubQuality, getTransactionStatistics } from "../../../../../adminapi";
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
import { AccumulatedCost } from "../../../../../models/Admin";
import { TouchableOpacity } from "react-native";


const index = (props) => {
  const [data, setData] = useState(AccumulatedCost);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  // const [generalData, setGeneralData] = useState({});
  // const [notification, setNotification] = useState('')
  const navigation = useNavigation();



  const getData = async () => {
    setLoading(true);
    setMessage("")

    await getAccumulatedCost(navigation).then((data) => {
      if (data.status == "success") {
        setLoading(false);
        if (data.length == 0) {
          setData([])
          setMessage(data.message);
        } else {
          // setNotification(data.data.notification)
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
    getData("");
  }, [])
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.primary} />
      <Header title={text.costAccumulation} />
      <Text style={styles.text}>{data.notification}</Text>
      <Body
        showInfo={false}
        style={{ marginTop: fontScale(12), zIndex: -10 }}
      />
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        {loading == true ? <ActivityIndicator size="small" color={colors.primary} /> : null}
        <Text style={{ color: colors.primary, textAlign: "center" }}>{message && message}</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.squareShapeOne}
          onPress={() => navigation.navigate("AdminTotalSalaryCostGeneral")}>
            <Text style={[props.textTitle, { fontSize: fontScale(17), textAlign: "center", fontWeight: "bold", color: "#151515", marginVertical: fontScale(10) }]}>{"Tổng chi phí lương"}</Text>
            <NoftiContent title="Nguồn chi:" content={data.outcome} left={fontScale(10)} />
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 0.7, marginTop: fontScale(5) }} index={0}>
                {["", "Tổng chi ", "Cố định", "Khoán sp", "Chi khác"].map((item, index) => <Item item={item} index={index} />)}
              </View>
              <View style={{ flex: 0.8, marginTop: fontScale(5) }} index={1}>
                {["HTKD", data.outcomeBusiness, data.permanentBusiness, data.contractBusiness, data.othersBusiness].map((item, index) => <ItemContent item={item} index={index} />)}
              </View>
              <View style={{ flex: 0.8, marginTop: fontScale(5) }} index={2}>
                {["GDV", data.outcomeEmp, data.permanentEmp, data.contractEmp, data.othersEmp].map((item, index) => <ItemContent item={item} index={index} />)}
              </View>
              <View style={{ flex: 0.9, marginTop: fontScale(5) }} index={3}>
                {["Chênh lệch", data.outcomeDiff, data.permanentDiff, data.contractDiff, data.othersDiff].map((item, index) => <ItemContent item={item} index={index} />)}
              </View>
              <View style={{ flex: 0.8, marginTop: fontScale(5) }} index={4}>
                {["BQ 1 tháng", data.outcomeAvg, data.permanentAvg, data.contractAvg, data.othersAvg].map((item, index) => <ItemContent item={item} index={index} />)}
              </View>
            </View>
            <NoftiContent title="Còn lại:" content={data.remain} left={fontScale(10)} />
            <NoftiContent title="CF cần đến 31/12:" titleColor={colors.grey} content={data.expected} left={fontScale(20)} />
            <NoftiContent title="=> Thiếu/đủ:" titleColor={colors.grey} content={data.diffMoney} left={fontScale(30)} />
            <NoftiContent title="Số tiền dùng chi hỗ trợ:" titleColor={colors.grey} content={data.totalSupport} left={fontScale(20)} />
          </TouchableOpacity>

          <TouchableOpacity style={{
            flex: 1,
            margin: fontScale(5),
            paddingHorizontal: fontScale(10),
            paddingBottom: fontScale(15),
            borderRadius: fontScale(17),
            shadowColor: "#000",
            backgroundColor: colors.white,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
          }}
          onPress={() => navigation.navigate("AdminSupportSalaryCostGeneral")}>
            <Text style={[props.textTitle, { fontSize: fontScale(17), textAlign: "center", fontWeight: "bold", color: "#151515", marginVertical: fontScale(10) }]}>{"Tổng chi hỗ trợ"}</Text>
            <NoftiContent title="Nguồn tổng:" content={data.totalOutcome} left={fontScale(10)} />
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1, marginTop: fontScale(5) }}>
                {["", "CF hỗ trợ CHT", "CF hỗ trợ khác", "Thu"].map((item, index) => <Item item={item} index={index} />)}
              </View>
              <View style={{ flex: 1 }}>
                {[text.totalOutcome, data.outcomeMaster, data.otherOutcomeMaster, data.incomeTotalOutcome].map((item, index) => <ItemContent item={item} index={index} />)}
              </View>
              <View style={{ flex: 1 }}>
                {["BQ 1 tháng", data.avgMaster, data.otherAvgMaster, data.incomeAvgOutcome].map((item, index) => <ItemContent item={item} index={index} />)}
              </View>
              <View style={{ flex: 0.5 }}/>
            </View>
            <NoftiContent title="Còn lại:" content={data.supportRemain} left={fontScale(10)} />
            <NoftiContent title="Số tiền hỗ trợ CHT đến 31/12:" titleColor={colors.grey} content={data.expected} left={fontScale(20)} />

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

const NoftiContent = ({ title, content, left, titleColor }) => {
  return (
    <View style={{ flexDirection: "row", marginVertical: fontScale(10) }}>
      <Text style={{ textAlign: "center", fontSize: fontScale(13), fontWeight: "bold", color: titleColor || colors.black, marginLeft: left }}>{title}</Text>
      <Text style={{ textAlign: "center", fontSize: fontScale(13), fontWeight: "bold", color: "#1AC4D1", marginLeft: fontScale(10) }}>{content}</Text>
    </View>
  )
}

export default index;
