import React from "react"
import './App.css';
import { useState } from "react";


function App() {

  let [input, setInput] = useState("");//input 
  let [obj, setObj] = useState([]);//store the todo
  let [toggle, setToggle] = useState(true);
  const [idForEdit, setEditId] = useState();



  let addToDo = () => {

    if (input.length === 0) {
      alert("enter Task")
    } else if (input && !toggle) {
      setObj(
        obj.map((e) => {
          if (e.id === idForEdit) {
            return { ...obj, name: input }
          }
          return e;
        })
      )
      setToggle(true);
      setInput("")
      setEditId(null);
    }
    else {
      const allInput = { id: new Date().getTime().toString(), name: input }
      let added = [...obj, allInput]
      setObj(added);
      setInput("")
    }


  }


  let DeleteToDO = (index) => {

    let filtered = obj.filter((value) => index !== value.id);
    setObj(filtered)
    console.log(filtered)
  }



  let editToDo = (id) => {
    const newEditItem = obj.find((value) => {
      return value.id === id
    })

    setToggle(false);
    setInput(newEditItem.name)
    setEditId(id);
  }


  let clearToDo = () => {
    setObj([]);
  }


  return (

    <div className='App'>
      <h1>To Do List</h1>
      <div className="inputbox">
        <div className='input'>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
          {

            toggle ? <button className="btn btn-secondary mx-2" onClick={addToDo}>Add Task</button> :
              <button className="btn btn-success mx-2" onClick={addToDo}>update</button>
          }

        </div>

      </div>



      <div className="box">

        <div className="listBox">
          {
            obj.map((e, i) => (
              <div className='listCard' key={e.id}>

                <div className='task'>
                  <h4>{e.name}</h4>
                </div>

                <div className='edit-delete'>
                 
                  <i className="fa-solid fa-pen-to-square" onClick={() => editToDo(e.id)} ></i>

                  <i className="fa-solid fa-trash-can mx-2" title='delete' onClick={() => DeleteToDO(e.id)}></i>
                </div>

                
              </div>

            ))
          }

        </div>


        <div className='btnBox'>

          <button className='btn btn-danger' onClick={clearToDo}>CLEAR</button>

        </div>

      </div>


    </div>


  );
}

export default App;
