import { StyleSheet } from "react-native";



export default StyleSheet.create({

  containerMain: {
    flexDirection: 'column',
    height: '100%',
    width: 'auto',
    paddingTop: 50,    
  },


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


 
  contentMain: {
    flexDirection: 'column',
    alignItems: 'center', 
    //backgroundColor: 'rgba(215, 202, 165, 0.22)',
    borderRadius: 10,
    height: "100%",
    width: 'auto',
    paddingTop:20,
    
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

/*
  containerImg: {
    width: 140,
    height: 140,
    borderRadius: 10,
    marginBottom: 30
  },

  boxImg: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    marginBottom: 10,
    marginRight: 10,
    backgroundColor:'red'
},
*/


  input: {
    width: '80%',
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

