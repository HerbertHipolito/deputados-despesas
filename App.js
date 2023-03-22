import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';

import Deputados from './components/Deputados/deputados'
import Home from './components/home/home'
import DeputadoSelecionado from './components/deputado/deputado'
import gastosDeputados from './components/deputado/despesas/depesas'
import discursosDeputados from './components/deputado/discursos/discursos'
import DiscursosLimitado from './components/deputado/discursos/discursosLimitado'

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "deputados">
        <Stack.Group screenOptions={{ headerStyle: styles.screen }} >
          <Stack.Screen name="Home" component = {Home}/>
          <Stack.Screen name="deputados" component = {Deputados}   options={{headerShown:false}} />
          <Stack.Screen name="deputado" component = {DeputadoSelecionado}/>
          <Stack.Screen name="gastos" component = {gastosDeputados}/>
          <Stack.Screen name="discursos" component = {discursosDeputados} options={{ title: 'Discursos' }} />
          <Stack.Screen name="discursos por data" component = {DiscursosLimitado} options={{ title: 'Discursos Encontrados' }}  />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*
possiveis funcionalidades:

Deputados
proposições
?frentes?
partidos
Orgãos
Blocos
*/


const styles = StyleSheet.create({
  screen:{
    backgroundColor: '#2E8BC0'
  }
})