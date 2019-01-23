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
import { fetchPatientNotes } from '../../redux/actions/patientNoteAction';
import propTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

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

class sickLeave extends Component {
    constructor(props) {
        super(props);
    }
    returnarrays(){
        var a = new Array();
        this.props.patientNotes.map((patientNote)=>{
            a.push([[patientNote.PatientId], [Moment(patientNote.DateTime).format('d MMM')],[patientNote.NoteCategory], [patientNote.Note], [patientNote.Doctor]])
        });
        return a;    
    }
    componentWillMount(){
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const patientNotesURL = '/PatientNotes/GetPatientNotesOfPatient/' + id;
        this.props.fetchPatientNotes(patientNotesURL);
    }
    render() {
        const { classes } = this.props;
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Sick Leave</h4>
                        <p className={classes.cardCategoryWhite}>
                        {/* Here is a subtitle for this table */}
                        </p>
                    </CardHeader>
                    <CardBody>
                    {this.props.isLoading?<CircularProgress className={classes.progress} />:""}
                        <Table
                        tableHeaderColor="primary"
                        tableHead={["Patient", "DateTime", "Category", "Note","Doctor"]}
                        tableData={this.returnarrays()}
                        />
                    </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

sickLeave.propTypes = {
    fetchVitalSigen: propTypes.func.isRequired,
    patientNotes: propTypes.array.isRequired,
    isLoading: propTypes.bool.isRequired,
    hasError: propTypes.bool.isRequired
  }
const mapStateToProps = (state) => ({
    patientNotes: state.patientNote.patientnotes,
    isLoading: state.patientNote.isLoading,
    hasError: state.patientNote.hasError,
    totalCount: state.patientNote.totalCount,
    selectedPatient: state.assignments.selectedPatient
  });
  const mapDispatchToProps = dispatch => ({
    fetchPatientNotes: (url) => dispatch(fetchPatientNotes(url))
  });

export default compose(withStyles(styles), connect(mapStateToProps,mapDispatchToProps))(sickLeave);