import { ChangeEventHandler, FormEvent} from 'react'
import { LineData } from '../types/table-data';
import { FaCheck } from "react-icons/fa";
import  { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { DATABASE_ITEMS_URL } from '../const';

type AddProps = {
    addForm:LineData ;
    handleAdd: ChangeEventHandler<HTMLInputElement>;
    handleNewLine: (newLine: LineData) => void;
}

export function AddNewLine({ addForm, handleAdd, handleNewLine } : AddProps) {
    let { taskId, taskRecieved, address, roomNumber, status, taskTheme, excecutor } = addForm

// POST request; calls handleNewLine to add new line to the page
function handleAddForm(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    fetch(DATABASE_ITEMS_URL, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(addForm),
    })
        .then((response) => response.json())
        .then((data) => {
        return handleNewLine(data)
        })
}

    return (
        <div>
            <form
                onSubmit={handleAddForm}
                style={{marginTop:"80px"}}
             >
                <input type="text" name="taskId" value={taskId} onChange={handleAdd} id="taskId"/>
                <input type="text" name="taskRecieved" value={taskRecieved} onChange={handleAdd} id="taskRecieved"/>
                <input type="text" name="address" value={address} onChange={handleAdd} id="address"/>
                <input type="text" name="roomNumber" value={roomNumber} onChange={handleAdd} id="roomNumber"/>
                <input type="text" name="status" value={status} onChange={handleAdd} id="status"/>
                <input type="text" name="taskTheme" value={taskTheme} onChange={handleAdd} id="taskTheme" />
                <input type="text" name="excecutor" value={excecutor} onChange={handleAdd} id="excecutor" />
                <button
                    className="btn btn-outline-success"
                    type="submit"
                    id="save"
                    style={{marginLeft: '0px'}}
                >
                    <FaCheck/>
                </button>
            </form>
            <ReactTooltip content="Add taskId" anchorId="taskId">
            </ReactTooltip>
            <ReactTooltip content="Add taskRecieved" anchorId="taskRecieved">
            </ReactTooltip>
            <ReactTooltip content="Add address" anchorId="address">
            </ReactTooltip>
            <ReactTooltip content="Add roomNumber" anchorId="roomNumber">
            </ReactTooltip>
            <ReactTooltip content="Add status" anchorId="status">
            </ReactTooltip>
            <ReactTooltip content="Add taskTheme" anchorId="taskTheme">
            </ReactTooltip>
            <ReactTooltip content="Add excecutor" anchorId="excecutor">
            </ReactTooltip>
            <ReactTooltip content="Save the data" anchorId="save">
            </ReactTooltip>

        </div>
    )
}