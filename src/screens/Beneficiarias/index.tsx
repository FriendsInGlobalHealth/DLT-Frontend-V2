import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableHighlight, ScrollView , Platform} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { HStack,Text, Avatar, Pressable, Icon, Box, Select,Heading, VStack, FormControl, Input, Link, Button, CheckIcon, WarningOutlineIcon, Center, Flex, Badge } from 'native-base';
import { navigate } from '../../routes/NavigationRef';
import withObservables from '@nozbe/with-observables';
import { MaterialIcons, Ionicons } from "@native-base/icons";
import { Q } from "@nozbe/watermelondb";
import { database } from '../../database';
import { Context } from '../../routes/DrawerNavigator';

import styles from './styles';


const BeneficiariesMain: React.FC = ({ beneficiaries, localities,subServices, beneficiaries_interventions, services }:any) => {
    const [searchField, setSearchField] = useState('');
    const loggedUser:any = useContext(Context);

    const viewBeneficiaries = (data: any) => {

        const beneficiarie = data.item?._raw;

        const beneficiariesInterventionsName = beneficiaries_interventions.filter((e)=>{ 
                return e._raw.beneficiary_id == beneficiarie.online_id}
            );

        const InterventionNames = beneficiariesInterventionsName.map((e)=>{
            let subservice = subServices.filter((item)=>{ 
                return item._raw.online_id == e._raw.sub_service_id
            })[0];
            return { id: subservice._raw.online_id, name: subservice._raw.name}
        });

        navigate({name: "BeneficiariesView", params: {
            beneficiarie: data.item._raw,
            subServices: InterventionNames
        }});

    };

    const randomHexColor = () => {
        return '#000000'.replace(/0/g, () => {
          return (~~(Math.random() * 16)).toString(16);
        });
    };

    const viewRow = (rowMap: any, rowKey: any) => {
        console.log(typeof(rowMap[0]), "on View Row");
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const onRowDidOpen = (rowKey: any) => {
        console.log('This row opened', rowKey);
    };

    const renderItem = (data: any) => (
        <TouchableHighlight
            onPress={() => viewBeneficiaries(data)}
            style={styles.rowFront}
            underlayColor={'#AAA'}
        >
            <HStack width="100%" px={4}
                    flex={1} space={5} alignItems="center">
                {/* <Avatar color="white" bg={'warning.600'} > */}          
                <Avatar color="white" bg={randomHexColor()} >
                    {data.item.name.charAt(0).toUpperCase()+data.item.surname.charAt(0).toUpperCase()}
                    {/* {"A"} */}
                </Avatar>
                <View>
                    <Text color="darkBlue.800">{data.item.nui} </Text>
                    <Text color="darkBlue.800">{data.item.name} {data.item.surname}</Text>
                    <Badge colorScheme="info">{`Quelimane`}</Badge>
                </View>
                <View >
                    <Text color="darkBlue.800"></Text>
                    <Text color="darkBlue.800">{'14 Anos'} </Text>
                    <Badge  bg="cyan.500">{'FGH'}</Badge>
                </View>
            </HStack>

        </TouchableHighlight>
    );
    

    const renderHiddenItem = (data: any, rowMap: any) => (
        
        <HStack flex={1} pl={2}>
            <Pressable px={4} ml="auto" bg="lightBlue.700" justifyContent="center" 
                            onPress={()=> viewBeneficiaries(data)} 
                            _pressed={{opacity: 0.5}}
            >
                <Icon as={MaterialIcons} name="remove-red-eye" size={6} color="gray.200" />
            </Pressable> 
            <Pressable px={4} bg="lightBlue.800" justifyContent="center" 
                        onPress={() => navigate({name: "UserForm", params: {user: data.item._raw}})} 
                        _pressed={{opacity: 0.5}} 
            >
                <Icon as={MaterialIcons} name="mode-edit" size={6} color="gray.200" />
            </Pressable>
        </HStack>

    );

    const handleChange = (e: any) => {

        setSearchField(e);
    };

    const filteredBeneficiaries = beneficiaries.filter(beneficiarie =>
        (beneficiarie.name + ' '+ beneficiarie.surname).toLowerCase().includes(searchField.toLowerCase())
    )

    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <Box alignItems="center" w="80%" bgColor="white" style={{borderRadius: 5,}}>
                    <Input w={{base: "100%",md: "25%"}} onChangeText={handleChange}
                            InputLeftElement={<Icon  as={MaterialIcons} name="search"  size={5} ml="2" color="muted.700"  />} placeholder="Search" 
                            style={{borderRadius: 45,}}/>
                </Box>

            </View>
            <SwipeListView
                data={filteredBeneficiaries}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
            />
        </View>
    );
}

const enhance = withObservables([], () => ({
    beneficiaries: database.collections
        .get("beneficiaries")
        .query().observe(),
    localities: database.collections
      .get("localities")
      .query().observe(),
    profiles: database.collections
      .get("profiles")
      .query().observe(),
    partners: database.collections
      .get("partners")
      .query().observe(),
    beneficiaries_interventions: database.collections
        .get("beneficiaries_interventions")
        .query().observe(),
    services: database.collections
          .get("services")
          .query().observe(),
    subServices: database.collections
        .get("sub_services")
        .query().observe(),
    us: database.collections
      .get("us")
      .query().observe()
}));
export default enhance(BeneficiariesMain);