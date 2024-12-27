import Survey from '../../components/Survey/Survey'
import MainDrawer from "../../components/Home/MainDrawer";


export default function index() {
  return (
    <>
      <MainDrawer component={<Survey/>}/>
    </>
  );
}
