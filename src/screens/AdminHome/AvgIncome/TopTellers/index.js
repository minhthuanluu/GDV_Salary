import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, Text, FlatList, View, ActivityIndicator } from "react-native";
import {
  Body,
  DataPicker,
  DatePicker,
  GeneralListItem,
  Header,
  MetricStatus,
  Search,
  TableHeader,
} from "../../../../comps";
import { styles } from "./style";
import { colors } from "../../../../utils/Colors";
import { fontScale } from "../../../../utils/Fonts";
import { images } from "../../../../utils/Images";
import { text } from "../../../../utils/Text";
// import { getAdminKPIMonthTopTeller, getAllBranch, getAllShop } from "../../../../adminapi";
import { useNavigation } from "@react-navigation/native";
import { width } from "../../../../utils/Dimenssion";
import { BackHandler } from "react-native";
import moment from "moment";
import Toast from 'react-native-toast-message';
import { getAdminKPIMonthTopTeller, getAllBranch, getAllShop, getTopTellerByAvgIncome } from "../../../../adminapi";
import { _retrieveData, _storeData } from "../../../../utils/Storage";
import { getProfile } from "../../../../api";

const AdminTopTellerAvgIncome = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [month, setMonth] = useState(moment(new Date()).format("MM/YYYY"));
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const navigation = useNavigation();
  const [branchCode, setBranchCode] = useState("2MFHCM1");
  const [branchList, setBranchList] = useState([]);
  const [shopList, setShopList] = useState([]);
  const [notification, setNotification] = useState("");
  const [shopCode, setShopCode] = useState('');
  const [empCode, setEmpCode] = useState('');
  const [defaultShopCode, setDefaultShopCode] = useState('')
  const [defaultShopName, setDefaultShopName] = useState('')
  const [role, setRole] = useState();


  const [empList, setEmpList] = useState([])

  //   const [month, setMonth] = useState(moment(new Date()).format("MM/YYYY"));
  const [sort, setSort] = useState('');
  const [placeHolder, setPlaceHolder] = useState('')

  const getBranchList = async () => {
    setLoading(true);
    setBranchCode(branchCode);
    await _storeData("topAvgIncomeSearch", branchCode);
    await getAllBranch(navigation).then((res) => {

      if (res.status == "success") {
        setLoading(false);
        setBranchList(res.data);
        setBranchCode(res.data[0].shopCode);
      }
      if (res.status == "failed") {
        setLoading(false);
      }
      if (res.status == "v_error") {
        Toast.show({
          text1: "Cảnh báo",
          text2: res.message,
          type: "error",
          visibilityTime: 1000,
          autoHide: true,
          onHide: () => navigation.navigate("AdminHome")
        })
      }
    })
  }

  const onChangeBranch = async (value) => {
    setLoading(true)
    setBranchCode(value);
    await getAllShop(navigation, branchCode).then((res) => {
      if (res.status == "success") {
        setLoading(false);
        setShopList(res.data);

      }
      if (res.status == "failed") {
        setLoading(false);
      }
      if (res.status == "v_error") {
        Toast.show({
          text1: "Cảnh báo",
          text2: res.message,
          type: "error",
          visibilityTime: 1000,
          autoHide: true,
          onHide: () => navigation.navigate("AdminHome")
        })
      }
    })

  }

  const getData = async (branchCode1, sort1, branchName1) => {
    setMessage("");
    setLoadingData(true);
    setSort(sort1)
    await _storeData("KPIAVGINCOMETELLER", { "sort": sort1 == 1 ? 1 : 0, "month": month, "shopCode": branchCode1, "shopName": branchName1 == undefined ? defaultShopName : branchName1 }).then(async () => {
      await getTopTellerByAvgIncome(navigation, branchCode1, sort1).then((res) => {
        setLoadingData(false);
        if (res.status == "success") {
          if (res.data.length > 0 || res.data.data.length > 0) {
            setNotification(res.data.notification)
            setData(res.data.data);
            setLoadingData(false);
          } else {
            setData([])
            setMessage("Không có dữ liệu")
            setLoadingData(false);
          }
        }
        if (res.status == "failed") {
          setMessage("Không có dữ liệu")
          setLoadingData(false);
        }

        if (res.status == "v_error") {
          Toast.show({
            text1: "Cảnh báo",
            text2: res.message,
            type: "error",
            visibilityTime: 1000,
            autoHide: true,
            onHide: () => navigation.goBack()
          })
        }
      });
    })

  };

  const checkRole = async () => {
    await _retrieveData("userInfo").then((user) => {
      let role = user?.userId.userGroupId.code;
      setRole(role)
    })
  }

  const init = async () => {
    await _retrieveData("KPIAVGINCOMETELLER").then(async (item) => {
      if (item != undefined) {
        console.log("KPIAVGINCOMETELLER")
        console.log(item)
        setDefaultShopName(item.shopName)
        setSort(item.sort==0?1:0);
        setDefaultShopCode(item.shopCode);
        await getData(item.shopCode, item.sort, item.shopName)
      } else {
        
        await getProfile();
        await getData(branchList[0].shopCode, sort, defaultShopName);

      }
    })

  }

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    getBranchList()
    init();
    checkRole();
    return () => {
      console.log('AdminHome > AvgIncome > TopTellers')
    };

  }, [""]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.primary} />
      <Header title={text.topTellers} />
      {notification ? <Text style={styles.notification}>{notification}</Text> : null}
      <Search
        loading={loading}
        modalTitle="Vui lòng chọn"
        placeholder={defaultShopName}
        showAll="Tất cả"
        data={[
          { label: 'Top cao nhất', value: 1},
          { label: 'Top thấp nhất', value: 0 }
      ]}
        searchSelectModal
        width={width - fontScale(60)}
        style={{ marginTop: fontScale(20) }}
        leftIcon={images.teamwork}
        dataOne={branchList}
        dataTwo={shopList}
        dataThree={empList}
        index={branchList.map((item, index) => index)}
        fieldOne={branchList.map((item) => item.shopName)}
        fieldTwo={shopList.map((item) => item.shopName)}
        fieldThree={empList.map((item, index) => item.maGDV)}
        onChangePickerOne={(value) => onChangeBranch(value)}
        // onChangePickerTwo={(value) => onChangeShop(value.shopCode)}
        // onChangePickerThree={(value) => onChangeEmp(value.maGDV)}
        showPicker={[true, false, false]}
        fixed={role != "VMS_CTY" ? true : false}
        fixedData={defaultShopName}
        onPressOK={async (value) => await getData(value.shopCode, value.radio, value.shopName)}
      />

      <Body
        showInfo={false}
        style={{ marginTop: fontScale(15), zIndex: -10 }}
      />

      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <View style={{ flexDirection: "row", marginTop: fontScale(2) }}>
          <TableHeader style={{ width: (width * 3.9) / 10 }} title={text.GDV} />
          <TableHeader style={{ width: (width * 2.5) / 10 }} title={text.salaryAverage} />
          <TableHeader style={{ width: (width * 3.0) / 10 }} title={text.sumSalary} />
        </View>
        {loadingData == true ? (
          <ActivityIndicator
            size="small"
            color={colors.primary}
            style={{ marginTop: fontScale(10) }}
          />
        ) : null}

        {message ? <Text style={styles.message}>{message}</Text> : null}

        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          style={{ marginTop: fontScale(10) }}
          keyExtractor={(item, index) => index.toString()}
          key={({ item }) => item.empName.toString()}
          renderItem={({ item, index }) => (
            <GeneralListItem
              item={item}
              index={index}
              fields={[
                `${item.empName}\n(${item.shopName})`,
                item.avgIncome,
                item.totalSalary,
                item.prePaid,

              ]}
              style={[
                [styles.dateCol, { width: (width * 3.9) / 10 }],
                [styles.dateCol, { width: (width * 2.6) / 10 }],
                [styles.dateCol, { width: (width * 3.2) / 10 }],
              ]}
            //   lastIcon={item.pckSub == 1 ? images.check : images.cancle}
            //   lastIconViewStyle={{ alignItems: "center", flex: 0.5 }}
            //   lastIconStyle={{
            //     flex: 0.5,
            //     width: fontScale(15),
            //     height: fontScale(19),
            //   }}
            />
          )}
        />
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

export default AdminTopTellerAvgIncome;