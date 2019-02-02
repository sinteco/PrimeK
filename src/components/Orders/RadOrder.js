import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/CustomTableWithPopUp.js";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Moment from 'moment';
import { fetchRadOrders, fetchRadOrderDetail } from '../../redux/actions/radOrderAction';
import propTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from "material-ui-flat-pagination";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Typography from '@material-ui/core/Typography';

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

class RadOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            page: 1,
            detaildialog: false
        }
        this.detaildialoguClose = this.detaildialoguClose.bind(this);
    }
    returnarrays(){
        var a = new Array();
        this.props.radOrders.map((radOrder)=>{
            a.push([[radOrder.Id], [Moment(radOrder.Date).format('d MMM')], [radOrder.Type], [radOrder.SubType], [radOrder.OrderBy]])
        });
        return a;    
    }
    handleClick(offset) {
        this.setState({ 
            offset,
            page:(this.state.offset+20)/10
         });
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const radOrdersURL = '/RadOrders/GetRadOrdersOfPatient/' + id + "?page="+ (this.state.offset+20)/10;
        this.props.fetchRadOrders(radOrdersURL);
      }
    handleOnRowClick = (id) => {
        const URL = '/RadOrders/GetRadOrderDetail/' + id;
        this.props.fetchRadOrderDetail(URL);
        this.setState({
            detaildialog: true
        })
    }
    detaildialoguClose() {
        this.setState({
            detaildialog: false
        })
    }
    componentWillMount(){
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const radOrdersURL = '/RadOrders/GetRadOrdersOfPatient/' + id + "?page="+ this.state.page;
        this.props.fetchRadOrders(radOrdersURL);
    }
    render() {
        const { classes } = this.props;
        const { fullScreen } = this.props;
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Rad Order</h4>
                        <p className={classes.cardCategoryWhite}>
                        {/* Here is a subtitle for this table */}<br/>
                        <Button variant="contained" color="primary" component={Link} to="newxrayorder" className={classes.button}> new XRay </Button>
                        <Button variant="contained" color="primary" component={Link} to="NewUltrasound" className={classes.button}> UltarSound </Button>
                        <Button variant="contained" color="primary" component={Link} to="NewECG" className={classes.button}> ECG </Button>
                        <Button variant="contained" color="primary" component={Link} to="NewEcho" className={classes.button}> Echo </Button>
                        </p>
                    </CardHeader>
                    <CardBody>
                    {this.props.isLoading?<CircularProgress className={classes.progress} />:""}
                        <Table
                            tableHeaderColor="primary"
                            tableHead={["Id", "Date", "Type", "Sub Type","Orderedby"]}
                            tableData={this.returnarrays()}
                            handleOnRowClick={this.handleOnRowClick}
                        />
                        <Pagination
                                limit={10}
                                offset={this.state.offset}
                                total={this.props.totalCount}
                                onClick={(e, offset) => this.handleClick(offset)}
                                />
                        <Dialog
                            fullScreen={fullScreen}
                            open={this.state.detaildialog}
                            onClose={this.handleClose}
                            aria-labelledby="responsive-dialog-title"
                            classes={{ paper: classes.dialog }}
                        >
                            <DialogTitle id="responsive-dialog-title">{"Rad Order Detail"}</DialogTitle>
                            <DialogContent row>
                                <Typography variant="overline" gutterBottom>
                                    <b>DateTime:</b> {Moment(this.props.radOrderDetail.Date).format('d MMM YYYY')}
                                </Typography>
                                <Typography variant="overline" gutterBottom>
                                    <b>SubType:</b> {this.props.radOrderDetail.SubType}
                                </Typography>
                                <Typography variant="overline" gutterBottom>
                                    <b>Conclusion:</b> {this.props.radOrderDetail.Conclusion}
                                </Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.detaildialoguClose} color="primary" autoFocus>
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

RadOrder.propTypes = {
    fetchRadOrderDetail: propTypes.isRequired,
    fetchRadOrders: propTypes.func.isRequired,
    radOrders: propTypes.array.isRequired,
    isLoading: propTypes.bool.isRequired,
    hasError: propTypes.bool.isRequired,
    radOrderDetail: propTypes.array.isRequired
  }
  
  const mapStateToProps = (state) => ({
    radOrders: state.radOrder.radOrders,
    isLoading: state.radOrder.isLoading,
    hasError: state.radOrder.hasError,
    totalCount: state.radOrder.totalCount,
    selectedPatient: state.assignments.selectedPatient,
    radOrderDetail: state.radOrder.radOrderDetail
  });

  const mapDispatchToProps = dispatch => ({
    fetchRadOrders: (url) => dispatch(fetchRadOrders(url)),
    fetchRadOrderDetail: (url) => dispatch(fetchRadOrderDetail(url))
  });

export default compose(withStyles(styles), withMobileDialog(), connect(mapStateToProps,mapDispatchToProps))(RadOrder);