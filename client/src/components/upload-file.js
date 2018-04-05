import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import FormData from 'form-data';
import axios from 'axios';
import BarGraph from './bar-graph'
import Select from 'react-select';
import 'react-select/dist/react-select.css';


export default class Accept extends Component {
    constructor() {
        super();
        this.state = {
            accepted: [],
            rejected: [],
            graphData: {},
            top:false,
            min:false,
            total:false,
            financialGoal : false,
            dropValues : [],
            selectionData :[],
            copyOfGraphData : {}
        };
        this.uploadFile = this.uploadFile.bind(this);
        this.processFile = this.processFile.bind(this);
        this.setGraphDate = this.setGraphDate.bind(this);
        this.setTopTrue = this.setTopTrue.bind(this);
        this.setMinTrue = this.setMinTrue.bind(this);
        this.setTotalTrue = this.setTotalTrue.bind(this);
        this.setSelectionData = this.setSelectionData.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    uploadFile(){
    let uploadApi = 'http://localhost:3000/api/file_upload';
        const data = new FormData();
        if(this.state.accepted.length > 0) {
            data.append('file', this.state.accepted[0]);
            axios.post(uploadApi, data)
                .then(function (response) {
                    alert(JSON.stringify(response.data.message));
                    this.setState({processFileReady: true});
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else{
            alert("Please Upload Any file")
        }
    }

    setGraphDate(data){
        this.setState({
            graphData : data,
            copyOfGraphData: data
        })
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        let processFileApi = 'http://localhost:3000/api/get_teams';
        axios.get(processFileApi)
            .then((response) => {this.setGraphDate(response.data.message);
                alert("total Count = "+JSON.stringify(response.data.message[0].length));
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    setTopTrue(){
        this.setState({
            top : true,
            min : false,
            total : false,
        })
    }

    setMinTrue(){
        this.setState({
            min : true,
            top : false,
            total: false
        })
    }

    setTotalTrue(){
        this.setState({
            total : true,
            top : false,
            min: false
        })
    }

    processFile(){
        let processFileApi = 'http://localhost:3000/api/process_file';
            axios.get(processFileApi)
                .then((response) => {this.setGraphDate(response.data.message);
                    alert("File Has Been Processed");
                    this.makeOptionsToSelect(response.data.message[2])
                    })
                .catch(function (error) {
                    console.log(error);
                });
    }

    setSelectionData(data){
        this.setState({
            selectionData : data
        })
    }

    makeOptionsToSelect(data) {
        let arr = [];
        if (data) {
        data.forEach((item) => {
            let out = {};
            if (item.hasOwnProperty('skill_name')) {
                out['value'] = item['skill_name'];
                out['label'] = item['skill_name'];
                arr.push(out)
            }
        });
    }
    this.setSelectionData(arr);
        //console.log(data)
    }

    render() {
        const { selectedOption } = this.state;
        const value = selectedOption && selectedOption.value;
        return (
                <div>
                    <Dropzone
                        accept="text/csv"
                        onDrop={(accepted, rejected) => { this.setState({ accepted, rejected }); }}>
                        <p>Click Here to select the file or drop it.</p>
                    </Dropzone>
                    <button onClick={this.uploadFile} disabled={this.state.accepted.length === 0}>Upload</button>
                    <button onClick={this.processFile}>Process File</button>
                    <button onClick={this.setTopTrue}>Least Five Skills</button>
                    <button onClick={this.setMinTrue}>Top Five Skills</button>
                    <button onClick={this.setTotalTrue}>Total Skills</button>
                    <div className="row mt-xl-auto">
                        {this.state.top && <BarGraph graphData={this.state.graphData[0]}/>}
                    </div>
                    <div className="row mt-xl-auto">
                        {this.state.min && <BarGraph graphData={this.state.graphData[1]}/>}
                    </div>
                    <div className="row mt-xl-auto">
                        {this.state.total && <BarGraph graphData={this.state.graphData[2]}/>}
                    </div>
                    <Select
                        name="form-field-name"
                        value={value}
                        onChange={this.handleChange}
                        options={this.state.selectionData}
                    />
                </div>
        );
    }
}