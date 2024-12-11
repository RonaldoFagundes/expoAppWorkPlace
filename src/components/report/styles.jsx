import { StyleSheet } from 'react-native';


export default StyleSheet.create({

   containerLoading: {
      flex: 1,
      backgroundColor: '#F5F5F5',
      paddingBottom: 200,
      justifyContent: 'center',
      alignItems: 'center'
   },

   containerMain: {
      flexDirection: 'column',
      height: '100%',
      width: 'auto',
      paddingTop: 30,
   },

   containerHeader: {
      height: 'auto',
      width: 'auto',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 12,
      borderRadius: 10,
      //backgroundColor: 'rgba(215, 202, 165, 0.22)',
      backgroundColor: 'rgba(184, 181, 180, 0.2)', 
   },

   imgLogo: {
      height: 80,
      width: 80,
      resizeMode:'contain',
      borderRadius: 10,
      marginRight: 10
   },

   userHeader: {
      height: 'auto',
      width: "auto",
      padding: 10,
      borderRadius: 10,
      backgroundColor: 'transparent',
      textAlign: 'center'
   },

   contentStatus: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding:10,
      marginTop:30,
      marginBottom:20
      
   },

   imgStatus: {
      height: 40,
      width: 40,
      borderRadius: 10,
      marginRight: 10
   },

   containerInfo: {
      borderRadius: 10,
      padding: 10,
      alignItems: 'center',
      height: 'auto',
      width: 'auto',
   },



   dataList: {
      width: "auto",
      height: "auto",
      backgroundColor: 'rgba(106, 103, 102, 0.4)', 
      padding: 10,    
      borderRadius: 4,
      margin: 10,
      flexDirection: 'column',  
      borderRadius: 6,
      shadowColor: 'black',    
      elevation: 4,     
      },

   contentData: {
      flexDirection: 'column',
      width: '100%',
      padding:10 ,  
      backgroundColor: '#ffffff',
      borderRadius:10     
   },  
  

   contentImg: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      marginBottom: 30,
      padding:10,
      width: '100%',
   },

   resizeModel: {     
      height: 140,
      width: 140,
      borderRadius: 10,
   },


   textInfo: {
      color: '#4E1313',
      fontWeight: 'bold',
      fontSize: 16,
   },

   textAlert: {
      color: '#000000',
      fontWeight: 'bold',
      fontSize: 14,
   },

   textMain: {
      color: '#000000',
      fontWeight: 'bold',
      fontSize: 24
   },

   textList: {
      fontSize: 16,
      color: '#000000',  
      fontWeight: 'bold',
      marginBottom: 10
   },



   containerBtn: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 15,
      marginBottom: 20,
      width: "100%",
   },

   btnOne: {
      width: 'auto',
      height: 40,
      justifyContent: 'center',
      borderRadius: 10,
      marginTop: 15,
      marginBottom: 15,
      alignItems: 'center',
      padding: 10,        
   },

   btn: {
      width: '100%',
      height: '100%',
   },

  

});