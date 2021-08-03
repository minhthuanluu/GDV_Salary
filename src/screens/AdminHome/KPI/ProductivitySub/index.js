import { useNavigation } from '@react-navigation/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { BackHandler } from 'react-native';
import { SafeAreaView, View } from 'react-native';
import { getProductivitySubByMonth } from '../../../../api';
import { Body, DatePicker, Header, Table } from '../../../../comps';
import { colors } from '../../../../utils/Colors';
import { height, width } from '../../../../utils/Dimenssion';
import { fontScale } from '../../../../utils/Fonts';
import { images } from '../../../../utils/Images';
import { text } from '../../../../utils/Text';
import { styles } from './style';

const index = (props) => {
    const [month, setMonth] = useState(moment(new Date()).format("MM/YYYY"));
    const [loading, setLoading] = useState(false);
    // const [data,setData] = useState([])

    const getData = async(month) => {
        setLoading(true)
        await getProductivitySubByMonth(navigation,month).then((res)=>{
            if (res.status == "success") {
                if (res.data.length > 0 || res.data.data.length > 0) {
                  setData(res.data.data);
                  setLoading(false);
                } else {
                  setData([])
                  setMessage(res.message)
                  setLoading(false);
                }
              }
              if (res.status == "failed") {
                setMessage(res.message)
                setLoading(false);
              }
        })
        // console.log(month)
    }
    const _setMonth = async(value) => {
      setMonth(value)
       await getData(value);
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
        getData(month);
        return () => {
          backHandler.remove();
        };
    
      }, [""]);

    return (
        <SafeAreaView style={styles.container}>
            <Header title={text.productivitySub} />
            <DatePicker month={month} width={width - fontScale(120)} style={{ alignSelf: "center" }} onChangeDate={(date) => _setMonth(date)} />
            <Body />
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                {loading==true ? <ActivityIndicator size="small" color={colors.primary} style={{marginBottom:fontScale(10)}}/> : null}
                <Table
                    data={data}
                    loading={loading}
                    table
                    numColumn={6}
                    headers={["", "TBTS", "TBTT", "Lượt KH", "Lượt GD", "SL GDV"]}
                    headersTextColor={colors.primary}
                    headerStyle={{ icon: { size: 15 }, text: { size: fontScale(14) } }}
                    message={message}
                    // headerIcons={[images.branch, images.company, images.workingShop, images.close]}
                    // lastIconHeader={images.day}
                    widthArray={[fontScale(100), fontScale(100), fontScale(100), fontScale(100), fontScale(100), fontScale(90)]}
                    loadingIconStyle={{marginLeft:-fontScale(height/4)}}
                    fields={
                        data.map((item) => [
                            item.shopName,
                            item.prePaid,
                            item.postPaid,
                            item.cusTurn,
                            item.transaction,
                            item.empAmount
                        ])
                    }
                    loading={loading}
                    hideFirstColHeader
                    firstRowBg={"#FBFDC3"}
                    lastIcon={data.map((item, index) => item.detail=="true" ? images.eye:null)}
                    lastIconStyle={{ tintColor: colors.grey }}
                    seeDetail={data.map((item, index) => {return item.detail})}
                    onPress={(item)=>navigation.navigate("AdminDetailProductivitySub",{"shopCode":item.shopCode,"querymonth":month})}
                    // navigation.navigate("AdminDetailProductivitySub",{"shopCode":item.shopCode})
                    fontWeight={data.map((item, index) => index == 0 || item.shopType == "branch" ? "bold" : "normal")}
                    textColor={data.map((item, index) => item.shopType == "branch" ? "#000" : item.shopType == "shop" ? "#D19E01" : "#000")}
                    rowBg={data.map((item, index) => item.shopType == "BRANCH" ? "#EBFDFD" : "#fff")}
                />
            </View>
        </SafeAreaView>
    );
}

export default index