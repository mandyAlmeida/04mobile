import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';

const LoginPage = ({ navigation }) => {
    const { isSignedIn, isLoaded } = useAuth();

    const handleLoginPress = () => {
        if (!isLoaded) return;

        if (isSignedIn) {
            navigation.navigate('MainTabs');
        } else {
            navigation.navigate('Auth');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Diary App</Text>
            <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fdfaf6',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#8b0000',
        fontFamily: 'serif',
    },
    loginButton: {
        backgroundColor: '#8b0000',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'serif',
    },
});


export default LoginPage;
