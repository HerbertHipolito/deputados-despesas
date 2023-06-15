import {useState} from 'react';
import {StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

export default function DespesasDataPergunta({route,navigation}){

    const [mes,setMes] = useState('');
    const [ano,setAno] = useState('');
    const [palavraChave,setPalavraChave] = useState('');

    const dateValidation = (mes,ano) =>{

        const mesCondicao = mes > 0 && mes <=12;
        const anoCondicao = ano > 1970 && ano <=2030;

        if( !(mesCondicao && anoCondicao ) || !(mes && ano) ) {
            Alert.alert('Datas estão inválidas.')
            return;
        }

        navigation.navigate('gastos',{
            idDepu:route.params.idDepu,
            nome:route.params.nome,
            mes,
            ano,
        })

    }

    return (
        <View style={styles.filtroView}>

            <View  style={styles.deputadoNomeView} >
                <Text style={styles.deputadoNome} >{route.params.nome}</Text>
            </View>
            
            <View style={styles.titleDateInput}>
                <Text >Em que mes e ano foi feita a despesa</Text>
            </View>

            <View style={styles.TextInputView}>
                <TextInput style={styles.textInput} 
                keyboardType="numeric"
                placeholder='mm'
                onChangeText={setMes}
                />
                <TextInput style={styles.textInput} 
                placeholder='yyyy'
                keyboardType="numeric"
                onChangeText={setAno}
                />
            </View>

            <View style={styles.butaoPesquisar}>
                <Button title='Pesquisar Despesas'
                onPress={e =>{dateValidation(mes,ano)}}
                />
            </View>
        </View>)
}

const styles = StyleSheet.create({

    filtroView:{
        height:"100%",
        backgroundColor: '#2E8BC0',
        paddingVertical:"20%"
    },titleDateInput:{
    },
    textInput:{
        textAlign:'center',
        borderBottomWidth:2,
        padding:3,
        marginVertical:25,
        marginHorizontal:25,
        borderColor:'#145DA0',
        fontSize:15,
        width:'30%'
    },
    deputadoNomeView:{
        alignItems:'center',
        marginBottom:'5%',
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
    },discursoTexto:{
        textAlign:'center',
    },butaoPesquisar:{
        marginHorizontal:40,
        marginVertical:10,
    },

})