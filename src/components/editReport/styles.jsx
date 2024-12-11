import { StyleSheet } from 'react-native';


export default StyleSheet.create({


   containerLoading:{
      flex:1,
      backgroundColor:'#F5F5F5',
      paddingBottom:200,
      justifyContent:'center',
      alignItems:'center'   
 },

 
   containerMain: {
      alignItems: 'center',
      flexDirection: 'column',
      height: '100%',
      //justifyContent: 'center',
      width: 'auto', 
     
   },

   containerHeader: {
      height: 'auto',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 6,
      marginBottom: 10,
      marginTop:40,
      borderRadius: 10,
      backgroundColor: 'rgba(184, 181, 180, 0.2)', 
   },
   
   userHeader: {
      height: 'auto',
      width: "auto",
      padding: 10,
      borderRadius: 10,
      backgroundColor: 'transparent',
      textAlign: 'center'
   },

   containerInfo: {
      borderRadius: 10,
      marginBottom: 15,
      padding: 10,
      alignItems: 'center',
      height: 'auto',
      width: 'auto',
   },


   imgLogo: {     
      height: 80,
      width: 80,
      resizeMode:'contain',
      borderRadius: 10,
      marginRight:10          
   }, 

   boxText:{
       flexDirection:'row',
       justifyContent:'flex-start',
       marginBottom:10
   },
   
   
   textAlert: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 14,
   },

   textData: {
      color: '#4E1313',
      fontWeight: 'bold',
      fontSize: 13,      
   },

   textMain: {
      color: '#5D3806',
      fontWeight: 'bold',
      fontSize: 24
   },

   textInfo: {
      color: '#4E1313',
      fontWeight: 'bold',
      fontSize: 16,
   },



   styleBtnDefault: {
      width: 80,
      height: 40,
      justifyContent: 'center',
      borderRadius: 10,
      marginTop: 15,
      alignItems: 'center',
      padding: 10
   },

   btnOne:{
      width: 'auto',
      height: 50,
      justifyContent: 'center',
      borderRadius: 10,
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
   },
  
   




   btnTwo:{
    width: 'auto',
    height: 80,  
    padding:4,   
    borderRadius: 10, 
    marginBottom: 20,  
  },
  
    


  btnImg: {
    width: "100%",
    height: "100%",
    alignItems: 'center', 
    justifyContent: 'center',
    borderRadius: 10, 
  },
   /*
   btnOne: {
      width: 'auto',
      height: 'auto',
      justifyContent: 'center',
      borderRadius: 10,
      marginTop: 15,
      alignItems: 'center',
      padding: 10,
      marginRight:10
   },
   */


/*
   styleBtnTwo: {
      width: 180,
      height: 40,
      justifyContent: 'center',
      borderRadius: 10,
      marginTop: 15,
      alignItems: 'center',
      backgroundColor: 'red',
      padding: 10
   },
*/

contentImg:{
   flexDirection:'row'
},


resizeModel: {
   resizeMode: 'cover',
   height: 140,
   width: 140,
   borderRadius: 10,
   marginRight: 10,
},






 

 contentData:{
  // backgroundColor:'red',

  // height:'auto',

  // padding:10,

   //paddingBottom:150
},





contentList:{
   width:'auto',
   alignItems:'center'
 
 },



dataList: {   
   alignItems: 'center', 
   //backgroundColor: 'rgba(184, 181, 180, 0.2)',   
   flexDirection: 'column',
   justifyContent: 'center',
   borderRadius: 10,  
   padding: 20,
},


 containerScrool:{ 
   height:'100%',
   padding:10
 },



   containerCheckBox: {             
     // backgroundColor: 'transparent',          
       width: 400,
       height: '20%',    
       marginTop: 10,
       borderWidth: 1,
       borderRadius: 10,
       backgroundColor:'blue'
   },






   contentCheckBox: {
      backgroundColor: 'transparent',     
       flexDirection: 'row',
       justifyContent:'space-between',
       width: 160,
       height: 'auto',
       padding: 20,
       marginTop: 10,
       borderWidth: 1,
       borderRadius: 10,
   },

   


 

  input: {
   borderWidth: 1,
   width: 300,
   height: 'auto',
   color: "black",
   backgroundColor: 'transparent',
   fontSize: 14,
   fontWeight: 'bold',
   borderRadius: 10,
   marginTop: 10,
   marginBottom: 10,
   padding: 4,  
  flexWrap:'wrap',
},

inputSwiitch: {
   borderWidth: 1,
   width: "auto",
   height: 'auto',
   color: "black",
   backgroundColor: 'transparent', 
   fontWeight: 'bold',
   borderRadius: 10,
   marginTop: 10,
   marginBottom: 10,
   padding: 4,  
   flexWrap:'wrap',
},





boxImg: {
  // backgroundColor: 'transparent',
   marginBottom: 10, 
},



containerBtn:{   
    backgroundColor: 'rgba(184, 181, 180, 0.2)', 
    flexDirection: 'row',     
    justifyContent: 'center',
    marginTop:10,   
 },




});