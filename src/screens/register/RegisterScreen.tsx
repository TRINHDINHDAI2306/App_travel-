import axios from 'axios';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import SvgIcons from 'assets/svgs';

import Button from 'components/Button/Button';
import Header from 'components/Header';
import Input from 'components/Input';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'hooks/useTheme';

import { goBack } from 'navigation/utils';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import { BASE_URL } from 'configs/api';

const RegisterScreen = () => {
    const navigation = useNavigation();
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [securePassword, setSecurePassword] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const onRegister = async () => {
   
        try {
         
            const response = await axios.post(`${BASE_URL}/auth/register`, {
                email: email,
                username:username,
                password: password,
                confirmPassword:confirmPassword
            });
            if (!response) {
                Alert.alert('Error create account');
                return;
            }
    
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setUsername('');
            navigation.navigate('ComfirmOTP', { email })
        } catch (error) {
         
            Alert.alert("dki false")
        }
    };

    const renderHeader = () => (
        <View style={styles.tileContainer}>
            <Text style={styles.titleHeader}>Đăng ký</Text>
        </View>
    );

    const renderInputEmail = () => (
        <View>
            <Text style={styles.title}>Email</Text>
            <Input
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholder="Vui lòng nhập email"
            />
        </View>
    );

    const renderInputPhone = () => (
        <View style={styles.inputPasswordContainer}>
            <Text style={styles.title}>Tên người dùng</Text>
            <Input
                value={username}
                onChangeText={setUsername}
                keyboardType="numeric"
                placeholder="Vui lòng nhập username"
            />
        </View>
    );

    const renderInputPassword = () => {
        const Icon = SvgIcons[`IcVisibility${securePassword ? 'Off' : ''}`];
        return (
            <View style={styles.inputPasswordContainer}>
                <Text style={styles.title}>Mật khẩu</Text>
                <Input
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Vui lòng nhập mật khẩu"
                    secureTextEntry={securePassword}
                    icon={<Icon width={scales(15)} height={scales(15)} />}
                    onPressIcon={() => setSecurePassword(!securePassword)}
                />
            </View>
        );
    };

    const renderInputConfirmPassword = () => {
        const Icon = SvgIcons[`IcVisibility${securePassword ? 'Off' : ''}`];
        return (
            <View style={styles.inputPasswordContainer}>
                <Text style={styles.title}>Nhập lại mật khẩu</Text>
                <Input
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Vui lòng nhập lại mật khẩu"
                    secureTextEntry={securePassword}
                    icon={<Icon width={scales(15)} height={scales(15)} />}
                    onPressIcon={() => setSecurePassword(!securePassword)}
                />
            </View>
        );
    };

    const renderButton = () => (
        <Button
            title="Đăng ký"
            onPress={onRegister}
            customStyles={{ marginTop: scales(30), marginBottom: scales(20) }}
        />
    );

    const renderContent = () => (
        <View style={styles.content}>
            {renderInputEmail()}
            {renderInputPhone()}
            {renderInputPassword()}
            {renderInputConfirmPassword()}
            {renderButton()}
        </View>
    );

    return (
        <View style={styles.container}>
            <Header />
            <KeyboardAwareScrollView
                extraHeight={scales(125)}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                enableOnAndroid>
                {renderHeader()}
                {renderContent()}
            </KeyboardAwareScrollView>
        </View>
    );
};

export default RegisterScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        content: {
            marginHorizontal: scales(15),
        },
        title: {
            ...Fonts.inter400,
            fontSize: scales(14),
            color: color.Text_Dark_1,
            marginBottom: scales(8),
        },
        inputPasswordContainer: {
            marginTop: scales(20),
        },
        tileContainer: {
            marginTop: scales(40),
            marginBottom: scales(40),
            alignItems: 'center',
        },
        titleHeader: {
            ...Fonts.inter700,
            fontSize: scales(24),
            color: color.Color_Primary,
        },
    });
};
