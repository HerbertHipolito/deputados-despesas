import {useEffect,useState} from 'react';
import {StyleSheet, Text, View, FlatList, Button, Linking, Alert, ActivityIndicator, TextInput} from 'react-native';
import Hyperlink from 'react-native-hyperlink';

export default function DiscursosLimitado({route,navigation}){

    const [discursos,setDiscursos] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(() =>{

        console.log(route.params)

        fetch('https://dadosabertos.camara.leg.br/api/v2/deputados/'+route.params.idDepu+'/discursos?dataInicio='+route.params.dataInicial+'&dataFim='+route.params.dataFim+'&itens=5')
        .then(res =>res.json())
        .then(res=>{
            if(res){
                console.log('fetch5');
                setDiscursos(res.dados);
                setLoading(false);
            }else{
                console.log('dados n encontrados');
            }   
        })

    },[])

    return (
        <View style={styles.viewDiscurso} >
        {loading?<View style={styles.loading}><ActivityIndicator size="large" /></View>:
            <FlatList data={discursos}
            
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
    viewDiscurso:{
        backgroundColor: '#2E8BC0'
    },
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
    discursoTexto:{
        textAlign:'center',
    },
    identificacaoTexto:{
        fontSize:20
    },
    loading:{
        height:'100%'
    }
})