import "./dropdownBase.css";
const DropdownBase = (props) => {
  const {departments,handleSelect}=props

  return (
    <div>
      <label htmlFor="departments" className="label-departments">
        Choose Your Department:
      </label>
      <br />
      <select name="departments" id="departments" className="departments" onChange={handleSelect}>
        {departments.map((item) => {
          return <option key={item.id}>{item.name}</option>;
        })}
      </select>
    </div>
  );
};

export default DropdownBase;
