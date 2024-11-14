import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import Button from 'components/Button/Button';
import Header from 'components/Header';
import Input from 'components/Input';

import { Fonts } from 'themes';
import { scales } from 'utils/scales';
import axios from 'axios';
import { BASE_URL } from 'configs/api';
import { goToLogin } from 'screens/login/src/utils';
import { useRoute } from '@react-navigation/native';

const ConfirmOTP = () => {
    const route = useRoute();
    const { email } = route.params as { email: string };
    const [otp, setOtp] = useState<string>(''); // Sửa tên biến từ 'setotp' thành 'setOtp'

    const submitOTP = async () => { // Sửa tên hàm 'SubmidOTP' thành 'submitOTP'
        try {
            const response = await axios.put(`${BASE_URL}/auth/active-user/${otp}`,{
                email: email
            });

            if (!response || response.status !== 200) {
                Alert.alert('Lỗi', 'Không thể kích hoạt tài khoản');
                return;
            }

            // Kích hoạt thành công
            Alert.alert('Thành công', 'Kích hoạt tài khoản thành công');
            goToLogin()
        } catch (error) {
            Alert.alert('Lỗi', 'Kích hoạt tài khoản thất bại. Vui lòng thử lại.');
        }
      
        
    };

    return (
        <View style={{ padding: 20, flex: 1, backgroundColor: '#FFF' }}>
            <Header />
            <View style={styles.tileContainer}>
                <Text style={styles.titleHeader}>Xác thực OTP</Text>
            </View>

            <View>
                <Text style={styles.title}>Nhập mã OTP</Text>
                <Input onChangeText={setOtp} placeholder="Vui lòng nhập OTP" />
            </View>
            <Button
                title="Gửi OTP"
                onPress={submitOTP} // Sửa tên hàm
                customStyles={{ marginTop: scales(30), marginBottom: scales(20) }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    tileContainer: {
        marginTop: scales(40),
        marginBottom: scales(40),
        alignItems: 'center',
    },
    titleHeader: {
        ...Fonts.inter700,
        fontSize: scales(24),
        color: 'green',
    },
    title: {
        ...Fonts.inter400,
        fontSize: scales(14),
        color: 'black',
        marginBottom: scales(8),
    },
});

export default ConfirmOTP;
