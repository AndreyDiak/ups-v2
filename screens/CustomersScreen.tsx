import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, {useState, useLayoutEffect} from 'react'
import { useTailwind } from 'tailwind-rn'
import { CustomersScreenNavigatorProp, CustomerResponse, CustomerList } from '../typings';
import { useNavigation } from '@react-navigation/native';
import {Image, Input} from '@rneui/themed'
import { useQuery } from '@apollo/client';
import { GET_CUSTOMERS } from '../graphql/queries';
import CustomerCard from '../components/CustomerCard';


const CustomersScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<CustomersScreenNavigatorProp>();
  const [input, setInput] = useState<string>("")

  const { loading, error, data} = useQuery(GET_CUSTOMERS);
  
  // if(loading) return <Text>Loading...</Text>
  // if(error) return <Text>{JSON.stringify(error)}</Text>
  // if(data) return <Text>{JSON.stringify(data)}</Text>
  // console.log(error);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  return (
    <ScrollView style={{ backgroundColor: "#59c1cc"}}>
      <Image
        source={{ uri: "https://links.papareact.com/3jc"}}
        containerStyle={tw("w-full h-64")} 
        PlaceholderContent={<ActivityIndicator />}
      />
      <Input 
        placeholder='Search by Customer...'
        value={input}
        onChangeText={setInput}
        containerStyle={tw('bg-white pt-5 pb-0 px-10')}
      />
      {/* Render Customers list */}
      {data?.getCustomers
        ?.filter((customer: CustomerList) => 
          customer.value.name.includes(input)
        )
        .map(( { name: ID, value: { email, name} } : CustomerResponse ) => (
          <CustomerCard key={ID} email={email} name={name} userId={ID} />
        ))}

    </ScrollView>
  )
}

export default CustomersScreen