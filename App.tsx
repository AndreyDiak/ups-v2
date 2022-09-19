import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { TailwindProvider } from 'tailwind-rn';
import RootNavigator from './navigator/RootNavigator';
import utilities from './tailwind.json';

const client = new ApolloClient({
  uri: 'https://ciudadbolivar.stepzen.net/api/coy-marmot/__graphql',
  headers: {
    Authorization: `Apikey ciudadbolivar::stepzen.net+1000::2e6b4e955d33af10a9893f33167265b5eb857b1d1f80631c4b1678e2ce903faf`
  },
  cache: new InMemoryCache(),
});

export default function App() {

  return (
    //@ts-ignore TaiwindProvider Type Defenition...
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>
  );
}

