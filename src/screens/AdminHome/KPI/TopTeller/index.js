import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, Text, FlatList, View, ActivityIndicator } from "react-native";
import {
  Body,
  DatePicker,
  GeneralListItem,
  Header,
  Search,
  TableHeader,
} from "../../../../comps";
import { styles } from "./style";
import { colors } from "../../../../utils/Colors";
import { fontScale } from "../../../../utils/Fonts";
import { images } from "../../../../utils/Images";
import { text } from "../../../../utils/Text";
import { useNavigation } from "@react-navigation/native";
import { width } from "../../../../utils/Dimenssion";
import { BackHandler } from "react-native";
import moment from "moment";
import Toast from 'react-native-toast-message';
import { getAdminKPIMonthTopTeller, getAllBranch } from "../../../../adminapi";
import { _retrieveData } from "../../../../utils/Storage";
import { getRole } from "../../../../utils/Logistics";
import { ROLE } from "../../../../utils/Roles";

const AdminTopTeller = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const navigation = useNavigation();
  const [branchCode, setBranchCode] = useState("");
  const [branchList, setBranchList] = useState([]);
  const [shopList, setShopList] = useState([]);
  const [shopCode, setShopCode] = useState('');
  const [empList, setEmpList] = useState([])

  const [month, setMonth] = useState(moment(new Date()).format("MM/YYYY"));
  const [sort, setSort] = useState(1);
  const [placeHolder, setPlaceHolder] = useState('');
  const [role, setRole] = useState();
  const [defaultBranchCode, setDefaultBranchCode] = useState('');
  const [defaultBranchName, setDefaultBranchName] = useState('');
  const [defaultShopCode, setDefaultShopCode] = useState('');
  const [defaultShopName, setDefaultShopName] = useState('');

  const getBranchList = async () => {
    setLoading(true)
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

  const onChangeBranch = (value) => {
    setBranchCode(value.shopCode);
    setDefaultBranchCode(value.shopCode);
    setPlaceHolder(value.shopName);
  }

  const getData = async (branchCode, branchName, shopCode, month, sort) => {
    setMessage("");
    setLoadingData(true);

    setDefaultBranchCode(branchCode);
    setDefaultBranchName(branchName);
    setShopCode(shopCode);
    setSort(sort);
    setData([]);
    await getAdminKPIMonthTopTeller(navigation, branchCode, shopCode, month, sort).then((res) => {
      setLoadingData(false);
      if (res.status == "success") {
        if (res.data.data.length > 0) {
          setData(res.data.data);
          setLoadingData(false);

        } else {
          setData([]);
          setMessage(res.message);
          setLoadingData(false);
        }
      }
      if (res.status == "failed") {
        setMessage(text.dataIsNull);
        setLoadingData(false);
      }
    });
  };

  const checkRole = async () => {
    await getRole().then(async (data) => {
      setRole(data.role)
      if (data.role == ROLE.VMS_CTY) {
        getBranchList();
        await getData('', '', '', month, sort);
        setPlaceHolder(text.chooseBranch)
      } else if (data.role == ROLE.MBF_CHINHANH) {
        setDefaultShopName(data.label);
        setPlaceHolder(data.label);
        setDefaultBranchName(data.branchName);
        setDefaultBranchCode(data.shopCode);
        await getData(data.shopCode, data.branchName, "", month, sort);
      } else if (data.role == ROLE.MBF_CUAHANG) {
        setDefaultShopName(data.label);
        setPlaceHolder(data.label);
        setDefaultBranchName(data.shopName);
        setDefaultBranchCode(data.shopCode);
        await getData(data.branchCode, data.branchName, "", month, sort);
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
    checkRole();
    return () => {
      backHandler.remove();
      console.log("AdminHome > KPI > Top GDV")
    };
  }, [""]);

  const _onChangeMonth = async (value) => {
    await getRole().then(async (data) => {
      setRole(data.role)
      if (data.role == ROLE.VMS_CTY) {
        setMonth(value);
        await getData(defaultBranchCode, defaultBranchName, shopCode, value, sort);
      } else if (data.role == ROLE.MBF_CHINHANH) {
        setMonth(value);
        setDefaultShopName(data.label);
        setPlaceHolder(data.label);
        setDefaultBranchName(data.branchName);
        setDefaultShopCode(data.shopCode);
        await getData(data.shopCode, data.label, "", value, sort);
      } else if (data.role == ROLE.MBF_CUAHANG) {
        setMonth(value);
        setDefaultShopName(data.label);
        setPlaceHolder(data.label);
        setDefaultBranchName(data.shopName);
        setDefaultBranchCode(data.shopCode);
        await getData(data.branchCode, data.branchName, "", value, sort);

      }
    })
  }

  const onSearch = async (shopCode, shopName, defaultShopCode, month, radio) => {
    setDefaultShopCode(shopCode);
    setDefaultShopName(shopName);
    setSort(radio)
    await getRole().then(async (data) => {
      setRole(data.role)
      if (data.role == ROLE.VMS_CTY) {
        setMonth(month);
        await getData(shopCode, shopName, '', month, radio);
      } else if (data.role == ROLE.MBF_CHINHANH) {
        await getData(data.shopCode, data.shopName, "", month, radio).then(() => {
          setDefaultShopName(defaultShopName)
        })
      } else if (data.role == ROLE.MBF_CUAHANG) {
        await getData(data.branchCode, data.shopName, "", month, radio).then(() => {
          setDefaultShopName(defaultShopName)
        })
      }
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.primary} />
      <Header title={text.topTellers} />
      <DatePicker month={month} width={width - fontScale(120)} style={{ alignSelf: "center" }} onChangeDate={(date) => _onChangeMonth(date)} />
      <Search
        loading={loading}
        rightIcon={images.searchlist}
        data={[
          { label: text.highestTop, value: 1 },
          { label: text.lowestTop, value: 0 }
        ]}
        modalTitle={text.select}
        placeholder={placeHolder}
        searchSelectModal
        width={width - fontScale(60)}
        style={{ marginTop: fontScale(20),alignSelf:"center" }}
        leftIcon={images.teamwork}
        initialRadio={sort == 1 ? 0 : 1}
        dataOne={branchList}
        index={branchList.map((item, index) => index)}
        fieldOne={branchList.map((item) => item.shopName)}
        fieldTwo={shopList.map((item) => item.shopName)}
        fieldThree={empList.map((item, index) => item.maGDV)}
        onChangePickerOne={(value, index) => onChangeBranch(value)}
        showPicker={[true, false, false]}
        onPressOK={(value) => onSearch(value.shopCode, value.shopName, defaultShopCode, month, value.radio)}
        fixed={role != ROLE.VMS_CTY ? true : false}
        fixedData={defaultShopName}/>
      <Body
        showInfo={false}
        style={{ marginTop: fontScale(15), zIndex: -10 }}/>
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <View style={{ flexDirection: "row", marginTop: fontScale(2) }}>
          <TableHeader style={{ width: (width * 3.9) / 10 }} title={text.GDV} />
          <TableHeader style={{ width: (width * 2.5) / 10 }} title={text.sumKPI} />
          <TableHeader style={{ width: (width * 1.21) / 10 }} title={text.TBTS} />
          <TableHeader style={{ width: (width * 2.5) / 10 }} title={text.TBTT} />
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
          maxToRenderPerBatch={20}
          renderItem={({ item, index }) => (
            <GeneralListItem
              item={item}
              index={index}
              isZeroPlan={item.isZeroPlan}
              fields={[
                `${item.empName}\n(${item.workPlace})`,
                item.sumKpi,
                item.postPaid,
                item.prePaid,

              ]}
              style={[
                [styles.dateCol, { width: (width * 3.9) / 10 }],
                [styles.dateCol, { width: (width * 2.5) / 10,paddingTop:fontScale(7) }],
                [styles.dateCol, { width: (width * 1.5) / 10,paddingTop:fontScale(7) }],
                [styles.dateCol, { width: (width * 2.3) / 10 ,paddingTop:fontScale(7)}]
              ]}
            />
          )}
        />
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

export default AdminTopTeller;