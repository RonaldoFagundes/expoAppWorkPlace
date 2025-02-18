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
} from 'react-native';


import styles from './styles';

import { LinearGradient } from 'expo-linear-gradient';

import { FontAwesome } from '@expo/vector-icons';

import { AuthContext } from '../../contexts/auth';

import * as ImagePicker from 'expo-image-picker';





export default function CadCompany({ navigation }) {


   const { endpointPhp, setLoad, load } = useContext(AuthContext);



   useEffect(() => {

      navigation.addListener('focus', () => setLoad(!load));

      listCompany();

   }, [load, navigation]);




   const [company, setCompany] = useState({
      name: '',
      address: '',
      postal: '',
      state: '',
      country: '',
      phone: '',
      web: '',
      logo: null,
      base_64_logo: null,
      icon: null,
      base_64_icon: null,
   });




   const [companyList, setCompanyList] = useState([]);

   const [isCompany, setIsCompany] = useState(false);

   const [modalForm, setModalForm] = useState(false);

   const [modalUpdate, setModalUpdate] = useState(false);




   const handleInputChange = (atribute, value) => {

      setCompany(
         {
            ...company, [atribute]: value
         }
      )

   }




   const pickImage = async (type) => {
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

         switch (type) {

            case 'logo':
               setCompany(
                  {
                     ...company, 'logo': result.assets[0].uri,
                     company, 'base_64_logo': result.assets[0].base64,
                  }
               )
            break;

            case 'icon':
               setCompany(
                  {
                     ...company, 'icon': result.assets[0].uri,
                     company, 'base_64_icon': result.assets[0].base64,
                  }
               )
            break;
         }
      }
   };




   const removeImage = (type) => {

      if(type === "logo"){

         setCompany(
            {
               ...company, 'logo': null,
                  company, 'base_64_logo': null                 
            }
         )

      }else{

         setCompany(
            {
               ...company, 'icon': null,
                  company, 'base_64_icon': null,
            }
         )

      }

      
   }







   const insertCompany = async () => {      

      await fetch(endpointPhp + "?action=cad_company", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            company
         })
      })
         .then((res) => res.json())
         .then(
            (result) => {

               if (result != "error") {
                  setModalForm(false)
                  //navigation.navigate("Home");
                  //cleanInput();
                  //alert("Construtora cadastrada com sucesso !")
                  // console.log(result);
               } else {
                  console.log(result);
               }

            });
   }





   const listCompany = async () => {

      await fetch(endpointPhp + "?action=list_company")
         .then(res => res.json())
         .then(
            (result) => {             

               if (result !== "not found") {

                  setCompanyList(result);
                  setIsCompany(true);

               } else {

                  console.log(result);
               }

            }
         )
         .catch(() => {
            alert('Erro', 'Não foi possível carregar os dados da company');
         });
   }





   const selectingCompany = (name, address, postal, state, country, phone, web, logo, icon) => {


      setCompany(
         {
            ...company, ['name']: name,
            company, ['address']: address,
            company, ['postal']: postal,
            company, ['state']: state,
            company, ['country']: country,
            company, ['phone']: phone,
            company, ['web']: web,
            company, ['logo']:logo,
            company, ['base_64_logo']: logo,
            company, ['icon']: icon,
            company, ['base_64_icon']: icon,
         }
      )

      setModalUpdate(true);
   }




   const updateCompany = () => {

      console.log(company)
   }






   const cleanInput = () => {
      /*
      setConstruction(
         {
            ...construction, ['name']: "",
            construction, ['address']: "",           
            construction, ['enterprise']: "",
            construction, ['img']: null,
            construction, ['base64']: null,
         }
      )
         */
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
            <Text style={styles.textMain}>{` Tela Cadastro de Company `}</Text>
         </View>






         <View style={styles.containerMain}>

            {

               isCompany ?

                  <View>

                     <FlatList
                        data={companyList}
                        renderItem={({ item }) =>

                           <View style={styles.dataList}>


                              <View style={styles.cardList}>

                                 <Image source={{ uri: `data:image/png;base64,${item.logo_img_com}` }}
                                    style={styles.resizeModel}
                                 />

                                 <Text style={styles.textList}>
                                    {`Name :  ${item.name_com}`}
                                 </Text>

                              </View>


                              <View style={styles.containerBtn}>

                                 <LinearGradient colors={['#ffffff', '#B1B2AB']} style={styles.btnOne} >
                                    <Pressable onPress={() =>

                                       selectingCompany(
                                          item.name_com,
                                          item.address_com,
                                          item.postal_cod_com,
                                          item.state_com,
                                          item.country_com,
                                          item.phone_com,
                                          item.web_site_com,
                                          item.logo_img_com,
                                          item.icon_img_com
                                       )
                                    }
                                       style={styles.btn}
                                    >
                                       <Text style={styles.textBtn}>Editar</Text>
                                    </Pressable>
                                 </LinearGradient>

                              </View>

                           </View>

                        }>
                     </FlatList>

                  </View>

                  :

                  <View style={styles.containerBtn}>

                     <LinearGradient colors={['#ffffff', '#B1B2AB']} style={styles.btnOne} >
                        <Pressable onPress={() => setModalForm(true)}
                           style={styles.btn}
                        >
                           <Text style={styles.textBtn}>Cadastrar</Text>
                        </Pressable>
                     </LinearGradient>

                  </View>
            }

         </View>








         <Modal
            animationType='fade'
            visible={modalForm}
         >

            <View style={styles.contentModal}>

               <View style={styles.containerImg}>

                  {
                     company.logo === null
                        ?
                        <LinearGradient colors={['#ffffff', '#B1B2AB']} style={styles.btnTwo} >
                           <Pressable onPress={() => pickImage("logo")}
                              style={styles.btnImg}
                           >
                              <FontAwesome name='image' size={26} color={"#000000"} />

                              <Text style={styles.textBtn}>Adcionar logo</Text>
                           </Pressable>
                        </LinearGradient>
                        :
                        company.logo &&
                        <View style={styles.boxImg}>
                           <Image source={{ uri: company.logo }} style={styles.resizeModel} />
                           <Pressable onPress={() => removeImage("logo")}>
                              <FontAwesome name='trash' size={20} color={"#B8AAA7"} />
                           </Pressable>
                        </View>
                  }



                  {
                     company.icon === null
                        ?
                        <LinearGradient colors={['#ffffff', '#B1B2AB']} style={styles.btnTwo} >
                           <Pressable onPress={() => pickImage("icon")}
                              style={styles.btnImg}
                           >
                              <FontAwesome name='image' size={26} color={"#000000"} />

                              <Text style={styles.textBtn}>Adcionar icon</Text>
                           </Pressable>
                        </LinearGradient>
                        :
                        company.icon &&
                        <View style={styles.boxImg}>
                           <Image source={{ uri: company.icon }} style={styles.resizeModel} />
                           <Pressable onPress={() => removeImage("icon")}>
                              <FontAwesome name='trash' size={20} color={"#B8AAA7"} />
                           </Pressable>
                        </View>
                  }

               </View>




               <View style={styles.containerInput}>

                  <TextInput style={styles.input}
                     placeholder="digite o nome da company"
                     placeholderTextColor="#cc0000"
                     type="text"
                     onChangeText={
                        (valor) => handleInputChange('name', valor)
                     }
                     value={company.name}
                  />

                  <TextInput style={styles.input}
                     placeholder="digite o endereço"
                     placeholderTextColor="#cc0000"
                     type="text"
                     onChangeText={
                        (valor) => handleInputChange('address', valor)
                     }
                     value={company.address}
                  />

                  <TextInput style={styles.input}
                     placeholder="cep"
                     placeholderTextColor="#cc0000"
                     type="text"
                     onChangeText={
                        (valor) => handleInputChange('postal', valor)
                     }
                     value={company.postal}
                  />

                  <TextInput style={styles.input}
                     placeholder="Estado"
                     placeholderTextColor="#cc0000"
                     type="text"
                     onChangeText={
                        (valor) => handleInputChange('state', valor)
                     }
                     value={company.state}
                  />

                  <TextInput style={styles.input}
                     placeholder="Pais"
                     placeholderTextColor="#cc0000"
                     type="text"
                     onChangeText={
                        (valor) => handleInputChange('country', valor)
                     }
                     value={company.country}
                  />

                  <TextInput style={styles.input}
                     placeholder="Telefone"
                     placeholderTextColor="#cc0000"
                     type="text"
                     onChangeText={
                        (valor) => handleInputChange('phone', valor)
                     }
                     value={company.phone}
                  />

                  <TextInput style={styles.input}
                     placeholder="Web-Site"
                     placeholderTextColor="#cc0000"
                     type="text"
                     onChangeText={
                        (valor) => handleInputChange('web', valor)
                     }
                     value={company.web}
                  />


               </View>







               <View style={styles.containerBtn}>

                  <LinearGradient colors={['#ffffff', '#B1B2AB']} style={styles.btnOne} >
                     <Pressable onPress={() => insertCompany()}
                        style={styles.btn}
                     >
                        <Text style={styles.textBtn}>Cadastrar</Text>
                     </Pressable>
                  </LinearGradient>


                  <LinearGradient colors={['#ffffff', '#B1B2AB']} style={styles.btnOne} >
                     <Pressable onPress={() => setModalForm(false)}
                        style={styles.btn}
                     >
                        <Text style={styles.textBtn}>Cancelar</Text>
                     </Pressable>
                  </LinearGradient>

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







         <Modal
            animationType='fade'
            visible={modalUpdate}>


            <View style={styles.contentModal}>

               <View style={styles.containerImg}>


                  <View>
                     <LinearGradient colors={['#ffffff', '#B1B2AB']} style={styles.btnTwo} >
                        <Pressable onPress={() => pickImage('update')}
                           style={styles.btnImg}
                        >
                           <FontAwesome name='image' size={26} color={"#000000"} />

                           <Text style={styles.textBtn}>Adcionar img</Text>
                        </Pressable>
                     </LinearGradient>
                  </View>



                  <View style={styles.boxImg}>

                     <Image source={{ uri: `data:image/png;base64,${company.logo}` }}
                        style={styles.resizeModel} />

                     <Pressable onPress={() => removeImage()}>
                        <FontAwesome name='trash' size={20} color={"#B8AAA7"} />
                     </Pressable>

                  </View>


                  <View style={styles.boxImg}>

                     <Image source={{ uri: `data:image/png;base64,${company.icon}` }}
                        style={styles.resizeModel} />

                     {/*   <Image source={{ uri: selectTag.img }} style={styles.resizeModel} /> */}

                     <Pressable onPress={() => removeImage()}>
                        <FontAwesome name='trash' size={20} color={"#B8AAA7"} />
                     </Pressable>

                  </View>


               </View>





               <View style={styles.containerInput}>

                  <TextInput
                     style={styles.input}
                     underlineColorAndroid="transparent"
                     placeholder={` ${company.name}`}
                     placeholderTextColor="#000000"
                     onChangeText={
                        (valor) => handleInputChange('name', valor)
                     }
                  />


                  <TextInput
                     style={styles.input}
                     underlineColorAndroid="transparent"
                     placeholder={` ${company.address}`}
                     placeholderTextColor="#000000"
                     onChangeText={
                        (valor) => handleInputChange('address', valor)
                     }
                  />


                  <TextInput
                     style={styles.input}
                     underlineColorAndroid="transparent"
                     placeholder={` ${company.postal}`}
                     placeholderTextColor="#000000"
                     onChangeText={
                        (valor) => handleInputChange('postal', valor)
                     }
                  />



                  <TextInput
                     style={styles.input}
                     underlineColorAndroid="transparent"
                     placeholder={` ${company.state}`}
                     placeholderTextColor="#000000"
                     onChangeText={
                        (valor) => handleInputChange('state', valor)
                     }
                  />


                  <TextInput
                     style={styles.input}
                     underlineColorAndroid="transparent"
                     placeholder={` ${company.country}`}
                     placeholderTextColor="#000000"
                     onChangeText={
                        (valor) => handleInputChange('country', valor)
                     }
                  />


<TextInput
                     style={styles.input}
                     underlineColorAndroid="transparent"
                     placeholder={` ${company.phone}`}
                     placeholderTextColor="#000000"
                     onChangeText={
                        (valor) => handleInputChange('phone', valor)
                     }
                  />


<TextInput
                     style={styles.input}
                     underlineColorAndroid="transparent"
                     placeholder={` ${company.web}`}
                     placeholderTextColor="#000000"
                     onChangeText={
                        (valor) => handleInputChange('web', valor)
                     }
                  />




                  <View style={styles.containerBtn}>

                     <LinearGradient
                        colors={['#ffffff', '#B1B2AB']}
                        style={styles.btnOne}>

                        <Pressable
                           onPress={() => updateCompany()}

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















      </KeyboardAvoidingView>
   )
};




