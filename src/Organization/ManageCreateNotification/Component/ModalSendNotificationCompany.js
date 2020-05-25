import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Select from "react-select";
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import * as host from '../../Url'
import {connect} from  'react-redux';
const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled ? "red" : "#FFF",
      color: "black",
      cursor: isDisabled ? "not-allowed" : "default",
      fontFamily: "normal",
    };
  },
};

class ModalSendNotificationCompany extends Component {
    _isMounted = false;
    state = {
        listEmployees : [],
        selectedOptions: [],
        isDisplayAlert: false,
        errorSelect: {},
    };

    getAllEmployeeAccount = () => {
        this._isMounted = true;
        var self = this;
        var token = localStorage.getItem("token");
        axios
          .get(host.URL_BACKEND + "/api/company/notification/account/list/" + token, {
            headers: { Authorization: "Bearer " + token },
          })
          .then(function (response) {
            if(self._isMounted){
              if (response.data.error != null) {
                console.log(response.data.error);
              } else {
                var options = [];
                var employees = response.data.employees;
                for (var i = 0; i < employees.length; i++) {
                  options.push({
                    label: employees[i].name + "-" + employees[i].email,
                    value: employees[i].account_id,
                  });
                }
                self.setState({
                  listEmployees: options,
                });
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      };

    componentDidMount() {
        this.getAllEmployeeAccount()
    }

    handleChangeReceiver = (selectedOptions) => {
        this.setState({
            selectedOptions,
        });
    };
    saveSendNotification = () => {
        this.setState({
            errorSelect: {},
        });
        if (this.state.selectedOptions.length === 0) {
            var errorNoReceiver = {
                selectedOption: "Select receiver is required.",
            };
            this.setState({
                errorSelect: errorNoReceiver,
            });
        }
        if(
            this.state.selectedOptions.length !== 0
        ){
            var self = this;
            var token = localStorage.getItem('token');
            axios.post(host.URL_BACKEND+'/api/company/notification/account/send', {
              selectedOptions: this.state.selectedOptions,
              idNotification: this.props.idNotification,
            },{
                headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(function (response) {
                if (response.data.error != null) {
                    console.log(response.data.error);
                }else{
                    self.setState({
                        selectedOptions: [],
                        isDisplayAlert : true,
                        errorSelect: {},
                    });
                    setTimeout(() => {
                        self.setState({isDisplayAlert : false});
                    }, 2000);
                    self.props.getListNotification();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    };
    onSubmit = (event) => {
        event.preventDefault();
        this.form.validateAll();
    };
    displayAlert = () =>{
        if(this.state.isDisplayAlert){
            return <Alert severity="success">Gửi thành công</Alert>;
        }else{
            return <div></div>
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        const { selectedOptions } = this.state;
        const {errorSelect} = this.state;
        return (
        <Modal
            size="lg"
            show={this.props.showModal}
            onHide={this.props.close}
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
               Gửi thông báo
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form
                onSubmit={(e) => this.onSubmit(e)}
                ref={(c) => {
                this.form = c;
                }}
            >
                <div className="form-group">
                <label htmlFor="telephone">Người nhận</label>
                <Select
                    styles={colourStyles}
                    isMulti
                    value={selectedOptions}
                    onChange={this.handleChangeReceiver}
                    options={this.state.listEmployees}
                />
                {errorSelect.selectedOption && (
                    <div className="validation" style={{ display: "block",color: "red"}}>
                    {errorSelect.selectedOption}
                    </div>
                )}
                </div>
                <div className="form-group text-left">
                <CheckButton
                    type="submit"
                    className="btn btn-primary mb-2 mr-2"
                    onClick={() => this.saveSendNotification()}
                    ref={(c) => {
                    this.checkBtn = c;
                    }}
                >
                    Gửi
                </CheckButton>
                </div>
            </Form>
            {
                this.displayAlert()
            }
            </Modal.Body>
        </Modal>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        idNotification : state.organizationReducers.notificationCreateReducer.idNotificationChoose,
    }
}

export default connect(mapStateToProps,null)(ModalSendNotificationCompany)
