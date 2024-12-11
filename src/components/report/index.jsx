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



export default function Report({ navigation }) {


  const {
    endpointPhp,
    setLoad,
    load,
    setIdReport,
    setReportNumber,
    setReportStatus,
    idConstruction,
    nameConstruction,
    imgConstruction,
    imgTags,

  } = useContext(AuthContext);


  const [reportList, setReportList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    navigation.addListener('focus', () => setLoad(!load));
    listReport();

  }, [load, navigation]);





  const listReport = async () => {
    await fetch(endpointPhp + "?action=list_report", {
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
          if (result !== "not found") {
            setIsLoading(false);
            setReportList(result);
          } else {
            setIsLoading(false);            
            alert("não existe relatórios cadastrados !!!");
            navigation.navigate("CadReport");  
          }
        })
      .catch((error) => console.error(error));
  }






  const selectReport = (id, number, status) => {
    setIdReport(id);
    setReportNumber(number);
    setReportStatus(status);
    navigation.navigate("SelectReport");
  }






  const getReportNumber = async () => {
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
          navigation.navigate("CadReport");

        })
      .catch((error) => console.error(error));
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
      <View style={styles.containerMain} >

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
              style={styles.btn}
              >
              <Text style={styles.textAlert}>Voltar</Text>
            </Pressable>
          </LinearGradient>

        </View>

        <View style={styles.containerInfo}>

          <Text style={styles.textMain}>{` Tela Relatórios `}</Text>

          <LinearGradient colors={['#ffffff', '#B1B2AB']} style={styles.btnOne}>
            <Pressable onPress={() => getReportNumber()}
               style={styles.btn}
              >
              <Text style={styles.textAlert}>Novo Relatório</Text>
            </Pressable>
          </LinearGradient>

        </View>



        <FlatList

          data={reportList}

          renderItem={({ item }) =>

            <View style={styles.dataList}>

              {
                item.img_one_rpt != null ?


                  <View style={styles.contentImg}>


                    <Image
                      source={{ uri: `data:image/png;base64,${item.img_one_rpt}` }}
                      style={styles.resizeModel}
                    />

                    <Image
                      source={{ uri: 'data:image/png;base64,' + item.img_two_rpt }}
                      style={styles.resizeModel}
                    />

                  </View>

                  :
                  <View></View>
              }

              {
                item.img_three_rpt != null ?
                  <View style={styles.contentImg}>

                    <Image
                      source={{ uri: `data:image/png;base64,${item.img_three_rpt}` }}
                      style={styles.resizeModel}
                    />

                    <Image
                      source={{ uri: 'data:image/png;base64,' + item.img_four_rpt }}
                      style={styles.resizeModel}
                    />

                  </View>
                  :
                  <View></View>
              }


              <View style={styles.contentData} >


                <Text style={styles.textList}>
                  {` Nº : ${item.number_rpt}`}
                </Text>

                <Text style={styles.textList}>
                  {` Data : ${item.date_rpt}`}
                </Text>

                <Text style={styles.textList}>
                  {` Titulo :  ${item.title_rpt}`}
                </Text>

                <Text style={styles.textList}>
                  {` Descrição : ${item.description_rpt}`}
                </Text>


                <View style={styles.contentStatus}>

                  <Text style={styles.textList}>
                    {` Status :  ${item.status_rpt}`}
                  </Text>

                  {
                    item.status_rpt === imgTags[0].status_tag
                      ?
                      <Image
                        style={styles.imgLogo}
                        source={{ uri: 'data:image/png;base64,' + imgTags[0].img_tag }}
                      />
                      :
                      item.status_rpt === imgTags[1].status_tag
                        ?
                        <Image
                          style={styles.imgLogo}
                          source={{ uri: 'data:image/png;base64,' + imgTags[1].img_tag }}
                        />
                        :
                        item.status_rpt === imgTags[2].status_tag
                          ?
                          <Image
                            style={styles.imgLogo}
                            source={{ uri: 'data:image/png;base64,' + imgTags[2].img_tag }}
                          />
                          :
                          item.status_rpt === imgTags[3].status_tag
                            ?
                            <Image
                              style={styles.imgLogo}
                              source={{ uri: 'data:image/png;base64,' + imgTags[3].img_tag }}
                            />
                            :
                           <View></View>
                    }

                </View>

              </View>


             <View style={styles.containerBtn}>
              <LinearGradient colors={['#ffffff', '#B1B2AB']}  style={styles.btnOne}>
                <Pressable
                  onPress={() => selectReport(item.id_rpt, item.number_rpt, item.status_rpt)}
                  style={styles.btn}
                >
                  <Text style={styles.textAlert}>Selecione</Text>
                </Pressable>
              </LinearGradient>
            </View>


            </View>

          }
        >

        </FlatList>

        <View style={{ height: 10 }}></View>

      </View>
    </KeyboardAvoidingView >

  );
}


















