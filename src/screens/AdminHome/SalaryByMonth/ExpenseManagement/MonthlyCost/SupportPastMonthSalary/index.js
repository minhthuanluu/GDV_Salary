import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, ScrollView } from "react-native";
import { Body, DatePicker, GeneralListItem, Header } from "../../../../../../comps";
import { styles } from "./style";
import { images } from "../../../../../../utils/Images";
import moment from "moment";
import { getKPIByMonth, getMonthSalary, getSummarySubQuality, getTotalSalaryMonthSupport, getTransactionStatistics } from "../../../../../../adminapi";
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
    // console.log(data)
    await getTotalSalaryMonthSupport(month).then((data) => {
      console.log(data.data.data)
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
  // const _onChangeMonth = (value) => {
  //   setMonth(value);
  //   getData(value, "", "");
  // };
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
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        {loading == true ? <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: -fontScale(25) }} /> : null}
        <Text style={{ color: colors.primary, textAlign: "center" }}>{message && message}</Text>
        <View>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View >
                {/* <GeneralListItem
                    style={{ marginTop:index==0?-fontScale(30):fontScale(10),marginBottom: index==data.length-1?fontScale(100):fontScale(30)}}
                    backgroundColor={"#FFFFFF"}
                    textTitle={{fontSize: fontScale(18),  fontWeight: "bold", color: props.textColor || "#151515"}}
                    contentStyle={{ fontSize: fontScale(12),textAlign:"right", marginVertical: fontScale(8) }}
                    contentStyle1={{ fontSize: fontScale(12),textAlign:"right", marginVertical: fontScale(8) }}
                    contentStyle2={{ fontSize: fontScale(12),textAlign:"right", marginVertical: fontScale(8) }}
                    titleStyle={{fontSize: fontScale(12), marginVertical: fontScale(8) }}
                    titleArrOneStyle={{textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: "#CC9B02", marginLeft: fontScale(215),marginVertical: fontScale(11)}}
                    titleArrTwoStyle={{textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: "#CC9B02", marginLeft: fontScale(51),marginVertical: fontScale(11)}}
                    viewContentStyle={{justifyContent: "space-between", marginLeft: -fontScale(185),textAlign:"right"}}
                    viewOneContentStyle={{justifyContent: "space-between", marginLeft: -fontScale(105),textAlign:"right"}}
                    twentyFourColumnCompany
                    title={item.branchCode}
                    icon={images.branch}
                    titleArr={["Tổng chi"]}
                    titleArray={["CF hỗ trợ CHT ", "CF hỗ trợ khác", "Thu"]}
                    titleArrayOne={["","Còn lại:"]}
                    itemAmountOne={[item.incomeTotalOutcome,item.otherOutcomeMaster,item.incomeTotalOutcome]}
                    item={["",item.supportRemain]}
                />  */}
                <View style={[styles.outcomeSal, { marginBottom: index == data.length - 1 ? fontScale(40) : fontScale(10), }]}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.branchCode}>{item.branchCode}</Text>
                    <Image source={images.shop} style={styles.branchIcon} resizeMode="contain" />
                  </View>
                  <View style={{ flexDirection: "row", flex: 1, marginRight: fontScale(20), marginLeft: fontScale(10) }}>
                    <View style={{ flex: 2 }}>{["", "CF hỗ trợ CHT ", "CF hỗ trợ khác", "Thu"].map((item, index) => <Item item={item} index={index} />)}</View>
                    <View style={{ flex: 1 }}>{[text.totalOutcome, item.outcomeMaster, item.otherOutcomeMaster, item.incomeTotalOutcome].map((item, index) => <ItemContent item={item} index={index} />)}</View>
                    <View style={{ flex: 1 }} />
                  </View>
                  <View style={{ flexDirection: "row", marginVertical: fontScale(10) }}>
                    <Text style={styles.remainTitle}>{text.remain}:</Text>
                    <Text style={styles.remainContent}>{item.supportRemain}</Text>
                  </View>
                </View>
              </View>
            )}/>
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
      <Text key={index.toString()} style={{ fontSize: fontScale(13), color: index == 0 ? '#D19E01' : index == 1 ? colors.red : "#1AC4D1", textAlign: "right", fontWeight: "bold" }}>{item}</Text>
    </View>
  )
}

export default index;