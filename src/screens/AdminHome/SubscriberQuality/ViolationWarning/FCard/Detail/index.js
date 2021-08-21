import React, { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Body, Header, Search, TableHeader } from '../../../../../../comps';
import { colors } from '../../../../../../utils/Colors';
import { useRoute, useNavigation } from '@react-navigation/core';
import { getDetailFastTrans } from '../../../../../../api';
import { Text } from 'react-native';
import { fontScale } from '../../../../../../utils/Fonts';
import { images } from '../../../../../../utils/Images';
import { text } from '../../../../../../utils/Text';
import { width } from '../../../../../../utils/Dimenssion';
import { checkUserRole, getRole } from '../../../../../../utils/Logistics';
import { FlatList } from 'react-native';

const index = (props) => {
    const route = useRoute();
    const navigation = useNavigation()
    const { empCode, title } = route.params;
    const [empName, setEmpName] = useState("");
    const [notification, setNotification] = useState('');
    const [loading, setLoading] = useState(false);
    const [data,setData] = useState([])
    const [message, setMessage] = useState("")
    const [tempData, setTempData] = useState([]);

    const getData = async (branchCode, shopCode, empCode) => {
        setLoading(true);

        await getDetailFastTrans(navigation, branchCode, shopCode, empCode).then((data) => {
            setNotification(data.data.notification);
            setEmpName(data.data.empName);
            setLoading(false);
            if (data.status == "success") {
                if(data.length>0){
                    setData(data.data.data)
                    setTempData(data.data.data)
                }
            }
        })
    }
    useEffect(() => {
        getData("", "", route.params?.empCode);
        console.log("Chat luong thue bao > Canh bao vi pham > "+title+" > Chi tiet")
        console.log(route.params)
    }, [navigation]);

    const searchSub = (text = "") => {
        setMessage("")
        tempData.concat(tempData)
        const newData = tempData.filter((item) => {
            const itemData = item.phoneNumber;
            return itemData.indexOf(text) > -1;
        });
        setTempData(newData);
        if (text.length > 0) {
            if (newData.length == 0) {
                setLoading(false);
                setMessage("Không tìm thấy số thuê bao");
                setTempData([]);
            } else {
                setLoading(false);
                setMessage("");
                setTempData(newData);
            }
        } else {
            setTempData(data);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
            <Header title={title} />
            <Text style={{ color: colors.white,fontSize:fontScale(14), textAlign: "center",fontWeight:"bold" }}>{notification}</Text>
            <Search
                style={{ alignSelf: "center", marginTop: fontScale(20) }}
                leftIcon={images.simlist}
                // data={tempData}
                rightIcon={images.searchlist}
                dataNotFoundText="Không tìm thấy dữ liệu"
                onChangeText={(value) => searchSub(value)}
                placeholder={text.searchSub}
                keyboardType="number-pad"
                width={width - fontScale(120)}
                placeHolder="Nhập số thuê bao"
            />
            <Body />
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                <View style={{ justifyContent: "center", flexDirection: "row" }}>
                    <Text style={{color:colors.black,fontSize:fontScale(15)}}>GDV: </Text>
                    <Text style={{color:colors.darkYellow,fontSize:fontScale(15)}}>{empName}</Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: fontScale(20) }}>
                    <TableHeader style={{ flex: 0.7}} title={'Ngày TH'} />
                    <TableHeader style={{ flex: 1, marginLeft: fontScale(20 ) }} title={'Số ĐT'} />
                    <TableHeader style={{ flex: 1, marginLeft: fontScale(5) }} title={'Loại cảnh báo'} />
                </View>
                <FlatList
                    style={{ marginTop: fontScale(10) }}
                    keyExtractor={(item, index) => index.toString()}
                    data={tempData}
                    renderItem={({ item, index }) => {
                        return <View>
                            {
                                    <View style={{ flexDirection: "row", backgroundColor: index % 2 ? colors.lightGrey : colors.white, paddingVertical: fontScale(8) }}>
                                        <Text style={{ flex: 0.7, textAlign: "left", fontSize: fontScale(14), marginLeft: fontScale(20) }}>{item.executeDate}</Text>
                                        <Text style={{ flex: 1, textAlign: "center", paddingLeft: fontScale(15), fontSize: fontScale(14) }}>{item.phoneNumber}</Text>
                                        <Text style={{ flex: 1, textAlign: "center", paddingLeft: fontScale(15), fontSize: fontScale(14) }}>{item.warningType}</Text>
                                    </View>
                            }

                        </View>
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

export default index;