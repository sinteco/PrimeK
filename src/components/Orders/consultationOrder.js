import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Moment from 'moment';
import { fetchConsultationOrders, fetchConsultationOrderDetail, saveConsultationOrder } from '../../redux/actions/consultationOrderAction';
import propTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from "material-ui-flat-pagination";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import TextField from '@material-ui/core/TextField';
import { FormGroup } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import Typography from '@material-ui/core/Typography';
import qs from 'qs';

const styles = {
    cardCategoryWhite: {
      "&,& a,& a:hover,& a:focus": {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
      },
      "& a,& a:hover,& a:focus": {
        color: "#FFFFFF"
      }
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: "#777",
        fontSize: "65%",
        fontWeight: "400",
        lineHeight: "1"
      }
    },
    dialog: {
        width: '80%',
        maxHeight: 435,
    },
  };

class consultationOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            page: 1,
            open: false,
            reasonForConsultation:'',
            selectedDate: new Date(),
            detaildialog: false
        }
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
    this.setState({ open: false });
    };
    handleDateChange = date => {
        this.setState({
            selectedDate: date
        });
    };
    returnarrays(){
        var a = new Array();
        this.props.consultationOrders.map((consultationOrder)=>{
            a.push([[consultationOrder.PatientId], [consultationOrder.PatientId], [consultationOrder.OrderedBy], [Moment(consultationOrder.DateTime).format('d MMM')], [consultationOrder.ReasonForConsultation]])
        });
        return a;    
    }
    handleClick(offset) {
        this.setState({ 
            offset,
            page:(this.state.offset+20)/10
         });
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const radOrdersURL = '/Consultations/GetConsultationsOfPatient/' + id + "?page="+ (this.state.offset+20)/10;
        this.props.fetchConsultationOrders(radOrdersURL);
      }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleSave = () => {
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const postdata = {
            DateTime: this.state.selectedDate,
            reasonForConsultation: this.state.reasonForConsultation,
            patientId: id
        }
        if (id === 0) {
            alert("patient is not selected");
            return
        }
        const URL = '/Consultations';
        this.setState({open: false});
        this.props.saveConsultationOrder(URL, qs.stringify(postdata));
    };
    handleOnRowClick = (id) => {
        const URL = '/PatientNotes/GetPatientNoteDetail/' + id;
        this.props.fetchConsultationOrderDetail(URL);
        this.setState({
            detaildialog: true
        })
    };
    detaildialoguClose() {
        this.setState({
            detaildialog: false
        })
    };
    componentWillMount(){
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const radOrdersURL = '/Consultations/GetConsultationsOfPatient/' + id + "?page="+ this.state.page;
        this.props.fetchConsultationOrders(radOrdersURL);
    }
    render() {
        const { fullScreen } = this.props;
        const { classes } = this.props;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Consultation Order</h4>
                            <p className={classes.cardCategoryWhite}>
                            {/* Here is a subtitle for this table */}
                            </p>
                            <Button variant="contained" color="primary" onClick={this.handleClickOpen}>Create New</Button>
                        </CardHeader>
                        <CardBody>
                        {this.props.isLoading?<CircularProgress className={classes.progress} />:""}
                            <Table
                            tableHeaderColor="primary"
                            tableHead={["MRN", "Patient Full Name", "Order by", "Date Time","Consultation Reason"]}
                            tableData={this.returnarrays()}
                            />
                            <Pagination
                                    limit={10}
                                    offset={this.state.offset}
                                    total={this.props.totalCount}
                                    onClick={(e, offset) => this.handleClick(offset)}
                                    />
                        </CardBody>
                        </Card>
                        <Dialog
                            fullScreen={fullScreen}
                            open={this.state.open}
                            onClose={this.handleClose}
                            aria-labelledby="responsive-dialog-title"
                            classes = {{ paper: classes.dialog }}
                            >
                            <DialogTitle id="responsive-dialog-title">{"New Consultation Order"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    <form className={classes.container} noValidate autoComplete="off">
                                        <FormGroup
                                            className={classes.FormGroup}
                                            >
                                            <DatePicker
                                                margin="normal"
                                                label="Date Time"
                                                value={this.state.selectedDate}
                                                onChange={this.handleDateChange}
                                            />
                                            <TextField
                                                id="standard-textarea"
                                                label = "Reason For Consultation"
                                                multiline
                                                className={classes.textField}
                                                margin="normal"
                                                value={this.state.reasonForConsultation}
                                                onChange={this.handleChange('reasonForConsultation')}
                                                />
                                        </FormGroup>
                                    </form>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={this.handleSave} color="primary" autoFocus>
                                    Save
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog
                            fullScreen={fullScreen}
                            open={this.state.detaildialog}
                            onClose={this.handleClose}
                            aria-labelledby="responsive-dialog-title"
                            classes={{ paper: classes.dialog }}
                        >
                            <DialogTitle id="responsive-dialog-title">{"Sick Leave Detail"}</DialogTitle>
                            <DialogContent row>
                                <Typography variant="overline" gutterBottom>
                                    <b>DateTime:</b> {Moment(this.props.consultationOrderDetail.DateTime).format('d MMM YYYY')}
                                </Typography>
                                <Typography variant="overline" gutterBottom>
                                    <b>Note:</b> {this.props.consultationOrderDetail.Note}
                                </Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.detaildialoguClose} color="primary" autoFocus>
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </GridItem>
                </GridContainer>
            </MuiPickersUtilsProvider>
        );
    }
}

consultationOrder.propTypes = {
    fetchConsultationOrderDetail: propTypes.func.isRequired,
    fetchConsultationOrders: propTypes.func.isRequired,
    saveConsultationOrder: propTypes.func.isRequired,
    consultationOrders: propTypes.array.isRequired,
    isLoading: propTypes.bool.isRequired,
    hasError: propTypes.bool.isRequired,
    fullScreen: propTypes.bool.isRequired,
    consultationOrderDetail: propTypes.array.isRequired
  }
  
  const mapStateToProps = (state) => ({
    consultationOrders: state.consultationOrder.consultationOrders,
    isLoading: state.consultationOrder.isLoading,
    hasError: state.consultationOrder.hasError,
    totalCount: state.consultationOrder.totalCount,
    selectedPatient: state.assignments.selectedPatient,
    consultationOrderDetail: state.consultationOrder.consultationOrderDetail
  });

  const mapDispatchToProps = dispatch => ({
    fetchConsultationOrders: (url) => dispatch(fetchConsultationOrders(url)),
    saveConsultationOrder: (url,postdata) => dispatch(saveConsultationOrder(url, postdata)),
    fetchConsultationOrderDetail: (url) => dispatch(fetchConsultationOrderDetail(url))
  });

export default compose(withStyles(styles),withMobileDialog(), connect(mapStateToProps,mapDispatchToProps))(consultationOrder);