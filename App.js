import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';

import Deputados from './components/Deputados/deputados'
import DeputadoSelecionado from './components/deputado/deputado'
import gastosDeputados from './components/deputado/despesas/depesas'
import DiscursosLimitado from './components/deputado/discursos/discursosLimitado'
import DiscursosDataPergunta from './components/deputado/discursos/discursosFiltros'
import DespesasDataPergunta from './components/deputado/despesas/despesasFiltro'

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "deputados">
        <Stack.Group screenOptions={{ headerStyle: styles.screen }} >
          <Stack.Screen name="deputados" component = {Deputados}   options={{headerShown:false}} />
          <Stack.Screen name="deputado" component = {DeputadoSelecionado}/>
          <Stack.Screen name="gastos" component = {gastosDeputados} options={{headerShown:false}}/>
          <Stack.Screen name="gastos filtros data" component = {DespesasDataPergunta} options={{headerShown:false}}/>
          <Stack.Screen name="discursos filtros data" component = {DiscursosDataPergunta} options={{headerShown:false}} />
          <Stack.Screen name="discursos por data" component = {DiscursosLimitado} options={{ title: 'Discursos Encontrados' }}  />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen:{
    backgroundColor: '#2E8BC0'
  }
})