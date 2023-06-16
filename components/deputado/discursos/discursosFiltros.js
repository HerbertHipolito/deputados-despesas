import {useState} from 'react';
import {StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

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
    const [dataInicialModalEstaVisivel, setdataInicialModalEstaVisivel] = useState(false); // id = true
    const [dataFinalModalEstaVisivel, setdataFinalModalEstaVisivel] = useState(false); // id = false


    const showDatePicker = (e,id) => id?setdataInicialModalEstaVisivel(true):setdataFinalModalEstaVisivel(true)
    const hideDatePicker = (e,id) => id?setdataInicialModalEstaVisivel(false):setdataFinalModalEstaVisivel(false)
    const handleConfirm = (date,id) => {
        const dateConverted = date.getUTCDate()+'/'+(date.getUTCMonth()+1)+'/'+date.getUTCFullYear()
        id?setDataInicial(dateConverted):setDataFim(dateConverted)
        hideDatePicker('',id);
    };
    
    const dateValidation = () =>{

        const dateRegex = /^([1-9]|[1-2][0-9]|3[0-1])\/([1-9]|1[0-2])\/\d{4}$/;

        if(!( dataInicial && dataFim )){
            Alert.alert('campo da data vázio')
            return;
        }

        if(!(dateRegex.test(dataInicial) && dateRegex.test(dataFim))) {
            Alert.alert('Use o formato dd/mm/yyyy. Ou seja, ano, mês e dia.')
            return;
        }

        const initialDateConverted = convertDateFormat(dataInicial)
        const endDateConverted = convertDateFormat(dataFim)

        navigation.navigate('discursos por data',{
            idDepu:route.params.idDepu,
            dataInicial:initialDateConverted,
            dataFim:endDateConverted,
            palavraChave
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
                <View style={styles.butaoData}>
                    <Button title="Selec. Data Inicial" onPress={e => showDatePicker(e,true)} />
                    <Text style={styles.dataTexto}> {dataInicial?dataInicial:null} </Text>
                </View>
                <DateTimePickerModal
                isVisible={dataInicialModalEstaVisivel}
                mode="date"
                onConfirm={date => handleConfirm(date,true)}
                onCancel={e => hideDatePicker(e,true)}
                />
                <View style={styles.butaoData}>
                    <Button title="Selec. Data final" onPress={e => showDatePicker(e,false)} />
                    <Text style={styles.dataTexto}> {dataFim?dataFim:null} </Text>
                </View>
                <DateTimePickerModal
                isVisible={dataFinalModalEstaVisivel}
                mode="date"
                onConfirm={date => handleConfirm(date,false)}
                onCancel={e => (e,false)}
                />

            </View>

            <View style={styles.butaoPesquisar}>
                <Button title='Pesquisar discursos'
                onPress={e =>{dateValidation()}}
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
        paddingVertical:"15%"
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
    butaoData:{
        flexDirection:'column',
        alignItems:'center',
    },
    dataTexto:{
        marginTop:10
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
        justifyContent:'space-around',
        marginTop:'10%',
        marginBottom:'5%'
    },
    discursoTexto:{
        textAlign:'center',
    },
    butaoPesquisar:{
        marginHorizontal:40
    }

})