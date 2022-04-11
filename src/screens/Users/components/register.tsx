import React, { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView, ScrollView,
    TextInput, TouchableOpacity, Platform,
    } 
    from 'react-native';
import { Center, Box, Select, Text, Heading, VStack, FormControl, 
        Input, Link, Button, CheckIcon, WarningOutlineIcon, HStack, 
        Alert, Flex, Icon}
    from 'native-base';  
import {Picker} from '@react-native-picker/picker';
import { Formik } from 'formik';
import { Q } from "@nozbe/watermelondb";
import { navigate } from '../../../routes/NavigationRef';
import withObservables from '@nozbe/with-observables';
import { database } from '../../../database';
import { MaterialIcons } from "@native-base/icons";
import { UsersModel } from '../../../models/User';

import styles from './styles';

const UsersRegistrationForm: React.FC = ({ localities, profiles, us, partners }:any) => {
    const message = "Este campo é Obrigatório"

    const initialValues = {
        surname: '',
        username: '',
        password: '', 
        name:'', 
        email:'', 
        phone_number:'', 
        entryPoint:'', 
        profile_id:'',
        partner_id: '',
        locality_id: '',
        us_id: ''
    }

    const validate = (values: any) => {
        const errors: UsersModel = {}; 

        if (!values.surname) {
            errors.surname = message;
        }

        if (!values.name) {
            errors.name = message;
        }

        if (!values.username) {
            errors.username = message;
        }

        if (!values.password) {
            errors.password = message;
        }

        if (!values.entryPoint) {
            errors.entryPoint = message;
        }

        if (!values.profile_id) {
            errors.profile_id = message;
        }

        if (!values.locality_id) {
            errors.locality_id = message;
        }

        if (!values.partner_id) {
            errors.partner_id = message;
        }

        if (!values.us_id) {
            errors.us_id = message;
        }
        
        return errors;
    }

    const onSubmit = async (values: any) => {
        console.log(values);
    }



    return (
        <KeyboardAvoidingView>
            <ScrollView>
                <View style={styles.webStyle}>
                    <Center w="100%" bgColor="white">
                        <Box safeArea p="2" w="90%" py="8">
                            <Heading size="lg" color="coolGray.800" 
                                    _dark={{ color: "warmGray.50"}} 
                                    fontWeight="semibold"
                                    marginBottom={5}
                                    marginTop={0} >
                                Registo do Utilizador
                            </Heading>
                            <Alert  status="info" colorScheme="info">
                                <HStack flexShrink={1} space={2} alignItems="center">
                                    <Alert.Icon />
                                    <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
                                        Preencha os campos abaixo para registar novo utilizador!
                                    </Text>
                                </HStack>
                            </Alert>
                            
                            <Formik initialValues={initialValues} 
                                    onSubmit={onSubmit} validate={validate}>
                                {({
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    setFieldValue,
                                    values,
                                    errors
                                }) => <VStack space={3} mt="5">
                                        <FormControl isRequired isInvalid={'surname' in errors}>
                                            <FormControl.Label>Apelido</FormControl.Label>
                    
                                            <Input onBlur={handleBlur('surname')} placeholder="Insira o seu Apelido" onChangeText={handleChange('surname')} value={values.surname} />
                                            <FormControl.ErrorMessage>
                                                {errors.surname}
                                            </FormControl.ErrorMessage>
                                        </FormControl>
                                        <FormControl isRequired isInvalid={'name' in errors}>
                                            <FormControl.Label>Nome</FormControl.Label>
                    
                                            <Input onBlur={handleBlur('name')} placeholder="Insira o seu Nome" onChangeText={handleChange('name')} value={values.name} />
                                            <FormControl.ErrorMessage>
                                                {errors.name}
                                            </FormControl.ErrorMessage>
                                        </FormControl>
                                        <FormControl>
                                            <FormControl.Label>Email</FormControl.Label>
                                            <Input onBlur={handleBlur('email')} placeholder="Insira o seu Email" onChangeText={handleChange('email')} value={values.email} />
                                        </FormControl>
                                        <FormControl isRequired isInvalid={'username' in errors}>
                                            <FormControl.Label>Username</FormControl.Label>
                    
                                            <Input onBlur={handleBlur('username')} placeholder="Insira o Username" onChangeText={handleChange('username')} value={values.username} />
                                            <FormControl.ErrorMessage>
                                                {errors.username}
                                            </FormControl.ErrorMessage>
                                        </FormControl>

                                        <FormControl isRequired isInvalid={'password' in errors}>
                                            <FormControl.Label>Password</FormControl.Label>
                                            <Input onBlur={handleBlur('password')} placeholder="Insira o Password" onChangeText={handleChange('password')} value={values.password} />
                                            <FormControl.ErrorMessage>
                                                {errors.password}
                                            </FormControl.ErrorMessage>
                                        </FormControl>
                                        <FormControl>
                                            <FormControl.Label>Telemóvel</FormControl.Label>
                                            <Input onBlur={handleBlur('phone_number')} placeholder="Insira o seu Telemóvel" onChangeText={handleChange('phone_number')} value={values.phone_number} />
                                        </FormControl>
                                        <FormControl isRequired isInvalid={'entryPoint' in errors}>
                                            <FormControl.Label>Ponto de Entrada</FormControl.Label>
                                            <Picker 
                                                style={styles.dropDownPicker}
                                                selectedValue={values.entryPoint}
                                                onValueChange={(itemValue, itemIndex) => { 
                                                        if (itemIndex !== 0){
                                                            setFieldValue('entryPoint', itemValue);
                                                        }
                                                    }
                                                }>
                                                <Picker.Item label="-- Seleccione o Ponto de Entrada --" value="0" />
                                                <Picker.Item label="Unidade Sanitaria" value="1" />
                                                <Picker.Item label="Escola" value="2" />
                                                <Picker.Item label="Comunidade" value="3" />
                                            </Picker>
                                            <FormControl.ErrorMessage>
                                                {errors.entryPoint}
                                            </FormControl.ErrorMessage>
                                        </FormControl>
                                        <FormControl isRequired isInvalid={'profile_id' in errors}>
                                            <FormControl.Label>Perfil</FormControl.Label>
                                            <Picker 
                                                style={styles.dropDownPicker}
                                                selectedValue={values.profile_id}
                                                onValueChange={(itemValue, itemIndex) => { 
                                                        if (itemIndex !== 0){
                                                            setFieldValue('profile_id', itemValue);
                                                        }
                                                    }
                                                }>
                                                <Picker.Item label="-- Seleccione o Perfil --" value="0" />
                                                { 
                                                    profiles.map(item => (
                                                        <Picker.Item key={item.online_id} label={item.name} value={parseInt(item.online_id)} />
                                                    ))
                                                }  
                                            </Picker>
                                            <FormControl.ErrorMessage>
                                                {errors.profile_id}
                                            </FormControl.ErrorMessage>
                                        </FormControl>
                                        <FormControl isRequired isInvalid={'partner_id' in errors}>
                                            <FormControl.Label>Parceiro</FormControl.Label>
                                            <Picker 
                                                style={styles.dropDownPicker}
                                                selectedValue={values.partner_id}
                                                onValueChange={(itemValue, itemIndex) => { 
                                                        if (itemIndex !== 0){
                                                            setFieldValue('partner_id', itemValue);
                                                        }
                                                    }
                                                }>
                                                <Picker.Item label="-- Seleccione o Parceiro --" value="0" />
                                                { 
                                                    partners.map(item => (
                                                        <Picker.Item key={item.online_id} label={item.name} value={parseInt(item.online_id)} />
                                                    ))
                                                }  
                                            </Picker>
                                            <FormControl.ErrorMessage>
                                                {errors.partner_id}
                                            </FormControl.ErrorMessage>
                                        </FormControl>
                                        <FormControl isRequired isInvalid={'locality_id' in errors}>
                                            <FormControl.Label>Localidade</FormControl.Label>
                                            <Picker 
                                                style={styles.dropDownPicker}
                                                selectedValue={values.locality_id}
                                                onValueChange={(itemValue, itemIndex) => { 
                                                        if (itemIndex !== 0){
                                                            setFieldValue('locality_id', itemValue);
                                                        }
                                                    }
                                                }>
                                                <Picker.Item label="-- Seleccione a localidade --" value="0" />
                                                { 
                                                    localities.map(item => (
                                                        <Picker.Item key={item.online_id} label={item.name} value={parseInt(item.online_id)} />
                                                    ))
                                                }  
                                            </Picker>
                                            <FormControl.ErrorMessage>
                                                {errors.locality_id}
                                            </FormControl.ErrorMessage>
                                        </FormControl>
                                        <FormControl isRequired isInvalid={'us_id' in errors}>
                                            <FormControl.Label>US</FormControl.Label>
                                            <Picker 
                                                style={styles.dropDownPicker}
                                                selectedValue={values.us_id}
                                                onValueChange={(itemValue, itemIndex) => { 
                                                        if (itemIndex !== 0){
                                                            setFieldValue('us_id', itemValue);
                                                        }
                                                    }
                                                }>
                                                <Picker.Item label="-- Seleccione a US --" value="0" />
                                                { 
                                                    us.map(item => (
                                                        <Picker.Item key={item.online_id} label={item.name} value={parseInt(item.online_id)} />
                                                    ))
                                                }  
                                            </Picker>
                                            <FormControl.ErrorMessage>
                                                {errors.us_id}
                                            </FormControl.ErrorMessage>
                                        </FormControl>

                                        <Button onPress={handleSubmit} my="10" colorScheme="primary">
                                            Gravar
                                        </Button>
                                    </VStack>

                                }   
                            </Formik>
                        </Box>
                    </Center>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
const enhance = withObservables([], () => ({
    localities: database.collections
                        .get("localities")
                        .query().observe(),
    profiles: database.collections
                        .get("profiles")
                        .query().observe(),
    partners: database.collections
                        .get("partners")
                        .query().observe(),
    us: database.collections
                        .get("us")
                        .query().observe(),


}));
export default enhance(UsersRegistrationForm);
