import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity,
    ScrollView,
    useWindowDimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useUser } from '@clerk/clerk-expo';
import { db } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

const feelingsList = [
    'Feliz',
    'Triste',
    'Cansado',
    'Animado',
    'Irritado',
    'Ansioso',
    'Calmo',
    'Surpreso',
    'Apaixonado',
    'Grato',
];

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

const NewEntryPage = ({ navigation }) => {
    const { user } = useUser();
    const [title, setTitle] = useState('');
    const [feeling, setFeeling] = useState('');
    const [content, setContent] = useState('');

    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;

    const handleSave = async () => {
        if (!title || !feeling || !content) {
            Alert.alert('Erro', 'Preencha todos os campos!');
            return;
        }

        try {
            await addDoc(collection(db, 'entries'), {
                email: user?.primaryEmailAddress.emailAddress,
                date: new Date().toISOString().slice(0, 10),
                title,
                feeling,
                content,
            });

            Alert.alert('Sucesso', 'Entrada criada com sucesso!');
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao salvar entrada:', error);
            Alert.alert('Erro', 'Não foi possível salvar a entrada.');
        }
    };

    return (
        <ScrollView
            contentContainerStyle={[
                styles.container,
                isLandscape && styles.containerLandscape,
            ]}
        >
            <View style={[styles.form, isLandscape && styles.formLandscape]}>
                <Text style={styles.label}>Título</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Título do dia"
                />

                <Text style={styles.label}>Sentimento</Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={feeling}
                        onValueChange={(value) => setFeeling(value)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Selecione um sentimento" value="" />
                        {feelingsList.map((f) => (
                            <Picker.Item key={f} label={`${feelingEmojis[f]} ${f}`} value={f} />
                        ))}
                    </Picker>
                </View>

                {feeling ? (
                    <Text style={styles.emojiPreview}>{feelingEmojis[feeling]}</Text>
                ) : null}

                <Text style={styles.label}>Conteúdo</Text>
                <TextInput
                    style={[styles.input, { height: 100 }]}
                    value={content}
                    onChangeText={setContent}
                    multiline
                    placeholder="Escreva sua entrada..."
                />

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fdfaf6',
        flexGrow: 1,
    },
    containerLandscape: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    form: {
        width: '100%', // ocupa o espaço todo em portrait
    },
    formLandscape: {
        maxWidth: 500, // centraliza e limita no modo paisagem
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 10,
        fontFamily: 'serif',
        color: '#8b0000',
    },
    input: {
        borderWidth: 1,
        borderColor: '#cfa15b',
        borderRadius: 8,
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        fontFamily: 'serif',
        backgroundColor: '#fff',
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#cfa15b',
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: '100%',
        fontFamily: 'serif',
    },
    emojiPreview: {
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: '#8b0000',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'serif',
    },
});

export default NewEntryPage;
