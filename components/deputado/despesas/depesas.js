import {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, Button, Linking, Alert, ActivityIndicator} from 'react-native';
import Hyperlink from 'react-native-hyperlink';


export default function Despesas({route,navigation}){

    const [gastosDeputado,setGastosDeputado] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect( ()=>{

        const myFetch = async () =>{
        
            await fetch('https://dadosabertos.camara.leg.br/api/v2/deputados/'+route.params.idDepu+'/despesas')
            .then(res=>res.json())
            .then((res) =>{
                console.log('fetch3')
                if(res){
                    setGastosDeputado(res.dados);
                    setLoading(false);            
                }else{
                    console.log('dados n encontrado');
                }
                })
            }

        myFetch()

    },[])

    const handlerHyperlink = (linkDocument) =>{

        Alert.alert(
            'Confirmação',
            `Você deseja abrir o Seguinte link? ${linkDocument}`,
            [
                {
                    text:'Cancelar'
                },
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
            <Text style={styles.subtitulo}>Suas Despesas</Text>
        </View>

        {loading?<View style={styles.loading}><ActivityIndicator size="large" /></View>:
        <FlatList data={gastosDeputado} 
        renderItem = {
            gasto =>{
                return <View style={styles.gastosView} key = {gasto.item.codLote+gasto.item.codDocumento} >
                    <Text> <Text>Tipo da Despesa: </Text> {gasto.item.tipoDespesa}</Text>
                    <Text> <Text>Nome do Fornecedor: </Text> {gasto.item.nomeFornecedor}</Text>
                    <Text> <Text>CNPJ do Fornecedor: </Text> {gasto.item.cnpjCpfFornecedor}</Text>
                    <Text> <Text>Valor Líquido: </Text> R$ {gasto.item.valorLiquido}</Text>
                    <Text> <Text>Cod. Documento: </Text> {gasto.item.codDocumento}</Text>
                    <Text> <Text>Cod. Lote: </Text> {gasto.item.codLote}</Text>
                    <Text> <Text>Data Documento: </Text> {gasto.item.dataDocumento}</Text>
                    <Text> <Text>Parcela: </Text> {gasto.item.parcela}</Text>
                    <Text> <Hyperlink onPress={(e) =>handlerHyperlink(gasto.item.urlDocumento)}>
                        <Text>{gasto.item.urlDocumento?gasto.item.urlDocumento:'Nota não encontrada'}</Text>
                        </Hyperlink>
                    </Text>
                </View>
            }
        }/>
        }
    </View>
    )
}

const styles = StyleSheet.create({
    gastosView:{
        marginVertical:10,
        marginHorizontal:4,
        paddingVertical:20,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#145DA0'
    },
    viewDespesas:{
      backgroundColor: '#2E8BC0',
    },
    viewInicial:{
        alignItems:'center',
        margin:15
    },
    deputadoNome:{
        fontSize:20
    },
    subtitulo:{
        fontSize:20,
        padding:10
    },
    loading:{
        height:'100%'
    }
})
