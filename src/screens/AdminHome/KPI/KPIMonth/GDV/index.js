import React, { useState, useEffect } from "react";
import { StatusBar,FlatList, View, SafeAreaView, ActivityIndicator } from "react-native";
import { Body, DatePicker, GeneralListItem, Header } from "../../../../../comps";
import { styles } from "./style";
import { text } from "../../../../../utils/Text";
import { colors } from "../../../../../utils/Colors";
import { images } from "../../../../../utils/Images";
import { fontScale } from "../../../../../utils/Fonts";
import { getKPIByMonth } from "../../../../../adminapi";
import { width } from "../../../../../utils/Dimenssion";
import { checkn2 } from "../../../../../utils/Logistics";
import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";

const index = (props) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalData, setGeneralData] = useState({});
  const [month, setMonth] = useState(moment(new Date()).format("MM/YYYY"));
  const navigation = useNavigation();
  const route = useRoute();


  const getData = async (month, branchcode, shopCode) => {
    setLoading(true);
    setData([])
    await getKPIByMonth(month, branchcode, shopCode).then((data) => {
      console.log(data.data.data)
      if (data.status == "success") {
        if (data.length == 0) {
          setData([])
          setMessage(data.message);
        }
        if (data.length > 0) {
          setData(data.data.data);
          setGeneralData(data.data.general);
          setLoading(false);
        }
      }
    });
  };

  useEffect(() => {
    const { month, branchCode, shopCode } = route.params?.branchItem;
    setMonth(month);
    getData(month, branchCode, shopCode);
  }, [""]);

  const _onChangeMonth = (value) => {
    setMonth(value);
    const { branchCode, shopCode } = route.params?.branchItem;
    getData(value, branchCode, shopCode);
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
            style={{ marginTop: -fontScale(10) }}
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View>
                <GeneralListItem company
                  rigthTopContent
                  style={{ marginTop: index == 0 ? -fontScale(40) : fontScale(20) }}
                  columns
                  backgroundColor={colors.white}
                  color={colors.black}
                  //   rightIcon={images.store}
                  titleArray={["TBTS",
                    "TBTT",
                    "Vas",
                    "KHTT",
                    "Bán lẻ",
                    "% Lên gói",
                    "TBTT",
                    " TBTS thoại gói > =99k", 'KPI tổng: ']}
                  item={[checkn2(item.postPaid), checkn2(item.prePaid), checkn2(item.vas), item.importantPlan, item.retailRevenue, "", item.prePaidPck, item.postPaidOverNinetyNine, item.kpiValue]}
                  title={item.shopName}
                  onPress={() =>
                    navigation.navigate("AdminKPIMonthGDV", {
                      item: {
                        branchCode: route.params?.branchItem.branchCode,
                        shopCode: item.shopCode,
                        month: month,
                      },
                    })
                  }
                />
                {
                  index == data.length - 1 ? <GeneralListItem
                    company
                    style={{ marginBottom: fontScale(70), marginTop: fontScale(40) }}
                    topCenterData={["KPI tổng: ", generalData.kpiValue]}
                    icon={images.store}
                    color={"#D19E01"}
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
                      checkn2(generalData.postPaid),
                      checkn2(generalData.prePaid),
                      checkn2(generalData.vas),
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
