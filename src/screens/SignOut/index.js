import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, TouchableHighlight } from 'react-native';
import { signoutUser } from '../../api';
import { fontScale } from '../../utils/Fonts';
import { images } from '../../utils/Images';
import { text } from '../../utils/Text';
import { useNavigation, useFocusEffect } from '@react-navigation/core';
import { styles } from './styles';
import { _removeData, _retrieveData } from '../../utils/Storage';
import { backHandler } from '../../utils/Logistics';
import { Button } from "../../comps";
import { Modal } from 'react-native';

const SignOut = () => {
    const navigation = useNavigation();
    const [isShow, setIsShow] = useState(false)
    const logoutUser = async () => {
        await signoutUser(navigation).then(async () => {
            await _removeData("userInfo");
        });
    }

    useEffect(() => {
        backHandler(navigation, "Home");
    }, [""]);

    useFocusEffect(() => {
        setIsShow(true)
    })

    return (
        <ImageBackground style={styles.container} source={images.logoutbg}>
            <Modal
                animationType="fade"
                transparent={false}
                visible={isShow}
                onRequestClose={!isShow}>
                <TouchableHighlight style={{ flex: 1, backgroundColor: 'rgba(0,0,255,0.1)' }} onPress={() => [setIsShow(!isShow), navigation.navigate('Home')]}>
                    <ImageBackground style={styles.container} source={images.logoutbg} />
                </TouchableHighlight>
                <View style={styles.dialog}>
                    <Text style={styles.logoutMessage}>{text.logoutMessage}</Text>
                    <View style={styles.buttonContainer}>
                        <Button wIcon style={{ marginRight: fontScale(30) }} label={text.cancle} color="red" width={fontScale(100)} icon={images.cancle} onPress={() => [setIsShow(!isShow), navigation.navigate('Home')]} />
                        <Button wIcon style={{ marginLeft: fontScale(30) }} label={text.yes} color="green" width={fontScale(100)} icon={images.check} onPress={() => logoutUser()} />
                    </View>
                </View>
            </Modal>
        </ImageBackground>
    );
}

export default SignOut;