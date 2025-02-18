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





export default function CadStandard({ navigation }) {



   const { endpointPhp, setLoad, load } = useContext(AuthContext);


   const [standard , setStandard] = useState({
      name:'',
      desc:'',  
   });




   useEffect(() => {

      navigation.addListener('focus', () => setLoad(!load))

   }, [load, navigation]);



   /*
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
 
         setStandard(
            {
              ...standard, 'logo': result.assets[0].uri,
                 standard, 'base_64_logo': result.assets[0].base64,
            }
         )
        
   };
  */






   const handleInputChange = (atribute, value) => {
     
      setStandard(
         {
            ...standard, [atribute]: value
         }
      ) 
   }


  
   
   const insertStandard = async () => { 
      
    //  console.log(company)
     
     await fetch(endpointPhp + "?action=cad_standard", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            standard
         })
      })
         .then((res) => res.json())
         .then(
            (result) => {

               //console.log(result)

              
               if (result != "error") {
                  navigation.navigate("SelectReport");
                  //cleanInput();
                  //alert("Construtora cadastrada com sucesso !")
                  console.log(result);
               } else {
                  console.log(result);
               }
            
          });  
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



   /*
   const removeImage = (atribute) => {
     
      setTags(
          {
              ...tags, [atribute]: null
          }
      )
     
  }
  */




   return (

      <KeyboardAvoidingView
         behavior={Platform.OS === "ios" ? "padding" : "height"}
      >


        <View style={styles.containerMain}>  


           {/* 
            <View style={styles.containerHeader}>
               <LinearGradient colors={['#ffffff', '#B1B2AB']} style={styles.btnOne} >
                  <Pressable onPress={() => { navigation.navigate("Home") }}
                     style={styles.btn}
                     >
                     <Text style={styles.textAlert}>Home</Text>
                  </Pressable>
               </LinearGradient>
           </View>   
          */}




            <View style={styles.containerInfo}>
                <Text style={styles.textMain}>{` Tela Cadastro de Standard `}</Text>
            </View>



        

         <View style={styles.contentMain}>


         {/*  
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
                 <Pressable onPress={() => removeImage('img')}>
                     <FontAwesome name='trash' size={20} color={"#B8AAA7"} />
                 </Pressable>
              </View>            
           } 

         </View>
        */}




              <TextInput style={styles.input}
                  placeholder="digite o nome"
                  placeholderTextColor="#cc0000"
                  type="text"
                  onChangeText={
                     (valor) => handleInputChange('name', valor)
                  }
                  value={standard.name}
               />



              <TextInput style={styles.input}
                  placeholder="digite a descrição "
                  placeholderTextColor="#cc0000"
                  type="text"
                  onChangeText={
                     (valor) => handleInputChange('desc', valor)
                  }
                  value={standard.desc}
               />

                  <LinearGradient colors={['#ffffff', '#B1B2AB']} style={styles.btnOne} >
                     <Pressable onPress={() => insertStandard()} 
                        style={styles.btn}
                      >
                         <Text style={styles.textBtn}>Cadastrar</Text>
                     </Pressable>
                  </LinearGradient>
             



               







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
      
         </View>
                  
      </KeyboardAvoidingView>
   )
};




