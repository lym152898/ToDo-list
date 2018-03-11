import * as React from "react";
import * as ReactDom from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import * as $ from "jquery";
import "../styles/App.css";

export class App extends React.Component<any, IState>{

    constructor(props) {
        super(props);
        this.state = {
            currentTask: "",
            tasks: []
        };
    }

    public handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        // 避免自动刷新操作
        e.preventDefault();
        this.setState({
            tasks: [
                ...this.state.tasks,
                {
                    id: this._inMilliseconde(),
                    value: this.state.currentTask,
                    createTime: new Date(),
                    finishTime: null,
                    isCompleted: false
                }
            ],
            currentTask: ""
        })
    }

    public renderUncompletedTask() {
        // 未完成任务
        let uncompletedTask: ITask[] = this.state.tasks.filter((task) => task.isCompleted === false);
        return uncompletedTask.map((task: ITask, index: number) => {
            return (
                <div className="row align-center task" key={task.id}>
                    <div className="col-md-6 text-center">{task.value}</div>
                    <div className="col-md-3 text-center">{this._timeString(task.createTime)}</div>
                    <div className="col-md-3 text-center">
                        <button className="btn btn-danger">删除</button>
                        <button className="btn btn-primary">完成</button>
                    </div>
                </div>
            );
        });
    }

    public renderCompletedTask(): JSX.Element[] {
        // 未完成任务
        let uncompletedTask: ITask[] = this.state.tasks.filter((value: ITask, index: number) => value.isCompleted === true);
        return uncompletedTask.map((task: ITask, index: number) => {
            return (
                <div className="row align-center task" key={task.id}>
                    <div className="col-md-6 text-center">{task.value}</div>
                    <div className="col-md-3 text-center">{this._timeString(task.finishTime)}</div>
                    <div className="col-md-3 text-center">
                        <button className="btn btn-danger">删除</button>
                        <button className="btn btn-primary">重做</button>
                    </div>
                </div>
            );
        });
    }
    // 获取正在进行任务的数量
    private _getUncompleteTaskNum(): number{
        return this.state.tasks.filter((task: ITask) => task.isCompleted === false).length;
    }

    // 获取已经完成任务的数量
    private _getCompleteTaskNum(): number{
        return this.state.tasks.length - this._getUncompleteTaskNum();
    }
    private _inMilliseconde(): number {
        let date: Date = new Date();
        return date.getTime();
    }

    private _timeString(date: Date): string{
        let year: number = date.getFullYear();
        let month: number = date.getMonth() + 1;
        let day: number = date.getDate();
        let time: string = date.toLocaleTimeString();
        return year + "-" + month + "-" + day + " " + time;
    }
    public render(): JSX.Element {
        return (
            <div className="container">
                <h3 className="text-center text-primary header-text"><big>ToDo</big><small className="text-secondary">你需要完成的任务</small></h3>
                <hr />
                <form className="form input-text">
                    <div className="row text-center">
                        <div className="col-md-9">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="添加一个任务"
                                value={this.state.currentTask}
                                onChange={(e) => this.setState({ currentTask: e.target.value })}
                            />
                        </div>
                        <div className="col-md-3">
                            <button type="submit" className="btn btn-primary" onClick={(e) => this.handleSubmit(e)}>添加</button>
                        </div>
                    </div>
                </form>

                <div>
                    <span className="text-primary"><big>正在进行</big></span>
                    <p className="badge badge-danger">{this._getUncompleteTaskNum()}</p>
                </div>
                <div className="row align-center">
                    <div className="col-md-6 text-center">任务</div>
                    <div className="col-md-3 text-center">创建时间</div>
                    <div className="col-md-3 text-center">操作</div>
                </div>
                <section>
                    {this.renderUncompletedTask()}
                </section>
                <hr />
                <div>
                    <span className="text-primary"><big>已经完成</big></span>
                    <p className="badge badge-success">{this._getCompleteTaskNum()}</p>
                </div>
                <div className="row align-center">
                    <div className="col-md-6 text-center">任务</div>
                    <div className="col-md-3 text-center">完成时间</div>
                    <div className="col-md-3 text-center">操作</div>
                </div>
                <div>
                    {this.renderCompletedTask()}
                </div>
            </div>
        )
    }
}

interface IState {
    currentTask: string,
    tasks: ITask[]
}

interface ITask {
    id: number,
    value: string,
    isCompleted: boolean,
    createTime: Date,
    finishTime: Date
}