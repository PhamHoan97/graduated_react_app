import React, { Component } from 'react';
import '../Css/css.css';
import '../Css/css1.css';
import '../Css/css2.css';
import '../Css/css3.css';
import '../Css/css4.css';
import '../Css/css5.css';
import '../Css/css6.css';
import '../Css/css7.css';
import '../Css/css8.css';
import '../Css/alert.css';
import BackImage from '../Image/backtohome.png';
import FaceBookImage from '../Image/vnl5jkte62ve.png';
import TwiterImage from '../Image/vnl5kd9e62ve.png';
import InImage from '../Image/vnl5mqle62ve.png';
import YoutubeImage from '../Image/vnl5nj1e62ve.png';
import {connect} from 'react-redux';
import {deleteCompanyInformationAfterRegisterInStore} from '../Actions/RegisterActions';
import { Redirect } from 'react-router-dom';


class Alert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            company: '', 
            backToHome: false,
        }
    }

    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    componentWillMount() {
      if(this.props.company !== ''){
        switch (this.props.company.field) {
          case "1":
            this.props.company.field = "Less than 50 employees";
            break;
          case "2":
            this.props.company.field = "From 50 to 100 employees";
          break;
          case "3":
          this.props.company.field = "From 150 to 200 employees";
          break;
          case "4":
            this.props.company.field = "From 200 to 300 employees";
            break;
          case "5":
            this.props.company.field = "More than 300 employees";
            break;
          default:
            break;
        }

         this.setState({company: this.props.company});
      }
    }

    backToHome = event =>{
      this.props.deleteCompanyInformation();
      this.setState({backToHome: true});
    }

    render() {
        if(this.state.backToHome){
          return <Redirect to='/' />;
        }
        return (
            <div>
          <table border={0} align="center" width="100%" cellPadding={0} cellSpacing={0} className="main-template" bgcolor="#e8e8e8" style={{backgroundColor: 'white'}}>
          <tbody>
            <tr style={{display: 'none !important', fontSize: '1px', msoHide: 'all'}}>
              <td />
              <td />
            </tr>
            <tr>
              <td align="center" valign="top">
                <table border={0} cellPadding={0} cellSpacing={0} width="100%" className="templateContainer" style={{maxWidth: '590px!important', width: '590px'}}>
                  <tbody>
                    <tr>
                      <td align="center" valign="top" bgcolor="#e8e8e8" style={{backgroundColor: '#e8e8e8'}}>
                        <div>
                          <table className="rnb-del-min-width" width="100%" cellPadding={0} border={0} cellSpacing={0} bgcolor="#e8e8e8" style={{minWidth: '100%', backgroundColor: '#e8e8e8'}} name="Layout_13" id="Layout_13">
                            <tbody>
                              <tr>
                                <td className="rnb-del-min-width" align="center" valign="top" bgcolor="#e8e8e8" style={{backgroundColor: '#e8e8e8'}} />
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" valign="top" bgcolor="#e8e8e8" style={{backgroundColor: '#e8e8e8'}}>
                        <div>
                          <table className="rnb-del-min-width" width="100%" cellPadding={0} border={0} cellSpacing={0} bgcolor="#e8e8e8" style={{minWidth: '100%', backgroundColor: '#e8e8e8'}} name="Layout_16" id="Layout_16">
                            <tbody>
                              <tr>
                                <td className="rnb-del-min-width" align="center" valign="top" bgcolor="#e8e8e8" style={{backgroundColor: '#e8e8e8'}}>
                                  <table width="100%" border={0} cellPadding={0} cellSpacing={0} className="rnb-container" bgcolor="#2c3675" style={{maxWidth: '100%', minWidth: '100%', tableLayout: 'fixed', backgroundColor: 'rgb(44, 54, 117)', borderRadius: '0px', borderCollapse: 'separate', paddingLeft: '20px', paddingRight: '20px'}}>
                                    <tbody>
                                      <tr>
                                        <td height={20} style={{fontSize: '1px', lineHeight: '1px'}}> </td>
                                      </tr>
                                      <tr>
                                        <td valign="top" className="rnb-container-padding" bgcolor="#2c3675" style={{backgroundColor: '#2c3675'}} align="left">
                                          <table width="100%" border={0} cellPadding={0} cellSpacing={0} className="rnb-columns-container"><tbody><tr><td className="rnb-force-col" width={550} valign="top" style={{paddingRight: '0px'}}>
                                                  <table border={0} valign="top" cellSpacing={0} cellPadding={0} align="left" className="rnb-col-1" width={550}>
                                                    <tbody>
                                                      <tr>
                                                        <td style={{fontSize: '24px', fontFamily: '"Montserrat","Arial",Helvetica,sans-serif', color: '#3c4858', textAlign: 'center'}}>
                                                          <span style={{color: '#3c4858'}}><span style={{color: '#FFFFFF'}}><span style={{fontSize: '18px'}}>We got your request, but we need a little time to make sure that your information was exactly valid.</span></span></span>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td height={10} className="col_td_gap" style={{fontSize: '1px', lineHeight: '1px'}}> </td>
                                                      </tr>
                                                      <tr>
                                                        <td style={{fontSize: '14px', fontFamily: '"Open Sans","Arial",Helvetica,sans-serif, sans-serif', color: '#3c4858', lineHeight: '21px'}}>
                                                          <div>
                                                            <div style={{lineHeight: '24px', textAlign: 'center'}}>
                                                              <span style={{color: '#FFFFFF'}}>Your information was sent to admin of our system. We'll have a contact though your email when everything was verified.</span>
                                                            </div>
                                                          </div>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td height={30} style={{fontSize: '1px', lineHeight: '1px'}}> </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" valign="top" bgcolor="#e8e8e8" style={{backgroundColor: '#e8e8e8'}}>
                        <table className="rnb-del-min-width rnb-tmpl-width" width="100%" cellPadding={0} border={0} cellSpacing={0} bgcolor="#e8e8e8" style={{minWidth: '590px', backgroundColor: '#e8e8e8'}} name="Layout_" id="Layout_">
                          <tbody>
                            <tr>
                              <td className="rnb-del-min-width" align="center" valign="top" bgcolor="#f9fafc" style={{minWidth: '590px', backgroundColor: '#f9fafc'}}>
                                <table width={590} className="rnb-container" cellPadding={0} border={0} align="center" cellSpacing={0}>
                                  <tbody>
                                    <tr>
                                      <td height={20} style={{fontSize: '1px', lineHeight: '1px'}}> </td>
                                    </tr>
                                    <tr>
                                      <td valign="top" className="rnb-container-padding" style={{fontSize: '14px', fontFamily: '"Montserrat","Arial",Helvetica,sans-serif', color: '#888888'}} align="left">
                                        <table width="100%" border={0} cellPadding={0} cellSpacing={0} className="rnb-columns-container">
                                          <tbody>
                                            <tr>
                                              <td className="rnb-force-col" style={{paddingRight: '20px', paddingLeft: '20px', msoPaddingAlt: '0 0 0 20px'}} valign="top">
                                                <table border={0} valign="top" cellSpacing={0} cellPadding={0} width={264} align="left" className="rnb-col-2" style={{borderBottom: 0}}>
                                                  <tbody>
                                                    <tr>
                                                      <td valign="top">
                                                        <table cellPadding={0} border={0} align="left" cellSpacing={0} className="rnb-btn-col-content">
                                                          <tbody>
                                                            <tr>
                                                              <td valign="middle" align="left" style={{fontSize: '14px', fontFamily: '"Montserrat","Arial",Helvetica,sans-serif', color: '#888888'}} className="rnb-text-center">
                                                                <div>
                                                                  <div style={{lineHeight: '24px'}}>Company Name
                                                                    <br/>Ceo: {this.state.company.name}
                                                                    <br/>Sinature: {this.state.company.signature}
                                                                    <br/>Field: {this.state.company.field}
                                                                    <br/>Workforce: {this.state.company.workforce}
                                                                    <br/>Address: {this.state.company.address}
                                                                    <br/>Contact: <span style={{textDecoration: 'underline', color: 'rgb(20, 160, 193)'}}>{this.state.company.contact}</span>
                                                                  </div>
                                                                </div>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                              <td ng-if="item.text.align=='left'" className="rnb-force-col rnb-social-width" valign="top" style={{msoPaddingAlt: '0 20px 0 0', paddingRight: '15px'}}>
                                                <table border={0} valign="top" cellSpacing={0} cellPadding={0} width={246} align="right" className="rnb-last-col-2"><tbody><tr><td valign="top">
                                                        <table cellPadding={0} border={0} cellSpacing={0} className="rnb-social-align" style={{float: 'right'}} align="right">
                                                          <tbody>
                                                            <tr>
                                                              <td valign="middle" className="rnb-text-center" ng-init="width=setSocialIconsBlockWidth(item)" width={165} align="right">
                                                                <div className="rnb-social-center">
                                                                  <table align="left" style={{float: 'left', display: 'inline-block', msoTableLspace: '0pt', msoTableRspace: '0pt'}} border={0} cellPadding={0} cellSpacing={0}>
                                                                    <tbody>
                                                                      <tr>
                                                                        <td style={{padding: '0px 5px 5px 0px', msoPaddingAlt: '0px 2px 5px 0px'}} align="left">
                                                                          <span style={{color: '#ffffff', fontWeight: 'normal'}}>
                                                                            <img alt="Facebook" border={0} hspace={0} vspace={0} style={{verticalAlign: 'top'}} target="_blank" src={FaceBookImage} />
                                                                          </span>
                                                                        </td>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </div>
                                                                <div className="rnb-social-center">
                                                                  <table align="left" style={{float: 'left', display: 'inline-block', msoTableLspace: '0pt', msoTableRspace: '0pt'}} border={0} cellPadding={0} cellSpacing={0}>
                                                                    <tbody>
                                                                      <tr>
                                                                        <td style={{padding: '0px 5px 5px 0px', msoPaddingAlt: '0px 2px 5px 0px'}} align="left">
                                                                          <span style={{color: '#ffffff', fontWeight: 'normal'}}>
                                                                            <img alt="Twitter" border={0} hspace={0} vspace={0} style={{verticalAlign: 'top'}} target="_blank" src={TwiterImage} />
                                                                          </span>
                                                                        </td>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </div>
                                                                <div className="rnb-social-center">
                                                                  <table align="left" style={{float: 'left', display: 'inline-block', msoTableLspace: '0pt', msoTableRspace: '0pt'}} border={0} cellPadding={0} cellSpacing={0}>
                                                                    <tbody>
                                                                      <tr>
                                                                        <td style={{padding: '0px 5px 5px 0px', msoPaddingAlt: '0px 2px 5px 0px'}} align="left">
                                                                          <span style={{color: '#ffffff', fontWeight: 'normal'}}>
                                                                            <img alt="LinkedIn" border={0} hspace={0} vspace={0} style={{verticalAlign: 'top'}} target="_blank" src={InImage} />
                                                                          </span>
                                                                        </td>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </div>
                                                                <div className="rnb-social-center">
                                                                  <table align="left" style={{float: 'left', display: 'inline-block', msoTableLspace: '0pt', msoTableRspace: '0pt'}} border={0} cellPadding={0} cellSpacing={0}>
                                                                    <tbody>
                                                                      <tr>
                                                                        <td style={{padding: '0px 5px 5px 0px', msoPaddingAlt: '0px 2px 5px 0px'}} align="left">
                                                                          <span style={{color: '#ffffff', fontWeight: 'normal'}}>
                                                                            <img alt="YouTube" border={0} hspace={0} vspace={0} style={{verticalAlign: 'top'}} target="_blank" src={YoutubeImage} />
                                                                          </span>
                                                                        </td>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table></div>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td height={20} style={{fontSize: '1px', lineHeight: '1px'}}> </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" valign="top" bgcolor="#e8e8e8" style={{backgroundColor: '#e8e8e8'}}>
                        <table className="rnb-del-min-width rnb-tmpl-width" width="100%" cellPadding={0} border={0} cellSpacing={0} bgcolor="#e8e8e8" style={{minWidth: '590px', backgroundColor: '#e8e8e8'}} name="Layout_3" id="Layout_3">
                          <tbody>
                            <tr>
                              <td className="rnb-del-min-width" align="center" valign="top" bgcolor="#e8e8e8" style={{minWidth: '590px', backgroundColor: '#e8e8e8'}}>
                                <table width={590} className="rnb-container" cellPadding={0} border={0} align="center" cellSpacing={0} style={{paddingRight: '20px', paddingLeft: '20px'}}>
                                  <tbody>
                                    <tr>
                                      <td height={10} style={{fontSize: '1px', lineHeight: '1px'}}> </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div style={{fontSize: '14px', color: '#888888', fontWeight: 'normal', textAlign: 'center', fontFamily: '"Open Sans","Arial",Helvetica,sans-serif'}}>
                                          <div style={{lineHeight: '24px'}} />
                                          <div style={{lineHeight: '24px'}}>Thanks for your interest in my website. We’ll get back to you with a quote within the hour. </div>
                                          <div />
                                        </div>
                                        <div style={{fontSize: '14px', fontWeight: 'normal', textAlign: 'center', fontFamily: '"Open Sans","Arial",Helvetica,sans-serif'}}>
                                          {/* <a style={{textDecoration: 'false', color: '#007bff', fontSize: '20px', fontWeight: 'normal', fontFamily: '"Open Sans","Arial",Helvetica,sans-serif'}} target="_blank" href='/'>Back To Home</a> */}
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td height={10} style={{fontSize: '1px', lineHeight: '1px'}}> </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div style={{textAlign: 'center'}}>
                                          {/* <div style={{fontFamily: 'Arial, Helvetica, sans-serif', color: '#888888', opacity: '0.8'}}>Sent by</div> */}
                                          <a onClick={this.backToHome}><img border={0} hspace={0} vspace={0} width={200} height={50} alt="Backtohome" style={{margin: 'auto'}} src={BackImage} /></a>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td height={10} style={{fontSize: '1px', lineHeight: '1px'}}> </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" valign="top" bgcolor="#e8e8e8" style={{backgroundColor: '#e8e8e8'}}>
                        <table className="rnb-del-min-width rnb-tmpl-width" width="100%" cellPadding={0} border={0} cellSpacing={0} bgcolor="#e8e8e8" style={{minWidth: '590px', backgroundColor: '#e8e8e8'}} name="Layout_4" id="Layout_4"><tbody><tr><td className="rnb-del-min-width" align="center" valign="top" bgcolor="#e8e8e8" style={{minWidth: '590px', backgroundColor: '#e8e8e8'}}>
                                <table width={590} className="rnb-container rnb-yahoo-width" cellPadding={0} border={0} align="center" cellSpacing={0} style={{paddingRight: '20px', paddingLeft: '20px'}}>
                                  <tbody>
                                    <tr>
                                      <td height={20} style={{fontSize: '1px', lineHeight: '1px'}}> </td>
                                    </tr>
                                    <tr>
                                      <td style={{fontSize: '14px', color: '#888888', fontWeight: 'normal', textAlign: 'center', fontFamily: '"Open Sans","Arial",Helvetica,sans-serif'}}>
                                        <div>© 2020 BUSSINESS PROCESS MANAGEMENT H@H</div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td height={20} style={{fontSize: '1px', lineHeight: '1px'}}> </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{color: '#727272', fontSize: '10px'}}>
          <center />
        </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    company: state.registerReducers.companyRegister
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteCompanyInformation: () => {
      dispatch(deleteCompanyInformationAfterRegisterInStore());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
