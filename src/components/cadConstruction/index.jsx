import React, { useContext, useEffect, useState } from 'react';

import {
   View,
   Text,
   TextInput,
   Pressable,
   KeyboardAvoidingView,
   Platform,
   Image
} from 'react-native';


import styles from './styles';

import { LinearGradient } from 'expo-linear-gradient';

import { FontAwesome } from '@expo/vector-icons';

import { AuthContext } from '../../contexts/auth';

import * as ImagePicker from 'expo-image-picker';





export default function CadConstruction({ navigation }) {


   const { endpointPhp, setLoad, load } = useContext(AuthContext);

   const [construction, setConstruction] = useState({
      img: null,
      base64: null,
      name: "",
      enterprise: "",
      address: "",
   });




   useEffect(() => {

      navigation.addListener('focus', () => setLoad(!load))

   }, [load, navigation]);




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
         setConstruction(
            {
               ...construction, 'img': result.assets[0].uri,
               construction, 'base64': result.assets[0].base64,
            }
         )

      }
   };




   const handleInputChange = (atribute, value) => {

      setConstruction(
         {
            ...construction, [atribute]: value
         }
      )
   }


  
   
   const insertConstruction = async () => {          
       
      await fetch(endpointPhp + "?action=cad_contruction", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            construction
         })
      })
         .then((res) => res.json())
         .then(
            (result) => {
               if (result != "Construtora não cadastrado!!!") {
                  navigation.navigate("Home");
                  cleanInput();
                  alert("Construtora cadastrada com sucesso !")
                  console.log(result);
               } else {
                  console.log(result);
               }
            });
       }


     
   const cleanInput = () => {
      setConstruction(
         {
            ...construction, ['name']: "",
            construction, ['address']: "",           
            construction, ['enterprise']: "",
            construction, ['img']: null,
            construction, ['base64']: null,
         }
      )
   }




   const removeImage = (atribute) => {
      setConstruction(
          {
              ...construction, [atribute]: null
          }
      )
  }





   return (

      <KeyboardAvoidingView
         behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.containerMain}>  

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
                <Text style={styles.textMain}>{` Tela Cadastro de Obras `}</Text>
            </View>


         <View style={styles.contentMain}>

            {
             construction.img === null
               
             ?  

               <LinearGradient colors={['#ffffff', '#B1B2AB']} style={styles.btnTwo} >
                  <Pressable onPress={() => pickImage()}
                   style={styles.btnImg}
                  >
                     <FontAwesome name='image' size={26} color={"#000000"} />

                     <Text style={styles.textBtn}>Adcionar Imagem</Text>
                  </Pressable> 
               </LinearGradient>
               :             
            
               construction.img &&
                 <View style={styles.boxImg}>
                    <Image source={{ uri: construction.img }} style={styles.resizeModel} />
                      <Pressable onPress={() => removeImage('img')}>
                        <FontAwesome name='remove' size={14} color={"#B8AAA7"} />
                      </Pressable>
                 </View>              

            } 

              <TextInput style={styles.input}
                  placeholder=" digite o nome da contrutora"
                  placeholderTextColor="#cc0000"
                  type="text"
                  onChangeText={
                     (valor) => handleInputChange('name', valor)
                  }
                  value={construction.name}
               />

              <TextInput style={styles.input}
                  placeholder=" digite o nome do empreendimento"
                  placeholderTextColor="#cc0000"
                  type="text"
                  onChangeText={
                     (valor) => handleInputChange('enterprise', valor)
                  }
                  value={construction.enterprise}
               />

              <TextInput style={styles.input}
                  placeholder="endereço"
                  placeholderTextColor="#cc0000"
                  type="text"
                  onChangeText={
                     (valor) => handleInputChange('address', valor)
                  }
                  value={construction.address}
               />

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
            </View>

         </View>
                  
      </KeyboardAvoidingView>
   )
};




