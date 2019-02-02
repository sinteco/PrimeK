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
import { fetchPatientNotes } from '../../redux/actions/patientNoteAction';
import { fetchPatientNoteDetail } from '../../redux/actions/patientNoteAction';
import propTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from "material-ui-flat-pagination";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';
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
      },
      dialog: {
        width: '80%',
        maxHeight: 435,
    },
    }
  };

class sickLeave extends Component {
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
        this.props.patientNotes.map((patientNote)=>{
            a.push([[patientNote.Id], [patientNote.PatientId], [Moment(patientNote.DateTime).format('d MMM')],[patientNote.NoteCategory], [patientNote.Note], [patientNote.Doctor]])
        });
        return a;    
    }
    handleClick(offset) {
        this.setState({ 
            offset,
            page:(this.state.offset+20)/10
         });
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const patientNotesURL = '/PatientNotes/GetSickLeaveOfPatient/' + id + "?page="+ (this.state.offset+20)/10;
        this.props.fetchPatientNotes(patientNotesURL);
      }
    handleOnRowClick = (id) => {
        const URL = '/PatientNotes/GetPatientNoteDetail/' + id;
        this.props.fetchPatientNoteDetail(URL);
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
        const URL = '/PatientNotes/GetSickLeaveOfPatient/' + id + "?page="+ this.state.page;
        this.props.fetchPatientNotes(URL);
    }
    render() {
        const { fullScreen } = this.props;
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
                            tableHead={["Id","Patient", "DateTime", "Category", "Note","Doctor"]}
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
                            <DialogTitle id="responsive-dialog-title">{"Sick Leave Detail"}</DialogTitle>
                            <DialogContent row>
                                <Typography variant="overline" gutterBottom>
                                    <b>DateTime:</b> {Moment(this.props.patientnoteDetail.DateTime).format('d MMM YYYY')}
                                </Typography>
                                <Typography variant="overline" gutterBottom>
                                    <b>Note:</b> {this.props.patientnoteDetail.Note}
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

sickLeave.propTypes = {
    fetchPatientNoteDetail: propTypes.func.isRequired,
    fetchVitalSigen: propTypes.func.isRequired,
    patientNotes: propTypes.array.isRequired,
    isLoading: propTypes.bool.isRequired,
    hasError: propTypes.bool.isRequired,
    patientnoteDetail: propTypes.array.isRequired
  }
const mapStateToProps = (state) => ({
    patientnoteDetail: state.patientNote.patientnoteDetail,
    patientNotes: state.patientNote.patientnotes,
    isLoading: state.patientNote.isLoading,
    hasError: state.patientNote.hasError,
    totalCount: state.patientNote.totalCount,
    selectedPatient: state.assignments.selectedPatient
  });
  const mapDispatchToProps = dispatch => ({
      fetchPatientNotes: (url) => dispatch(fetchPatientNotes(url)),
      fetchPatientNoteDetail: (url) => dispatch(fetchPatientNoteDetail(url))
  });

export default compose(withStyles(styles), withMobileDialog(), connect(mapStateToProps,mapDispatchToProps))(sickLeave);