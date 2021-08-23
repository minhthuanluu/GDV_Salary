import { useRoute, useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native';
import Toast from 'react-native-toast-message';
import { getEmpThreeTime } from '../../../../../api';
import { Body, DatePicker, GeneralListItem, Header, Search, SearchWithPermission, TableHeader } from '../../../../../comps';
import { colors } from '../../../../../utils/Colors';
import { width } from '../../../../../utils/Dimenssion';
import { fontScale } from '../../../../../utils/Fonts';
import { images } from '../../../../../utils/Images';
import { text } from '../../../../../utils/Text';
import { getAllBranch, getAllEmp } from '../../../../../api';
import { FlatList } from 'react-native';
import { getAllShop } from '../../../../../adminapi';

const index = (props) => {
    const route = useRoute();
    const [month, setMonth] = useState(route.params?.month);
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { key, title } = route.params;

    const getData = async (month, branchCode, shopCode, empCode) => {
        setMessage("")
        setData([])
        setLoading(true)
        await getEmpThreeTime(navigation, month, branchCode, shopCode, empCode).then((res) => {
            if (res.status == "success") {
                setData(res.data);
                setLoading(res.isLoading);
            }
            if (res.length == 0) {
                setLoading(false);
                setMessage(text.dataIsNull)
            }
            if (res.status == "failed") {
                setLoading(res.isLoading);
                Toast.show({
                    text1: "Cảnh báo",
                    text2: res.message,
                    type: "error",
                    visibilityTime: 1000,
                    autoHide: true
                })
            }
            if (res.status == "v_error") {
                setLoading(res.isLoading);
                Toast.show({
                    text1: "Cảnh báo",
                    text2: res.message,
                    type: "error",
                    visibilityTime: 1000,
                    autoHide: true,
                    onHide: () => navigation.goBack()
                })
            }


        })
    }

    const _onSearch = async (value) => {
        setMessage("");
        setMonth(value.month)
        await getData(value.month, value.branchCode, value.shopCode, value.empCode);

    }

    useEffect(() => {
        getData(month, "", "", "");
    }, [navigation])


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
            <Header title={title} />
            <SearchWithPermission
                full
                leftIcon={images.teamwork}
                rightIcon={images.searchlist}
                width={width - fontScale(50)}
                style={{ marginTop: fontScale(10) }}
                month={month}
                placeholder={text.search}
                modalTitle={text.select}
                select1LeftContainer={text.chooseBranch}
                select2LeftContainer={text.chooseShop}
                select3LeftContainer={text.chooseEmp}
                select1Width={width - fontScale(30)}
                onDone={(value) => _onSearch(value)}
            />
            <Body />
            <View style={{ flex: 1, backgroundColor: colors.white, }}>
                <View style={{ marginTop: -fontScale(20) }}>
                    <View style={{ flexDirection: "row", marginTop: fontScale(2) }}>
                        <TableHeader style={{ width: width / 2 }} title={'GDVPTM'} />
                        <TableHeader style={{ width: width / 2 }} title={'Tên CH'} />
                    </View>
                    {message ? <Text style={{ fontSize: fontScale(15),color: colors.primary, textAlign: "center", marginTop: fontScale(15), width: width }}>{message}</Text> : null}
                    <View>
                        {loading == true ?
                            <ActivityIndicator size="small" color={colors.primary} style={{marginTop:fontScale(15)}}/>
                            : null}
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={data}
                            style={{ marginTop: fontScale(10), marginBottom: fontScale(43) }}
                            keyExtractor={(item, index) => index.toString()}
                            key={({ item }) => item.empName.toString()}
                            renderItem={({ item, index }) => (
                                <GeneralListItem
                                    item={item}
                                    index={index}
                                    fields={[
                                        item.empName,
                                        item.store
                                    ]}
                                    style={[
                                        [{ textAlign: "left", marginLeft: width / 8, fontSize: fontScale(14), textAlignVertical: "center" }, { width: width / 2 }],
                                        [{ textAlign: "left", marginLeft: width / 21, fontSize: fontScale(14), textAlignVertical: "center" }, { width: width / 2 }],
                                    ]}

                                />
                            )}
                        />
                    </View>
                </View>
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />

        </SafeAreaView>
    );
}

export default index;