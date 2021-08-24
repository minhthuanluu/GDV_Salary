import React, { useEffect, useState } from 'react';
import { SafeAreaView, Image, View, Text, StatusBar, Linking, ActivityIndicator, TouchableOpacity, Modal, BackHandler, Alert, ScrollView } from 'react-native';
import { Header, ProfileItem } from '../../../comps';
import { colors } from '../../../utils/Colors';
import { fontScale } from '../../../utils/Fonts';
import { images } from '../../../utils/Images';
import { text } from '../../../utils/Text';
import { styles } from './styles'
import { useNavigation } from '@react-navigation/core';
import { Profile } from '../../../models/Data';
import { getProfile } from '../../../api';
import { imgUrl } from '../../../api/untils';
import { useIsFocused } from "@react-navigation/native";
import { _storeData } from '../../../utils/Storage';
import { backHandler, checkInternetConnection, ToastNotif } from '../../../utils/Logistics';
import Toast from 'react-native-toast-message';

const DashBoard = () => {
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();
    const [userData, setUserData] = useState(Profile);
    const [showModal, setShowModal] = useState(false)
    const isFocused = useIsFocused();
    
    const getData = async () => {
        setLoading(true)
        await getProfile(navigation).then((res) => {
            if (res.status == "success") {
                setLoading(false)
                setUserData(res.data)
            }
            if (res.status == "v_error") {
                Toast.show({
                    text1: "Cảnh báo",
                    text2: res.message,
                    type: "error",
                    visibilityTime: 5000,
                    autoHide: true,
                    onHide: () => navigation.navigate("Home")
                })
            }
            if (res.status == "failed") {
                setLoading(false)
                ToastNotif('Cảnh báo', res.message, 'error', true);
            }
        })
    }

    useEffect(() => {
        getData();
        backHandler(navigation,"Home");
    }, [isFocused]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" translucent backgroundColor={colors.primary} />
            <View style={{ backgroundColor: colors.white, flex: 1 }}>
                <Header title={text.profile} />
                <Image source={images.profileHeader} resizeMode="stretch" style={styles.headerShape} />
                <View style={styles.personInfo}>
                    <Text style={styles.staffCode}>{userData.displayName}</Text>
                    <Text style={styles.staffName}>({userData&&userData.userGroupId.code})</Text>
                    <Image style={styles.avatar} source={userData.avatar == null ? images.avatar : { uri: imgUrl + userData.avatar }} />
                </View>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    {
                        loading == true ? <ActivityIndicator size="small" color={colors.primary} /> :
                            <ScrollView style={{ paddingVertical: 10}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                                <View>
                                    <ProfileItem icon={images.day} title={text.workingDay} size={fontScale(25)} value={userData.gdvId ? userData.gdvId.fromDate : "..."} />
                                    <ProfileItem icon={images.workingShop} title={text.workingShop} size={fontScale(25)} value={userData.shopId ? userData.shopId.shopName : "..."} />
                                    <ProfileItem icon={images.traderRating} title={text.traderRating} size={fontScale(25)} value={"..."} />
                                    <ProfileItem icon={images.traderRating} title={text.storeRating} size={fontScale(25)} value={"..."} />
                                    <ProfileItem linking icon={images.pdf} title={text.PDF} size={fontScale(25)} value={"..."} openLink={() => Linking.openURL('http://hochiminh.mobifone.vn/HDSD_AppNVBH.pdf')} />
                                </View>
                            </ScrollView>
                    }
                </View>
                <TouchableOpacity onPress={() => setShowModal(true)} style={{ backgroundColor: colors.primary, width: fontScale(50), height: fontScale(50), padding: fontScale(13), position: "absolute", bottom: fontScale(22), right: fontScale(22), borderRadius: fontScale(25) }}>
                    <Image source={images.pencil} resizeMode="cover" style={{ width: fontScale(25), height: fontScale(25) }} />
                </TouchableOpacity>
                <Modal
                    animationType={'fade'}
                    visible={showModal}
                    transparent={true}
                    onRequestClose={() => setShowModal(!showModal)}>
                    <View style={{ flex: 1, backgroundColor: colors.primary }}>
                        <View style={styles.optionDialogs}>
                            <TouchableOpacity onPress={() => setShowModal(!showModal)}>
                                <Image source={images.close} style={styles.closeIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionMenu} onPress={() => [setShowModal(!showModal), navigation.navigate("UpdatePassword")]}>
                                <Text style={styles.menuTitle}>{text.changePassword}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionMenu} onPress={() => [setShowModal(!showModal), navigation.navigate("UpdateProfile")]}>
                                <Text style={styles.menuTitle}>{text.updateProfile}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
    );
}

export default DashBoard;