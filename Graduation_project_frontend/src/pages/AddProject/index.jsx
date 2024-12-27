import MainDrawer from "../../components/Home/MainDrawer";
import AddProject from "../../components/Projects/AddProject";
export default function index() {
  return <MainDrawer component={<AddProject />} />;
}
