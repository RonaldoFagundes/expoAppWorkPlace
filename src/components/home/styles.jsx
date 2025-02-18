import { StyleSheet } from 'react-native';





export default StyleSheet.create({





   containerLoading: {
      flex: 1,
      backgroundColor: '#F5F5F5',
      paddingBottom: 200,
      justifyContent: 'center',
      alignItems: 'center'
   },


  


   containerHeader: {
      height: 'auto',
      width: 'auto',
      padding:8,    
      alignItems:'center',
      margin:5,
      borderRadius: 14,
      backgroundColor: 'rgba(161, 154, 158, 0.7)',
      //backgroundColor: 'rgba(184, 181, 180, 0.2)',     
   },




   containerInfo: {
      borderRadius: 10,
      padding: 8,
      alignItems: 'center',
      height: 'auto',
      width: 'auto',
   },





   imgLogo: {
      // height: 64,
      // width: 55,  
       height: 84,
       width: 84,   
       borderRadius: 4,
      // marginRight: 10, 
      // marginTop:10
    },






  /*
   userHeader: {
      height: 'auto',
      width: "auto",
      padding: 10,
      borderRadius: 10,
      backgroundColor: 'transparent',
      textAlign: 'center',
   },
  */





   containerMain: {
      flexDirection: 'column',
      height: 'auto',
      width: 'auto',
      
      backgroundColor:'red'
   },




 
 

   
   resizeModel: {   
      height: 100,
      width: 100,   
      marginBottom: 20,
      resizeMode:'contain',
      borderRadius:12
   },






   dataList: {
    borderRadius: 6,
    shadowColor: 'black',    
    elevation: 4,
    margin:4,
   },



   cardList:{
      width: "auto",
      height: "auto",    
      backgroundColor: 'rgba(131, 130, 130, 0.8)',      
      padding: 12,     
      margin: 2,
      borderRadius:10
   },



   textList: {
      fontSize: 16,
      color: '#ffffff',
      fontWeight: 'bold',
   },

   textAlert: {
      color: '#000000',
      fontWeight: 'bold',
      fontSize: 14,
   },

   textMain: {
      color: '#5D3806',
      fontWeight: 'bold',
      fontSize: 16
   },

   textInfo: {
      color: '#4E1313',
      fontWeight: 'bold',
      fontSize: 16,
   },



   containerBtnIn:{    
      flexDirection: 'row',     
      justifyContent: 'center',
      marginTop:15,
      marginBottom:20,
   },




   containerBtnOut:{
     // backgroundColor: 'rgba(215, 202, 165, 0.22)',
     // backgroundColor: 'rgba(184, 181, 180, 0.2)', 

      backgroundColor:'green',
      flexDirection: 'row',     
      justifyContent: 'center',
      marginTop:25,
      margin:5,
      borderRadius:4
      //marginBottom:5,
   },




   btnOne:{
      width: 'auto',
      height: 40,
      justifyContent: 'center',
      borderRadius: 5,
      marginTop: 15,
      marginBottom: 20,
      alignItems: 'center',
      padding: 5,

   },





   btn: {
      width:'100%',
      height:'100%',
      alignItems: 'center',      
      justifyContent: 'center',
      /*
      borderRadius: 10,
      marginTop: 15,
      marginBottom: 20,
      alignItems: 'center',
      padding: 10,
      */       
   },





   btnTwo: {
      width: "30%",
      height: "auto",
      justifyContent: 'center',
      borderRadius: 10,
      marginTop: 15,
      alignItems: 'center',
      padding: 10,
   },






   menu:{
      bottom:'auto',
      height:'auto',
      width:'auto',
      backgroundColor:'red',
      flexDirection:'row',
      justifyContent:'space-around',
      padding:5,
      margin:5,
      borderRadius:4
   }






});