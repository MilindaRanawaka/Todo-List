import React from 'react';
import './App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FlipMove from 'react-flip-move';
import ParticlesBg from "particles-bg";

toast.configure();
class App extends React.Component {
    constructor(props) {
        super(props);

        this.state= {
            newTask: "",
            list: [],
            completedList: [],
            button: "Add",
            btnClass: "btn btn-primary"
        }
    }

    componentDidMount() {
        toast("Click Task Text to Make it Completed Task");
    }

    addTask(){
        if(this.state.newTask != ""){
            const newTask={
                id: Date.now(),
                value: this.state.newTask.slice()
            };

            const list = [...this.state.list];

            list.push(newTask);

            this.setState({
                list,
                newTask: "",
                button: "Add",
                btnClass: "btn btn-primary"
            });
        }
    }

    updateInput(key, value){
        this.setState({
            [key]: value
        });
    }
    deleteTask(id){
        const list = [...this.state.list];

        const updatedList = list.filter(item => item.id !== id);

        this.setState({list: updatedList});
    }

    editTask(id){

        this.setState({
            button: "Edit",
            btnClass: "btn btn-success"
        });

        const list = [...this.state.list];
        // eslint-disable-next-line array-callback-return
        list.map(item => {
            if(item.id === id){
                this.setState({newTask: item.value})
            }
        });

        const updatedList = list.filter(item => item.id !== id);

        this.setState({list: updatedList});
    }

    completedTask(id){
        const list = [...this.state.list];
        const completedList = [...this.state.completedList];

        // eslint-disable-next-line array-callback-return
        list.map(item => {
            if(item.id === id){
                const newTasks={
                    id: Date.now(),
                    value: item.value
                };
                completedList.push(newTasks);
            }
        });

        const updatedList = list.filter(item => item.id !== id);

        this.setState({
            list: updatedList,
            completedList
        });
    }

    deleteDoneTask(id){
        const completedList = [...this.state.completedList];

        const updatedList = completedList.filter(item => item.id !== id);

        this.setState({completedList: updatedList});
    }

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.addTask();
        }
    };

  render() {
    return (
        <div>
            <h1 className="hello">Online Todo App</h1>
            <div className="container-fluid">
                <ParticlesBg type="circle" bg={true} />
                <div className="row">
                    <div className="col-md-4 form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="text" placeholder="Add New Item..." onKeyDown={this._handleKeyDown} value={this.state.newTask} onChange={e => this.updateInput("newTask",e.target.value)}/>
                        <button className={this.state.btnClass} onClick={() => this.addTask()}> {this.state.button}</button>
                    </div>
                    <div className="col-md-8">
                        <div style={{"border": "thin solid #000000", "padding": "10px"}}>
                            <h5>Task List</h5>
                            <br/>
                            <FlipMove>
                            {this.state.list.reverse().map(item => {
                                return(
                                    <div className="data-item" key={item.id}>
                                        <p title="Click Me for Finish This Task" onClick={() => this.completedTask(item.id)} style={{"display": "inline-block", "paddingRight": "10px"}}>
                                            {item.value}
                                        </p>
                                        <span className="edit-span" onClick={() => this.editTask(item.id)}>
                                            <i className="fas fa-edit"/>
                                        </span>
                                        <span className="delete-span" onClick={() => this.deleteTask(item.id)}>
                                            <i className="far fa-trash-alt"/>
                                        </span>
                                    </div>
                                )
                            })}
                            </FlipMove>
                        </div>
                        <br />
                        <div style={{"border": "thin solid #000000", "padding": "10px"}}>
                            <h5>Completed Task List</h5>
                            <br/>
                            <FlipMove>
                            {this.state.completedList.map(item => {
                                return(
                                    <div className="data-item" key={item.id}>
                                        <p style={{"display": "inline-block", "paddingRight": "10px"}}>
                                            <strike>
                                                {item.value}
                                            </strike>
                                        </p>
                                        <span className="delete-span" onClick={() => this.deleteDoneTask(item.id)}>
                                            <i className="far fa-trash-alt"></i>
                                        </span>
                                    </div>
                                )
                            })}
                            </FlipMove>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default App;
