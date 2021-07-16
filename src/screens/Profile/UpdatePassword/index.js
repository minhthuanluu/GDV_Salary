import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, View, Image, Text, ActivityIndicator, BackHandler } from 'react-native';
import { updatePassword } from '../../../api';
import { Input, Button, AuthTitle } from '../../../comps';
import { colors } from '../../../utils/Colors';
import { width } from '../../../utils/Dimenssion';
import { fontScale } from '../../../utils/Fonts';
import { ToastNotif } from '../../../utils/Logistics';
import { styles } from './styles';
import Toast from 'react-native-toast-message';

const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false)
    const isFocused = useIsFocused();

    const onChangePassword = async (oldPassword = '', newPassword = '', reNewPassword = '') => {
        if (oldPassword.length == 0) {
            setMessage("Vui lòng nhập mật khẩu cũ!")
        } else if (newPassword.length == 0) {
            setMessage("Vui lòng nhập mật khẩu mới!")
        } else if (reNewPassword.length == 0) {
            setMessage("Vui lòng nhập lại mật khẩu mới!")
        } else {
            setMessage('')
            setLoading(true)
            await updatePassword(oldPassword, newPassword).then((data) => {
                if (data.status == "success") {
                    ToastNotif('Thông báo', 'Cập nhật mật khẩu thành công!', 'success', true);
                    setLoading(false);
                    navigation.navigate("Home");
                }
                if (data.status == "failed") {
                    setMessage(data.message);
                    setLoading(false);

                }
            })
        }
    }

    useEffect(() => {
        let isCancelled = false;
        const backAction = () => {
            navigation.navigate("Profile")
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => {
            backHandler.remove();
            isCancelled = true;
        };

    }, [isFocused]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={colors.primary} />
            <Toast ref={(ref) => Toast.setRef(ref)} />
            <View style={styles.bottomShape}>
                <Image source={require("../../../assets/loginbg.png")} resizeMode="stretch" style={styles.trigleShape} />
            </View>
            <View style={styles.mbfLogoContainer}>
                <Image source={require("../../../assets/mblogo.png")} resizeMode="contain" style={styles.logo} />
            </View>
            <View style={styles.topShape}>
                <AuthTitle title="đổi mật khẩu" style={styles.authTitle} />
                <Input underline pwd title="Mật khẩu cũ" width={width - fontScale(70)} style={styles.ipUsn} onChangeText={(value) => setOldPassword(value)} />
                <Input underline pwd title="Mật khẩu mới" width={width - fontScale(70)} style={styles.ipUsn} onChangeText={(value) => setNewPassword(value)} />
                <Input underline pwd title="Xác nhận mật khẩu mới" width={width - fontScale(70)} style={styles.ipPwd} onChangeText={(value) => setReNewPassword(value)} />
                <Button width={fontScale(150)} label={"Đổi mật khẩu"} center style={styles.loginButton} onPress={() => onChangePassword(oldPassword, newPassword, reNewPassword)} />
                <Text style={{ textAlign: "center", color: colors.white, marginTop: fontScale(30) }}>{message}</Text>
                {
                    loading == true ? <ActivityIndicator size="small" color={colors.white} /> : null
                }
            </View>
        </SafeAreaView>
    );
}

export default UpdatePassword;