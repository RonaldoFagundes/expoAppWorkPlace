
import React, { useState, useEffect, useContext } from 'react';

import {
    FlatList,
    ScrollView,
    View,
    Text,
    Pressable,
    Platform,
    Image,
    Modal,
    TextInput,
    KeyboardAvoidingView,
    ActivityIndicator,
} from 'react-native';

import { AuthContext } from '../../contexts/auth';

import styles from './styles';

import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { FontAwesome } from '@expo/vector-icons';


import * as ImagePicker from 'expo-image-picker';



export default function CadReport({ navigation }) {


    const {
        endpointPhp,
        setLoad,
        load,
        idConstruction,
        nameConstruction,
        imgConstruction,
        reportNumber,
        imgTags
    } = useContext(AuthContext);


    useEffect(() => {
        navigation.addListener('focus', () => setLoad(!load));
    }, [load, navigation]);


    const [modalForm, setModalForm] = useState(false);
    const [dataRel, setDataRel] = useState(
        {
            number_rpt: reportNumber,
            page: 0,
            date: "",
            title: "",
            desc: "",
            status: "",
            img_one: null,
            img_two: null,
            img_three: null,
            img_four: null,
            base64_one: null,
            base64_two: null,
            base64_three: null,
            base64_four: null,
            idConst: idConstruction,
        }
    );

    const [checkBox, setCheckBox] = useState([]);
    const [randomCheckBox, setRandomCheckBox] = useState(null);
    const [statusCheckBox, setStatusCheckBox] = useState(null);
    const [tagStatus, setTagStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const handleInputChange = (atribute, value) => {
        setDataRel(
            {
                ...dataRel, [atribute]: value
            }
        )
    }


    const selectStatus = (index, item) => {
        setStatusCheckBox(index);
        if (statusCheckBox !== index && checkBox[index] !== undefined) {
            checkBox[index] = undefined;
        } else {
            checkBox[index] = item.id_tag;
            setStatusCheckBox(index);
        }
        setRandomCheckBox(Math.random());
        setDataRel(
            {
                ...dataRel, ['status']: item.status_tag,
            }
        )
    }



    const pickImage = async () => {
        let img;
        let base64;
        if (dataRel.img_one === null) {
            img = "img_one"
            base64 = "base64_one"
        } else if (dataRel.img_two === null) {
            img = "img_two"
            base64 = "base64_two"
        } else if (dataRel.img_three === null) {
            img = "img_three"
            base64 = "base64_three"
        } else if (dataRel.img_four === null) {
            img = "img_four"
            base64 = "base64_four"
        }
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
            // includeBase64: true
        });

        if (!result.canceled) {
            setDataRel(
                {
                    ...dataRel, [img]: result.assets[0].uri,
                    dataRel, [base64]: result.assets[0].base64,
                }
            )
        }
    };


    const cancel = () => {
        setModalForm(false);
        dataRel.date = "",
            dataRel.title = "",
            dataRel.desc = "",
            dataRel.status = ""
    }


    const finish = () => {
        setIsLoading(true);
        dataRel.page = dataRel.page + 1;
        saveReport();
        navigation.navigate("Report");
    }


    const addPage = () => {
        setIsLoading(true);
        dataRel.page = dataRel.page + 1;
        saveReport();
        setModalForm(true);
    }


    const removeImage = (atribute) => {
        setDataRel(
            {
                ...dataRel, [atribute]: null
            }
        )
    }


    const reset = () => {
        setDataRel(
            {
                ...dataRel, 'date': "",
                dataRel, 'title': "",
                dataRel, 'desc': "",
                dataRel, 'status': "",
                dataRel, 'img_one': null,
                dataRel, 'img_two': null,
                dataRel, 'img_three': null,
                dataRel, 'img_four': null,
                dataRel, 'base64_one': null,
                dataRel, 'base64_two': null,
                dataRel, 'base64_three': null,
                dataRel, 'base64_four': null,
            }
        )
    }





    const saveReport = async () => {
        await fetch(endpointPhp + "?action=cad_report", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dataRel
            })
        })
            .then((res) => res.json())
            .then(
                (result) => {

                    if (result === "insert sucess") {
                        setIsLoading(false);
                        reset();
                        alert("report number " + reportNumber + " e pagina " + dataRel.page + "  salva com sucesso!");
                    } else {
                        setIsLoading(false);
                        console.log(result);
                    }
                })
            .catch(function (error) {
                console.log('erro' + error.message);
            });
    }




    if (isLoading) {
        return (
            <View style={styles.containerLoading}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        )
    }



 return (

   <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
    >

    <View
       style={styles.containerMain}
      >

      <View style={styles.containerHeader}>

          <View style={styles.contentHeader}>
              <View>
               <Image
                 style={styles.imgLogo}
                 source={{ uri: 'data:image/png;base64,' + imgConstruction }}
               />
              </View>
               <Text style={styles.textMain}>{`${nameConstruction}`}</Text>
          </View>
          <LinearGradient
             colors={['#ffffff', '#B1B2AB']} style={styles.btnOne}                       
             >
             <Pressable onPress={() => { navigation.navigate("Home") }}
                style={styles.btn}
              >
               <Text style={styles.textAlert}>Home</Text>
             </Pressable>
          </LinearGradient>

      </View>

     <View style={styles.containerInfo}>
         <Text style={styles.textMain}>{` Tela cadastro de relatório `}</Text>
     </View>

   <ScrollView horizontal={false}>

      <View style={styles.contentMain}>

       {
        dataRel.title === ""
        ?

           <View style={styles.boxWith} >
                 <LinearGradient
                   colors={['#ffffff', '#B1B2AB']}  style={styles.btnOne}                                
                      >
                    <Pressable onPress={() => setModalForm(true)}
                     style={styles.btn}
                     >
                     <Text style={styles.textAlert}>{`criar relatório`}</Text>
                    </Pressable>
                 </LinearGradient>
             </View>
         :
            <View style={styles.boxWithOut} >

               <View style={styles.containerImg} >
                   {
                    dataRel.img_one === null ||
                    dataRel.img_two === null ||
                    dataRel.img_three === null ||
                    dataRel.img_four === null
                   ?
                      <LinearGradient
                         colors={['#ffffff', '#B1B2AB']}                                                    
                       >
                         <Pressable onPress={() => pickImage()}
                            style={styles.btnImg}
                          >
                            <FontAwesome name='image' size={24} color={"#fff"} />
                          </Pressable>
                             <Text style={styles.textBtn}>Adcionar Imagem</Text>
                      </LinearGradient>
                    :
                       <View>
                         <Text style={styles.textInfo}>limite de imagems excedido</Text>
                       </View>
                    }

                  <View style={styles.contentImg}>
                    {
                         dataRel.img_one &&
                         <View>
                           <Image source={{ uri: dataRel.img_one }} style={styles.resizeModel} />
                            <Pressable onPress={() => removeImage('img_one')}
                             style={styles.boxImg}
                             >
                               <FontAwesome name='remove' size={12} color={"#B8AAA7"} />
                            </Pressable>
                         </View>
                     }

                     {
                        dataRel.img_two &&
                          <View>
                             <Image source={{ uri: dataRel.img_two }} style={styles.resizeModel} />
                             <Pressable onPress={() => removeImage('img_two')}
                                     style={styles.boxImg}
                                 >
                                 <FontAwesome name='remove' size={12} color={"#B8AAA7"} />
                             </Pressable>
                          </View>
                      }
                   </View>

                    <View style={styles.contentImg}>
                      {
                         dataRel.img_three &&
                          <View>
                              <Image source={{ uri: dataRel.img_three }} style={styles.resizeModel} />
                              <Pressable onPress={() => removeImage('img_three')}
                                 style={styles.boxImg}
                               >
                                <FontAwesome name='remove' size={12} color={"#B8AAA7"} />
                              </Pressable>
                          </View>
                      }

                      {
                         dataRel.img_four &&
                           <View>
                              <Image source={{ uri: dataRel.img_four }} style={styles.resizeModel} />
                              <Pressable onPress={() => removeImage('img_four')}
                                  style={styles.boxImg}
                              >
                                  <FontAwesome name='remove' size={12} color={"#B8AAA7"} />
                              </Pressable>
                          </View>
                      }
                    </View>
                    
                </View>

                <View style={styles.cardRel}>
                    {
                     dataRel.page === 0 ?
                        <Text style={styles.textData}>{` Data ${dataRel.date} `}</Text>
                        :
                        <View></View>
                    }
                    <Text style={styles.textData}>{`  ${dataRel.title} `}</Text>
                    <Text style={styles.textData}>{`  ${dataRel.desc} `}</Text>

                    <Text style={styles.textData}>{` ${dataRel.status} `}</Text>

                     {
                      dataRel.status === imgTags[0].status_tag
                       ?
                         <Image
                            style={styles.imgLogo}
                            source={{ uri: 'data:image/png;base64,' + imgTags[0].img_tag }}
                          />
                        :
                          dataRel.status === imgTags[1].status_tag
                        ?
                         <Image
                          style={styles.imgLogo}
                          source={{ uri: 'data:image/png;base64,' + imgTags[1].img_tag }}
                         />

                        :
                         dataRel.status === imgTags[2].status_tag
                        ?                       

                         <Image
                           style={styles.imgLogo}
                           source={{ uri: 'data:image/png;base64,' + imgTags[2].img_tag }}
                          />
                        :
                         dataRel.status === imgTags[3].status_tag
                        ?
                         <Image
                           style={styles.imgLogo}
                           source={{ uri: 'data:image/png;base64,' + imgTags[3].img_tag }}
                        />                     
                        :
                         <View></View>
                     }
                           {/*   
                            {dataRel.page == 0 ?
                                <Text style={styles.textData}>{` ${dataRel.status} `}</Text>
                                :
                                <View></View>
                            }
                          */}

                </View>

                <View style={styles.containerBtn}>

                    <LinearGradient colors={['#ffffff', '#B1B2AB']} style={styles.btnOne}>
                        <Pressable onPress={() => finish()}
                           style={styles.btn}
                         >
                            <Text style={styles.textBtn}>Finalizar</Text>
                        </Pressable>
                    </LinearGradient>

                    <LinearGradient colors={['#ffffff', '#B1B2AB']} style={styles.btnOne}>
                       <Pressable onPress={() => addPage()}
                        style={styles.btn}
                        >
                          <Text style={styles.textBtn}>Adcionar Pagina</Text>
                        </Pressable>
                    </LinearGradient>

                   </View>

                </View>
                 }        
              </View>

            </ScrollView>

            <Modal
              animationType='fade'
              visible={modalForm}
             >

              <ScrollView horizontal={true}>

                <View style={styles.contentMain}>

                  <View><Text style={styles.textMain}>Criar Relatório</Text></View>


                    <View style={styles.containerForm}>

                     {
                       dataRel.page === 0 
                            
                        ?
                        <View style={styles.fieldMain}>

                              <TextInput
                                  style={styles.input}
                                  underlineColorAndroid="transparent"
                                  placeholder="Data:"
                                  placeholderTextColor="#000000"
                                  onChangeText={
                                      (valor) => handleInputChange('date', valor)
                                  }
                              />
                        </View>
                        :
                          <View></View>
                     }

                      <View style={styles.fieldMain}>

                            <TextInput
                                style={styles.input}
                                underlineColorAndroid="transparent"
                                /* placeholder="Titulo:" */
                                placeholderTextColor="#000000"
                                onChangeText={
                                    (valor) => handleInputChange('title', valor)
                                }
                            />

                      </View>

                      <View style={styles.fieldDesc}>
                            <TextInput
                                style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholderTextColor="#000000"
                                rows={4}
                                multiline={true}
                                onChangeText={
                                    (valor) => handleInputChange('desc', valor)
                                }
                            />
                      </View>

                          {/* 
                           {
                            dataRel.page === 0 ?
                          */}

                       <View style={styles.containerCheckBox}>

                         <FlatList
                            
                            contentContainerStyle={{ 
                                flexDirection: 'row',
                                flexWrap: 'wrap' ,
                                justifyContent:'space-evenly',
                                maxWidth:1900,maxHeight:130
                            }}

                            data={imgTags}
                            renderItem={({ index, item }) =>

                             <View style={styles.contentCheckBox}>

                                 <View>
                                     <Text>{item.status_tag}</Text>
                                 </View>
 
                                  <Pressable onPress={() => selectStatus(index, item)}>
                                    {
                                      statusCheckBox !== index
                                      ?
                                         <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="black" />
                                      :
                                         <MaterialCommunityIcons name="checkbox-intermediate" size={24} color="black" />
                                    }
                                  </Pressable>

                             </View>
                            }
                           >
                          </FlatList>                          

                        </View>
                              {/* 
                                :
                                <View></View>
                               }
                              */}

                        <View>
                            <LinearGradient colors={['#ffffff', '#B1B2AB']} style={styles.btnOne}>
                                <Pressable onPress={() => setModalForm(false)}
                                    style={styles.btn}
                                    >
                                    <Text style={styles.textBtn}>proximo</Text>
                                </Pressable>

                            </LinearGradient>

                            <LinearGradient colors={['#ffffff', '#B1B2AB']} style={styles.btnOne}>
                                <Pressable onPress={() => cancel()}
                                    style={styles.btn}
                                    >
                                    <Text style={styles.textBtn}>cancelar</Text>
                                </Pressable>
                            </LinearGradient>

                        </View>

                    </View>


                 </View>   

               </ScrollView>

            </Modal>

          </View>

      </KeyboardAvoidingView >
    )
}


