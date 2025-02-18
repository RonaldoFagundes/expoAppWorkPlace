import { StyleSheet } from "react-native";



export default StyleSheet.create({

  
  containerHeader: {
    height: 'auto',
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 12,
    borderRadius: 10,
    //backgroundColor: 'rgba(215, 202, 165, 0.22)',
    backgroundColor: 'rgba(184, 181, 180, 0.2)',
  },



  containerInfo: {
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    height: 'auto',
    width: 'auto',
  },



  containerMain: {
    flexDirection: 'column',
    height: '100%',
    width: 'auto',
    paddingTop: 50,    
  },

 
  /*
  contentMain: {
    flexDirection: 'column',
    alignItems: 'center', 
    //backgroundColor: 'rgba(215, 202, 165, 0.22)',
    borderRadius: 10,
    height: "100%",
    width: 'auto',
    paddingTop:20,
    
  },
 */



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
      marginBottom:10
   },










  
  containerImg:{
    backgroundColor:'red',

    width:'100%',
    height:'auto',
    padding:10,
    flexDirection:'row',
    justifyContent:'space-between',
    
  },



 
  boxImg: {
    backgroundColor: 'transparent',  
    flexDirection: 'column',
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 30
  },
 



resizeModel: {
    height: 100,
    width: 100,
    borderRadius: 10,
    },




textBtn: {
  color: '#000000',
  fontWeight: 'bold',
  fontSize: 14,
},








contentModal:{
  //flex:1,    
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 10,
  height: 'auto',
  //marginTop: 20,
  width: '98%',
 // backgroundColor: 'rgba(184, 181, 180, 0.2)',      
  backgroundColor: 'green',
  margin:5,
  marginTop:50,
  paddingBottom:10,
  paddingTop:10   
},




containerInput:{
  backgroundColor:'red',
  width:'94%',
  height:'auto',
  borderRadius:10,
  padding:10,
  flexDirection:'column',
  alignItems:'center',
  marginTop:10
},


  input: {
    width: '92%',
    height: 50,
    marginBottom: 16,
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#cc0000",
    borderRadius: 10,
    color: "black",
    backgroundColor: 'white',
    fontSize: 16
  },
 
 

   containerBtn:{  
    width:'100%' , 
    backgroundColor: 'red',
    flexDirection: 'row',     
    justifyContent: 'space-around',
    marginTop:15,
    marginBottom:20,
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




  textMain: {
    color: '#5D3806',
    fontWeight: 'bold',
    fontSize: 18
  },

  textInfo: {
    color: '#663300',
    fontWeight: 'bold',
    fontSize: 14,
  },

  textAlert: {
   color: '#000000',
   fontWeight: 'bold',
   fontSize: 14,
  },

 

});

