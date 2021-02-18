import React, { useRef, useState } from "react";
import AppAPI from "../api/AppAPI";

class Todo extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      completed: false,
      editing: false,
      id: this.props.id,
      name:'',
    }
  }

  handleChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }  

  handleCheck = (e) => {
    this.setState({
      completed: !this.state.completed
    })
  }

  handleEditing = (e) =>{
    this.setState({
      editing: true
    })
  }

  handleDelete(){
       this.deleteTodo(this.state.id)       
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.name != ''){
      this.props.editTask(this.state.id, this.state.name)
    }
    this.setState({editing: false, name: ''});   
  }

  editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={this.state.id}>
          New name for {this.state.name}
        </label>
        <input
            id={props.id}
            className="todo-text"
            type="text"
            value={newName}
            onChange={handleChange}
            />
      </div>
      <div className="btn-group">
      <button
        type="button"
        className="btn todo-cancel"
        onClick={() => this.setState({
          editing: true
        })}
        >
        Cancel
        <span className="visually-hidden">renaming {this.state.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {this.state.name}</span>
        </button>
      </div>
    </form>
  );

  viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
          <input
            id={this.state.id}
            type="checkbox"
            defaultChecked={this.state.completed}
            onChange ={this.handleCheck}
          />
          <label className="todo-label" htmlFor={this.state.id}>
            {this.state.name}
          </label>
        </div>
        <div className="btn-group">
        <button type="button" className="btn" onClick={this.handleEditing}>
            Edit <span className="visually-hidden">{this.state.name}</span>
        </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={this.handleDelete}
          >
            Delete <span className="visually-hidden">{this.state.name}</span>
          </button>
        </div>
    </div>
  );

  render() {
    return(
      <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
    //   (
    //     <li className="todo stack-small">
    //       <div className="c-cb">
    //       <input
    //           id={props.id}
    //           type="checkbox"
    //           defaultChecked={props.completed}
    //           onChange={() => props.toggleTaskCompleted(this.state.id)}
    //           />
    //           <label className="todo-label" htmlFor={this.state.id}>
    //           {props.name}
    //           </label>
    //       </div>
    //       <div className="btn-group">
    //       <button type="button" className="btn" onClick={this.handleEditing}>
    //   Edit <span className="visually-hidden">{this.state.name}</span>
    //   </button>
    //         <button
    //           type="button"
    //           className="btn btn__danger"
    //           onClick={this.handleDelete}
    //           >
    //           Delete <span className="visually-hidden">{this.state.name}</span>
    //       </button>
    //       </div>
    //     </li>
    );
  }
}

export default Todo;

// export default function Todo(props) {

//     const [isEditing, setEditing] = useState(false);
//     const [newName, setNewName] = useState('');

//     function handleChange(e) {
//         setNewName(e.target.value);
//       }
      
//     const editingTemplate = (
//         <form className="stack-small" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label className="todo-label" htmlFor={props.id}>
//               New name for {props.name}
//             </label>
//             <input
//                 id={props.id}
//                 className="todo-text"
//                 type="text"
//                 value={newName}
//                 onChange={handleChange}
//                 />
//           </div>
//           <div className="btn-group">
//           <button
//             type="button"
//             className="btn todo-cancel"
//             onClick={() => setEditing(false)}
//             >
//             Cancel
//             <span className="visually-hidden">renaming {props.name}</span>
//             </button>
//             <button type="submit" className="btn btn__primary todo-edit">
//               Save
//               <span className="visually-hidden">new name for {props.name}</span>
//             </button>
//           </div>
//         </form>
//       );

//       const viewTemplate = (
//         <div className="stack-small">
//           <div className="c-cb">
//               <input
//                 id={props.id}
//                 type="checkbox"
//                 defaultChecked={props.completed}
//                 onChange={() => props.toggleTaskCompleted(props.id)}
//               />
//               <label className="todo-label" htmlFor={props.id}>
//                 {props.name}
//               </label>
//             </div>
//             <div className="btn-group">
//             <button type="button" className="btn" onClick={() => setEditing(true)}>
//                 Edit <span className="visually-hidden">{props.name}</span>
//             </button>
//               <button
//                 type="button"
//                 className="btn btn__danger"
//                 onClick={() => props.deleteTask(props.id)}
//               >
//                 Delete <span className="visually-hidden">{props.name}</span>
//               </button>
//             </div>
//         </div>
//       );

//       function handleSubmit(e) {
//         e.preventDefault();
//         props.editTask(props.id, newName);
//         setNewName("");
//         setEditing(false);
//       }

//      return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;(
//       <li className="todo stack-small">
//         <div className="c-cb">
//         <input
//             id={props.id}
//             type="checkbox"
//             defaultChecked={props.completed}
//             onChange={() => props.toggleTaskCompleted(props.id)}
//             />
//             <label className="todo-label" htmlFor={props.id}>
//             {props.name}
//             </label>
//         </div>
//         <div className="btn-group">
//         <button type="button" className="btn" onClick={() => setEditing(true)}>
//     Edit <span className="visually-hidden">{props.name}</span>
//     </button>
//           <button
//             type="button"
//             className="btn btn__danger"
//             onClick={() => props.deleteTask(props.id)}
//             >
//             Delete <span className="visually-hidden">{props.name}</span>
//         </button>
//         </div>
//       </li>
//     );
//   }