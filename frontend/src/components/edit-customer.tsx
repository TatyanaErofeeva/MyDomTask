import { ChangeEventHandler, FormEvent} from 'react'
import { LineData } from '../types/table-data';
import { FaCheck } from "react-icons/fa";
import  { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

type EditProps = {
    editForm:LineData ;
    handleCustomerUpdate: (updatedLine: LineData) => void;
    handleChange: ChangeEventHandler<HTMLInputElement>;
  }

export function EditCustomer({ editForm, handleCustomerUpdate, handleChange } : EditProps) {
    let { id, taskId, taskRecieved, address, roomNumber, status, taskTheme, excecutor } = editForm

// PUT request; calls handleCustomerUpdate to push changes to the page
    function handleEditForm(evt: FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        fetch(`http://localhost:5000/items/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(editForm),
        })
            .then((response) => response.json())
            .then((data) => {
            return handleCustomerUpdate(data)
            })
    }

    return (
        <div>
            <form
             onSubmit={handleEditForm}
             style={{marginTop:"50px", marginLeft: '200px'}}
             >
                <input type="text" name="taskId" value={taskId} onChange={handleChange}/>
                <input type="text" name="taskRecieved" value={taskRecieved} onChange={handleChange}/>
                <input type="text" name="address" value={address} onChange={handleChange}/>
                <input type="text" name="roomNumber" value={roomNumber} onChange={handleChange}/>
                <input type="text" name="status" value={status} onChange={handleChange}/>
                <input type="text" name="taskTheme" value={taskTheme} onChange={handleChange} />
                <input type="text" name="excecutor" value={excecutor} onChange={handleChange} />
                <button className="btn btn-outline-success" type="submit" id="save" style={{marginLeft: '10px'}}>
                    <FaCheck/>
                </button>
            </form>
            <ReactTooltip content="Save the data" anchorId="save">
            </ReactTooltip>
        </div>
    )
}