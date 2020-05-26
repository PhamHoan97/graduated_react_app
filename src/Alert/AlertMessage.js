import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import {connect} from "react-redux";

class AlertMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenAlert:false,
            anchorOrigin:this.props.notification.anchorOrigin,
            message:this.props.notification.message,
            title:this.props.notification.title,
            severity:this.props.notification.severity
        };
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            isOpenAlert:nextProps.notification.isOpenAlert,
            anchorOrigin:nextProps.notification.anchorOrigin,
            message:nextProps.notification.message,
            title:nextProps.notification.title,
            severity:nextProps.notification.severity
        })
    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            isOpenAlert:false,
            message:'',
            title:'',
            severity:''
        })
    };
    render() {
        return (
            <div>
                <Snackbar
                    anchorOrigin={this.state.anchorOrigin}
                    open={this.state.isOpenAlert}
                    autoHideDuration={4000}
                    onClose={() => this.setState({isOpenAlert: false})}
                >
                    <Alert onClose={this.handleClose} severity={this.state.severity} >
                        <AlertTitle>{this.state.title}</AlertTitle>
                        {this.state.message}
                    </Alert>
                </Snackbar>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        notification:state.notificationAlertReducer.notification,
    };
};
export default connect(mapStateToProps, null)(AlertMessage);
