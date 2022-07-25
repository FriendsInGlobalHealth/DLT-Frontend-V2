import React, { useState, useEffect, useContext } from "react";
import { View, TouchableHighlight, TouchableOpacity } from 'react-native';
import { useToast, Alert, HStack, Text, Icon, VStack, Pressable, useDisclose, Center, Box, Stagger, IconButton } from "native-base";
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from "@native-base/icons";
import { navigate } from '../../../routes/NavigationRef';
import styles from './styles';
import { SwipeListView } from 'react-native-swipe-list-view';
import StepperButton from './StapperButton';
import SyncIndicator from "../../../components/SyncIndicator";
import { Context } from '../../../routes/DrawerNavigator';
import { sync } from '../../../database/sync';


const InterventionsView: React.FC = ({ route }: any) => {

    const {
        beneficiary,
        interventions
    } = route.params;
    const { isOpen, onToggle } = useDisclose();
    const loggedUser:any = useContext(Context);
    const toast = useToast();

    const syncronize = () => {
        sync({username: loggedUser.username})
                .then(() => toast.show({
                                placement: "top",
                                render:() => {
                                    return (
                                        <Alert w="100%" variant="left-accent" colorScheme="success" status="success">
                                            <VStack space={2} flexShrink={1} w="100%">
                                                <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                                                    <HStack space={2} flexShrink={1} alignItems="center">
                                                        <Alert.Icon />
                                                        <Text color="coolGray.800">
                                                            Synced Successfully!
                                                        </Text>
                                                    </HStack>
                                                </HStack>
                                            </VStack>
                                        </Alert> 
                                    );
                                }
                            }))
                .catch(() => toast.show({
                                placement: "top",
                                render:() => {
                                    return (
                                        <Alert w="100%" variant="left-accent" colorScheme="error" status="error">
                                            <VStack space={2} flexShrink={1} w="100%">
                                                <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                                                    <HStack space={2} flexShrink={1} alignItems="center">
                                                        <Alert.Icon />
                                                        <Text color="coolGray.800">
                                                            Sync Failed!
                                                        </Text>
                                                    </HStack>
                                                </HStack>
                                            </VStack>
                                        </Alert> 
                                    );
                                }
                            }))
    }

    const renderItem = (data: any) => (
        <TouchableHighlight
            style={styles.rowFront}
            underlayColor={'#AAA'}
        >
            <HStack width="100%" px={4} flex={1} space={5} alignItems="center">
                <Ionicons name="medkit" size={50} color="#0d9488" />
                <VStack width='200px' >
                    <Text _dark={{
                        color: "warmGray.50"
                    }} color="darkBlue.800" >
                        {data.item.name}
                    </Text>
                    <Text color="darkBlue.300" _dark={{ color: "warmGray.200" }}>
                        {data.item.intervention.remarks}
                    </Text>
                </VStack>
                <Text color="coolGray.500" alignSelf="flex-start" marginTop={2}>{data.item.intervention.date}</Text>
            </HStack>

        </TouchableHighlight>
    );

    const renderHiddenItem = (data: any, rowMap: any) => (

        <HStack flex={1} pl={2}>
            <Pressable px={4} ml="auto" bg="lightBlue.700" justifyContent="center"
                onPress={() => navigate({ name: "BeneficiarieServiceForm", params: { beneficiarie: beneficiary, intervention: data.item.intervention } })}
                _pressed={{ opacity: 0.5 }}
            >
                <Icon as={MaterialIcons} name="mode-edit" size={6} color="gray.200" />
            </Pressable>
        </HStack>

    );

    return (
        <>
            {interventions.length > 0 ?
                <View style={styles.containerForm}>
                    <SwipeListView
                        data={interventions}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        rightOpenValue={-80}
                        previewRowKey={'0'}
                        previewOpenValue={-40}
                        previewOpenDelay={3000}
                    />

                </View> :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text color="coolGray.500" >Não existem Intervenções Registadas!</Text>
                </View>
            }
            <Center flex={1} px="3" >
                <StepperButton onAdd={() => navigate({ name: "BeneficiarieServiceForm", params: { beneficiarie: beneficiary } })}
                                onRefresh={syncronize} />
            </Center>

        </>

    );
}

export default InterventionsView;