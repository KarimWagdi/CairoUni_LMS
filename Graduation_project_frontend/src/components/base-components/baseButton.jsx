import './baseButton.css'

export default function BaseButton({name, handelSubmit}) {
  return (
    <>
      <div className="base-button" onClick={handelSubmit}>{name}</div>
    </>
  );
}
