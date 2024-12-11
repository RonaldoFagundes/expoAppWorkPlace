import React, { useContext, useEffect, useState } from 'react';

import {
  Alert,
  FlatList,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable,
  Modal,
  ActivityIndicator,
} from 'react-native';


import styles from './styles';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../../contexts/auth';

import * as ImagePicker from 'expo-image-picker';

export default function DuplicateReport({ navigation }) {

  const {
    endpointPhp,
    setLoad, load, 

    idConstruction,
    reportData,    
    newReportNumber,
    idReport,
    nameConstruction,
    imgConstruction,
    imgTags
  } = useContext(AuthContext);
 
  
  
  
  //const [numberPages, setNumberPages] = useState();

  //const [nextNumber, setNextNumber] = useState();




  useEffect(() => {
    navigation.addListener('focus', () => setLoad(!load));

    //listReportById();
    //getLastReport();
    //setData();

    //checkReportData();

     /*
    setDataRel(
      {
         ...dataRel, 'desc': reportData[0].description_rpt,
            dataRel, 'title': reportData[0].title_rpt,
       }
     )
       */

     /*
     console.log("Tela Duplicar Report ")

     let cont = 1 ;
     while(reportData.length >= cont ){
        buttonAlert(cont-1);
        cont ++ ;
     }
     */  

     /*
     console.log(" qtd pages  "+reportData.length)
   
     setDataRel(
      {
         ...dataRel, 'desc': reportData[0].description_rpt,
            dataRel, 'title': reportData[0].title_rpt,
       }
     )
      */

      // console.log(" tamanho do array  "+reportData.length);
     // setNumberPages(reportData.length);
    
      fillFirstPage();

      //nextReportNumber();
    // buttonAlertPages(reportData.length);  

    // console.log(reportData)
    // console.log(reportData[0].description_rpt)
    // console.log(reportData[1].description_rpt,)
       
  }, [load, navigation]);




  const contPage = reportData.lenght;



  const [disabledBtn, setDisabledBtn] = useState(true);


  //const [isLoading, setIsLoading] = useState(true);


  

  




  const [modalConfirm, setModalConfirm] = useState(false);


  const [dataRel, setDataRel] = useState(
    {
        number_rpt: 0,
        page: 0,
        date: "",
        title: "",
        desc: "",
        status: "",
        /*
        img_one: null,
        img_two: null,
        img_three: null,
        img_four: null,
        */  
        base64_one: null,
        base64_two: null,
        base64_three: null,
        base64_four: null,
        idConst: idConstruction,
    }
);




const fillFirstPage  = async () => {

  contPage --;
  

  console.log(
  " nº de pages "+reportData.lenght+
  " prox page "+contPage+
  " page one "+reportData[0].description_rpt
);



setDataRel(
   {               
     ...dataRel, 'number_rpt'  : newReportNumber,
        dataRel, 'page'  : reportData[0].page_rpt,
        dataRel, 'date' : reportData[0].date_rpt,
        dataRel, 'title' : reportData[0].title_rpt,
        dataRel, 'desc' : reportData[0].description_rpt,
        dataRel, 'status' : reportData[0].status_rpt,
        dataRel, 'base64_one' : reportData[0].img_one_rpt,
        dataRel, 'base64_two' : reportData[0].img_two_rpt,
        dataRel, 'base64_three' : reportData[0].img_three_rpt,
        dataRel, 'base64_four' : reportData[0].img_four_rpt,
   }
 )
 

}



const fillOtherPage  = async () => {

   for(let i = 1; i < contPage; i++){
     console.log(" existem "+i+" pages para setar ")
   }
   
}




const test1 =()=>{ 

   
  console.log( 
   " existem pages para setar contPage"+contPage+  
   " conteudo do dataRel "+dataRel+
   " dataRel.number_rpt "+dataRel.number_rpt+
   " dataRel.number_rpt "+dataRel.title
  );

    if(contPage>1){
      fillOtherPage();
    }
 
 }
 




  //const [reportList, setReportList] = useState([]);

  /*
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
      id: idReport,
    }
  );
  */


  /*
  const handleInputChange = (atribute, value) => {
    setDataRel(
      {
        ...dataRel, [atribute]: value,
      }
    )
  }
*/

/*
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
*/



  /*
  const nextReportNumber  = async () => {

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
          
         // if(result>0){
        
          setNextNumber(result);
          //console.log('prox report number res => ' + result);
           
         // }

        })
      .catch(function (error) {
        console.log('erro => ' + error.message);
      });
  }
 */


 /*
  const setData = async () => {

    {
      reportData.map((item) => {
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
  }
  */



  /*
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
                    
                 alert(result);
            } else {
                   
                 console.log(result);
              }
         })
        .catch(function (error) {
            console.log('erro' + error.message);
        });
}
*/





//const [page, setPage] = useState(1);
//var pageN = 1 ;






/*
for(let i=0; i< numberPages; i++){

 console.log(" habilitar o btn de lançamento "+i+" vezes ");

}
*/


// setDisabledBtn(false) 

/*
 setDataRel(
  {               
     ...dataRel, 'number_rpt'  : nextNumber,
        dataRel, 'page'  : reportData[i].page_rpt,
        dataRel, 'date' : reportData[i].date_rpt,
        dataRel, 'title' : reportData[i].title_rpt,
        dataRel, 'desc' : reportData[i].description_rpt,
        dataRel, 'status' : reportData[i].status_rpt,
        dataRel, 'base64_one' : reportData[i].img_one_rpt,
        dataRel, 'base64_two' : reportData[i].img_two_rpt,
        dataRel, 'base64_three' : reportData[i].img_three_rpt,
        dataRel, 'base64_four' : reportData[i].img_four_rpt,

        /
        dataRel, 'img_one' : reportData[i].img_one_rpt,
        dataRel, 'img_two' : reportData[i].img_two_rpt,
        dataRel, 'img_three' : reportData[i].img_three_rpt,
        dataRel, 'img_four' : reportData[i].img_four_rpt,
        *

        dataRel, 'idConst' : reportData[i].id_fk_cts,
    }
  )   
    
  //  setModalConfirm(true)

 }
 */
 





const test2 =()=>{  

  //setModalConfirm(true)
  

  /*
  console.log(
    "  n pages   "+numberPages+
    "  number  "+dataRel.number_rpt+
    "  title "+dataRel.title+
    " desc "+dataRel.desc
  );
  

  if(numberPages > 1){
    console.log(" + de  1 pagina chamar a função novamente um alert ");
  }else{
    console.log(" só 1 pagina finalizar e carregar os dados  ");
  } 
  
  setDisabledBtn(true);
  */
}



const test3 =()=>{  
 

  console.log(" lançamento no banco de dados  o dataRel ");

  setModalConfirm(false)
}





const buttonAlertPages =(pages)=>{ 
  
  console.log("1º botao n pages "+pages)
   
  Alert.alert(
     ` Clonando Relatório com ${pages} pagina(s) `,"This is a message",
     [
      {
        text:"Cancel",
        onPress:()=>{console.log("Cancel")}
      },

      {
        text:"Ok",
        onPress:()=>{
           
         // cadClone();           
          //setIndex();

           /*
          setDataRel(
            {
               ...dataRel, 'desc': reportData[0].description_rpt,
                  dataRel, 'title': reportData[0].title_rpt,
             }
           )
          */

             //  insertClone();
           

                for(let i=0; i<pages; i++){
                   //console.log("n pages "+i)

                   buttonAlertSet(i);

                   /*
                   setDataRel(
                    {               
                       ...dataRel, 'number_rpt'  : nextNumber,
                          dataRel, 'page'  : reportData[i].page_rpt,
                          dataRel, 'date' : reportData[i].date_rpt,
                          dataRel, 'title' : reportData[i].title_rpt,
                          dataRel, 'desc' : reportData[i].description_rpt,
                          dataRel, 'status' : reportData[i].status_rpt,
                          dataRel, 'img_one' : reportData[i].img_one_rpt,
                          dataRel, 'img_two' : reportData[i].img_two_rpt,
                          dataRel, 'img_three' : reportData[i].img_three_rpt,
                          dataRel, 'img_four' : reportData[i].img_four_rpt,
                          dataRel, 'idConst' : reportData[i].id_fk_cts,
                     }
                   ) 

                    setModalConfirm(true)
                    */

           }         
        }
      },
    ]
  ) 
}



const buttonAlertSet =(i)=>{  
  
  console.log("2º botao index "+i)
   
  Alert.alert(
     `Setando o index ${i}`,"This is a message",
     [
      {
        text:"Cancel",
        onPress:()=>{console.log("Cancel")}
      },


      {
        text:"Ok",

        onPress:()=>{       
          
          setDataRel(
            {               
               ...dataRel, 'number_rpt'  : nextNumber,
                  dataRel, 'page'  : reportData[i].page_rpt,
                  dataRel, 'date' : reportData[i].date_rpt,
                  dataRel, 'title' : reportData[i].title_rpt,
                  dataRel, 'desc' : reportData[i].description_rpt,
                  dataRel, 'status' : reportData[i].status_rpt,
                  dataRel, 'base64_one' : reportData[i].img_one_rpt,
                  dataRel, 'base64_two' : reportData[i].img_two_rpt,
                  dataRel, 'base64_three' : reportData[i].img_three_rpt,
                  dataRel, 'base64_four' : reportData[i].img_four_rpt,
                  /*
                  dataRel, 'img_one' : reportData[i].img_one_rpt,
                  dataRel, 'img_two' : reportData[i].img_two_rpt,
                  dataRel, 'img_three' : reportData[i].img_three_rpt,
                  dataRel, 'img_four' : reportData[i].img_four_rpt,
                  */
                  dataRel, 'idConst' : reportData[i].id_fk_cts,
             }
           )        
             setModalConfirm(true)

        //   buttonAlertClone();
        }
      },
    ]
  ) 
}








/*
const buttonAlertClone =()=>{  
  
  console.log(" ultimo botão ")
   
  Alert.alert(
      " Pagina Clonada ","This is a message",
     [
      {
        text:"Cancel",
        onPress:()=>{console.log("Cancel")}
      },


      {
        text:"Ok",

        onPress:()=>{   
          
          insertClone();

        }


      },

    ]

  )
 
}

*/

const  insertClone2 = async () => {

  console.log(dataRel.number_rpt+"  "+dataRel.desc)

  setModalConfirm(false)

//console.log(nextNumber)

}



  const  insertClone3 = async () => {

    console.log(dataRel)

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

              console.log(" action=cad_report" + result);

              setModalConfirm(false);

            })
        .catch(function (error) {
            console.log('erro' + error.message);
        });


  //console.log( " desc => "+dataRel.desc+"  title => "+dataRel.title);
  //console.log( dataRel)
  
}




















/*
const setIndex =()=>{ 

 // console.log(" --- tamanho do array de "+reportData.length);

 let inx = 0 ;


 for(let i =0; i< reportData.length; i++){

    console.log(" --- tamanho do array de "+reportData.length+" tamanho do i "+i);

    //setData(i);


   setDataRel(
    {
       ...dataRel, 'desc': reportData[i].description_rpt,
          dataRel, 'title': reportData[i].title_rpt,
     }
   )

    insertClone(i);
  }

//insertClone();

}
*/




/*
const insertClone2= async () => {
  
 console.log(" insert desc => "+dataRel.desc+"  insert title => "+dataRel.title);

 console.log(" --- tamanho do array de "+reportData.length);


  if(reportData.length > 1 ){
    
     console.log(" --- tamanho do array de "+reportData.length);
  
  }


  console.log( " index "+ix);
   
  for (let i =0 ; i<=ix; i++){ 
   
   reportData.map(item=>{
    console.log( " index "+ix+" dataRel "+item.description_rpt);
   })

  }  
}
*/


/*
const setData= async (ix) => {

  console.log(" index ---  "+ix);

  setDataRel(
    {
       ...dataRel, 'desc': reportData[ix].description_rpt,
          dataRel, 'title': reportData[ix].title_rpt,
     }
   )
   console.log( " desc => "+dataRel.desc+"  title => "+dataRel.title)
}
*/

//const reportArr = [] ;

//const returnData = "ok" ;

//var pages = reportData.length ;
//var index = 0 ;

/*
const cadClone =()=>{ 

  const pages = 1 ;

  //let pages = reportData.length ;

  console.log(" 2º --- cadClone ");

  //console.log(" tamanho do array   "+pages);
 
  //pageN ++ ;  

   // console.log(" cad  1ª page total de "+pages);   

   // console.log(" --- total de "+pages );

   while ( reportData.length >  pages ){  

    //buttonAlert();

    pages ++ ; 

   // index ++ ;
  }

  console.log(" --- tamanho do array de "+reportData.length+" paginas "+pages );
  
  //confirmClone(index);
}
*/




/*
const confirmClone = async (i) => {

  console.log(" 3º confirmClone index ---  "+i);

  setDataRel(
    {
       ...dataRel, 'desc': reportData[i].description_rpt,
          dataRel, 'title': reportData[i].title_rpt,
     }
   )
  
  for(let i = 0 ; i < reportData.length ; i++){

    console.log("  confirmClone "+reportData[i].description_rpt);

    console.log("  confirmClone "+reportData[i].title_rpt);
  
  } 
  
}


const checkReportData =()=>{ 
  
  let pages = reportData.length ;

  console.log(" pages n "+pages);

  page = page +1;

  let cont = pages ;

  if (cont > 0){   

   // console.log(" pages "+cont);
    
    //cont -- ;
    
    buttonAlert();
  }
  cont = cont -  1 ;  
}


 
  if( page < 3){

     buttonAlert();

     console.log(" pages "+page)

   }

  let pages = reportData.length ;
  
  console.log(" quantidade de paginas  "+pages);

  let cont = pages ;

  while (cont > 0){   

    buttonAlert();    

  }

  cont -- ;

 for(let i = 0 ; i < reportData.length ; i++){

  setDataRel(
  {
      ...dataRel, 'desc': reportData[i].description_rpt,
         dataRel, 'title': reportData[i].title_rpt,
  }
 )

}

   if(returnData == "ok"){      
      buttonAlert();
   }
   
    while (cont > 0){      

       console.log(" cont "+cont);
      
       setDataRel(
        {
            ...dataRel, 'desc':  reportData[1].description_rpt,
               dataRel, 'title': reportData[1].title_rpt
            
        }
       )
    
       for(let i = 0 ; i < reportData.length ; i++){

        setDataRel(
        {
            ...dataRel, 'desc': reportData[i].description_rpt
        }
       )

      }   

       //cont = cont - 1;
       cont -- ;
    }
   
    for(let i = 0 ; i < reportData.length ; i++){

      console.log(" page "+reportData[i].page_rpt)

    }
  
   for(let i = 0 ; i < reportData.length ; i++){
    
  // console.log(" r1 "+reportData[0].description_rpt)      

      console.log(" r2 "+reportData[i].description_rpt)
            
      setDataRel(
          {
              ...dataRel, 'desc': reportData[i].description_rpt
          }
      )  

  } 

    //console.log(" size "+reportData[i]);

    // reportArr.push(reportData[i]);  

    // reportData
 }

 */

/*
const getDataReport =()=>{
 
 console.log( " desc => "+dataRel.desc+"  title => "+dataRel.title)
 
  Alert.alert('Confirm'
    [
      {
        Text:"Ok"
      }
    ]
  ) 
}
*/











/*
   editar clone


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






const changeImage = async (img) => {
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

*/




/*
const listReportByNumber = async () => {
  await fetch(endpointPhp + "?action=list_report_by_number", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      reportNumber,
      idConstruction
    })
  })
    .then((res) => res.json())
    .then(
      (result) => {

        if (result !== "not found") {         

        } else {
          console.log(result);
        }

      })
    .catch((error) => console.error("  hhhhh "+error));
}
*/

















  /*
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
          } else {
            alert(result);
          }
        })
      .catch((error) => console.error(error));
  }

 */















 /*
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
 */



  /*
  if (isLoading) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    )
  }
  */


















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

          <LinearGradient
            colors={['#B1B2AB', '#7D7F72']}
            style={styles.styleBtnOne}
          >
            <Pressable onPress={() => { navigation.navigate("Home") }}>
              <Text style={styles.textAlert}>Voltar</Text>
            </Pressable>
          </LinearGradient>

        </View>

        <View style={styles.containerInfo}>
          <Text style={styles.textMain}>{` Relatório Duplicado `}</Text>
        </View>



        <LinearGradient
          colors={['#B1B2AB', '#7D7F72']}
          style={styles.styleBtnOne}
        >
          <Pressable onPress={() => test1()}>
            <Text style={styles.textAlert}>Testar1</Text>
          </Pressable>
        </LinearGradient>




       <LinearGradient
        colors={['#B1B2AB', '#7D7F72']}
        style={styles.styleBtnOne}
      >

        <Pressable disabled={disabledBtn} onPress={() => test2()}>
          <Text style={styles.textAlert}>Testar2</Text>
        </Pressable>

      </LinearGradient>





        <Modal
          animationType='fade'
          visible={modalConfirm}
        >

              <LinearGradient
               colors={['#B1B2AB', '#7D7F72']}
               style={styles.styleBtnOne}
             >
               <Pressable onPress={() => test3()}>
                 <Text style={styles.textAlert}>Confirmar</Text>
               </Pressable>
             </LinearGradient>

        </Modal>






    {/*  
        <View style={styles.containerInfo}>
          <Text style={styles.textMain}>{` Edição de Relatório `}</Text>
        </View>

    <FlatList

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

    <Image
      source={{ uri: 'data:image/png;base64, '+ item.img_one_rpt }}
      style={styles.resizeModel}
    />

     <Pressable onPress={() => changeImage('img_one')}
       style={styles.boxImg}
        >
         <FontAwesome name='change' size={12} color={"#B8AAA7"} />
     </Pressable>
     
     </View>

    <View>

       <Image
        source={{ uri: `data:image/png;base64,${item.img_two_rpt}` }}
        style={styles.resizeModel}
       />

       <Pressable onPress={() => changeImage('img_two')}
        style={styles.boxImg}
        >
         <FontAwesome name='change' size={12} color={"#B8AAA7"} />
       </Pressable>
             
    </View>

  </View>

  :
  <View></View>
}


{

item.img_three_rpt != null ?

  <View style={styles.contentImg}>

   <View>

     <Image
      source={{ uri: `data:image/png;base64,${item.img_three_rpt}` }}
      style={styles.resizeModel}
     />

      <Pressable onPress={() => changeImage('img_three')}
       style={styles.boxImg}
        >
         <FontAwesome name='change' size={12} color={"#B8AAA7"} />
     </Pressable>
             
   </View>

    <View>

      <Image
          source={{ uri: `data:image/png;base64,${item.img_four_rpt}` }}
          style={styles.resizeModel}
        />

          <Pressable onPress={() => changeImage('img_four')}
           style={styles.boxImg}
            >
             <FontAwesome name='change' size={12} color={"#B8AAA7"} />
         </Pressable>
         
    </View>
   
  </View>

  :

  <View></View>
}



 <View style={styles.containerList}>

       <View style={styles.contentList} >         
            
              {item.date_rpt != "" ?
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
             
            </View>  

            <View style={styles.containerCheckBox}>

                  <View> 
                    <Text style={styles.textData}>{` Status : ${item.status_rpt}`}</Text>
                  </View>


                  <FlatList
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
             
           </View>

        </View>
          }
        >
        </FlatList>        

        <LinearGradient colors={['#ffffff', '#B1B2AB']} style={styles.btnOne}>
          <Pressable onPress={() => updateReport()}
            style={styles.btn}
            >
            <Text style={styles.textAlert}>Atualizar</Text>
          </Pressable>
        </LinearGradient>       
      
      */}





















        <View style={{ height: 10 }}></View>

      </View >
    </KeyboardAvoidingView >
  );
}





































