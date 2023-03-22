import {useEffect,useState} from 'react';
import {StyleSheet, Text, View, FlatList, Button, Linking, Alert, ActivityIndicator, TextInput} from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import DateTimePicker  from '@react-native-community/datetimepicker';

export default function Discursos({route,navigation}){

    const [discursos,setDiscursos] = useState([]);
    const [loading,setLoading] = useState(true);
    const [dataInicial,setDataInicial] = useState(new Date('1980-01-01'));
    const [dataFim,setDataFim] = useState(new Date(Date.now()));
    const [discursosFiltrados,setDiscursosFiltrados] = useState([]);
    const [mostraFiltros,setMostraFiltros] = useState(false)

    useEffect(() =>{

        fetch('https://dadosabertos.camara.leg.br/api/v2/deputados/'+route.params.idDepu+'/discursos?dataInicio=2020-01-01&dataFim=2023-02-22&itens=30')
        .then(res =>res.json())
        .then(res=>{
            if(res){
                console.log('fetch4');
                setDiscursos(res.dados);
                setLoading(false);
            }else{
                console.log('dados n encontrados');
            }   
        })

    },[])

    const filtroDiscurso = (letras) => setDiscursosFiltrados(discursos.filter( discurso => discurso.transcricao.includes(letras))) 

    const dateValidation = (inicial,fim) =>{

        let regex = /^\d\d\d\d-\d\d-\d\d$/i;

        if(regex.test(inicial) && regex.test(fim)){
            //discursoFetch()
            navigation.navigate('discursos por data',{
                idDepu:route.params.idDepu,
                dataInicial,
                dataFim
            })

        }else{
            Alert.alert('Datas digitadas estão inválidas. Use o formato yyyy-mm-dd . Ou seja, ano, mês e dia.')
        }

    }

    return (

        <View style={styles.viewDespesas} >

            <View style={styles.viewInicial} >
                <Text style={styles.deputadoNome}>{route.params.nome}</Text>
                <Text style={styles.subtitulo}>Seus discursos</Text>
            </View>

            <View style={styles.filtroButao}>
                <Button title={mostraFiltros?"Esconder filtros":"Mostrar filtros"} onPress={e=>setMostraFiltros(!mostraFiltros)} />
            </View>

            {mostraFiltros?<View>
            <View style={styles.discursoFiltro}>
                <TextInput style={styles.textInput}
                placeholder='Palavras chaves' 
                onChangeText={filtroDiscurso}/>
                {discursosFiltrados.length!==0?<Text style={styles.discursoTexto}>Qtd discursos encontrados: {discursosFiltrados.length}</Text>:null}
            </View>
            
            <View style={styles.titleDateInput}>
                <Text >Periodo de tempo em que foi feito os discursos</Text>
            </View>

            <View style={styles.TextInputView}>
                <TextInput style={styles.textInput} 
                placeholder='yyyy-mm-dd'
                onChangeText={setDataInicial}
                />
                <TextInput style={styles.textInput} 
                placeholder='yyyy-mm-dd'
                onChangeText={setDataFim}
                />
            </View>

            <View style={styles.butaoPesquisar}>
                <Button title='Pesquisar discursos'
                onPress={e =>{dateValidation(dataInicial,dataFim)}}
                />
            </View></View>:null
            }

            {loading?<View style={styles.loading}><ActivityIndicator size="large" /></View>:
            <FlatList data={discursosFiltrados.length===0?discursos:discursosFiltrados}
            
            renderItem = {
                discurso => {
                    return <View style = {styles.cadaDiscurso}>

                        <Text><Text style={styles.identificacaoTexto} >Sumário: </Text> {discurso.item.sumario}</Text>
                        <Text><Text style={styles.identificacaoTexto} >Tipo: </Text> {discurso.item.tipoDiscurso}</Text>
                        <Text><Text style={styles.identificacaoTexto} >Palavras chaves: </Text> {discurso.item.keywords}</Text>
                        <Text><Text style={styles.identificacaoTexto} >Transcrição: </Text> {discurso.item.transcricao}</Text>
                        <Text><Text style={styles.identificacaoTexto} >Data e hora de início: </Text> {discurso.item.dataHoraInicio}</Text>
                        <Text><Text style={styles.identificacaoTexto} >Url do audio: </Text> {discurso.item.urlAudio?discurso.item.urlAudio:'Não informado'}</Text>
                        <Text><Text style={styles.identificacaoTexto} >Url do Vídeo: </Text> {discurso.item.urlVideo?discurso.item.urlVideo:'Não informado'}</Text>

                    </View>
                }
            }
            />}
        </View>
    )
}

const styles = StyleSheet.create({
    cadaDiscurso:{
        marginVertical:15,
        marginHorizontal:10,
        paddingVertical:20,
        paddingHorizontal:5,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#145DA0',
        textAlign:'center'
    },
    filtroButao:{
        marginHorizontal:40
    },
    discursoFiltro:{
        flexDirection:'column',
    },
    textInput:{
        textAlign:'center',
        borderWidth:1,
        padding:3,
        marginVertical:8,
        marginHorizontal:25,
        borderColor:'#145DA0',
        borderRadius:5,
        fontSize:15
    },
    titleDateInput:{
        alignItems:'center',
    },
    TextInputView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },discursoTexto:{
        textAlign:'center',
    },
    identificacaoTexto:{
        fontSize:20
    },
    inicialFim:{
        flexDirection:'row',
        justifyContent:'space-around',
    },
    viewDespesas:{
      backgroundColor: '#2E8BC0',
    },
    viewInicial:{
        alignItems:'center',
        margin:5
    },
    deputadoNome:{
        fontSize:20
    },
    subtitulo:{
        fontSize:20,
        padding:5
    },
    loading:{
        height:'100%'
    },
    butaoPesquisar:{
        marginHorizontal:40,
        marginVertical:10
    }
})
