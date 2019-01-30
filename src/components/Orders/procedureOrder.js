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
import { fetchProcedureOrders } from '../../redux/actions/procedureOrderAction';
import { fetchProceduresType } from '../../redux/actions/procedureOrderAction';
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
import { FormGroup } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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

class procedureOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            page: 1,
            open: false,
            subType:''
        }
    }
    returnarrays(){
        var a = new Array();
        this.props.procedureOrders.map((procedureOrder)=>{
            a.push([[Moment(procedureOrder.DateTime).format('d MMM')], [procedureOrder.Name], [procedureOrder.OrderedBy]])
        });
        return a;    
    }
    handleClick(offset) {
        this.setState({ 
            offset,
            page:(this.state.offset+20)/10
         });
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const procedureOrderURL = '/Procedures/GetProceduresOfPatient/' + id + "?page="+ (this.state.offset+20)/10;
        this.props.fetchProcedureOrders(procedureOrderURL);
      }
    handleClickOpen = () => {
        const URL = '/Procedures/GetProcedureCategory/0';
        this.props.fetchProceduresType(URL);
        this.setState({
            open: true
        });
    };
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleClose = () => {
        this.setState({open: false});
    };
    handleSave = () => {
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const input = {
            subType: this.state.subType,
            patientId: id
        }
        if (id === 0) {
            alert("patient is not selected");
            return
        }
        const URL = '/Procedures';
        this.setState({
            open: false
        });
        this.props.saveConsultationOrder(URL, qs.stringify(input));
    };
    componentWillMount(){
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const procedureOrderURL = '/Procedures/GetProceduresOfPatient/' + id + "?page="+ this.state.page;
        this.props.fetchProcedureOrders(procedureOrderURL);
    }
    render() {
        const { classes } = this.props;
        const { fullScreen } = this.props;
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Procedure Order</h4>
                        <p className={classes.cardCategoryWhite}>
                        {/* Here is a subtitle for this table */}
                        </p>
                        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                            Create New
                        </Button>
                    </CardHeader>
                    <CardBody>
                    {this.props.isLoading?<CircularProgress className={classes.progress} />:""}
                        <Table
                        tableHeaderColor="primary"
                        tableHead={["DateTime","Name","Orderedby"]}
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
                            <DialogTitle id="responsive-dialog-title">{"New Procedure Order"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    <form className={classes.container} noValidate autoComplete="off">
                                        <FormControl component="fieldset" className={classes.formControl}>
                                            <FormLabel component="legend">Procedures</FormLabel>
                                            {this.props.isLoading?<CircularProgress className={classes.progress} />:""}
                                            <FormGroup row>
                                                {this.props.procedureType.map((subtype)=>
                                                    <FormControlLabel
                                                        control={<Checkbox //checked={gilad}
                                                        onChange={this.handleChange('subType')}
                                                        value={subtype.Name} />}
                                                        label={subtype.Name}
                                                    />
                                                )
                                            }
                                            </FormGroup>
                                        </FormControl>
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
                </GridItem>
            </GridContainer>
        );
    }
}

procedureOrder.propTypes = {
    fetchProcedureOrders: propTypes.func.isRequired,
    procedureOrders: propTypes.array.isRequired,
    procedureType: propTypes.array.isRequired,
    isLoading: propTypes.bool.isRequired,
    hasError: propTypes.bool.isRequired
  }
  
  const mapStateToProps = (state) => ({
    procedureOrders: state.procedureOrder.procedureOrders,
    procedureType: state.procedureOrder.procedureType,
    isLoading: state.procedureOrder.isLoading,
    hasError: state.procedureOrder.hasError,
    totalCount: state.procedureOrder.totalCount,
    selectedPatient: state.assignments.selectedPatient
  });

  const mapDispatchToProps = dispatch => ({
    fetchProcedureOrders: (url) => dispatch(fetchProcedureOrders(url)),
    fetchProceduresType: (url) => dispatch(fetchProceduresType(url))
  });

export default compose(withStyles(styles), withMobileDialog(), connect(mapStateToProps, mapDispatchToProps))(procedureOrder);