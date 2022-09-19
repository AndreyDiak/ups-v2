import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useQuery } from '@apollo/client'
import { useCustomerOrders } from '../hooks/useCustomerOrders'
import { useTailwind } from 'tailwind-rn/dist'
import { useNavigation } from '@react-navigation/native'
import { CustomersScreenNavigatorProp } from '../typings'
import { Card, Icon } from '@rneui/themed'

type Props = {
  userId: string
  name: string
  email: string
}

const CustomerCard = ( { email, name, userId} : Props) => {

  const { loading, error, orders } = useCustomerOrders(userId);
  const tw = useTailwind();
  const navigation = useNavigation<CustomersScreenNavigatorProp>()
  
  return (
    <TouchableOpacity onPress={() => navigation.navigate('MyModal', {
      name: name,
      userId: userId
    })}>
      <Card containerStyle={tw('p-5')}>
        <View>
          <View style={tw('flex-row justify-between')}>
            <View>
              <Text style={tw('text-2xl font-bold')}>{name}</Text>
              <Text style={tw('text-sm text-[#59C1CC]')}>
                ID: {userId}
              </Text>
            </View>
            <View style={tw('flex-row items-center justify-end')}>
              <Text style={tw('text-[#59C1CC]')}>{loading ? "loading..." : `${orders.length} x`}</Text>
              <Icon
                style={tw('mb-5 ml-auto')}
                name="box"
                type='entypo'
                color="#59C1CC"
                size={50}
              />
            </View>
          </View>
        </View>
        <Card.Divider />
        <Text>{email}</Text>
      </Card>
    </TouchableOpacity>
  )
}

export default CustomerCard