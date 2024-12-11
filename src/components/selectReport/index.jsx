
import React, { useContext, useEffect, useState } from 'react';
import {
  FlatList,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';

import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../../contexts/auth';
import * as Print from 'expo-print';
//import {useBackHandler} from '@react-native-community/hooks';

export default function SelectReport({ navigation }) {

  const {
    endpointPhp,
    setLoad, load,
    setIdReport,
    reportNumber,
    setReportData,
    setNewReportNumber,
   // reportStatus,
    idConstruction,
    nameConstruction,
    enterpriseConstruction,
    addressConstruction,
    imgConstruction,
    detailsCompany,
    imgTags,
  } = useContext(AuthContext);


  const [isLoading, setIsLoading] = useState(true);
  const [standards, setStandards] = useState([]);
  const [reportList, setReportList] = useState([]);
  // const [imgStatus, setImgStatus] = useState(null);
  const [selectedPrinter, setSelectedPrinter] = useState();
  //const [out, setOut] = useState(true);


  useEffect(() => {
    navigation.addListener('focus', () => setLoad(!load));
    listReportByNumber();
    listStandards();
   // checkImgStatus();
  }, [load, navigation]);

/*
  useBackHandler(()=>{
   if(out === true){
      setOut(false);
      navigation.navigate("Home") 
      return true;
     }else{
      return false;
     }
  })
*/


 /*
  const checkImgStatus = () => {
    for (i = 0; i < imgTags.length; i++) {
      if (reportStatus === imgTags[i].status_tag) {
        setImgStatus(imgTags[i].img_tag);
      }
    }
  }
 */
 

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
            setIsLoading(false);
            setReportList(result);

                 /* se for duplicar 

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
            console.log(result);
          }
        })
      .catch((error) => console.error("  hhhhh "+error));
  }



  const deleteReport = async () => {
    await fetch(endpointPhp + "?action=delete_report", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reportNumber
      })
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result !== "delete error") {
            navigation.navigate("Report");
            alert("Relatório excluido com sucesso");
          } else {
            alert(result);
          }
        })
      .catch(function (error) {
        console.log('erro => ' + error.message);
      });
  }


  const updateReport = (id) => {
    console.log("editar relatório id " + id);
    setIdReport(id);
    navigation.navigate("EditReport");
  }





  const getNextReportNumber  = async () => {

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
          
          setNewReportNumber(result);

        })
      .catch(function (error) {
        console.log('erro => ' + error.message);
      });
  }


  


  /* metodos para duplicar report 

  const [dataRel, setDataRel] = useState(
    {
        number_rpt: 0,
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



  const getLastReport  = async () => {

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
         console.log('res => ' + result);
        })
      .catch(function (error) {
        console.log('erro => ' + error.message);
      });
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

const duplicateReport = () => {
     
 // console.log(" vai para o repotData "+reportList)

  getNextReportNumber(); 
  
  setReportData(reportList);  
  navigation.navigate("DuplicateReport");
 

  //setIdReport(id);
  //navigation.navigate("DuplicateReport");
}























  const printReport = async () => {

   // setIsLoading(true);
     alert("Abrir modelo de impressão");

    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html: createDynamicData(),
      printerUrl: selectedPrinter?.url, // iOS only           
    });
   // checkImgStatus();
  };


  const listStandards = async () => {
    await fetch(endpointPhp + "?action=list_standards")
      .then(res => res.json())
      .then(
        (result) => {
          if (result !== "not found") {
            setStandards(result);
          } else {
            alert(result);
          }
        }
      )
      .catch(() => {
        console.log('Erro', 'Não foi possível carregar os dados de tags');
      });
  }




  const createDynamicData = () => {

    var dataReport = '';
   // var reportData = '';
    var rptStatus = '';

    var reportDataHeader ='';
    var reportDataTitle ='';
    var reportContainerImg ='';

   // var reportContainerImgOne ='';
   // var reportContainerImgTwo ='';
    var reportDataDesc ='';
   // var reportDataFooter ='';




    for (let i in reportList) {
      const item = reportList[i];



      dataReport = dataReport +
        `
        <p
        style="
        transform: rotate(-90deg);
        font-size: 70px;
        font-family: Helvetica Neue;
        font-weight: normal;
        margin-top:460px;  
        color: #ffff;
        ">${item.date_rpt}</p>
       `

       



      for (i = 0; i < imgTags.length; i++) {
        if (item.status_rpt === imgTags[i].status_tag) {
          rptStatus = imgTags[i].img_tag;
         }
       }





      reportDataHeader = reportDataHeader +

      `
          <div            
              style="
               display:flex;
               justify-content: space-between;
               height:12%;
               width:100%;   
            ">                      

               <div>
                 <img src="data:image/png;base64,${detailsCompany.logo}"                    
                  style="width:120px;height:120px;"  
                 />                 
               </div>            
               

                  <div
                   style=" 
                    display:block;           
                    height:15%;
                    width:20%;
                    text-align:center;              
                  ">  

                       <img src="data:image/png;base64,${rptStatus}"                    
                         style="width:60px;height:60px;"  
                       /> 

                       <p 
                        style=
                        "
                         font-size:20px;
                         color:black;                      
                        ">                               
                         ${item.status_rpt}
                       </p>

                  </div>   
           
           </div>      
        `





        reportDataTitle = reportDataTitle +
        `
         <div
            style="            
              height:10%;
              width:100%;  
              margin-bottom: 5px; 
              border:2px solid black;                       
            ">
              <p 
                style=
                "
                font-size:30px;
                color:black; 
                text-align: left;                   
                ">                               
                 ${item.title_rpt}
              </p>
           </div>
        `



        if( item.img_one_rpt !== null &&  item.img_two_rpt !== null &&            
            item.img_three_rpt !== null &&  item.img_four_rpt !== null ){
                         
              reportContainerImg = reportContainerImg +
              `
              <div            
                  style="
                  display:flex;
                  justify-content: space-around;
                  height:24%;
                  width:100%;              
                  margin-bottom: 5px;
                "> 

                    <div>
                       <img src="data:image/png;base64,${item.img_one_rpt}"                    
                        style="width:100%;height:100%; border-color:transparent;"  
                        />                 
                     </div>
   
                     <div>
                       <img src="data:image/png;base64,${item.img_two_rpt}"                    
                        style="width:100%;height:100%; border-color:transparent;"  
                       />                
                     </div>   
                   
              </div>
                    
              
              <div            
                   style="
                   display:flex;
                   justify-content: space-around;
                   height:24%;
                   width:100%;  
                   margin-bottom: 5px;        
                 "> 
               
                   <div>
                       <img src="data:image/png;base64,${item.img_three_rpt}"                    
                        style="width:100%;height:100%; border-color:transparent;"  
                     />                 
                   </div>
   
                   <div>
                      <img src="data:image/png;base64,${item.img_four_rpt}"                    
                         style="width:100%;height:100%; border-color:transparent;"  
                     />                 
                   </div> 
   
              </div>  
              `


            }else if( item.img_one_rpt !== null &&  item.img_two_rpt !== null &&            
                item.img_three_rpt !== null &&  item.img_four_rpt === null ){
                                 
                  reportContainerImg = reportContainerImg +
                  `
                  <div            
                      style="
                      display:flex;
                      justify-content: space-around;
                      height:24%;
                      width:100%;              
                      margin-bottom: 5px;
                    "> 
       
                        <div>
                           <img src="data:image/png;base64,${item.img_one_rpt}"                    
                            style="width:100%;height:100%; border-color:transparent;"  
                            />                 
                         </div>
       
                         <div>
                           <img src="data:image/png;base64,${item.img_two_rpt}"                    
                            style="width:100%;height:100%; border-color:transparent;"  
                           />                
                         </div>  
                       
                  </div>
                        
                  
                  <div            
                       style="                       
                       height:24%;
                       width:100%;  
                       margin-bottom: 5px;        
                     "> 
                   
                       <div>
                           <img src="data:image/png;base64,${item.img_three_rpt}"                    
                            style="width:100%;height:100%; border-color:transparent;"  
                         />                 
                       </div>     
                              
                  </div>  
                  `
                
                }else if( item.img_one_rpt !== null &&  item.img_two_rpt !== null &&            
                  item.img_three_rpt === null &&  item.img_four_rpt === null ){
                                     
                    reportContainerImg = reportContainerImg +
                    `
                    <div            
                        style="
                        display:flex;
                        justify-content: space-around;
                        height:48%;
                        width:100%;              
                        margin-bottom: 5px;
                      "> 
         
                          <div>
                             <img src="data:image/png;base64,${item.img_one_rpt}"                    
                              style="width:100%;height:100%; border-color:transparent;"  
                              />                 
                           </div>
         
                           <div>
                             <img src="data:image/png;base64,${item.img_two_rpt}"                    
                              style="width:100%;height:100%; border-color:transparent;"  
                             />                
                           </div>   
                         
                    </div>                       
                                      
                   `

                  }else if( item.img_one_rpt !== null &&  item.img_two_rpt === null &&            
                    item.img_three_rpt === null &&  item.img_four_rpt === null ){
                                         
                      reportContainerImg = reportContainerImg +
                      `
                      <div            
                          style="
                          display:flex;
                          justify-content: space-around;
                          height:48%;
                          width:100%;              
                          margin-bottom: 5px;
                        "> 
           
                            <div>
                               <img src="data:image/png;base64,${item.img_one_rpt}"                    
                                style="width:100%;height:100%; border-color:transparent;"  
                                />                 
                             </div>         
                                                         
                      </div>                       
                                        
                     `
                    }


       reportDataDesc= reportDataDesc +
        `
        <div
            style="            
             height:11%;
             width:100%;             
             border:2px solid black;                   
            >

              <p 
                style=
                "
                font-size:20px;
                color:black;
                text-align: justify;
                ">                               
                ${item.description_rpt}
              </p>

           </div>
        `

    }






const html =
      `
<!DOCTYPE html> 
 <html>

   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  
<style>  

body{
      padding: 0;
      margin: 0;
      text-align: center;    
}



#intru-container{    
        display: block;   
        height:1057px;
        width:814px;             
}
#intru-main{  
        display:flex;  
        height:86%;
        width: 100%        
}
#data-main{    
      height:100%;
      width: 26%;
      background-color: rgb(190, 111, 8);
      border-style: solid;
      border-color: black;
      border-radius: 50px;
      margin-left:10px;
      margin-top:10px;          
}  
#company-main{  
        display:block;
        justify-content: center;
        height:100%;
        width: 70%;        
}
#company-img{    
       height:25%;
       width: auto; 
       margin-top:10px;       
       margin-bottom: 5px;
}
#company-img img{  
       height:180px;
       width: 180px;
}
#company-info{    
       height:auto;
       width: auto;        
       text-align: left;
	     padding-top:100px;
       padding-left:20px;
       margin-top: 40px;
}
#company-info h3{  
     color: rgb(190, 111, 8);
     font-size: 18px;
     font-weight: bold;  
}
#company-info h2 {  
     font-size: 20px;  
     font-weight: bold;   
}
#company-info h2 , p{     
  color: #1c1755;   
}
#title-report{    
      height: auto;
      width: 70%;
      position: absolute;
      text-transform: uppercase;
      font-size: 74px;
      margin-top: 56%;
      margin-left:220px;
      color: #1c1755;       
}
#intru-footer {
      display: flex;
      justify-content: space-between;      
      height:18%;
      width:auto;      
}
#intru-footer-info {
      height: 60%;
      text-align: right;
      margin-top: 40px;
      margin-left:20px;
      margin-right:10px;      
}
#intru-footer h2 {
      color: black;
      font-size: 18px;
      font-weight: 900;
}
#intru-footer h3 {
     color: black;
     font-size: 14px;
}
#intru-footer-logo {
      margin-top: 60px;
      height: 10%;
      width: 10%;
}



#desc-container{    
       display: block;   
       height:1057px;
       width:814px;                 
}
#desc-header{
      display: flex;
      justify-content: space-between;      
      height:12%;
      width:auto; 
}
#desc-company-img {      
       width: 20%;
}
#desc-company-img img{
       height:120px;
       width: 120px;
}
#desc-title{  
      text-align: center;   
      width: 80%;      
      font-size: 30px;
}  
#details-header-desc{  
      height:auto;  
      font-size: 22px;     
      width:auto;      
}
#container-desc-tags{
      display: flex;
      justify-content: space-between;
      height:22%; 
      width:auto;
}
#content-desc-tags{
    display: flex;
    justify-content: space-between;  
    text-align: left;       
}
#desc-img img{
  height:160px;
  width: 160px;
}
#desc-info{     
   margin-left:20px;
   margin-right:10px;
}
#container-standards{
    display: flex;
    justify-content: space-between;  
    height:auto; 
    padding: 12px;
}
#content-standards{
  display: block;         
  height:auto;
  width:auto;             
}
#standards-title h3{
   font-size: 22px;
}
#standards-info{
  display:flex;  
  text-align:left;
  margin-left:5px;  
}
#standards-info p{
   font-size: 14px;
   margin-left:5px;
}



#img-container{    
       display: block;   
       height:1057px;
       width:814px;                 
}




#footer-container{
       display: block;   
       height:1050px;
       width:814px; 
}
#img-footer{
       height:82%;
       width: 100%;        
}
#img-footer img{
       height:118%;
       width: 100%;   
}
</style>  
   
</head>
      
<body>

 <section id="intru-container">
         
        <div id="title-report">Relatório</div>

        <div id="intru-main">
           <div id="data-main">                  
               ${dataReport}              
           </div>

           <div id="company-main">
             <div id="company-img">
                  <img src="data:image/png;base64,${detailsCompany.logo}" />
             </div>
             <div id="company-img">
                   <img src="data:image/png;base64,${imgConstruction}" />
             </div>
             <div id="company-info"> 
                  <h3>Empresa:</h3>
                  <h2>${nameConstruction}</h2>
                  <h3>Empreendimento:</h3>
                  <h2>${enterpriseConstruction}</h2>
                  <h3>Local da Obra:</h3>
                  <p>${addressConstruction}</p>
             </div> 
           </div>   
         </div> 

         <div id="intru-footer">	
	          <div id="intru-footer-logo">
              <img src="data:image/png;base64,${detailsCompany.icon}" />
	          </div>  
             <div id="intru-footer-info">
               <h2>${detailsCompany.name}</h2>
               <h3>${detailsCompany.address}</h3>
               <h3>CEP ${detailsCompany.postal_cod} - ${detailsCompany.state} - ${detailsCompany.country} - ${detailsCompany.phone} - ${detailsCompany.web_site}</h3>
            </div>
       </div>
 </section>

 <section id="desc-container">

    <div id="desc-header">   
       <div id="desc-company-img">
           <img src="data:image/png;base64,${detailsCompany.logo}" />
       </div>
       <div id="desc-title"> 
          <h3>${standards[0].name_sta}</h3>             
       </div>
     </div>

    <div id="details-header-desc">          
         <p>${standards[0].desc_sta}</p>
     </div>

  <div id="container-desc-tags"> 
              
      <div id="content-desc-tags">
         <div id="desc-img">
            <img src="data:image/png;base64,${imgTags[0].img_tag}"/>
          </div>

          <div id="desc-info"> 
             <h3>${imgTags[0].status_tag}</h3>             
             <h3>${imgTags[0].desc_tag}</h3>    
           </div> 
       </div>           

      <div id="content-desc-tags">

           <div id="desc-img">
              <img src="data:image/png;base64,${imgTags[1].img_tag}"/>
           </div>

           <div id="desc-info"> 
             <h3>${imgTags[1].status_tag}</h3>             
             <h3>${imgTags[1].desc_tag}</h3>    
           </div>   

      </div>

   </div>

  <div id="container-desc-tags"> 
              
      <div id="content-desc-tags">

           <div id="desc-img">
              <img src="data:image/png;base64,${imgTags[2].img_tag}"/>
           </div>

           <div id="desc-info"> 
             <h3>${imgTags[2].status_tag}</h3>             
             <h3>${imgTags[2].desc_tag}</h3>    
           </div>   

      </div>      
       
      <div id="content-desc-tags">

           <div id="desc-img">
              <img src="data:image/png;base64,${imgTags[3].img_tag}"/>
           </div>

           <div id="desc-info"> 
             <h3>${imgTags[3].status_tag}</h3>             
             <h3>${imgTags[3].desc_tag}</h3>    
           </div>   

      </div>

  </div>

  <div id="desc-standards">

         <div id="standards-title">
           <h3>${standards[1].name_sta}</h3>
        </div>

          <div id="container-standards"> 

             <div id="content-standards">

                  <div id="standards-info">
                     <strong>${standards[2].name_sta}-</strong>
                     <span>${standards[2].desc_sta}</span>
                   </div>  

                  <div id="standards-info">
                     <strong>${standards[3].name_sta}-</strong>
                     <span>${standards[3].desc_sta}</span>
                  </div>                 

                  <div id="standards-info">
                    <strong>${standards[4].name_sta}-</strong>
                    <span>${standards[4].desc_sta}</span>
                  </div>                 

                  <div id="standards-info">
                    <strong>${standards[5].name_sta}-</strong>
                    <span>${standards[5].desc_sta}</span>
                  </div>
                 
                  <div id="standards-info">
                     <strong>${standards[6].name_sta}-</strong>
                     <span>${standards[6].desc_sta}</span>
                   </div>                   
              </div>

              <div id="content-standards">

                  <div id="standards-info">
                     <strong>${standards[7].name_sta}-</strong>
                     <span>${standards[7].desc_sta}</span>
                  </div>                 
                 
                  <div id="standards-info">
                    <strong>${standards[8].name_sta}-</strong>
                    <span>${standards[8].desc_sta}</span>
                  </div>                  
                
                  <div id="standards-info">
                    <strong>${standards[9].name_sta}-</strong>
                    <span>${standards[9].desc_sta}</span>
                  </div>               
                 
                 <div id="standards-info">
                   <strong>${standards[10].name_sta}-</strong>
                   <span>${standards[10].desc_sta}</span>
                </div>   

            </div> 

         </div>

    </div> 
        
         <div id="intru-footer">	
	          <div id="intru-footer-logo">
              <img src="data:image/png;base64,${detailsCompany.icon}" />
	          </div>  
             <div id="intru-footer-info">
               <h2>${detailsCompany.name}</h2>
               <h3>${detailsCompany.address}</h3>
               <h3>CEP ${detailsCompany.postal_cod} - ${detailsCompany.state} - ${detailsCompany.country} - ${detailsCompany.phone} - ${detailsCompany.web_site}</h3>
            </div>
        </div>

  </section>

  


  <section id="img-container">  
  
        ${reportDataHeader}
            
        ${reportDataTitle}        

        ${reportContainerImg}

        ${reportDataDesc}
                
       <div id="intru-footer">	
	          <div id="intru-footer-logo">
              <img src="data:image/png;base64,${detailsCompany.icon}" />
	          </div>  
             <div id="intru-footer-info">
               <h2>${detailsCompany.name}</h2>
               <h3>${detailsCompany.address}</h3>
               <h3>CEP ${detailsCompany.postal_cod} - ${detailsCompany.state} - ${detailsCompany.country} - ${detailsCompany.phone} - ${detailsCompany.web_site}</h3>
            </div>
       </div>


  </section>







  <section id="footer-container">

     <div id="img-footer">
        <img src="data:image/png;base64,${detailsCompany.img}" />
	   </div>     
     
     <div id="intru-footer">	
	        <div id="intru-footer-logo">
             <img src="data:image/png;base64,${detailsCompany.icon}" />
	         </div>  
             <div id="intru-footer-info">
               <h2>${detailsCompany.name}</h2>
               <h3>${detailsCompany.address}</h3>
               <h3>CEP ${detailsCompany.postal_cod} - ${detailsCompany.state} - ${detailsCompany.country} - ${detailsCompany.phone} - ${detailsCompany.web_site}</h3>
            </div>
      </div>   

  </section>

 </body>

 </html>        
    `;
    return html;
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

      <View style={styles.containerMain}>

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
          <Text style={styles.textMain}>{` Relatório Selecionado `}</Text>
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



              <View style={styles.contentList}>

                <View>
                  <Text style={styles.textData}>{` Pagina : ${item.page_rpt}`}</Text>
                </View>

                <View>
                  <Text style={styles.textData}>{`  ${item.date_rpt}`}</Text>
                </View>

                <View>
                  <Text style={styles.textData}>{`  ${item.title_rpt}`}</Text>
                </View>

                <View>
                  <Text style={styles.textData}>{`  ${item.description_rpt}`}</Text>
                </View>

                {
                  item.status_rpt !== ""
                    ?

                    <View style={styles.contentStatus}>

                      <Text style={styles.textData}>
                        {` Status : ${item.status_rpt}`}
                      </Text>

                      {
                        //item.status_rpt === `status: ${imgTags[0].status_tag.toLowerCase()}`
                        item.status_rpt === imgTags[0].status_tag
                          ?
                          <Image
                            style={styles.resizeModel}
                            source={{ uri: 'data:image/png;base64,' + imgTags[0].img_tag }}
                          />
                          :
                          // item.status_rpt === `status: ${imgTags[1].status_tag.toLowerCase()}`
                          item.status_rpt === imgTags[1].status_tag
                            ?
                            <Image
                              style={styles.resizeModel}
                              source={{ uri: 'data:image/png;base64,' + imgTags[1].img_tag }}
                            />
                            :
                            // item.status_rpt === `status: ${imgTags[2].status_tag.toLowerCase()}`
                            item.status_rpt === imgTags[2].status_tag
                              ?
                              <Image
                                style={styles.resizeModel}
                                source={{ uri: 'data:image/png;base64,' + imgTags[2].img_tag }}
                              />
                              :
                              // item.status_rpt === `status: ${imgTags[3].status_tag.toLowerCase()}`
                              item.status_rpt === imgTags[3].status_tag
                                ?
                                <Image
                                  style={styles.resizeModel}
                                  source={{ uri: 'data:image/png;base64,' + imgTags[3].img_tag }}
                                />
                                :
                                <View></View>
                      }
                    </View>

                    :

                    <View></View>
                 }

                <View style={styles.containerBtnIn}>

                  <LinearGradient colors={['#ffffff', '#B1B2AB']} style={styles.btnOne}>
                    <Pressable onPress={() => updateReport(item.id_rpt)}
                       style={styles.btn}
                      >
                      <Text style={styles.textAlert}>Editar</Text>
                    </Pressable>
                  </LinearGradient>  

                 
                </View>

              </View>

            </View>
          }
        >
        </FlatList>

        <View style={styles.containerBtnOut}>

          <LinearGradient colors={['#ffffff', '#B1B2AB']} style={styles.btnOne}>
            <Pressable onPress={() => printReport()}
               style={styles.btn}
              >
              <Text style={styles.textAlert}>Imprimir</Text>
            </Pressable>
          </LinearGradient>
          
          <LinearGradient colors={['#ffffff', '#B1B2AB']} style={styles.btnOne}>
            <Pressable onPress={() => deleteReport()}
               style={styles.btn}
              >
              <Text style={styles.textAlert}>Excluir</Text>
            </Pressable>
          </LinearGradient>


          <LinearGradient colors={['#ffffff', '#B1B2AB']} style={styles.btnOne}>
              <Pressable onPress={() => duplicateReport()}
                 style={styles.btn}
                >
                 <Text style={styles.textAlert}>Duplicar</Text>
              </Pressable>
         </LinearGradient>

        </View>
      </View >
    </KeyboardAvoidingView >
  );
}




/*



reportDataFooter = reportDataFooter 
          `
          <div 
              style="
               display:flex;
               justify-content: space-between;
               height:15%;
               width:100%;
               background-color: green;                          
               ">           

                <div>
                 <img src="data:image/png;base64,${detailsCompany.icon}"                    
                  style="width:80px; height:80px;  margin-top:30px;"  
                 />                 
               </div>              

                <div
                  style="
                   display:block;                   
                   height:15%;
                   width:100%;                   
                   text-align: right;
                   margin-top: 20px;
                   margin-left:20px;
                   margin-right:10px; 
                  ">

                   <h3>${detailsCompany.name}</h3>
                   <h4>${detailsCompany.address}</h4>
                   <h4>CEP ${detailsCompany.postal_cod} - ${detailsCompany.state} - ${detailsCompany.country} - ${detailsCompany.phone} - ${detailsCompany.web_site}</h4>
              
                </div>
             
            </div>  
          
          `








          if(item.img_one_rpt ==! null ){

            reportContainerImg = reportContainerImg +
             `
             <div            
                 style="
                 display:flex;
                 justify-content: space-around;
                 height:25%;
                 width:100%;              
                 margin-bottom: 5px;
               "> 
  
                   <div>
                      <img src="data:image/png;base64,${item.img_one_rpt}"                    
                       style="width:100%;height:100%; border-color:transparent;"  
                       />                 
                    </div>
  
                    <div>
                      <img src="data:image/png;base64,${item.img_two_rpt}"                    
                       style="width:100%;height:100%; border-color:transparent;"  
                      />                
                    </div>   
                  
             </div>
                   
             
             <div            
                  style="
                  display:flex;
                  justify-content: space-around;
                  height:25%;
                  width:100%;  
                  margin-bottom: 5px;        
                "> 
              
                  <div>
                      <img src="data:image/png;base64,${item.img_three_rpt}"                    
                       style="width:100%;height:100%; border-color:transparent;"  
                    />                 
                  </div>
  
                  <div>
                     <img src="data:image/png;base64,${item.img_four_rpt}"                    
                        style="width:100%;height:100%; border-color:transparent;"  
                    />                 
                  </div> 
  
             </div>  
             `
           }
  
          
  
  
  
  
  
           if(item.img_one_rpt === null ){
  
            reportContainerImg = reportContainerImg +
             `
             <div            
                 style="
                 display:flex;
                 justify-content: space-around;
                 height:25%;
                 width:100%;              
                 margin-bottom: 5px;
               "> 
  
                   <div>
                      <img src="data:image/png;base64,${item.img_one_rpt}"                    
                       style="width:100%;height:100%; border-color:transparent;"  
                       />                 
                    </div>
  
                    <div>
                      <img src="data:image/png;base64,${item.img_two_rpt}"                    
                       style="width:100%;height:100%; border-color:transparent;"  
                      />                
                    </div>   
                  
             </div>
                   
             
             <div            
                  style="                
                  height:25%;
                  width:100%;  
                  margin-bottom: 5px;        
                "> 
              
                  <div>
                      <img src="data:image/png;base64,${item.img_three_rpt}"                    
                       style="width:100%;height:100%; border-color:transparent;"  
                    />                 
                  </div>               
  
             </div>  
             `
           }
  
  
  
  
  
  
  
  
          if(item.img_two_rpt === null ){
  
            reportContainerImg = reportContainerImg +
             `
             <div            
                 style="
                 display:flex;
                 justify-content: space-around;
                 height:50%;
                 width:100%;              
                 margin-bottom: 5px;
               "> 
  
                   <div>
                      <img src="data:image/png;base64,${item.img_one_rpt}"                    
                       style="width:100%;height:100%; border-color:transparent;"  
                       />                 
                    </div>
  
                    <div>
                      <img src="data:image/png;base64,${item.img_two_rpt}"                    
                       style="width:100%;height:100%; border-color:transparent;"  
                      />                
                    </div>   
                  
             </div>               
                         
             `
           }
  
  
  
  
  
  
  
           if(item.img_two_rpt === null ){
  
            reportContainerImg = reportContainerImg +
             `
             <div            
                 style="               
                 height:50%;
                 width:100%;              
                 margin-bottom: 5px;
               "> 
  
                   <div>
                      <img src="data:image/png;base64,${item.img_one_rpt}"                    
                       style="width:100%;height:100%; border-color:transparent;"  
                       />                 
                    </div>                  
                  
             </div>               
                         
             `
           }
  
  
  
  




      reportData = reportData +
        `
        <div 
          style="
            display:block;
            height:1052px;
            width:814px;           
         "> 
               
          <div            
              style="
               display:flex;
               justify-content: space-between;
               height:12%;
               width:100%;
              
               background-color: orange;
            "> 
                        
               <div>
                 <img src="data:image/png;base64,${detailsCompany.logo}"                    
                  style="width:120px;height:120px;"  
                 />                 
               </div>           
               

                  <div
                   style=" 
                    display:block;           
                    height:15%;
                    width:20%;
                    text-align:center;              
                  ">  

                       <img src="data:image/png;base64,${rptStatus}"                    
                         style="width:60px;height:60px;"  
                       /> 

                       <p 
                        style=
                        "
                         font-size:20px;
                         color:black;                      
                        ">                               
                         ${item.status_rpt}
                       </p>

                  </div>   
           
          </div>


          <div
            style="            
              height:10%;
              width:100%;  
              margin-bottom: 5px;
               background-color: blue;          
            ">
              <p 
                style=
                "
                font-size:30px;
                color:black; 
                text-align: left;                   
                ">                               
                 ${item.title_rpt}
              </p>
           </div>


          <div            
               style="
               display:flex;
               justify-content: space-around;
               height:25%;
               width:100%;              
               margin-bottom: 5px;
             "> 

                  <div>
                    <img src="data:image/png;base64,${item.img_one_rpt}"                    
                     style="width:100%;height:100%; border-color:transparent;"  
                     />                 
                  </div>

                  <div>
                    <img src="data:image/png;base64,${item.img_two_rpt}"                    
                     style="width:100%;height:100%; border-color:transparent;"  
                    />                
                  </div>   
                
           </div>
                 
           
           <div            
                style="
                display:flex;
                justify-content: space-around;
                height:25%;
                width:100%;  
                margin-bottom: 5px;        
              "> 
            
                <div>
                    <img src="data:image/png;base64,${item.img_three_rpt}"                    
                     style="width:100%;height:100%; border-color:transparent;"  
                  />                 
                </div>

                <div>
                   <img src="data:image/png;base64,${item.img_four_rpt}"                    
                      style="width:100%;height:100%; border-color:transparent;"  
                  />                 
                </div> 

           </div>        

             
          <div
            style="            
             height:11%;
             width:100%;             
             border:2px solid black; 
             background-color: blue;      
            >

              <p 
                style=
                "
                font-size:20px;
                color:black;
                text-align: justify;
                ">                               
                ${item.description_rpt}
              </p>

           </div>                 
           

           <div 
              style="
               display:flex;
               justify-content: space-between;
               height:15%;
               width:100%;
               background-color: green;                          
               ">           

                <div>
                 <img src="data:image/png;base64,${detailsCompany.icon}"                    
                  style="width:80px; height:80px;  margin-top:30px;"  
                 />                 
               </div>              

                <div
                  style="
                   display:block;                   
                   height:15%;
                   width:100%;                   
                   text-align: right;
                   margin-top: 20px;
                   margin-left:20px;
                   margin-right:10px; 
                  ">

                   <h3>${detailsCompany.name}</h3>
                   <h4>${detailsCompany.address}</h4>
                   <h4>CEP ${detailsCompany.postal_cod} - ${detailsCompany.state} - ${detailsCompany.country} - ${detailsCompany.phone} - ${detailsCompany.web_site}</h4>
              
                </div>
             
            </div>             
                                     
         </div>   
        `




















 `  ----------------------------------------------------------------------
             }else if (
                item.img_one_rpt    ==! null
              & item.img_two_rpt    === null  
              & item.img_three_rpt  === null 
              & item.img_four_rpt   === null
             ){      
            `  

              <div            
               style="               
               height:50%;
               width:100%;              
               margin-bottom: 20px;
             "> 

                  <div>
                    <img src="data:image/png;base64,${item.img_one_rpt}"                    
                     style="width:400px;height:400px; border-color:transparent;"  
                     />                 
                 </div>                 
                
              </div>

              
            ` 
            }else if (
              item.img_one_rpt    ==! null
            & item.img_two_rpt    ==! null  
            & item.img_three_rpt  === null 
            & item.img_four_rpt   === null
            ){ 
            `    
            
            
            <div            
             style="
             display:flex;
             justify-content: space-around;
             height:50%;
             width:100%;              
             margin-bottom: 20px;
           "> 

                <div>
                  <img src="data:image/png;base64,${item.img_one_rpt}"                    
                   style="width:400px;height:400px; border-color:transparent;"  
                   />                 
               </div>                 
              
            </div>   


            <div            
             style="
             display:flex;
             justify-content: space-around;
             height:50%;
             width:100%;              
             margin-bottom: 20px;
           "> 

                <div>
                  <img src="data:image/png;base64,${item.img_two_rpt}"                    
                   style="width:400px;height:400px; border-color:transparent;"  
                   />                 
               </div>                 
              
            </div>   
            
            
            
          `
          }else if (
            item.img_one_rpt    ==! null
          & item.img_two_rpt    ==! null  
          & item.img_three_rpt  ==! null 
          & item.img_four_rpt   === null
          ){             
          `

              <div            
               style="
               display:flex;
               justify-content: space-around;
               height:25%;
               width:100%;              
               margin-bottom: 20px;
             "> 

                  <div>
                    <img src="data:image/png;base64,${item.img_one_rpt}"                    
                     style="width:260px;height:260px; border-color:transparent;"  
                     />                 
                 </div>

                  <div>
                    <img src="data:image/png;base64,${item.img_two_rpt}"                    
                     style="width:260px;height:260px; border-color:transparent;"  
                    />                
                  </div>   
                
              </div>
                 
           
              <div            
                style="
                display:flex;
                justify-content: space-around;
                height:56%;
                width:100%;              
              "> 
            
                <div>
                    <img src="data:image/png;base64,${item.img_three_rpt}"                    
                     style="width:400px;height:400px; border-color:transparent;"  
                  />                 
                </div>                

              </div>



*/














