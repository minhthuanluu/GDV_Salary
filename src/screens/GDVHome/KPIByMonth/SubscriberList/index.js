import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, Text, FlatList, View, ActivityIndicator } from "react-native";
import {
  Body,
  DataPicker,
  GeneralListItem,
  Header,
  MetricStatus,
  Search,
  TableHeader,
} from "../../../../comps";
import { styles } from "./styles";
import { colors } from "../../../../utils/Colors";
import { fontScale } from "../../../../utils/Fonts";
import { images } from "../../../../utils/Images";
import { text } from "../../../../utils/Text";
import { getSubscriberList } from "../../../../api";
import { useNavigation } from "@react-navigation/native";
import { width } from "../../../../utils/Dimenssion";
import { backHandler } from "../../../../utils/Logistics";

const SubscriberList = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [message, setMessage] = useState("");
  const [notification, setNotification] = useState("");
  const [preSub, setPreSub] = useState("");
  const [postSub, setPostSub] = useState("");
  const [loading, setLoading] = useState(false);
  const [filterCondition, setFilterCondition] = useState("");
  const [TBTT, setTBTT] = useState([]);
  const [TBTS, setTBTS] = useState([]);
  const navigation = useNavigation();

  const pickerData = [
    { id: 0, value: "Tất cả" },
    { id: 1, value: "TT" },
    { id: 2, value: "TS" },
  ]

  const getData = async (status) => {
    setMessage("");
    setLoading(true);
    await getSubscriberList(navigation).then((res) => {
      setLoading(false);
      if (res.status == "success") {
        setLoading(false);
        if (res.data.length == 0 || res.data.data.length == 0) {
          setMessage(text.subscriberNotFound);
        } else {
          setLoading(false);
          if (res.data.data.length > 0) {
            setNotification(res.data.notification);
            setPreSub(res.data.preSub);
            setPostSub(res.data.postSub);
            setData(res.data.data);
            setSearchData(res.data.data);
            if (status == "TT") {
              filterDataType(res.data.data, status);
            }
            if (status == "TS") {
              filterDataType(res.data.data, "TS");
            }
          } else {
            filterDataType(res.data.data, "Tất cả");
          }
        }
      }
      if (res.status == "failed") {
        setLoading(false);
      }
    });
  };

  const searchSub = (text = "") => {
    var newData = [];
    if (filterCondition == "TT") {
      newData = TBTT.filter((item) => {
        const itemData = `${item.numberSub.toString()}`;
        return itemData.indexOf(text.toString()) > -1;
      });
    } else if (filterCondition == "TS") {
      newData = TBTS.filter((item) => {
        const itemData = `${item.numberSub.toString()}`;
        return itemData.indexOf(text.toString()) > -1;
      });
    } else {
      newData = data.filter((item) => {
        const itemData = `${item.numberSub.toString()}`;
        return itemData.indexOf(text.toString()) > -1;
      });
    }

    if (text.length > 0) {
      setLoading(true);
      if (newData.length == 0) {
        setLoading(false);
        setMessage("Không tìm thấy số thuê bao");
        setSearchData([]);
      } else {
        setLoading(false);
        setMessage("");
        setSearchData(newData);
      }
    } else {
      setData([]);
      setLoading(false);
      getData(filterCondition);
      setMessage("");
    }
  };

  const filterDataType = (data, text = "") => {
    setMessage("");
    const newData = data.filter((item) => {
      const itemData = `${item.statusPaid}`;
      return itemData.indexOf(text) > -1;
    });
    setSearchData(newData);
    setFilterCondition(text);
    setLoading(false);
    if (text == "TT") {
      setTBTT(newData);
    } else if (text == "TS") {
      setTBTS(newData);
    } else {
      setSearchData(data);
    }
  };

  useEffect(() => {
    // const backAction = () => {
    //   navigation.navigate("KPIByMonthDashboard");
    //   return true;
    // };

    // const backHandler = BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   backAction
    // );
    getData(filterCondition); // gọi data thật
    // return () => {
    //   backHandler.remove();
    // };
    backHandler(navigation, "KPIByMonthDashboard");

  }, [""]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.primary} />
      <Header title={text.kpiByMonth} />
      <MetricStatus
        style={styles.status}
        title={text.subscriberDevelopment}
        status={notification}
      />
      <Search
        style={styles.search}
        leftIcon={images.simlist}
        data={data}
        rightIcon={images.searchlist}
        dataNotFoundText="Không tìm thấy dữ liệu"
        onChangeText={(value) => searchSub(value)}
        placeHolder={text.searchSub}
        keyboardType="number-pad"
        width={width - fontScale(65)}
      />

      <DataPicker
        dialogTitle="Chọn dữ liệu"
        icon={images.sim}
        placeholder="Tất cả"
        data={pickerData}
        field={[pickerData[0].value, pickerData[1].value, pickerData[2].value
        ]}
        width={width - fontScale(65)}
        onPress={(value) => filterDataType(data, value.value)}
        style={{ marginTop: fontScale(20), marginRight: fontScale(5) }}
      />

      <Body
        showInfo={false}
        style={{ marginTop: fontScale(15), zIndex: -10 }}
      />

      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <View style={styles.sumKpiContainer}>
          <Text style={styles.sumKpiTitle}>{text.TBTT}: </Text>
          <Text style={styles.preSub}>{postSub}</Text>
          <Text style={styles.sumKpiTitle}>;</Text>

          <View style={styles.sumKpiContainerSecond}>
            <Text style={styles.sumKpiTitle}>{text.TBTS}: </Text>
            <Text style={styles.preSub}>{preSub}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginTop: fontScale(12) }}>
          <TableHeader style={{ width: (width * 1.7) / 10 }} title={text.date} />
          <TableHeader style={{ width: (width * 2.5) / 10 }} title={text.numberSub} />
          <TableHeader style={{ width: (width * 1.6) / 10 }} title={text.statusPaid} />
          <TableHeader style={{ width: (width * 2.7) / 10 }} title={text.type} />
          <TableHeader style={{ width: (width * 1) / 10 }} title={text.pckSub} />
        </View>
        {loading == true ? (
          <ActivityIndicator
            size="small"
            color={colors.primary}
            style={{ marginTop: fontScale(10) }}
          />
        ) : null}

        {message ? <Text style={styles.message}>{message}</Text> : null}

        <FlatList
          showsVerticalScrollIndicator={false}
          data={searchData}
          style={{ marginTop: fontScale(10) }}
          keyExtractor={(item, index) => index.toString()}
          key={({ item }) => item.numberSub.toString()}
          renderItem={({ item, index }) => (
            <GeneralListItem
              item={item}
              index={index}
              fields={[
                item.date,
                item.numberSub,
                item.statusPaid,
                item.type,
                item.pckSub,
              ]}
              style={[
                [styles.dateCol, { width: (width * 1.7) / 10 }],
                [styles.dateCol, { width: (width * 2.5) / 10 }],
                [styles.dateCol, { width: (width * 1.7) / 10 }],
                [styles.dateCol, { width: (width * 3) / 10 }],
                [styles.dateCol, { width: (width * 1) / 10 }],
              ]}
              lastIcon={item.pckSub == 1 ? images.check : images.cancle}
              lastIconViewStyle={{ alignItems: "center", flex: 0.5 }}
              lastIconStyle={{
                flex: 0.5,
                width: fontScale(15),
                height: fontScale(19),
              }}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default SubscriberList;