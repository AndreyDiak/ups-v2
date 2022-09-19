import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'
import { useTailwind } from 'tailwind-rn/dist'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { ModalScreenNavigationProp, RootStackParamList } from '../typings'
import { useCustomerOrders } from '../hooks/useCustomerOrders'
import DeliveryCard from '../components/DeliveryCard'

type ModalScreenRouteProp = RouteProp<RootStackParamList, 'MyModal'>

const ModalScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<ModalScreenNavigationProp>();

  const {
    params: { name, userId }
  } = useRoute<ModalScreenRouteProp>();


  const { loading, error, orders} = useCustomerOrders(userId);

  return (
    <View style={tw('pb-32')}>
      <TouchableOpacity style={tw('absolute right-5 top-10 z-10')} onPress={navigation.goBack}>
        <Icon 
          name='close'
          type='Ionicons'
          size={24}
        />
      </TouchableOpacity>

      <View style={tw('mt-6')}>
        <View style={tw('py-5 border-b border-[#59C1CC]')}>
          <Text style={tw('text-center text-xl font-bold text-[#59C1CC]')}>{name}</Text>
          <Text style={tw('text-center italic text-sm')}>deliveries</Text>
        </View>
      </View>

      <FlatList 
        data={orders}
        keyExtractor={(order) => order.trackingId}
        renderItem={({ item }) => <DeliveryCard key={item.trackingId} order={item} />}
      />

    </View>
  )
}

export default ModalScreen