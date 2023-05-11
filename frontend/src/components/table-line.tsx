import { LineData} from "../types/table-data";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";

type LineProps = {
    lineData: LineData;
    captureEdit: (clickedCustomer: LineData) => void ;
    changeEditState:(lineData : LineData) => void;
    handleDelete: (id: number) => void; 
  }

export function TableLine ({lineData, captureEdit, changeEditState, handleDelete}: LineProps){

  function confirmedDeletion (){
    const result = window.confirm("Подтвердите удаление");
    if (result) {
      handleDelete(lineData.id);
    }
  }
  
  return (
  <>
    <tr 
      key={lineData.id}
      style={{position: "relative"}}
    >
      <td>{lineData.taskId}</td>
      <td>{lineData.taskRecieved}</td>
      <td>{lineData.address}</td>
      <td>{lineData.roomNumber}</td>
      <td>{lineData.status}</td>
      <td>{lineData.taskTheme}</td>
      <td>{lineData.excecutor}</td>
      <td>
        <button
          type="button"
          className="btn btn-outline-warning"
          //style={{height: "30px"}} 
          onClick={() => {
            captureEdit(lineData);
            changeEditState(lineData)
          }}
        >
          <FaRegEdit style={{ marginBottom: "10px"}} />
        </button >
        <button
          type="button"
          className="btn btn-outline-danger"
          style={{ height: "30px"}} 
          onClick={confirmedDeletion}
        >
          <FaTrashAlt style={{ marginBottom: "10px"}} />
        </button >
        </td>
    </tr>
  </>
  )
}