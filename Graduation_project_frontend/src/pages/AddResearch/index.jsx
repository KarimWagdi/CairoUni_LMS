import MainDrawer from "../../components/Home/MainDrawer";
import AddResearch from "../../components/Researches/AddResearch";

export default function index() {
  return <MainDrawer component={<AddResearch />} />;
}
