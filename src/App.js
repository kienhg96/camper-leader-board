import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class Navbar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <nav>
                <div className="nav-wrapper light-blue lighten-1">
                    <a href="#" className="brand-logo center">Freecodecamp Camper Leader board</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                    </ul>
                </div>
            </nav>
        )
    }
}

class Description extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="row">
                <div className="col s12 m4">
                    <div className="card  light-blue darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Markdown</span>
                            <p>This is a Freecodecamp project made by <a style={{color: "white"}} href="#">Hoang Kien</a>
                            </p>
                        </div>
                        <div className="card-action">
                            <a href="https://github.com/kienhg96/camper-leader-board" target="_blank">Github</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
            ]
        }
        $.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
            .done((data) => {
                this.setState({
                    data: data
                });
            });
        this.getLast30Days = this.getLast30Days.bind(this);
        this.getAllTime = this.getAllTime.bind(this);

    }
    getLast30Days() {
        $.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
            .done((data) => {
                this.setState({
                    data: data
                });
            });
    }
    getAllTime() {
        $.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
            .done((data) => {
                this.setState({
                    data: data
                });
            });
    }
    render() {
        return (
            <div className="container">
                <table className="striped">
                    <thead>
                        <tr>
                            <th data-field="id">No.</th>
                            <th data-field="name">Camper Name</th>
                            <th data-field="price"><a href="#" onClick={this.getLast30Days}>Points in past 30 days</a></th>
                            <th data-field="price"><a href="#" onClick={this.getAllTime}>All time points</a></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map((elem, index) => {
                                return (
                                    <tr>
                                        <td>{index}</td>
                                        <td><img className="avatar" src={elem.img}/><span>{elem.username}</span></td>
                                        <td>{elem.recent}</td>
                                        <td>{elem.alltime}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navbar/>
                <Main/>
                <Description/>
            </div>
        );
    }
}

export default App;
