import Template from '../../components/profile/Template'
import MainDrawer from "../../components/Home/MainDrawer";


export default function index() {
  return (
    <>
      <MainDrawer component={<Template/>}/>
    </>
  );
}
