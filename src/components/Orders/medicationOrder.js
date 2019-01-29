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
import { fetchMedicationOrders } from '../../redux/actions/medicatioOrderAction';
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
import EditableTable from '../Table/EditableTable';

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
    
  };

class medicationOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            page: 1,
            rows: [],
        }
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    returnarrays(){
        var a = new Array();
        this.props.medicationOrders.map((medicatioOrder)=>{
            a.push([[medicatioOrder.Medication], [medicatioOrder.Dose],[medicatioOrder.Route],[medicatioOrder.Frequency],[medicatioOrder.Quantity],[medicatioOrder.Form], [Moment(medicatioOrder.StartDate).format('d MMM')],[Moment(medicatioOrder.StopDate).format('d MMM')] ,[medicatioOrder.Status], [medicatioOrder.Orderby], [medicatioOrder.Remark]])
        });
        return a;    
    }
    handleClick(offset) {
        this.setState({ 
            offset,
            page:(this.state.offset+20)/10
         });
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const medicatioOrdersURL = '/MedicationOrders/GetMedicationOrdersOfPatient/' + id + "?page="+ (this.state.offset+20)/10;
        this.props.fetchMedicationOrders(medicatioOrdersURL);
      }
    handleSave = () => {
        alert("save");
    }
    handleSetstate = (childrows) => {
        this.setState({
            rows: childrows
        })
        console.log(this.state.rows);
        alert("setstate" + childrows);
    }
    componentWillMount(){
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const medicatioOrdersURL = '/MedicationOrders/GetMedicationOrdersOfPatient/' + id + "?page="+ this.state.page;
        this.props.fetchMedicationOrders(medicatioOrdersURL);
    }
    render() {
        const { classes } = this.props;
        const { fullScreen } = this.props;
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Medication Orders</h4>
                        <p className={classes.cardCategoryWhite}>
                        {/* Here is a subtitle for this table */}
                        </p>
                        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>Create New</Button>
                    </CardHeader>
                    <CardBody>
                    {this.props.isLoading?<CircularProgress className={classes.progress} />:""}
                        <Table
                        tableHeaderColor="primary"
                        tableHead={["Medication", "Dose", "Route", "Frequency","Quantity","Start Date","End Date","Status","Order By"]}
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
                            maxWidth = {'lg'}
                            open={this.state.open}
                            onClose={this.handleClose}
                            aria-labelledby="responsive-dialog-title"
                            classes = {{ paper: classes.dialog }}
                            >
                            <DialogTitle id="responsive-dialog-title">{"New Medication Order"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    < EditableTable
                                        handleSetstate={this.handleSetstate}
                                    ></EditableTable>
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
                </GridItem>
            </GridContainer>
        );
    }
}

medicationOrder.propTypes = {
    fetchMedicationOrders: propTypes.func.isRequired,
    medicationOrders: propTypes.array.isRequired,
    isLoading: propTypes.bool.isRequired,
    hasError: propTypes.bool.isRequired
  }
const mapStateToProps = (state) => ({
    medicationOrders: state.medicatioOrder.medicationOrders,
    isLoading: state.medicatioOrder.isLoading,
    hasError: state.medicatioOrder.hasError,
    totalCount: state.medicatioOrder.totalCount,
    selectedPatient: state.assignments.selectedPatient
  });
  const mapDispatchToProps = dispatch => ({
    fetchMedicationOrders: (url) => dispatch(fetchMedicationOrders(url))
  });

export default compose(withStyles(styles), withMobileDialog(), connect(mapStateToProps, mapDispatchToProps))(medicationOrder);