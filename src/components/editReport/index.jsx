import React, { useContext, useEffect, useState } from 'react';

import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable,
  ActivityIndicator,
  ScrollView
} from 'react-native';


import styles from './styles';

import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
//import { FontAwesome } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';

import { AuthContext } from '../../contexts/auth';




export default function EditReport({ navigation }) {

  const {
    endpointPhp,
    setLoad, load,    
    idReport,
    nameConstruction,
    imgConstruction,
    imgTags
  } = useContext(AuthContext);
 

  useEffect(() => {
    navigation.addListener('focus', () => setLoad(!load));
    listReportById();
  }, [load, navigation]);


  const [isLoading, setIsLoading] = useState(true);
  const [reportList, setReportList] = useState([]);

 
  const [dataRel, setDataRel] = useState(
    {      
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
        id: idReport,
    }
);



  const handleInputChange = (atribute, value) => {
    setDataRel(
      {
        ...dataRel, [atribute]: value,
      }
    )
  }


  const [checkBox, setCheckBox] = useState([]);
  const [randomCheckBox, setRandomCheckBox] = useState(null);
  const [statusCheckBox, setStatusCheckBox] = useState(null);
  

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





/*
  const deleteImage = async (img , base64) => {

    alert(" deletar imagem "+img+" base64 "+base64);

    setDataRel(
      {
          ...dataRel, [img]: null,
             dataRel, [base64]: null,
      }
  )
}
*/




  



  const changeImage = async (img) => {

   // console.log(dataRel.img_one)
   // let img;
    let base64;

   switch(img){

     case "img_one" :
         base64 = "base64_one"
     break;

     case "img_two" :
         base64 = "base64_two"
     break;

     case "img_three" :
         base64 = "base64_three"
     break;

     case "img_four" :
         base64 = "base64_four"
     break;
   }

   /*
    if (img === "img_one") {
     //   img = "img_one"
        base64 = "base64_one"
    } else if (img_two === "img_two") {
        //img = "img_two"
        base64 = "base64_two"
    } else if (dataRel.img_three === null) {
        img = "img_three"
        base64 = "base64_three"
    } else if (dataRel.img_four === null) {
        img = "img_four"
        base64 = "base64_four"
    }
   */


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





const listReportById = async () => {
    await fetch(endpointPhp + "?action=list_report_by_id", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idReport,
      })
    })
      .then((res) => res.json())
      .then(
        (result) => {

          if (result !== "not found") {
            setIsLoading(false);
            setReportList(result);

            /*
            {            
                result.map((item) => {
                setDataRel(
                  {
                    ...dataRel, 'date': item.date_rpt,
                    dataRel, 'title': item.title_rpt,
                    dataRel, 'desc': item.description_rpt,
                    dataRel, 'status': item.status_rpt,
                    dataRel, 'img_one': item.img_one_rpt,
                    dataRel, 'img_two': item.img_two_rpt,
                    dataRel, 'img_three': item.img_three_rpt,
                    dataRel, 'img_four': item.img_four_rpt,
                  }
                )
              })
            }
            */
          } else {
            alert(result);
          }
        })
      .catch((error) => console.error(error));
  }




  const updateReport = async () => {
    await fetch(endpointPhp + "?action=update_report", {
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
          if (result != "update error") {
            navigation.navigate("Report");
            alert("Relatório atualizado com sucesso");
          } else {
            alert(result);
          }
        })
      .catch(function (error) {
        console.log('erro => ' + error.message);
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
    style={styles.containerMain}   
    >


 


     <View style={styles.containerHeader}>
        <View style={styles.userHeader}>
            <View>
               <Image
                style={styles.imgLogo}
                source={{ uri: 'data:image/png;base64,' + imgConstruction }}
               />
            </View>
             <Text style={styles.textInfo}>{nameConstruction}</Text>
        </View>
        <LinearGradient colors={['#ffffff', '#B1B2AB']} style={styles.btnOne}>
          <Pressable onPress={() => { navigation.navigate("Home") }}
            style={styles.btn}>
              <Text style={styles.textAlert}>Voltar</Text>
           </Pressable>
        </LinearGradient>
      </View>  




      <View style={styles.containerInfo}>
     <Text style={styles.textMain}>{` Edição de Relatório `}</Text>
 </View>
 




<ScrollView style={styles.containerScrool}>




 
{/*  <View style={styles.contentData}> */}



 <FlatList
     scrollEnabled={false}
     data={reportList}
     renderItem={({ item }) =>            

 <View style={styles.dataList}>

      <View style={styles.boxText}>
        <Text style={styles.textData}>{` Pagina ${item.page_rpt}`}</Text>
      </View>

{
 item.img_one_rpt != null ?

  <View style={styles.contentImg}>

   <View>
    { 
     dataRel.img_one == null       
     ?
     <View style={styles.boxImg}>
       <Pressable onPress={() => changeImage('img_one')}>
         <Image
            source={{ uri: 'data:image/png;base64, '+ item.img_one_rpt }}
            style={styles.resizeModel}
         />
       </Pressable>    
      </View>
    :
      <View style={styles.boxImg}>
        <Pressable onPress={() => changeImage('img_one')}>
          <Image source={{ uri: dataRel.img_one }} style={styles.resizeModel} />  
        </Pressable> 
      </View> 
    }
   </View>

   <View>
   { 
    dataRel.img_two == null
     ?
     <View style={styles.boxImg}>
       <Pressable onPress={() => changeImage('img_two')}>
         <Image
         source={{ uri: `data:image/png;base64,${item.img_two_rpt}` }}
         style={styles.resizeModel}
        />
       </Pressable>
    </View>
    :
    <View style={styles.boxImg}>
      <Pressable onPress={() => changeImage('img_two')}>
         <Image source={{ uri: dataRel.img_two }} style={styles.resizeModel} />  
      </Pressable> 
    </View> 
   }
  </View>

 </View>
  :
  <View></View>
}


{
item.img_three_rpt != null ?

<View style={styles.contentImg}>

 <View>
   { 
    dataRel.img_three == null        
    ?
    <View style={styles.boxImg} >
      <Pressable onPress={() => changeImage('img_three')}>
         <Image
          source={{ uri: `data:image/png;base64,${item.img_three_rpt}` }}
          style={styles.resizeModel}      
         />   
      </Pressable>      
    </View>
   :
   <View style={styles.boxImg}>
      <Pressable onPress={() => changeImage('img_three')}>
        <Image source={{ uri: dataRel.img_three }} style={styles.resizeModel} />  
      </Pressable>  
   </View>
   }
  </View>


 <View>
   { 
    dataRel.img_four == null        
    ?
    <View style={styles.boxImg}>
      <Pressable onPress={() => changeImage('img_four')}>
        <Image
          source={{ uri: `data:image/png;base64,${item.img_four_rpt}` }}
          style={styles.resizeModel}
        />
      </Pressable>  
    </View>   
    :
    <View style={styles.boxImg}>
      <Pressable onPress={() => changeImage('img_four')}>
        <Image source={{ uri: dataRel.img_four }} style={styles.resizeModel} />  
      </Pressable>  
    </View>
   }
  </View>

 </View>
 :
<View></View>
}


<View>

  <View style={styles.contentList} >         
            
            {
             item.date_rpt != "" ?
             <TextInput
               style={styles.input}
               underlineColorAndroid="transparent"
               placeholder={` ${item.date_rpt}`}
               placeholderTextColor="#000000"
               onChangeText={
                 (valor) => handleInputChange('date', valor)
               }
             />
             :
             <Text></Text>
            }

            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder={` ${item.title_rpt}`}
              placeholderTextColor="#000000"
              onChangeText={
                (valor) => handleInputChange('title', valor)
              }
            />

              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder={` ${item.description_rpt}`}
                placeholderTextColor="#000000"
                rows={4}
                multiline={true}
                onChangeText={
                  (valor) => handleInputChange('desc', valor)
                }
              />

               <View> 
                 <Text style={styles.textData}>{` Status : ${item.status_rpt}`}</Text>
               </View>           
             
         </View>          
             
      </View>

   </View>
   }        


  >         
 </FlatList> 

{/*  </View>  */}







 {/*   <View style={styles.containerCheckBox}>   */}



    <FlatList
              scrollEnabled={false}
              contentContainerStyle={{ 
               flexDirection: 'row',
               flexWrap: 'wrap' ,
               justifyContent:'space-evenly',
               maxWidth:1900,maxHeight:130
              }}
              style={{paddingBottom:30}}
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
              }>
       </FlatList>

   {/*   </View>   */}




     
   <View style={styles.containerBtn}>
      <LinearGradient colors={['#ffffff', '#B1B2AB']} style={styles.btnOne}>
        <Pressable onPress={() => updateReport()}
          style={styles.btn}>
            <Text style={styles.textAlert}>Atualizar</Text>
          </Pressable>
        </LinearGradient>         
    </View>

 </ScrollView>



</KeyboardAvoidingView >
 );
}





































