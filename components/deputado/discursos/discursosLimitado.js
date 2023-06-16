import {useEffect,useState} from 'react';
import {StyleSheet, Text, View, FlatList, Button, Linking, Alert, ActivityIndicator, TextInput} from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import Discursos from './discursos';

export default function DiscursosLimitado({route,navigation}){

    const [deputadosDiscursos,setDiscursos] = useState([]);
    const [deputadosDiscursosFiltrados,setDiscursosFiltrados] = useState([]);
    const [loading,setLoading] = useState(true);
    const [paginacao,setPaginacao] = useState(1); 

    const paginacaoMudanca = (mudanca) =>{
        
        if((paginacao + mudanca) >=1) {
            setPaginacao(paginacao + mudanca)
        }
        
    }

    const temDiscursosParaMostrar = () => {

        const mostrarDiscursosFiltrados = route.params.palavraChave && deputadosDiscursosFiltrados.length >=1;
        const mostrarTodosDiscursos =  !route.params.palavraChave && deputadosDiscursos.length >=1;
        return mostrarDiscursosFiltrados || mostrarTodosDiscursos;

    }

    useEffect(() =>{
        
        setLoading(true)
        fetch('https://dadosabertos.camara.leg.br/api/v2/deputados/'+route.params.idDepu+'/discursos?dataInicio='+route.params.dataInicial+'&dataFim='+route.params.dataFim+'&itens=5&pagina='+paginacao)
        .then(res =>res.json())
        .then(res=>{
            if(res){
                if(route.params.palavraChave) setDiscursosFiltrados(res.dados.filter( discurso => discurso.transcricao.includes(route.params.palavraChave) ))
                setDiscursos(res.dados);
                setLoading(false);
            }else{
                console.log('dados n encontrados');
            }   
        })

    },[paginacao])

    return (
        <View style={styles.viewDiscurso} >
            <View style={styles.buttonsView}>
                <Button title="Página anterior" onPress={e => paginacaoMudanca(-1)} style={styles.buttons}/>
                <Button title="Próxima página" onPress={e => paginacaoMudanca(1)} />
            </View>
            <View style={styles.currentPage}>
                <Text>Página: <Text style={styles.currentPageNumber}> {paginacao} </Text> </Text>
            </View>
            {loading?
            <View style={styles.loading}><ActivityIndicator size="large" /></View>:
            <View style={styles.discursos} >
                {temDiscursosParaMostrar()?
                <Discursos discursos={route.params.palavraChave?deputadosDiscursosFiltrados:deputadosDiscursos} />:
                <View style={styles.naoEncontradoView}><Text style={styles.naoEncontradoText} >Nenhum discurso encontrado</Text></View>}
            </View>
            }
            
            
        </View>
    )

}

const styles = StyleSheet.create({
    viewDiscurso:{
        backgroundColor: '#2E8BC0'
    },
    currentPage:{
        marginVertical:10,
        alignItems:'center',
    },
    currentPageNumber:{
        fontSize:20
    },
    discursos:{
        height:"100%",
        flexDirection:'row',
        justifyContent:'center',    
    },
    cadaDiscurso:{
        marginVertical:15,
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
    loading:{
        height:'100%'
    },
    buttonsView:{
        flexDirection:'row',
        justifyContent:'space-around',
    },
    buttons:{
        padding:10
    },
    naoEncontradoView:{
        textAlign:'center',
        marginTop:40,
    },
    naoEncontradoText:{
        fontSize:20        
    }
})