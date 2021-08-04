import React, { useState, useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import { Body, DatePicker, GeneralListItem, Header } from "../../../../../comps";
import { styles } from "./style";
import { images } from "../../../../../utils/Images";
import moment from "moment";
import { getKPIByMonth, getMonthSalary } from "../../../../../adminapi";
import { width } from "../../../../../utils/Dimenssion";
import { fontScale } from "../../../../../utils/Fonts";
import { StatusBar } from "react-native";
import { text } from "../../../../../utils/Text";
import { colors } from "../../../../../utils/Colors";
import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";


const index = (props) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalData, setGeneralData] = useState({});
  const [month, setMonth] = useState(moment(new Date()).format("MM/YYYY"));
  const navigation = useNavigation();

  const getData = async (month, branchcode, shopCode) => {
    setLoading(true);
    await getMonthSalary(month, branchcode, shopCode).then((data) => {
      if (data.status == "success") {
        setData(data.data.data);
        setGeneralData(data.data.general);
        setLoading(false);
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
        {loading == true ? <ActivityIndicator size="small" color={colors.primary}style={{ marginTop: fontScale(20) }}/>: null}
        <View>
          <FlatList
            style={{ marginTop: fontScale(10) }}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <GeneralListItem
                style={{ marginTop: fontScale(20) }}
                columns
                rightIcon={images.branch}
                titleArray={["Tổng lương", "Khoán sp", "SLGDV"]}
                item={[item.totalSalary, item.incentiveSalary, item.totalEmp]}
                title={item.shopName}
                onPress={() => navigation.navigate("AdminMonthSalaryShop",{
                  item:{
                    "branchCode":item.shopCode,
                    "month":month
                  }
                })}
              />
            )}
          />
         <GeneralListItem 
         style={{marginTop:-fontScale(30)}} 
         fiveColumnCompany 
         title={generalData.shopName} 
         titleArray={["Tổng chi 1 tháng","Cố định","Khoán sp","Chi hỗ trợ","CFKK","Khác"]} 
         item={[generalData.monthOutcome,generalData.permanentSalary,generalData.incentiveSalary,generalData.supportOutcome,generalData.encouSalary,generalData.other]} 
         icon={images.company}/>
        </View>
        
      </View>
    </SafeAreaView>
  );
};

export default index;
