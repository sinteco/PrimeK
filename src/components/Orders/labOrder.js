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
import { fetchLabOrders, fetchTests } from '../../redux/actions/labOrderAction';
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import qs from 'qs';
import Collapsible from 'react-collapsible';

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
    collapsible:{
        color: "#000000"
    },
    collapsibleChiled: {
        color: "#0366d6",
        marginLeft: "5%"
    }
  };

class labOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            page: 1,
            subType: ''
        }
    }
    returnarrays(){
        var a = new Array();
        this.props.labOrders.map((labOrder)=>{
            a.push([[labOrder.Name], [labOrder.Result], [labOrder.ABN], [labOrder.RefRange], [labOrder.Unit], [labOrder.Remark], [Moment(labOrder.DateTime).format('d MMM')], [labOrder.OrderedBy]])
        });
        return a;    
    }
    handleClick(offset) {
        this.setState({ 
            offset,
            page:(this.state.offset+20)/10
         });
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const labOrdersURL = '/TestOrders/GetTestOrdersOfPatient/' + id + "?page="+ (this.state.offset+20)/10;
        this.props.fetchLabOrders(labOrdersURL);
      }
    handleClickOpen = () => {
        const URL = '/TestOrders/GetTestOrdersCategory/0';
        this.props.fetchTests(URL);
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    componentWillMount(){
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const labOrdersURL = '/TestOrders/GetTestOrdersOfPatient/' + id + "?page="+ this.state.page;
        this.props.fetchLabOrders(labOrdersURL);
    }
    render() {
        const { classes } = this.props;
        const { fullScreen } = this.props;
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Lab Order</h4>
                        <p className={classes.cardCategoryWhite}>
                        {/* Here is a subtitle for this table */}
                        </p>
                        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>Create New</Button>
                    </CardHeader>
                    <CardBody>
                    {this.props.isLoading?<CircularProgress className={classes.progress} />:""}
                        <Table
                        tableHeaderColor="primary"
                        tableHead={["Name", "Result", "ANB", "Ref.Range","Unit","Datetime","Orderedby"]}
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
                            maxWidth={'lg'}
                            open={this.state.open}
                            onClose={this.handleClose}
                            aria-labelledby="responsive-dialog-title"
                            classes = {{ paper: classes.dialog }}
                            >
                            <DialogTitle id="responsive-dialog-title">{"New Lab Order"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    <form className={classes.container} noValidate autoComplete="off">
                                        <FormLabel component="legend">Orders</FormLabel>
                                        {this.props.isLoadingTests?<CircularProgress className={classes.progress} />:""}
                                        <FormGroup
                                            // row
                                            className={classes.FormGroup}
                                            >
                                            {
                                                this.props.Tests.map((subtype)=>
                                                    <FormGroup > 
                                                        <FormLabel component="legend">{subtype.name}</FormLabel>
                                                            {
                                                                subtype.TreeChileds.map((tree)=>
                                                                    <FormGroup row>
                                                                        <FormLabel component="legend">{tree.name}</FormLabel>
                                                                            {
                                                                                tree.SubChileds.map((chiled) =>
                                                                                    <FormControlLabel
                                                                                        control={<Checkbox //checked={gilad}
                                                                                        onChange={this.handleChange('subType')}
                                                                                        value={chiled.name} />}
                                                                                        label={chiled.name}
                                                                                    />
                                                                                )
                                                                            }
                                                                            
                                                                    </FormGroup>
                                                            )}
                                                        
                                                    </FormGroup>
                                                )
                                            }
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
                </GridItem>
            </GridContainer>
        );
    }
}

labOrder.propTypes = {
    fetchTests: propTypes.func.isRequired,
    fetchLabOrders: propTypes.func.isRequired,
    labOrders: propTypes.array.isRequired,
    isLoading: propTypes.bool.isRequired,
    hasError: propTypes.bool.isRequired,
    Tests: propTypes.array.isRequired,
    isLoadingTests: propTypes.bool.isRequired
  }
  const mapStateToProps = (state) => ({
    Tests: state.labOrder.Tests,
    labOrders: state.labOrder.labOrders,
    isLoading: state.labOrder.isLoading,
    hasError: state.labOrder.hasError,
    totalCount: state.labOrder.totalCount,
    selectedPatient: state.assignments.selectedPatient,
    isLoadingTests: state.labOrder.isLoadingTests
  });
  const mapDispatchToProps = dispatch => ({
    fetchLabOrders: (url) => dispatch(fetchLabOrders(url)),
    fetchTests: (url) => dispatch(fetchTests(url))
  });

export default compose(withStyles(styles), withMobileDialog(), connect(mapStateToProps, mapDispatchToProps))(labOrder);