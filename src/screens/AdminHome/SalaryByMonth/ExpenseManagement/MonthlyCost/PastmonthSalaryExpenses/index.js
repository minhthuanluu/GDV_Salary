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
import { Image } from "react-native";

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
      <View style={{ flex: 1, backgroundColor: colors.white, paddingTop: fontScale(30), marginTop: fontScale(20), borderTopLeftRadius: fontScale(50), borderTopRightRadius: fontScale(50) }}>
        {loading == true ? <ActivityIndicator size="small" color={colors.primary} /> : null}
        <Text style={{ color: colors.primary, textAlign: "center" }}>{message && message}</Text>
        <View>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View>
                <View style={[styles.outcomeSal, { marginTop: fontScale(50), marginBottom: index == data.length - 1 ? fontScale(40) : fontScale(10) }]}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: fontScale(18), textAlign: "center", fontWeight: "bold", color: "#151515" }}>{item.branchCode}</Text>
                    <Image source={images.shop} style={{ width: fontScale(47), height: fontScale(47), position: "absolute", right: fontScale(20), top: -fontScale(45) }} resizeMode="contain" />
                  </View>
                  <View style={{ flexDirection: "row", flex: 1, marginRight: fontScale(20) }}>
                    <View style={{ flex: 1 }}>
                      {["", text.totalOutcome, "Cố định", "Khoán sp", "Chi khác"].map((item, index) => <Item item={item} index={index} />)}
                    </View>
                    <View style={{ flex: 1 }}>
                      {[text.businessCoop, item.outcomeBusiness, item.permanentBusiness, item.contractBusiness, item.othersBusiness].map((item, index) => <ItemContent item={item} index={index} />)}
                    </View>
                    <View style={{ flex: 1 }}>
                      {[text.teller, item.outcomeEmp, item.permanentEmp, item.contractEmp, item.othersEmp].map((item, index) => <ItemContent item={item} index={index} />)}
                    </View>
                    <View style={{ flex: 1 }}>
                      {[text.different, item.outcomeDiff, item.permanentDiff, item.contractDiff, item.othersDiff].map((item, index) => <ItemContent item={item} index={index} />)}
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        </View>

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
      <Text key={index.toString()} style={{ fontSize: fontScale(13), color: index == 0 ? '#D19E01' : index == 1 ? colors.red : "#289AF3", textAlign: "right", fontWeight: "bold" }}>{item}</Text>
    </View>
  )
}
export default index;