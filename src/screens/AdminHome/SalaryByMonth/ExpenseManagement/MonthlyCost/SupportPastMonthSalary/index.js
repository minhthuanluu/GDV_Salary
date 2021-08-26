import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, ScrollView } from "react-native";
import { Body, DatePicker, GeneralListItem, Header } from "../../../../../../comps";
import { styles } from "./style";
import { images } from "../../../../../../utils/Images";
import moment from "moment";
import { getKPIByMonth, getMonthSalary, getSummarySubQuality, getTransactionStatistics } from "../../../../../../adminapi";
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


const index = (props) => {
    const [data, setData] = useState({});
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [generalData, setGeneralData] = useState({});
    const [month, setMonth] = useState(moment(new Date()).subtract(1, "months").format("MM/YYYY"));
    const navigation = useNavigation();
    const [notification, setNotification] = useState({})



    const getData = async (month, branchcode, shopCode) => {
        setLoading(true);
        setMessage("")
        console.log(month+branchcode+shopCode)
        await getTransactionStatistics(month, branchcode, shopCode).then((data) => {
          console.log()
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
               
                  {/* <GeneralListItem
                    style={{ marginBottom: fontScale(100), marginTop: index == 0 ? -fontScale(36) : -fontScale(55) }}
                    backgroundColor={"#FFFFFF"}
                    textTitle={{fontSize: fontScale(18), fontWeight: "bold", color: props.textColor || "#151515"}}
                    contentStyle={{ fontSize: 12,textAlign:"right", marginVertical: fontScale(8) }}
                    contentStyle1={{ fontSize: 12,textAlign:"right", marginVertical: fontScale(8) }}
                    contentStyle2={{ fontSize: 12,textAlign:"right", marginVertical: fontScale(8) }}
                    titleStyle={{fontSize: 12, marginVertical: fontScale(8) }}
                    titleArrOneStyle={{textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: "#CC9B02", marginLeft: fontScale(145)}}
                    titleArrTwoStyle={{textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: "#CC9B02", marginLeft: fontScale(51)}}
                    titleArrThreeStyle={{textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: "#CC9B02", marginLeft: fontScale(51)}}
                    viewContentStyle={{justifyContent: "space-between", marginLeft: -fontScale(269),textAlign:"right"}}
                    viewOneContentStyle={{justifyContent: "space-between", marginLeft: -fontScale(155),textAlign:"right"}}
                    viewTwoContentStyle={{justifyContent: "space-between", marginLeft: -fontScale(120),textAlign:"right"}}
                    twentyFourColumnCompany
                    // title={generalData.shopName}
                    title={item.shopName}
                    titleArr={["HTKD","GDV","Chênh lệch"]}
                    titleArray={["Tổng chi ", "Cố định", "Khoán sp","Chi khác"]}
                    // titleArrayOne={["Số dư đầu kỳ:","Số dư cuối kỳ:","Số tiền dùng chi hỗ trợ:"]}
                    itemAmountOne={[item.cusAmount,item.transAmount,item.blocking2CAmount,item.subRegisterAmount,item.foneCardAmount,item.noRechargeAmount]}
                    itemAmountTwo={[item.cusAmount,item.transAmount,item.blocking2CAmount,item.subRegisterAmount,item.foneCardAmount,item.noRechargeAmount]}
                    itemPercent={[item.cusAmount,item.transAmount,item.blocking2CAmount,item.subRegisterAmount,item.foneCardAmount,item.noRechargeAmount]}
                    
                    item={["15 tỷ ( số tồn cuối kỳ của tháng 6 )","12 tỷ","0,5 tỷ"]}
                    icon={images.branch}
                    // onPress={() => navigation.navigate("AdminPastMonthlyCostGeneral")} 

                    />  */}
                
                    <GeneralListItem
                    style={{ marginBottom: fontScale(100), marginTop: index == 0 ? -fontScale(36) : -fontScale(55) }}
                    backgroundColor={"#FFFFFF"}
                    textTitle={{fontSize: fontScale(18),  fontWeight: "bold", color: props.textColor || "#151515"}}
                    // style={{flexDirection: "row", marginVertical: fontScale(0)}}
                    contentStyle={{ fontSize: 12,textAlign:"right", marginVertical: fontScale(8) }}
                    contentStyle1={{ fontSize: 12,textAlign:"right", marginVertical: fontScale(8) }}
                    contentStyle2={{ fontSize: 12,textAlign:"right", marginVertical: fontScale(8) }}
                    titleStyle={{fontSize: 12, marginVertical: fontScale(8) }}
                    titleArrOneStyle={{textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: "#CC9B02", marginLeft: fontScale(215),marginVertical: fontScale(11)}}
                    titleArrTwoStyle={{textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: "#CC9B02", marginLeft: fontScale(51),marginVertical: fontScale(11)}}
                    viewContentStyle={{justifyContent: "space-between", marginLeft: -fontScale(185),textAlign:"right"}}
                    viewOneContentStyle={{justifyContent: "space-between", marginLeft: -fontScale(105),textAlign:"right"}}
                    twentyFourColumnCompany
                    // title={generalData.shopName}
                    title={item.shopName}
                    icon={images.branch}
                    titleArr={["Tổng chi"]}
                    titleArray={["CF hỗ trợ CHT ", "CF hỗ trợ khác", "Thu"]}
                    titleArrayOne={["","Còn lại:"]}
                    // itemAmountOne={[item.cusAmount,item.transAmount,item.blocking2CAmount]}
                    
                    
                    // itemPercent={[]}
                   
                   
                /> 
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
