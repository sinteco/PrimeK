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
import { fetchInvestigationOrders } from '../../redux/actions/InvestigationOrderAction';
import propTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from "material-ui-flat-pagination";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import TextField from '@material-ui/core/TextField';
import { FormGroup } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';

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
    }
  };

class otherInvestigationOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            page: 1,
            open: false,
            investigation: '',
            clinicalData: '',
            remark: ''
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
        this.props.investigationOrders.map((investigationOrder)=>{
            a.push([[Moment(investigationOrder.DateTime).format('d MMM')], [investigationOrder.OrderedItems], [investigationOrder.PrescriberId]])
        });
        return a;    
    }
    handleClick(offset) {
        this.setState({ 
            offset,
            page:(this.state.offset+20)/10
         });
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const radOrdersURL = '/InvestigationOrders/GetInvestigationOrdersOfPatient/' + id + "?page="+ (this.state.offset+20)/10;
        this.props.fetchInvestigationOrders(radOrdersURL);
      }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    componentWillMount(){
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const radOrdersURL = '/InvestigationOrders/GetInvestigationOrdersOfPatient/' + id + "?page="+ this.state.page;
        this.props.fetchInvestigationOrders(radOrdersURL);
    }
    render() {
        const { classes } = this.props;
        const { fullScreen } = this.props;
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Other Investigation Order</h4>
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
                        tableHead={["DateTime", "Ordered Items", "Orderedby"]}
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
                        >
                        <DialogTitle id="responsive-dialog-title">{"Create new investigation"}</DialogTitle>
                        <DialogContent>
                            <form className={classes.container} noValidate autoComplete="off">
                                <FormControl component="fieldset" className={classes.formControl}>
                                    <FormGroup className={classes.FormGroup}>
                                        <TextField
                                            id="standard-multiline-flexible"
                                            label="Patient Clinical Data"
                                            multiline
                                            rowsMax="4"
                                            value={this.state.clinicalData}
                                            onChange={this.handleChange('clinicalData')}
                                            className={classes.textField}
                                            margin="normal"
                                            />
                                        <TextField
                                            id="standard-multiline-flexible"
                                            label="Final Remark"
                                            multiline
                                            rowsMax="4"
                                            value={this.state.remark}
                                            onChange={this.handleChange('remark')}
                                            className={classes.textField}
                                            margin="normal"
                                            />
                                    </FormGroup>
                                </FormControl>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleClose} color="primary" autoFocus>
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                </GridItem>
            </GridContainer>
        );
    }
}

otherInvestigationOrder.propTypes = {
    fetchInvestigationOrders: propTypes.func.isRequired,
    investigationOrders: propTypes.array.isRequired,
    isLoading: propTypes.bool.isRequired,
    hasError: propTypes.bool.isRequired
  }
  
  const mapStateToProps = (state) => ({
    investigationOrders: state.investigationOrder.investigationOrders,
    isLoading: state.investigationOrder.isLoading,
    hasError: state.investigationOrder.hasError,
    totalCount: state.investigationOrder.totalCount,
    selectedPatient: state.assignments.selectedPatient
  });

  const mapDispatchToProps = dispatch => ({
    fetchInvestigationOrders: (url) => dispatch(fetchInvestigationOrders(url))
  });

export default compose(withStyles(styles),withMobileDialog(),connect(mapStateToProps,mapDispatchToProps))(otherInvestigationOrder);