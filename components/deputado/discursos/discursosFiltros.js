import {useState} from 'react';
import {StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

const convertDateFormat = (date) => {
    
    const dateParts = date.split('/');
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`

}

export default function DiscursosDataPergunta({route,navigation}){

    const [dataInicial,setDataInicial] = useState('')
    const [dataFim,setDataFim] = useState('')
    const [palavraChave,setPalavraChave] = useState('')

    const dateValidation = (inicial,fim) =>{

        const dateRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;

        if(!(dateRegex.test(inicial) && dateRegex.test(fim))) {
            Alert.alert('Datas digitadas estão inválidas. Use o formato dd/mm/yyyy. Ou seja, ano, mês e dia.')
            return;
        }

        const initialDateConverted = convertDateFormat(inicial)
        const endDateConverted = convertDateFormat(fim)

        navigation.navigate('discursos por data',{
            idDepu:route.params.idDepu,
            dataInicial:initialDateConverted,
            dataFim:endDateConverted
        })

    }

    return (
        <View style={styles.filtroView}>

            <View  style={styles.deputadoNomeView} >
                <Text style={styles.deputadoNome} >{route.params.nome}</Text>
            </View>

            <View style={styles.discursoFiltro}>
                <TextInput style={styles.textInput}
                placeholder='Palavras chaves' 
                onChangeText={setPalavraChave}/>
            </View>
            <View style={styles.titleDateInput}>
                <Text >Periodo de tempo em que foi feito os discursos</Text>
            </View>

            <View style={styles.TextInputView}>
                <TextInput style={styles.textInput} 
                placeholder='dd/mm/yyyy'
                onChangeText={setDataInicial}
                />
                <TextInput style={styles.textInput} 
                placeholder='dd/mm/yyyy'
                onChangeText={setDataFim}
                />
            </View>

            <View style={styles.butaoPesquisar}>
                <Button title='Pesquisar discursos'
                onPress={e =>{dateValidation(dataInicial,dataFim)}}
                />
            </View>
        </View>)
}

const styles = StyleSheet.create({

    discursoFiltro:{
        flexDirection:'column',
    },
    filtroView:{
        height:"100%",
        backgroundColor: '#2E8BC0',
        paddingVertical:"20%"
    },
    textInput:{
        textAlign:'center',
        borderBottomWidth:2,
        padding:3,
        marginVertical:25,
        marginHorizontal:25,
        borderColor:'#145DA0',
        fontSize:20
    },
    deputadoNomeView:{
        alignItems:'center',
    },
    deputadoNome:{
        fontSize:20
    },
    titleDateInput:{
        alignItems:'center',
    },
    TextInputView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
    discursoTexto:{
        textAlign:'center',
    },
    butaoPesquisar:{
        marginHorizontal:40,
        marginVertical:10,
    },

})