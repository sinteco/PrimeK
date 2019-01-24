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
            page: 1
        }
    }
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
    componentWillMount(){
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const radOrdersURL = '/InvestigationOrders/GetInvestigationOrdersOfPatient/' + id + "?page="+ this.state.page;
        this.props.fetchInvestigationOrders(radOrdersURL);
    }
    render() {
        const { classes } = this.props;
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Other Investigation Order</h4>
                        <p className={classes.cardCategoryWhite}>
                        {/* Here is a subtitle for this table */}
                        </p>
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

export default compose(withStyles(styles),connect(mapStateToProps,mapDispatchToProps))(otherInvestigationOrder);