import React, { Component } from 'react';
import axios from 'axios';

class TableIso extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isos: '',
            activePage: 1, 
        }
    }

    downloadDocumentFile = (e, nameFile) => {
        e.preventDefault();
        var token = localStorage.getItem('token');
        axios.get(`http://127.0.0.1:8000/api/system/iso/download/` + nameFile,
        {
            headers: { 'Authorization': 'Bearer ' + token}
        }).then(res => {
            if(res.data.error != null){
                console.log(res.data.message);
            }else{
                console.log(res);
                // var url = window.URL.createObjectURL(new Blob([res.data]));
                // var linkTag = document.createElement('a');
                // linkTag.href = url;
                // linkTag.setAttribute('download', nameFile);
                // document.body.appendChild(linkTag);
                // linkTag.click();
            }
        }).catch(function (error) {
          alert(error);
        });
    }

    deleteIso = (event,idDelete) => {
        event.preventDefault();
        var token = localStorage.getItem('token');
        axios.post(`http://127.0.0.1:8000/api/system/iso/delete`,
        {
            id : idDelete,
        },
        {
            headers: { 'Authorization': 'Bearer ' + token}
        }).then(res => {
            if(res.data.error != null){
                console.log(res.data.message);
            }else{
                console.log(res.data);
                this.setState({isos : res.data.isos});
            }
        }).catch(function (error) {
          alert(error);
        });
    }

    loadDataToTable = (pageNumber) => {
        var isos = this.state.isos;
        var locationStart = pageNumber * 8 - 8;
        return Object.values(isos).map((value, key) => {
            if ((key >= locationStart)&&(key<= (locationStart + 7))){
                return (
                <React.Fragment key={key}>
                           <tr className="tr-shadow">
                            <td>
                                <label className="au-checkbox">
                                <input type="checkbox" />
                                <span className="au-checkmark" />
                                </label>
                            </td>
                            <td className="desc">{value.name}</td>
                            <td className="desc">{value.year}</td>
                            <td className="desc">{value.content.substr(0, 50) + ' ...'}</td>
                            <td className="desc">{value.updated_at}</td>
                            <td >
                                <div className="table-data-feature">
                                    <button
                                        className="item"
                                        data-toggle="modal"
                                        data-placement="top"
                                        title="Detail"
                                    >
                                        <i className="fas fa-eye"></i>
                                    </button>
                                    <button
                                        className="item"
                                        data-toggle="modal"
                                        data-placement="top"
                                        title="Document"
                                        onClick={(e)=> this.downloadDocumentFile(e, value.name_download)}
                                    >
                                        <i className="fas fa-cloud-download-alt"></i>
                                    </button>
                                    <button
                                        className="item"
                                        data-toggle="modal"
                                        data-placement="top"
                                        title="Process"
                                    >
                                        <i className="fas fa-plus-circle"></i>
                                    </button>
                                    <button
                                        className="item"
                                        data-toggle="modal"
                                        data-placement="top"
                                        title="Delete"
                                        onClick={(e)=> this.deleteIso(e, value.id)}
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                    <button
                                        className="item"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="More"
                                    >
                                        <i className="zmdi zmdi-more" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr className="spacer" />
                </React.Fragment>
                )
            }else{
                return <tr key={key}></tr>;
            }
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.reload){
            var token = localStorage.getItem('token');
            axios.get(`http://127.0.0.1:8000/api/system/iso/`,
            {
                headers: { 'Authorization': 'Bearer ' + token, 'content-type': 'multipart/form-data'}
            }).then(res => {
              if(res.data.error != null){
                  console.log(res.data.message);
              }else{
                  console.log(res.data);
                  this.setState({isos: res.data.isos});
              }
            }).catch(function (error) {
              alert(error);
            }); 
        }
    }

    UNSAFE_componentWillMount() {
        var token = localStorage.getItem('token');
        axios.get(`http://127.0.0.1:8000/api/system/iso/`,
        {
            headers: { 'Authorization': 'Bearer ' + token, 'content-type': 'multipart/form-data'}
        }).then(res => {
          if(res.data.error != null){
              console.log(res.data.message);
          }else{
              console.log(res.data);
              this.setState({isos: res.data.isos});
          }
        }).catch(function (error) {
          alert(error);
        });
    }

    render() {
        return (
            <div className="table-responsive table-responsive-data2">
                <table className="table table-data2">
                    <thead>
                        <tr>
                            <th/>
                            <th>Name</th>
                            <th>Year</th>
                            <th>content</th>
                            <th>Updated At</th>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        {this.loadDataToTable(this.state.activePage)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TableIso;
