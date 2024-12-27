import Projects from '../../components/Projects/Projects'
import MainDrawer from "../../components/Home/MainDrawer";



export default function index() {
  return (
    <>
      <MainDrawer component={<Projects/>} />
    </>
  );
}
