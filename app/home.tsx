import { Image, Pressable, StyleSheet, Text, View, TextInput, ScrollView, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

const MainPage = () => {
    const [amount, setAmount] = useState("");
    const [comment, setComment] = useState("");
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [expenses, setExpenses] = useState([]);
    const router = useRouter();

    const profileAnim = useRef(new Animated.Value(-80)).current;
    const cardAnim = useRef(new Animated.Value(0)).current;
    const inputAnim = useRef(new Animated.Value(100)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(profileAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(cardAnim, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true,
            }),
            Animated.parallel([
                Animated.timing(inputAnim, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ])
        ]).start();
    }, []);

    const getCurrentDate = () => {
        const today = new Date();
        return today.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const addExpense = () => {
        const expense = parseFloat(amount);
        if (!isNaN(expense) && expense > 0 && comment.trim() !== "") {
            const newExpense = { id: Date.now(), amount: expense, description: comment };
            setExpenses(prev => [...prev, newExpense]);
            setTotalExpenses(prev => prev + expense);
            setAmount("");
            setComment("");
        }
    };

    const removeExpense = (id, amount) => {
        setExpenses(expenses.filter(item => item.id !== id));
        setTotalExpenses(prev => prev - amount);
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Animated.View style={[styles.personDetail, { transform: [{ translateY: profileAnim }] }]}>
                    <View style={styles.peronalDetailName}>
                        <Text style={styles.welcomeTxt}>Welcome back</Text>
                        <Text style={styles.name}>Alex John</Text>
                    </View>
                    <View style={styles.profileContainer}>
                        <Pressable onPress={() => router.push('/profile')}>
                            <Image source={{ uri: 'https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} 
                                style={styles.dp} />
                        </Pressable>
                    </View>
                </Animated.View>

                <View style={styles.heading}>
                    <Text style={styles.headingTxt}>Manage your {"\n"}expenses</Text>
                </View>

                <Animated.View style={[styles.middleBox, {
                    transform: [{ scale: cardAnim }]
                }]}>
                    <View style={styles.middleBoxHeader}>
                        <Text style={styles.middleBoxHeaderHeading}>Expenses</Text>
                        <Text style={styles.middleBoxHeaderDate}>{getCurrentDate()}</Text>
                    </View>
                    <Text style={styles.middleBoxHeaderMoney}>₹{totalExpenses.toFixed(2)}</Text>
                </Animated.View>

                <Animated.View style={[styles.expenseList, { opacity: fadeAnim }]}>
                    {expenses.length > 0 ? (
                        expenses.map((item) => (
                            <View key={item.id} style={styles.expenseItem}>
                                <Text style={styles.expenseText}>{item.description}</Text>
                                <Text style={styles.expenseAmount}>₹{item.amount.toFixed(2)}</Text>
                                <Pressable onPress={() => removeExpense(item.id, item.amount)} style={styles.removeIcon}>
                                    <AntDesign name="delete" size={20} color="white" />
                                </Pressable>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noExpenseText}>No expenses added yet.</Text>
                    )}
                </Animated.View>

                <Animated.View style={[styles.inputSec, {
                    transform: [{ translateY: inputAnim }]
                }]}>
                    <TextInput
                        placeholder='Enter amount'
                        style={styles.inputBox}
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />
                    <TextInput
                        placeholder='Description'
                        style={styles.inputBox}
                        value={comment}
                        onChangeText={setComment}
                    />
                    <Pressable style={styles.addBtn} onPress={addExpense}>
                        <Text style={styles.addBtnText}>ADD</Text>
                    </Pressable>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default MainPage;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContainer: {
        padding: 25,
        paddingBottom: 50,
    },
    personDetail: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    peronalDetailName: {
        flex: 1,
    },
    welcomeTxt: {
        fontSize: 13,
        fontWeight: '200',
    },
    name: {
        fontSize: 23,
        fontWeight: '500',
    },
    dp: {
        height: 50,
        width: 50,
        borderRadius: 35,
    },
    heading: {
        marginBottom: 10,
    },
    headingTxt: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    middleBox: {
        backgroundColor: 'white',
        borderRadius: 20,
        marginTop: 20,
        borderWidth: 0.1,
        borderColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    middleBoxHeader: {
        flex: 1,
    },
    middleBoxHeaderHeading: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    middleBoxHeaderDate: {
        fontSize: 14,
        fontWeight: '300',
        color: '#555',
    },
    middleBoxHeaderMoney: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'orange',
    },
    expenseList: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
    },
    expenseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
        elevation: 2,
    },
    expenseText: {
        fontSize: 16,
        fontWeight: '500',
        flex: 1,
    },
    expenseAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
        marginRight: 10,
    },
    noExpenseText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: 'gray',
    },
    inputSec: {
        marginTop: 20,
        backgroundColor: '#eee',
        padding: 15,
        borderRadius: 20,
    },
    inputBox: {
        backgroundColor: 'white',
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
    },
    addBtn: {
        backgroundColor: 'orange',
        padding: 15,
        marginTop: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    addBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    removeIcon: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 50,
    },
});
