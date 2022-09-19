import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { OrdersScreenNavigatorProp, RootStackParamList } from '../typings'
import { useTailwind } from 'tailwind-rn/dist'
import { useOrders } from '../hooks/useOrders'
import { GET_ORDERS } from '../graphql/queries'
import { Button, Image } from '@rneui/themed'
import OrderCard from '../components/OrderCard'

type OrdersScreenRouteProp = RouteProp<RootStackParamList, 'Order'>

const OrdersScreen = () => {

  const tw = useTailwind();
  const navigation = useNavigation<OrdersScreenNavigatorProp>();
  const { loading, error, orders } = useOrders();
  const [ascending, setAscending] = useState<boolean>(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarLabel: (({ focused, color }) => (
        <Text style={{ color: focused ? "#EB6A7C" : color, fontSize: 10 }}>
          Orders
        </Text>
      ))
    })
  }, [])

  return (
    <ScrollView style={{ backgroundColor: "#EB6A7C" }}>
      <Image
        source={{ uri: 'https://links.papareact.com/m51' }}
        containerStyle={tw('w-full h-64')}
        PlaceholderContent={<ActivityIndicator />}
      />

      <View style={tw('pb-5')}>
        <View style={tw('px-5 py-2')}>
          <Button
            color='pink'
            titleStyle={{ color: 'gray', fontWeight: '400' }}
            onPress={() => setAscending(!ascending)}
            style={tw('mx-5 my-2')}
          >
            {ascending ? "Showing: Oldest First" : "Showing: Most Recent First"}
          </Button>
        </View>

        {/* Render Order list */}
        {orders?.sort((prev, next) => {
          if (ascending) {
            return new Date(prev.createdAt) > new Date(next.createdAt) ? 1 : -1;
          } else {
            return new Date(prev.createdAt) < new Date(next.createdAt) ? 1 : -1;
          }
        }).map((order) => (
          <OrderCard key={order.trackingId} item={order} />
        ))}
      </View>
    </ScrollView>
  )
}

export default OrdersScreen