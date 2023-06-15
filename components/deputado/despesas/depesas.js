import {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, Button, Linking, Alert, ActivityIndicator, TouchableOpacity} from 'react-native';
import Hyperlink from 'react-native-hyperlink';


export default function Despesas({route,navigation}){

    const [gastosDeputado,setGastosDeputado] = useState([]);
    const [loading,setLoading] = useState(true);
    const [totalGasto,setTotalGasto] =  useState(0);

    useEffect( ()=>{

        const myFetch = async () =>{

            await fetch('https://dadosabertos.camara.leg.br/api/v2/deputados/'+route.params.idDepu+'/despesas?mes='+route.params.mes+'&ano='+route.params.ano)
            .then(res=>res.json())
            .then((res) =>{
                console.log('fetch3')
                if(res){
                    setGastosDeputado(res.dados);
                    setLoading(false);
                    setTotalGasto(res.dados.reduce((acumulador,gasto)=> acumulador+gasto.valorLiquido,0 ).toFixed(2));
                }else{
                    console.log('dados n encontrado');
                }
                })
            }
        myFetch()
    },[])

    const converterData = (data) => {
        return data?`${data[8] + data[9]}/${data[5] + data[6]}/${data[0] + data[1] + data[2] + data[3]}`:null;
    }

    const handlerHyperlink = (linkDocument) =>{

        Alert.alert(
            'Confirmação',
            `Você deseja abrir o seguinte link? ${linkDocument}`,
            [
                {text:'Cancelar'},
                {
                    text:'Continuar',
                    onPress:() => Linking.openURL(linkDocument)
                }
            ]
        )
    }

    return (
    <View style={styles.viewDespesas}>
        <View style={styles.viewInicial} >
            <Text style={styles.deputadoNome}>{route.params.nome}</Text>
        </View>
        <Text style={styles.totalGasto} >Total gasto dos valores registrados: {totalGasto?"R$ "+totalGasto:null}</Text>
        <View  style={styles.despesasData}>
            <Text>{`${route.params.mes}/${route.params.ano}`}</Text>
        </View>
        {loading?<View style={styles.loading}><ActivityIndicator busy="true" sytle={styles.ActivityIndicatorComponente} size="large" /></View>:
        <FlatList data={gastosDeputado}
        renderItem = {
            gasto =>{
                return <View style={styles.gastosView} key = {gasto.item.codLote+gasto.item.codDocumento} >
                    <Text> <Text>Tipo da Despesa: </Text> {gasto.item.tipoDespesa}</Text>
                    <Text> <Text>Nome do Fornecedor: </Text> {gasto.item.nomeFornecedor}</Text>
                    <View style={styles.informacaoMeio}>
                        <Text> <Text>CNPJ do Fornecedor: </Text> {gasto.item.cnpjCpfFornecedor}</Text>
                        <Text> <Text>Valor Líquido: </Text> R$ {gasto.item.valorLiquido}</Text>
                        <Text> <Text>Cod. Documento: </Text> {gasto.item.codDocumento}</Text>
                        <Text> <Text>Cod. Lote: </Text> {gasto.item.codLote}</Text>
                        <Text> <Text>Data Documento: </Text> {converterData(gasto.item.dataDocumento)}</Text>
                    </View>
                    <TouchableOpacity onPress={(e) =>handlerHyperlink(gasto.item.urlDocumento)}>
                        <Text style={styles.notaFiscalButao} >{gasto.item.urlDocumento?"Nota Fiscal link":'Nota não encontrada'}</Text>
                    </TouchableOpacity>
                    
                </View>
            }
        }/>
        }
    </View>
    )
}

const styles = StyleSheet.create({
    gastosView:{
        marginVertical:8,
        marginHorizontal:8,
        paddingVertical:20,
        paddingHorizontal:10,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#145DA0',
        textAlign:'center',
    },
    totalGasto:{
        marginBottom:10
    },
    ActivityIndicatorComponente:{
        padding:40
    },
    notaFiscalButao:{
        fontSize:15,
        borderBottomWidth:1,
        borderBottomColor:'white'
    },
    viewDespesas:{
      backgroundColor: '#2E8BC0',
        alignItems:'center',
        marginBottom:'45%',
        height:'100%',
    },
    despesasData:{
        marginBottom:8
    },
    informacaoMeio:{
        marginVertical:15,
        alignItems:'center'
    },
    viewInicial:{
        alignItems:'center',
        marginBottom:10
    },
    deputadoNome:{
        fontSize:18,
        marginTop:"10%"
    },
    subtitulo:{
        fontSize:20,
        padding:5
    },
    loading:{
        height:'100%',
        justifyContent:'center',
        flexDirection:'column',
    }
})
