import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Home from './components/home';
import CadConstruction from './components/cadConstruction';
import CadReport from './components/cadReport';
import Report from './components/report';
import SelectReport from './components/selectReport';
import EditReport from './components/editReport';
import DuplicateReport from './components/duplicateReport';

export default function Routes() {

  return (

    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name='Home'
        component={Home}
      />
      <Stack.Screen
        name='CadConstruction'
        component={CadConstruction}
      />
      <Stack.Screen
        name='CadReport'
        component={CadReport}
      />
      <Stack.Screen
        name='Report'
        component={Report}
      />
      <Stack.Screen
        name='SelectReport'
        component={SelectReport}
      />
      <Stack.Screen
        name='EditReport'
        component={EditReport}
      />
      <Stack.Screen
        name='DuplicateReport'
        component={DuplicateReport}
      />
    </Stack.Navigator>
  )
};
