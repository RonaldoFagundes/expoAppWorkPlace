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
     // backgroundColor: 'rgba(215, 202, 165, 0.22)',
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


   contentList: {
      height: 'auto',
      with: '100%',
      backgroundColor: '#ffffff',
      marginBottom: 5,
      borderRadius: 10,
      flexWrap: 'wrap',
      padding:10
   },

   contentStatus: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 10,
      marginTop: 30,
      marginBottom: 20

   },


   contentImg: {
      height: 'auto',
      width: "auto",
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      borderRadius: 10,
      flexWrap: 'wrap',
      marginTop: 10,
      marginBottom: 30,
   },






   containerBtnIn: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 15,
      marginBottom: 20,
      width: "100%",
   },


   containerBtnOut: {
     // backgroundColor: 'rgba(215, 202, 165, 0.22)',
      backgroundColor: 'rgba(184, 181, 180, 0.2)', 
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 15,
      marginBottom: 5,
   },



   boxImg: {
      backgroundColor: 'transparent',
      marginBottom: 10,
      marginRight: 10
   },

   resizeModel: {
      resizeMode: 'contain',
      height: 140,
      width: 140,
      borderRadius: 10,
      marginRight: 10,
   },



   imgStatus: {
      height: 40,
      width: 40,
      borderRadius: 10,
      marginRight: 10
   },

  

   textAlert: {
      color: '#000000',
      fontWeight: 'bold',
      fontSize: 14,
   },

   textData: {   
      color: '#000000',
      fontSize: 16,
      fontWeight: 'bold',    
      marginBottom: 10,
      textAlign:'justify',
      
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


   btnOne: {
      width: 'auto',
      height: 40,
      justifyContent: 'center',
      borderRadius: 10,
      marginTop: 15,
      marginBottom: 15,
      alignItems: 'center',
      padding: 10,
      backgroundColor: 'gray',
   },


   btn: {
      width: '100%',
      height: '100%',
   },
  


});