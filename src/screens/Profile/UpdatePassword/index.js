import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, View, Image, Text, ActivityIndicator } from 'react-native';
import { updatePassword } from '../../../api';
import { Input, Button, AuthTitle } from '../../../comps';
import { colors } from '../../../utils/Colors';
import { width } from '../../../utils/Dimenssion';
import { fontScale } from '../../../utils/Fonts';
import { backHandler, ToastNotif } from '../../../utils/Logistics';
import { styles } from './styles';
import Toast from 'react-native-toast-message';
import { text } from '../../../utils/Text';
import { images } from '../../../utils/Images';

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
                    setTimeout(() => {
                        navigation.navigate("Home");
                    }, 3000);
                }
                if (data.status == "failed") {
                    ToastNotif('Thông báo', data.message, 'error', true);
                    setLoading(false);
                }
            });
        }
    }

    useEffect(() => {
        backHandler(navigation, "Profile");
    }, [isFocused]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={colors.primary} />
            <Toast ref={(ref) => Toast.setRef(ref)} />
            <View style={styles.bottomShape}>
                <Image source={images.loginbg} resizeMode="stretch" style={styles.trigleShape} />
            </View>
            <View style={styles.mbfLogoContainer}>
                <Image source={images.logo} resizeMode="contain" style={styles.logo} />
            </View>
            <View style={styles.topShape}>
                <AuthTitle title={text.changePassword} style={styles.authTitle} />
                <Input underline pwd title={text.oldPassword} width={width - fontScale(70)} style={styles.ipUsn} onChangeText={(value) => setOldPassword(value)} />
                <Input underline pwd title={text.newPassword} width={width - fontScale(70)} style={styles.ipUsn} onChangeText={(value) => setNewPassword(value)} />
                <Input underline pwd title={text.confirmPassword} width={width - fontScale(70)} style={styles.ipPwd} onChangeText={(value) => setReNewPassword(value)} />
                <Button width={fontScale(150)} label={text.changePassword} center style={styles.loginButton} onPress={() => onChangePassword(oldPassword, newPassword, reNewPassword)} />
                <Text style={{ fontSize: fontScale(15),textAlign: "center", color: colors.white, marginTop: fontScale(30) }}>{message}</Text>
                {
                    loading == true ? <ActivityIndicator size="small" color={colors.white} /> : null
                }
            </View>
        </SafeAreaView>
    );
}

export default UpdatePassword;