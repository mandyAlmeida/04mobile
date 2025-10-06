import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const feelingEmojis = {
    Feliz: '😊',
    Triste: '😢',
    Cansado: '😴',
    Animado: '🤩',
    Irritado: '😠',
    Ansioso: '😰',
    Calmo: '😌',
    Surpreso: '😲',
    Apaixonado: '🥰',
    Grato: '🙏',
};

const EntryDetailsPage = ({ route }) => {
    const { entry } = route.params;
    const navigation = useNavigation();

    const handleDelete = () => {
        Alert.alert(
            'Excluir entrada',
            'Tem certeza que deseja excluir esta entrada?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteDoc(doc(db, 'entries', entry.id));
                            navigation.goBack();
                        } catch (error) {
                            console.error('Erro ao excluir entrada:', error);
                            Alert.alert('Erro', 'Não foi possível excluir a entrada.');
                        }
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{entry.title}</Text>
            <Text style={styles.date}>🗓 {entry.date}</Text>
            <Text style={styles.feeling}>
                {feelingEmojis[entry.feeling] || '🙂'} {entry.feeling}
            </Text>
            <View style={styles.separator} />
            <Text style={styles.content}>{entry.content}</Text>

            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.deleteButtonText}>Excluir entrada</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fdfaf6',
        padding: 20,
    },
    title: {
        fontSize: 24,
        color: '#8b0000',
        fontWeight: 'bold',
        marginBottom: 8,
        fontFamily: 'serif',
    },
    date: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    feeling: {
        fontSize: 16,
        color: '#b03a2e',
        marginBottom: 12,
        fontWeight: '600',
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginBottom: 12,
    },
    content: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        fontFamily: 'serif',
    },
    deleteButton: {
        marginTop: 30,
        backgroundColor: '#b03a2e',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default EntryDetailsPage;

