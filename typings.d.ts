import { CompositeNavigationProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

type RootStackParamList = {
  Main: undefined
  MyModal: { userId: string, name: string}
  Order: { order: Order }
}

type TabStackParamList = {
  Customers: undefined
  Orders: undefined
}

type Customer = {
  email: string
  name: string
}

type CustomerList = {
  name: ID
  value: Customer
}

type TrackingItems = {
  customer_id: ID
  customer: Customer
  items: Item[]
}

type Item = {
  item_id: ID
  name: string
  price: number
  quantity: number
}

type OrderResponse = {
  value: Order
}

type CustomerResponse = {
  name: ID
  value: Customer
}

type Order = {
  carrier: string
  createdAt: string
  shippingCost: number
  trackingId: string
  Address: string
  City: string
  Lat: number
  Lng: number
  trackingItems: TrackingItems
}


type CustomersScreenNavigatorProp = 
  CompositeNavigationProp<
    BottomTabNavigationProp<
      TabStackParamList, 'Customers'>,
      NativeStackNavigationProp<RootStackParamList>
    >;

type OrdersScreenNavigatorProp = 
  CompositeNavigationProp<
    BottomTabNavigationProp<
      TabStackParamList, 'Orders'>,
      NativeStackNavigationProp<RootStackParamList>
    >;


type ModalScreenNavigationProp = 
  CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList>,
    NativeStackNavigationProp<RootStackParamList, 'MyModal'>
    >