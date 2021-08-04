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
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native";

const index = (props) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalData, setGeneralData] = useState({});
  const [month, setMonth] = useState(moment(new Date()).format("MM/YYYY"));
  const navigation = useNavigation();
  const route = useRoute();

    
    const getData = async (month, branchcode, shopCode) => {
        setLoading(true);
        await getKPIByMonth(month, branchcode, shopCode).then((data) => {
          if (data.status == "success") {
            setData(data.data.data);
            setGeneralData(data.data.general);
            setLoading(false);
          }
          console.log(data);
        });
      };
    
      useEffect(() => {
        const { month, branchCode, shopCode } = route.params?.item;
        setMonth(month);
        getData(month, branchCode, shopCode);
      }, [""]);
    
      const _onChangeMonth = (value) => {
        setMonth(value);
        const { branchCode,shopCode } = route.params?.item;
        getData(value, branchCode,shopCode);
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
            style={{ marginTop: fontScale(25), zIndex: -10 }}
          />
          <View style={{ flex: 1, backgroundColor: colors.white }}>
            {loading == true ? (
              <ActivityIndicator
                size="small"
                color={colors.primary}
                style={{ marginTop: fontScale(20) }}
              />
            ) : null}
    
            <View style={{ flex: 1 }}>
              <FlatList
                style={{ marginTop: -fontScale(20) }}
                data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View>
                    <GeneralListItem company
                      style={{ marginTop: fontScale(5) }}
                      columns
                      backgroundColor={colors.white}
                    //   rightIcon={images.store}
                      titleArray={[ "TBTS", 
                        "TBTT",
                        "Vas",
                        "KHTT",
                        "Bán lẻ",
                        "% Lên gói",
                        "TBTT",
                        " TBTS thoại gói > =99k",]}
                      item={[item.prePaid, item.postPaid, item.vas, item.importantPlan, item.retailRevenue, "", item.prePaidPck, item.postPaidOverNinetyNine]}
                      title={item.shopName}
                      // onPress={() =>
                      //   navigation.navigate("AdminKPIMonthGDV", {
                      //     item: {
                      //       branchCode: route.params?.item.branchCode,
                      //       shopCode: item.shopCode,
                      //       month: month,
                      //     },
                      //   })
                      // }
                    />
                   {
                       index==data.length-1 ?  <GeneralListItem
                      company
                      style={{ marginBottom: fontScale(80),marginTop:fontScale(35) }}
                      icon={images.store}
                      titleArray={[
                        "TBTS", 
                        "TBTT",
                        "Vas",
                        "KHTT",
                        "Bán lẻ",
                        "% Lên gói",
                        "TBTT",
                        " TBTS thoại gói > =99k",
                      ]}
                      item={[
                        generalData.prePaid,
                        generalData.postPaid,
                        generalData.vas,
                        generalData.importantPlan,
                        generalData.retailRevenue,
                        "",
                        generalData.prePaidPck,
                        generalData.postPaidOverNinetyNine,
                      ]}
                      title={generalData.shopName}
                    /> : null
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
    
  