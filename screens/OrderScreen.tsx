import { View, Text } from 'react-native'
import React, {useLayoutEffect} from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { OrdersScreenNavigatorProp, RootStackParamList } from '../typings';
import DeliveryCard from '../components/DeliveryCard';

type OrderScreenRouteProp = RouteProp<RootStackParamList, 'Order'>

const OrderScreen = () => {
  const tw=useTailwind();
  const navigation = useNavigation<OrdersScreenNavigatorProp>();
  const { params: { order }} = useRoute<OrderScreenRouteProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: order.trackingItems.customer.name,
      headerTintColor: '#eb6a7c',
      headerTitleStyle: { color: 'black', fontWeight: '700'},
      headerBackTitle: 'Deliveries',
    })
  }, [order])

  return (
    <View>
      <DeliveryCard order={order} fullWidth={true} />
    </View>
  )
}

export default OrderScreen