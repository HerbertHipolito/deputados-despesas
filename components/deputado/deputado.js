import {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, Image, Button, TextInput, ActivityIndicator } from 'react-native';
import Despesas from './despesas/depesas';

//https://reactnavigation.org/docs/params/
//https://dadosabertos.camara.leg.br/swagger/api.html

export default function DeputadoSelecionado({route,navigation}){

    const [deputadoDados,setDeputadoDados] = useState({});
    const [mostrarDespesas,setMostrarDespesas] = useState(false);
    const [loading,setLoading] = useState(true);


    useEffect(() => {
        fetch('https://dadosabertos.camara.leg.br/api/v2/deputados/'+route.params.id)
        .then(res => res.json())
        .then(res=>{
            console.log('fetch2')
            setDeputadoDados(res.dados);
            setLoading(false);
        })

    },[])

    const converterData = (data) => {
        return data?`${data[8] + data[9]}/${data[5] + data[6]}/${data[0] + data[1] + data[2] + data[3]}`:null;
    }

    return (
        loading?<View style={styles.loading}><ActivityIndicator size="large" /><Text>Carregando dados dos deputados</Text></View>:
        <View style={styles.deputadoView}>
            <Text style={styles.deputadoNome}>{deputadoDados.nomeCivil}</Text>
            <Text><Text style={styles.campo}>Nome eleitoral:</Text> {deputadoDados.ultimoStatus?.nomeEleitoral}</Text>
            <Image style={styles.deputadoImage} source={{uri:route.params.foto}}/>
            <Text> <Text style={styles.campo}> Nascimento:</Text> {converterData(deputadoDados.dataNascimento)}</Text>
            <Text> <Text style={styles.campo}> Escolaridade:</Text> {deputadoDados.escolaridade?deputadoDados.escolaridade:'Não fornecido'}</Text>
            <Text> <Text style={styles.campo}> Email:</Text> {route.params.email}</Text>

            <View style={styles.deputadoDadosView}>
                <Text style={styles.deputadoDadosLinha}> <Text style={styles.campo}> Situação:</Text> {deputadoDados.ultimoStatus?.situacao}</Text>
                <Text style={styles.deputadoDadosLinha}> <Text style={styles.campo}> Partido:</Text> {deputadoDados.ultimoStatus?.siglaPartido}</Text>
            </View>
            <View style={styles.deputadoDadosView}>
                <Text style={styles.deputadoDadosLinha}><Text style={styles.campo}>CPF:</Text> {deputadoDados.cpf}</Text>
                <Text style={styles.deputadoDadosLinha}><Text style={styles.campo}>Sexo:</Text> {deputadoDados.sexo}</Text>
            </View>
            <View style={styles.deputadoDadosView}>
                <Text style={styles.deputadoDadosLinha}> <Text style={styles.campo}> Uf:</Text> {deputadoDados.siglaUf?deputadoDados.siglaUf:'Não forn.'}</Text>
                <Text style={styles.deputadoDadosLinha}> <Text style={styles.campo}> Munic. de nasc. :</Text> {deputadoDados.municipioNascimento}</Text>
            </View>
            <View style={styles.butoes}>
                <View style={styles.butao}>
                    <Button  title="Ver despesas"  
                    onPress={e =>
                    navigation.navigate('gastos filtros data',{
                        idDepu:route.params.id,
                        nome:deputadoDados.nomeCivil}
                        )
                    }/>
                </View>
                <View style={styles.butao}>
                <Button  title="Ver discursos"  
                onPress={e =>
                navigation.navigate('discursos filtros data',{
                    idDepu:route.params.id,
                    nome:deputadoDados.nomeCivil}
                    )
                }/> 
                </View>
            </View>
        </View>
    )}


const styles = StyleSheet.create({
    deputadoImage:{
        width:230,
        height:230,
        resizeMode: 'contain',
        marginVertical:15,
        borderRadius:10
      },
    deputadoView:{
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#2E8BC0',
        paddingVertical:20,
        height:"100%"
    },
    deputadoDadosView:{
        flexDirection:'row',
    },
    deputadoDadosLinha:{
        marginHorizontal:5,
        fontSize:15
    },
    deputadoNome:{
        fontSize:18
    },
    campo:{
        fontSize:17
    },
    butoes:{
        marginVertical:30,
        flexDirection:'row',
        justifyContent:'space-between',        
    },
    butao:{
        marginHorizontal:15,
    },
    loading:{
        backgroundColor: '#2E8BC0',
        height:'100%',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})