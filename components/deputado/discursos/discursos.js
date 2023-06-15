import {useEffect,useState} from 'react';
import {StyleSheet, Text, View, FlatList, Button, Linking, Alert, ActivityIndicator, TextInput} from 'react-native';

export default function Discursos(props){

    const [discursos,setDiscursos] = useState(props.discursos);

    const converterData = (data) => {
        return `${data[8] + data[9]}/${data[5] + data[6]}/${data[0] + data[1] + data[2] + data[3]}`
    }

    return <View style={styles.discursos} >
            <FlatList data={discursos}
            renderItem = {
                discurso => {
                    return <View style = {styles.cadaDiscurso}>

                        <Text><Text style={styles.identificacaoTexto} >Sumário: </Text> {discurso.item.sumario}</Text>
                        <Text><Text style={styles.identificacaoTexto} >Tipo: </Text> {discurso.item.tipoDiscurso}</Text>
                        <Text><Text style={styles.identificacaoTexto} >Palavras chaves: </Text> {discurso.item.keywords}</Text>
                        <Text><Text style={styles.identificacaoTexto} >Transcrição: </Text> {discurso.item.transcricao}</Text>
                        <Text><Text style={styles.identificacaoTexto} >Data e hora de início: </Text> {converterData(discurso.item.dataHoraInicio)}</Text>
                        <Text><Text style={styles.identificacaoTexto} >Url do audio: </Text> {discurso.item.urlAudio?discurso.item.urlAudio:'Não informado'}</Text>
                        <Text><Text style={styles.identificacaoTexto} >Url do Vídeo: </Text> {discurso.item.urlVideo?discurso.item.urlVideo:'Não informado'}</Text>

                    </View>
                }}
                />
            </View>
}

const styles = StyleSheet.create({
    discursos:{
        height:"100%",
        paddingBottom:"50%"
    },
    cadaDiscurso:{
        marginBottom:15,
        marginHorizontal:5,
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
})