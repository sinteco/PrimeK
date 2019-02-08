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
import { fetchRadOrders } from '../../redux/actions/radOrderAction';
import propTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from "material-ui-flat-pagination";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
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

class progressNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            page: 1,
            detaildialog: false
        }
        this.detaildialoguClose = this.detaildialoguClose.bind(this);
    }
    returnarrays() {
        var a = new Array();
        this.props.radOrders.map((radOrder) => {
            a.push([[radOrder.Id], [Moment(radOrder.Date).format('d MMM')], [radOrder.Type], [radOrder.SubType], [radOrder.OrderBy]])
        });
        return a;
    }
    handleClick(offset) {
        this.setState({
            offset,
            page: (this.state.offset + 20) / 10
        });
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const radOrdersURL = '/RadOrders/GetRadOrdersOfPatient/' + id + "?page=" + (this.state.offset + 20) / 10;
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
    componentWillMount() {
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const radOrdersURL = '/RadOrders/GetRadOrdersOfPatient/' + id + "?page=" + this.state.page;
        this.props.fetchRadOrders(radOrdersURL);
    }
    render() {
        const { classes } = this.props;
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Progress Note</h4>
                            <p className={classes.cardCategoryWhite}>
                                {/* Here is a subtitle for this table */}<br />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component={Link}
                                    to="NewProgressNote"
                                    className={classes.button}
                                >
                                    New Progress Note
                                </Button>
                            </p>
                        </CardHeader>
                        <CardBody>
                            {this.props.isLoading ? <CircularProgress className={classes.progress} /> : ""}
                            <Table
                                tableHeaderColor="primary"
                                tableHead={["Patient", "Datetime", "Category", "Note"]}
                                tableData={this.returnarrays()}
                                handleOnRowClick={this.handleOnRowClick}
                            />
                            <Pagination
                                limit={10}
                                offset={this.state.offset}
                                total={this.props.totalCount}
                                onClick={(e, offset) => this.handleClick(offset)}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

progressNote.propTypes = {
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
    fetchRadOrders: (url) => dispatch(fetchRadOrders(url))
});

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(progressNote);