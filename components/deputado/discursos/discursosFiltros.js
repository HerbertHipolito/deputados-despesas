import {useState} from 'react';
import {StyleSheet, Text, View,Button,TextInput, ActivityIndicator } from 'react-native';


export default function dataPergunta({route,navigation}){


    const [dataInicial,setDataInicial] = useState(new Date('1980-01-01'));
    const [dataFim,setDataFim] = useState(new Date(Date.now()));
    const [palavraChave,setPalavraChave] = useState('');

    const dateValidation = (inicial,fim) =>{

        let regex = /^\d\d\d\d-\d\d-\d\d$/i;

        if(regex.test(inicial) && regex.test(fim)){
            navigation.navigate('discursos por data',{
                idDepu:route.params.idDepu,
                dataInicial,
                dataFim
            })

        }else{
            Alert.alert('Datas digitadas estão inválidas. Use o formato yyyy-mm-dd . Ou seja, ano, mês e dia.')
        }

    }

    return 
        <View>
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
                </View>
        </View>
}

const styles = StyleSheet.create({

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
    }

})