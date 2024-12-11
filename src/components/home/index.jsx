import {
  FlatList,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable,
  ActivityIndicator, 
} from 'react-native';

import React, { useContext, useEffect, useState } from 'react';
import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../../contexts/auth';

export default function Home({ navigation }) {

  const {
    endpointPhp,
    setLoad, 
    load,
    setIdConstruction,
    setNameConstruction,
    setImgConstruction,
    setEnterpriseConstruction,
    setAddressConstruction,
    setConstructions ,
    constructions,
    setReportNumber,
    setDetailsCompany ,
    detailsCompany, 
    setTags ,
    tags ,
    setImgTags   
   } = useContext(AuthContext);


  const [welcome, setWelcome] = useState();
  const [construction, setConstruction] = useState([]);
  const [isConstruction, setIsConstruction] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  const getTime = () => {
    var dta = new Date();
    var hours = dta.getHours();
    var dd = dta.getDate().toString().padStart(2, '0');
    var mm = (dta.getMonth() + 1).toString().padStart(2, '0');
    var yyyy = dta.getFullYear();
    var today = dd + "/" + mm + "/" + yyyy; 

    if (hours > 0 && hours < 12) {
      setWelcome("Bom dia")
    } else if (hours >= 12 && hours < 18) {
      setWelcome("Boa tarde")
    } else {
      setWelcome("Boa noite")
    }
  }


  
  useEffect(() => {    
    navigation.addListener('focus', () => setLoad(!load));
    getTime();
    getDetailsCompany();   
  }, [load, navigation]);
 


  const listConstruction = async () => {
    await fetch(endpointPhp + "?action=list_construction")     
      .then(res => res.json())
      .then(      
        (result) => {
         if (result !== "not found") {            
            setConstruction(result);
            setIsConstruction(true);  
          } else {
            console.log(result);
          }
        }
      )
      .catch(() => {
        alert('Erro', 'Não foi possível carregar os dados da construtora');
      });
   }



   const getReportNumber = async (idConstruction) => {
    await fetch(endpointPhp + "?action=report_number", {      
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idConstruction
      })
    })
      .then((res) => res.json())
      .then(
        (result) => {          
          setReportNumber(result); 
        })
      .catch((error) => console.error(error));
     }




  const getStatusReport = async (idConst, nameConst, enterpriseConst, addressConst, imgConst) => {
    await fetch(endpointPhp + "?action=report_status", {      
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idConst
      })
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIdConstruction(idConst);
          setNameConstruction(nameConst);
          setEnterpriseConstruction(enterpriseConst);
          setAddressConstruction(addressConst);
          setImgConstruction(imgConst);          
          setConstructions(
            {
               ...constructions, ['id']: idConst,
                  constructions, ['name']: nameConst,
                  constructions, ['enterprise']: enterpriseConst,
                  constructions, ['address']: addressConst,
                  constructions, ['img']: imgConst,
            }
          )
          if (result == "not found") {
            setReportNumber(1);
            navigation.navigate("CadReport");           
          } else {
            getReportNumber(idConst);
            navigation.navigate("Report");          
          }
        })
      .catch((error) => console.error(error));
     }
 
  

  
  const getDetailsCompany = async () => {
    await fetch(endpointPhp + "?action=list_company")     
      .then(res => res.json())
      .then(  
        (result) => {          
         if (result !== "not found") { 
          setIsLoading(false);         
           listConstruction();
           listTags();              
           {
            result.map(              
              (item ) =>                        
                 setDetailsCompany (
                    {
                       ...detailsCompany, ['name']: item.name_com,
                          detailsCompany, ['address']: item.address_com,                          
                          detailsCompany, ['postal_cod']: item.postal_cod_com,  
                          detailsCompany, ['state']: item.state_com,  
                          detailsCompany, ['country']: item.country_com,  
                          detailsCompany, ['phone']: item.phone_com,  
                          detailsCompany, ['web_site']: item.web_site_com, 
                          detailsCompany, ['img']: item.img_com, 
                          detailsCompany, ['logo']: item.logo_img_com,  
                          detailsCompany, ['icon']: item.icon_img_com,                           
                    }
                 )    
             )
           } 
            
          } else {
            console.log(result)
           // alert(result);
          }          
        }
      )
      .catch(() => {       
        alert("favor verificar sua conexão com a internet");
      });
    }
 

    

  
    const listTags = async () => {
      await fetch(endpointPhp + "?action=list_tags")
          .then(res => res.json())
          .then(
              (result) => {              
                setImgTags(result); 
                {
                  result.map(              
                    (item ) =>                    
                  
                    setTags (
                      {
                         ...tags, ['status']: item.status_tag,
                            tags, ['img']: item.img_tag,                          
                            tags, ['desc']: item.desc_tag, 
                      }
                    )
                   )
                }             
             }
          )
          .catch(() => {
              console.log('Erro', 'Não foi possível carregar os dados de tags');
          });
       }
  
    



    if(isLoading){
      return(
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
        style={styles.containerMain}>

        <View style={styles.containerHeader}>

          <View style={styles.userHeader}>

            <View>          
              <Image source={{ uri: `data:image/png;base64,${detailsCompany.logo}` }}
                  style={styles.imgLogo}
               />            
            </View>

            <View style={styles.containerInfo}>
               <Text style={styles.textMain}>{detailsCompany.name}</Text>
            </View>        

            <View style={styles.containerInfo}>
              <Text style={styles.textInfo}>{`${welcome}`}</Text>
            </View>

          </View>          

        </View>



    
       {
         isConstruction ?    
        
         <FlatList              
                data={construction}
                renderItem={({ item }) =>


                <View style={styles.dataList}>

                  <View style={styles.cardList}>

                   <Image source={{ uri: `data:image/png;base64,${item.img_cts}` }}
                      style={styles.resizeModel}
                    />

                    <Text style={styles.textList}>
                      {`Construtora :  ${item.name_cts}`}
                    </Text>
                   
                    <Text style={styles.textList}>
                      {`Empreendimento :  ${item.enterprise_cts}`}
                    </Text>

                    <Text style={styles.textList}>
                      {`Endereço :  ${item.address_cts}`}
                    </Text>

                  <View style={styles.containerBtnIn}>

                    <LinearGradient
                      colors={['#ffffff', '#B1B2AB']} 
                      style={styles.btnOne}                     
                    >
                      <Pressable
                        onPress={() => getStatusReport(
                          item.id_cts,
                          item.name_cts,
                          item.enterprise_cts,
                          item.address_cts,
                          item.img_cts
                        )}
                                                
                        style={styles.btn}
                      >
                        <Text style={styles.textAlert}>Relatorio</Text>
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
         


       {
         isConstruction 
         
         ? 
       
          <View style={styles.containerBtnOut}>

             <LinearGradient
                colors={['#ffffff', '#B1B2AB']} 
                style={styles.btnOne}            
              >
                <Pressable
                  style={styles.btn}
                  onPress={() => { navigation.navigate("CadConstruction") }}
                >
                  <Text style={styles.textAlert}>Cadastre nova Construtora</Text>
                  
                </Pressable>
             </LinearGradient>              


           </View>

           
          :   
             
             

           <View style={styles.containerBtnOut}>
              <LinearGradient
                colors={['#ffffff', '#B1B2AB']} 
                style={styles.btnOne}        
              >
                <Pressable
                  style={styles.btn}
                  onPress={() => { navigation.navigate("CadConstruction") }}
                >
                  <Text style={styles.textAlert}>Cadastre a 1ª Construtora</Text>
                </Pressable>
              </LinearGradient>
           </View>  

          }


       

        <View style={styles.loading}></View>



      </View>

      

    </KeyboardAvoidingView>

  );
}





















