import {StyleSheet, Text, View,FlatList,Image,Button,TextInput, ActivityIndicator } from 'react-native'; 
import {useState,useEffect} from 'react';

export default function Deputados({navigation}){

    const [deputados,setDeputados] = useState([]);
    const [deputadosFiltradosState,setDeputadosFiltradosState] = useState([]);
    const [qtdDeputadosFiltradosState,setQtdDeputadosFiltradosState] = useState(0);

    useEffect(() =>{

      fetch('https://dadosabertos.camara.leg.br/api/v2/deputados')
      .then(res=>res.json())
      .then(res =>{
        console.log('fetch1')
        setDeputados(res.dados)
      })

    },[])

    const filtroNome = (letras)=>{

      const deputadosFilt = deputados.filter( deputado => deputado.nome.includes(letras));
      setDeputadosFiltradosState(deputadosFilt);
      setQtdDeputadosFiltradosState(deputadosFilt.length);
      
      }

    return (
        <View style={styles.container}>

        {deputados.length!==0?<View style = {styles.inputDeputados}>
          <Text style={styles.deputadosTitulo}>Nossos deputados</Text>
          <TextInput style={styles.textInput}
          placeholder='Pesquisar deputado' 
          onChangeText={filtroNome}/> 
        </View>:null}


        {qtdDeputadosFiltradosState!==0?<View style={styles.deputadosEncontrados} >
          <Text>{qtdDeputadosFiltradosState} deputados encontrados</Text>
        </View>:null}

        {(qtdDeputadosFiltradosState===0&&deputados.length===0)?
        <View>
          <ActivityIndicator size="large" /><Text>Carregando dados dos deputados</Text>
        </View>:
        <FlatList data={qtdDeputadosFiltradosState===0?deputados:deputadosFiltradosState} 
            renderItem = {
            deputado =>  {
            return <View key = {deputado.item.id} style={styles.deputados}> 
                <Text style={styles.deputadoNome}> {deputado.item.nome} </Text>
                <Image style={styles.deputadoImage} source={{uri:deputado.item.urlFoto}}/>
                <View style={styles.siglaPartido}>
                <Text> Partido: {deputado.item.siglaPartido} </Text>
                <Text> Estado: {deputado.item.siglaUf} </Text>
                </View>
                <Text> {deputado.item.email} </Text>
                <View style={styles.butaoVerMais}>
                <Button title="Ver mais informções" style={styles.deputadoButao} 
                onPress={(e) => navigation.navigate('deputado',{id:deputado.item.id,foto:deputado.item.urlFoto,email:deputado.item.email})}/>
                </View>
            </View>
            }}
            />}
        </View>
    )
}

    
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2E8BC0',
      alignItems: 'center',
      justifyContent: 'center',
      width:'100%',
      margin:0,
      paddingHorizontal:10
    },
    inputDeputados:{
      width:'100%',
      alignItems: 'center',
    },
    textInput:{
      marginBottom:10,
      borderWidth:1,
      padding:5,
      borderColor:'#145DA0',
      borderRadius:5,
      width:'90%',
      textAlign: 'center',
    },
    deputadosTitulo:{
      fontSize:35,
      paddingBottom:10,
      marginTop:30
    },
    deputadosEncontrados:{
      marginVertical:10,
      fontSize:20
    },
    deputados:{
      width:'100%',
      marginVertical:10,
      paddingVertical:10,
      alignItems:'center',
      borderColor:'white',
      backgroundColor:'#145DA0',
      elevation: 10,
      shadowColor: '#52006A',
      borderRadius:10,
      minWidth:'90%'
    },
    butaoVerMais:{
      marginVertical:10,
    },
    siglaPartido: {
      flexDirection:'row',
      justifyContent:'space-between'
    },
    deputadoNome:{
      fontSize:35,
    },
    deputadoImage:{
      width:130,
      height:130,
      resizeMode: 'contain',
      marginVertical:15,
      borderRadius:20

    },
    deputadoButao:{
      marginVertical:30
    },
    elevation: {
      elevation: 20,
      shadowColor: '#52006A',
    },
  });
  