import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, Text, FlatList, View, ActivityIndicator } from "react-native";
import { Body, GeneralListItem, Header, Search, TableHeader } from "../../../../comps";
import { styles } from "./style";
import { colors } from "../../../../utils/Colors";
import { fontScale } from "../../../../utils/Fonts";
import { images } from "../../../../utils/Images";
import { text } from "../../../../utils/Text";
import { useNavigation } from "@react-navigation/native";
import { width } from "../../../../utils/Dimenssion";
import { BackHandler } from "react-native";
import Toast from 'react-native-toast-message';
import { getAllBranch, getAllShop, getTopTellerByAvgIncome } from "../../../../adminapi";
import { _retrieveData, _storeData } from "../../../../utils/Storage";
import { getRole } from "../../../../utils/Logistics";
import { ROLE } from "../../../../utils/Roles";

const AdminTopTellerAvgIncome = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const navigation = useNavigation();
  const [branchCode, setBranchCode] = useState("2MFHCM1");
  const [branchList, setBranchList] = useState([]);
  const [shopList, setShopList] = useState([]);
  const [notification, setNotification] = useState("");
  const [defaultBranchCode, setDefaultBranchCode] = useState('')
  const [defaultBranchName, setDefaultBranchName] = useState('')
  const [defaultShopCode, setDefaultShopCode] = useState('')
  const [defaultShopName, setDefaultShopName] = useState('')
  const [role, setRole] = useState();
  const [empList, setEmpList] = useState([])
  const [sort, setSort] = useState(1);
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
        Toast.show({
          text1: "Cảnh báo",
          text2: res.message,
          type: "error",
          visibilityTime: 5000,
          autoHide: true,
          onHide: () => navigation.goBack()
        })
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

  const getData = async (branchCode, shopCode, sort, branchName) => {
    branchName && setPlaceHolder(branchName)
    setMessage("");
    setLoadingData(true);
    setSort(sort)
    setData([])
    await getTopTellerByAvgIncome(navigation, branchCode, shopCode, sort).then((res) => {
      setLoadingData(false);
      if (res.status == "success") {
        if (res.data.length > 0 || res.data.data.length > 0) {
          setNotification(res.data.notification)
          setData(res.data.data);
          setLoadingData(false);
        } else {
          setData([])
          setMessage(text.dataIsNull)
          setLoadingData(false);
        }
      }
      if (res.status == "failed") {
        Toast.show({
          text1: "Cảnh báo",
          text2: res.message,
          type: "error",
          visibilityTime: 1000,
          autoHide: true,
          onHide: () => { }
        })
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
  };

  const checkRole = async () => {
    await getRole().then(async (data) => {
      getBranchList();
      setRole(data.role);
      if (data.role == ROLE.VMS_CTY || data.role == ROLE.ADMIN) {
      
        await getData('', '', sort, defaultBranchName);
        setPlaceHolder(text.chooseBranch)
      } else if (data.role == ROLE.MBF_CHINHANH) {
        setDefaultShopName(data.label);
        setPlaceHolder(data.label);
        setDefaultBranchName(data.branchName);
        setDefaultBranchCode(data.branchCode);
        setDefaultShopCode(data.shopCode);
        setDefaultShopName(data.shopName);
        await getData(data.shopCode, "", sort, data.branchName);
      } else if (data.role == ROLE.MBF_CUAHANG) {
        setDefaultShopName(data.branchName);
        setPlaceHolder(data.label);
        setDefaultBranchName(data.shopName);
        setDefaultBranchCode(data.shopCode);
        await getData(data.branchCode, "", sort, data.label);
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
    
    // init();
    checkRole();
    getBranchList();
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
        rightIcon={images.searchlist}
        dialogTitle="Chọn dữ liệu"
        modalTitle={text.select}
        placeholder={placeHolder}
        searchSelectModal
        data={[
          { label: text.highestTop, value: 1 },
          { label: text.lowestTop, value: 0 }
        ]}
        initialRadio={sort == 1 ? 0 : 1}
        modalTitle={text.select}
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
        showPicker={[true, false, false]}
        fixed={role != ROLE.VMS_CTY && role != ROLE.ADMIN ? true : false}
        fixedData={defaultShopName}
        onPressOK={(value) =>
          role == ROLE.VMS_CTY && role == ROLE.VMS_CTY ? getData(value.shopCode || defaultBranchCode, defaultShopCode, value.radio, value.shopName || defaultShopName) :
            role == ROLE.MBF_CHINHANH ? getData(defaultShopCode, "", value.radio) : getData(defaultBranchCode, defaultShopCode, value.radio)
        }
      />
      <Body
        showInfo={false}
        style={{ marginTop: fontScale(15), zIndex: -10 }} />
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
            style={{ marginTop: fontScale(20) }}
          />
        ) : null}

        {message ? <Text style={styles.notification}>{message}</Text> : null}

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
                item.prePaid
              ]}
              style={[
                [styles.dateCol, { width: (width * 3.9) / 10 }],
                [styles.dateCol, { width: (width * 2.6) / 10 }],
                [styles.dateCol, { width: (width * 3.2) / 10 }]
              ]}

            />
          )}
        />
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

export default AdminTopTellerAvgIncome;