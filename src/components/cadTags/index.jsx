import React, { useContext, useEffect, useState } from 'react';

import {
   View,
   Text,
   TextInput,
   Pressable,
   KeyboardAvoidingView,
   Platform,
   Image,
   Modal,
   FlatList,
   ScrollView
} from 'react-native';


import styles from './styles';

import { LinearGradient } from 'expo-linear-gradient';

import { FontAwesome } from '@expo/vector-icons';

import { AuthContext } from '../../contexts/auth';

import * as ImagePicker from 'expo-image-picker';





export default function CadTags({ navigation }) {



   const { endpointPhp, setLoad, load } = useContext(AuthContext);



   useEffect(() => {

      navigation.addListener('focus', () => setLoad(!load));

      listTags();

   }, [load, navigation]);






   const [tags, setTags] = useState({
      status: '',
      desc: '',
      img: null,
      base_64_img: null
   });




   const [tagList, setTagList] = useState([]);

   const [isTags, setIsTags] = useState(false);

   const [modalForm, setModalForm] = useState(false);

   const [modalUpdate, setModalUpdate] = useState(false);





   const handleInputChange = (atribute, value) => {   

      setTags(
         {
            ...tags, [atribute]: value
         }
      )   
   }





   const pickImage = async () => {

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

         setTags(
            {
               ...tags, ['img']: result.assets[0].uri,
               tags, ['base_64_img']: result.assets[0].base64,
            }
         )      
      }

   };




   const removeImage = () => {   

      setTags(
         {
            ...tags, ['img']: null,
               tags, ['base_64_img']: null,
         }
      ) 

   }







   const listTags = async () => {

      await fetch(endpointPhp + "?action=list_tags")
         .then(res => res.json())
         .then(
            (result) => {

               if (result !== "not found") {

                  setTagList(result);
                  setIsTags(true);

               } else {
                  console.log("list_tags " + result);
               }

            }
         )
         .catch(() => {
            alert('Erro', 'Não foi possível carregar os dados da construtora');
         });
   }








   const insertTags = async () => {

      await fetch(endpointPhp + "?action=cad_tags", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            tags
         })
      })
         .then((res) => res.json())
         .then(
            (result) => {

               if (result != "error") {
                  // navigation.navigate("Home");
                  cleanInput();
                  //alert("Construtora cadastrada com sucesso !")
                  setModalForm(false);
                  console.log(result);

               } else {
                  console.log(result);
               }

            });
   }







   const selectingTag = (status, desc, img) => {

      setTags(
         {
            ...tags, ['status']: status,
            tags, ['desc']: desc,
            //tags, ['img']: img,
            tags, ['base_64_img']: img
         }
      )    

      setModalUpdate(true);
   }





   const updateTags = () => {

      setModalUpdate(false);
      cleanInput();
      console.log(tags)
   }






   const cleanInput = () => {
      setTags(
         {
            ...tags, ['status']: "",
            tags, ['desc']: "",
            tags, ['img']: null,
            tags, ['base_64_img']: null
         }
      )
   }









   return (

      <KeyboardAvoidingView
         behavior={Platform.OS === "ios" ? "padding" : "height"}
      >


         <View style={styles.containerHeader}>

            <LinearGradient colors={['#ffffff', '#B1B2AB']} style={styles.btnOne} >
               <Pressable onPress={() => { navigation.navigate("Home") }}
                  style={styles.btn}
               >
                  <Text style={styles.textAlert}>Home</Text>
               </Pressable>
            </LinearGradient>

         </View>





         <View style={styles.containerInfo}>
            <Text style={styles.textMain}>{` Tela Tags `}</Text>
         </View>


         <ScrollView>

            <View style={styles.containerMain}>

               {
                  isTags ?

                     <FlatList
                        data={tagList}
                        renderItem={({ item }) =>

                           <View style={styles.dataList}>

                              <View style={styles.cardList}>

                                 <Image source={{ uri: `data:image/png;base64,${item.img_tag}` }}
                                    style={styles.resizeModel}
                                 />

                                 <Text style={styles.textList}>
                                    {`Name :  ${item.status_tag}`}
                                 </Text>

                                 <Text style={styles.textList}>
                                    {`Desc :  ${item.desc_tag}`}
                                 </Text>

                                 <View style={styles.containerBtn}>

                                    <LinearGradient
                                       colors={['#ffffff', '#B1B2AB']}
                                       style={styles.btnOne}>

                                       <Pressable
                                          onPress={() => selectingTag(
                                             item.status_tag,
                                             item.desc_tag,
                                             item.img_tag
                                          )}

                                          style={styles.btn}
                                       >
                                          <Text style={styles.textAlert}>Select</Text>
                                       </Pressable>

                                    </LinearGradient>

                                 </View>

                              </View>

                           </View>

                        }

                     >
                     </FlatList>
                     :
                     <View></View>
               }




               <View style={styles.containerBtn}>

                  <LinearGradient
                     colors={['#ffffff', '#B1B2AB']}
                     style={styles.btnOne}
                  >
                     <Pressable
                        onPress={() => setModalForm(true)}

                        style={styles.btn}
                     >
                        <Text style={styles.textAlert}>cad tags</Text>
                     </Pressable>

                  </LinearGradient>

               </View>

            </View>

         </ScrollView>








         <Modal
            animationType='fade'
            visible={modalUpdate}>


            <View style={styles.contentModal}>


               <View style={styles.containerImg}>  


                {
                 tags.base_64_img === null
                
                 ?               
                                  
                  <View>

                     <LinearGradient colors={['#ffffff', '#B1B2AB']} style={styles.btnTwo} >

                        <Pressable onPress={() => pickImage()} style={styles.btnImg}>
                           <FontAwesome name='image' size={26} color={"#000000"} />
                           <Text style={styles.textBtn}>Adcionar tag</Text>
                        </Pressable>

                     </LinearGradient>

                  </View>

                  :
                  

                /*   tags.img &&   */
                 
                       
                  <View style={styles.boxImg}>
                      
                    <Image source={{ uri: `data:image/png;base64,${tags.base_64_img}`}}style={styles.resizeModel} />                 
                      
                     {/*    <Image source={{ uri: tags.img }} style={styles.resizeModel} />   */}

                        <Pressable onPress={() => removeImage()}>
                          <FontAwesome name='trash' size={20} color={"#B8AAA7"} />
                        </Pressable>

                  </View>
               
                }


               </View>
  



               {/* 
                  <Image source={{ uri: `data:image/png;base64,${selectTag.img}` }}
                     style={styles.resizeModel} /> 

                   <Image source={{ uri: selectTag.img }} style={styles.resizeModel} />
              */}




               <View style={styles.containerInput}>

                  <TextInput
                     style={styles.input}
                     underlineColorAndroid="transparent"
                     placeholder={` ${tags.status}`}
                     placeholderTextColor="#000000"
                     onChangeText={
                        (valor) => handleInputChange('status', valor)
                     }
                  />

                  <TextInput
                     style={styles.input}
                     underlineColorAndroid="transparent"
                     placeholder={` ${tags.desc}`}
                     placeholderTextColor="#000000"
                     rows={4}
                     multiline={true}
                     onChangeText={
                        (valor) => handleInputChange('desc', valor)
                     }
                  />

                  <View style={styles.containerBtn}>

                     <LinearGradient
                        colors={['#ffffff', '#B1B2AB']}
                        style={styles.btnOne}>

                        <Pressable
                           onPress={() => updateTags()}
                           style={styles.btn}
                        >
                           <Text style={styles.textAlert}>Update</Text>
                        </Pressable>
                     </LinearGradient>


                     <LinearGradient
                        colors={['#ffffff', '#B1B2AB']}
                        style={styles.btnOne}>

                        <Pressable
                           onPress={() => setModalUpdate(false)}
                           style={styles.btn}
                        >
                           <Text style={styles.textAlert}>Cancelar</Text>
                        </Pressable>
                     </LinearGradient>

                  </View>

               </View>

            </View>

         </Modal>








         <Modal
            animationType='fade'
            visible={modalForm}
         >

            <View style={styles.contentModal}>

               <View style={styles.containerImg}>

                  {
                     tags.img === null
                        ?
                        <LinearGradient colors={['#ffffff', '#B1B2AB']} style={styles.btnTwo} >
                           <Pressable onPress={() => pickImage()}
                              style={styles.btnImg}
                           >
                              <FontAwesome name='image' size={26} color={"#000000"} />

                              <Text style={styles.textBtn}>Adcionar tag</Text>
                           </Pressable>
                        </LinearGradient>
                        :
                        tags.img &&

                        <View style={styles.boxImg}>

                           <Image source={{ uri: tags.img }} style={styles.resizeModel} />
                           <Pressable onPress={() => removeImage()}>
                              <FontAwesome name='trash' size={20} color={"#B8AAA7"} />
                           </Pressable>

                        </View>
                  }

               </View>



               <View style={styles.containerInput}>

                  <TextInput style={styles.input}
                     placeholder="digite o status"
                     placeholderTextColor="#cc0000"
                     type="text"
                     onChangeText={
                        (valor) => handleInputChange('status', valor)
                     }
                     value={tags.status}
                  />

                  <TextInput style={styles.input}
                     placeholder="digite a descrição "
                     placeholderTextColor="#cc0000"
                     type="text"
                     onChangeText={
                        (valor) => handleInputChange('desc', valor)
                     }
                     value={tags.desc}
                  />


                  <View style={styles.containerBtn}>

                     <LinearGradient colors={['#ffffff', '#B1B2AB']} style={styles.btnOne} >
                        <Pressable onPress={() => insertTags()}
                           style={styles.btn}
                        >
                           <Text style={styles.textBtn}>Cadastrar</Text>
                        </Pressable>
                     </LinearGradient>


                     <LinearGradient
                        colors={['#ffffff', '#B1B2AB']}
                        style={styles.btnOne}>

                        <Pressable
                           onPress={() => setModalForm(false)}

                           style={styles.btn}
                        >
                           <Text style={styles.textAlert}>Cancelar</Text>
                        </Pressable>

                     </LinearGradient>

                  </View>

               </View>


               {/* 
                 {
                  construction.name === "" && construction.enterprise === "" &&
                     construction.address === ""
                     ?
                     <LinearGradient colors={['#ffffff', '#B1B2AB']} style={styles.btnOne} >
                       <Pressable disabled={true}
                          style={styles.btn}
                          >
                           <Text style={styles.textInfo}>Cadastro</Text>
                        </Pressable>
                     </LinearGradient>
                     :
                     <LinearGradient colors={['#ffffff', '#B1B2AB']} style={styles.btnOne} >
                        <Pressable onPress={() => insertConstruction()} 
                          style={styles.btn}
                        >
                           <Text style={styles.textBtn}>Cadastrar</Text>
                        </Pressable>
                     </LinearGradient>
                 }
                */}

            </View>

         </Modal>






      </KeyboardAvoidingView>
   )
};




