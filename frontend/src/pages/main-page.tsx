import  { ChangeEvent, useMemo, useState } from "react"
import { TableLine } from "../components/table-line";
import { Spinner } from "../components/loading";
import { LinesData, LineData} from "../types/table-data";
import './App.css';
import { FaPlus } from "react-icons/fa";
import { useEffect } from "react";
import { getData} from "../server/server-data";
import { ALERT_SHOW_TIME} from "../const";
import {EditCustomer} from "../components/edit-customer";
import { AddNewLine } from "../components/add-new-line";
import  { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "../Pagination";

let PageSize = 10;

function MainPage() {
  //const [campaignStatus, setCampaignStatus] = useState(initialCampaignState);
  const [tableLines, setTableLines] = useState<LinesData | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    if (!tableLines) return;
    return tableLines.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, tableLines]);

  // // state for conditional render of stop button
  // const [stopDisable, setStopDisable] = useState(false);
  // // state for conditional render of start button
  // const [startDisable, setStartDisable] = useState(false);

  // state for conditional render of edit form
  const [isEditing, setIsEditing] = useState(false);
  // state for edit form inputs
  const [editForm, setEditForm] = useState({
    id: 0, taskId: '', taskRecieved: '', address: '', roomNumber: '', status: '', taskTheme: '', excecutor: ''
  })

  // state for conditional render of add form
  const [isAdding, setIsAdding] = useState(false);
   // state for add form inputs
  const [addForm, setAddForm] = useState({
    id: 0, taskId: '', taskRecieved: '', address: '', roomNumber: '', status: '', taskTheme: '', excecutor: ''
  })

  const getInfo = async () => {
    // let campaignStatus = await getCampaignStatus();
    // setCampaignStatus(campaignStatus);
    let data = await getData();
    setTableLines(data);
  }

  useEffect(() => {
    getInfo();
    const timer = setInterval(getInfo, ALERT_SHOW_TIME);
    return () => {
      clearTimeout(timer)
    };
  }, []);

    if (!tableLines) {
      return <Spinner />
    }

  // update data on page after edit
  function onUpdateLine(updatedLine : LineData) {
    if (!tableLines) return;
    const updatedLines = tableLines.map(
      lineData => {
        if (lineData.id === updatedLine.id) {
          return updatedLine
        } else {return lineData}
      }
    )
    setTableLines(updatedLines)
  }

  function handleCustomerUpdate(updatedLine : LineData) {
    setIsEditing(false);
    onUpdateLine(updatedLine);
  }

  // capture user input in edit form inputs
  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    setEditForm({
    ...editForm,
    [evt.target.name]: evt.target.value
    })
  }

  // needed logic for conditional rendering of edit form - shows and hides it when you want
  function changeEditState(lineData : LineData ) {
    if (lineData.id === editForm.id) {
      setIsEditing(isEditing => !isEditing) // hides the form
    } else if (isEditing === false) {
      setIsEditing(isEditing => !isEditing) // shows the form
    }
  }

  // capture the tableLine you wish to edit, set to state
  function captureEdit(clickedCustomer: LineData) {
    if (!tableLines) return;
    let filtered = tableLines.filter(lineData => lineData.id === clickedCustomer.id)
    setEditForm(filtered[0])
  }

  // needed logic for conditional rendering of add form - shows and hides it when you want
  function showAddComponent() {
    if (isAdding === true){
      setIsAdding(isAdding => !isAdding) // hides the form
    } else {
      setIsAdding(isAdding => !isAdding) // shows the form
    }
  }

  function handleAdd(evt: ChangeEvent<HTMLInputElement>) {
    setAddForm({
    ...addForm,
    [evt.target.name]: evt.target.value
    })
  }

  const addRowInTable = () => {
    if (!tableLines) return;
    setIsAdding(false);
    setTableLines([
      ...tableLines,
      { id: tableLines.length + 1, taskId: addForm.taskId, taskRecieved: addForm.taskRecieved, address: addForm.address, roomNumber: addForm.roomNumber, status: addForm.status, taskTheme: addForm.taskTheme, excecutor: addForm.excecutor  }
    ]);
    setAddForm({
      id: 0, taskId: '', taskRecieved: '', address: '', roomNumber: '', status: '', taskTheme: '', excecutor: '',
    })
  };

  // DELETE request; calls handleDelete to delete a tableLine
  const handleDelete = (id: number ) => {
    fetch(`http://localhost:5000/items/${id}`, {
      method: "DELETE",
    })
    .then((response) => {
      if (response.status === 204 && tableLines) {
          setTableLines(tableLines.filter((item) => item.id !== id));
      }
    })
  };

  return(
    <>
    <ToastContainer/>
    <section className = "App">
      <ReactTooltip content="Click to start" anchorId="start-button">
      </ReactTooltip>
      <ReactTooltip content="Click to pause" anchorId="pause-button">
      </ReactTooltip>
      <ReactTooltip content="Click to stop" anchorId="stop-button">
      </ReactTooltip>
      <span>
        <button
          type="button"
          className="btn btn-outline-info"
          onClick = {showAddComponent}
          style={{position:"absolute", top: "18px", right: "200px"}} 
        >
          <FaPlus/>
        </button>
      </span>
      <div>
        {isEditing?
          (<EditCustomer
            editForm={editForm}
            handleChange={handleChange}
            handleCustomerUpdate={handleCustomerUpdate}
          />) : null
        }
        {isAdding?
          (<AddNewLine
            addForm={addForm}
            handleAdd={handleAdd}
            handleNewLine = {addRowInTable}
          />) : null
        }
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">ID Заявки</th>
                <th scope="col">Дата поступления</th>
                <th scope="col">Адрес дома</th>
                <th scope="col">Номер помещения</th>
                <th scope="col">Статус</th>
                <th scope="col">Тема заявки </th>
                <th scope="col">Исполнитель</th>
                <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {currentTableData?.map((lineData) => (
              <TableLine
                key = {lineData.id}
                lineData = {lineData}
                captureEdit={captureEdit}
                changeEditState={changeEditState}
                handleDelete = {handleDelete}
              />
            )) }
          </tbody>
        </table>
      </div>
    </section>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={tableLines.length}
        pageSize={PageSize}
        onPageChange={(page:number) => setCurrentPage(page)}
      />
  </>
 )
}

export default MainPage;
