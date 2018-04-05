import React, { Component } from 'react';
import './App.css';
import Uplaod from './components/upload-file'

class App extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="col-xs-12 col-md-12">
                    <div className="row ">
                        <Uplaod/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
