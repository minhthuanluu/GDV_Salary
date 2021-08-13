import React,{ useEffect } from 'react';
import { View, Text, ImageBackground} from 'react-native';
import { signoutUser } from '../../api';
import { fontScale } from '../../utils/Fonts';
import { images } from '../../utils/Images';
import { text } from '../../utils/Text';
import { useNavigation } from '@react-navigation/core';
import { styles } from './styles';
import { _removeData, _retrieveData } from '../../utils/Storage';
import { backHandler } from '../../utils/Logistics';
import { Button } from "../../comps";

const SignOut = () => {
    const navigation = useNavigation();
    const logoutUser = async () => {
        await signoutUser(navigation).then(async () => {
            await _removeData("userInfo");
        });
    }
    
    useEffect(() => {
        backHandler(navigation,"Home");
    }, [""]);

    return (
        <ImageBackground style={styles.container} source={images.logoutbg}>
            <View style={styles.dialog}>
                <Text style={styles.logoutMessage}>{text.logoutMessage}</Text>
                <View style={styles.buttonContainer}>
                    <Button wIcon style={{ marginRight: fontScale(30) }} label={text.cancle} color="red" width={fontScale(100)} icon={images.cancle} onPress={() => navigation.navigate("Home")} />
                    <Button wIcon style={{ marginLeft: fontScale(30) }} label={text.yes} color="green" width={fontScale(100)} icon={images.check} onPress={() => logoutUser()} />
                </View>
            </View>
        </ImageBackground>
    );
}

export default SignOut;