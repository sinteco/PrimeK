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
import { Link } from "react-router-dom";

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

class hpNote extends Component {
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
        this.props.patientNotes.map((patientNote) => {
            a.push([[patientNote.Id], [patientNote.PatientId], [Moment(patientNote.DateTime).format('d MMM')], [patientNote.NoteCategory], [patientNote.Note], [patientNote.Doctor]])
        });
        return a;
    }
    handleClick(offset) {
        this.setState({
            offset,
            page: (this.state.offset + 20) / 10
        });
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const patientNotesURL = '/PatientNotes/GetHPNotesOfPatient/' + id + "?page=" + (this.state.offset + 20) / 10;
        this.props.fetchPatientNotes(patientNotesURL);
    }
    handleOnRowClick = (id) => {
        // const NoteCategory = this.props.patientNotes.filter(note => (note.Id == id ));
        // console.log(NoteCategory[0].NoteCategory);
        const URL = '/PatientNotes/GetHPNoteDetail/' + id;
        this.props.fetchPatientNoteDetail(URL);
        console.log(this.props.patientnoteDetail);
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
        const patientNotesURL = '/PatientNotes/GetHPNotesOfPatient/' + id + "?page=" + this.state.page;
        this.props.fetchPatientNotes(patientNotesURL);
    }
    render() {
        const { fullScreen } = this.props;
        const { classes } = this.props;
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Patient Note</h4>
                            <p className={classes.cardCategoryWhite}>
                                {/* Here is a subtitle for this table */}
                            </p>
                            <Button 
                                    variant="contained"
                                    color="primary"
                                    component={Link}
                                    to="NewHPOrder"
                                    className={classes.button}
                            > new HPNote </Button>
                        </CardHeader>
                        <CardBody>
                            {this.props.isLoading ? <CircularProgress className={classes.progress} /> : ""}
                            <Table
                                tableHeaderColor="primary"
                                tableHead={["Id", "Patient", "DateTime", "Category", "Note", "Doctor"]}
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
                                <DialogTitle id="responsive-dialog-title">{"History And Physical Note Detail"}</DialogTitle>
                                <DialogContent row>
                                <table>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        {/* <th></th> */}
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                                <b>DateTime: </b> <small>{Moment(this.props.patientnoteDetail.DateTime).format('d MMM YYYY')}</small>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                                <b>Chief Complaint: </b> <small>{this.props.patientnoteDetail.ChiefComplaint}</small>
                                            </Typography>
                                        </td>
                                        
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                                <b>History Of PresentIllness: </b> <small>{this.props.patientnoteDetail.HistoryOfPresentIllness}</small>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                                    <b>Gynacologic History: </b> <small>{this.props.patientnoteDetail.GynacologicHistory}</small>
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                           <Typography variant="body2" gutterBottom>
                                                <b>Current Medications: </b> <small>{this.props.patientnoteDetail.CurrentMedications}</small>
                                            </Typography> 
                                        </td>
                                        <td>
                                           <Typography variant="body2" gutterBottom>
                                                    <b>Allergies: </b> <small>{this.props.patientnoteDetail.Allergies}</small>
                                            </Typography> 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                            <b>Investigational Tests: </b> <small>{this.props.patientnoteDetail.InvestigationalTests}</small>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                            <b>Assesment: </b> <small>{this.props.patientnoteDetail.Assesment}</small>
                                            </Typography>
                                        </td>
                                        
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                                <b>Diagnosis: </b> <small>{this.props.patientnoteDetail.Diagnosis}</small>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                            <b>Plan: </b> <small>{this.props.patientnoteDetail.Plan}</small>
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                                <b>Treatment: </b> <small>{this.props.patientnoteDetail.Treatment}</small>
                                            </Typography></td>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                                <b>Respiratory Rate: </b> <small>{this.props.patientnoteDetail.RespiratoryRate}</small>
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                                <b>Height: </b> <small>{this.props.patientnoteDetail.Height}</small>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                                <b>Weight: </b> <small>{this.props.patientnoteDetail.Weight}</small>
                                            </Typography>
                                        </td>
                                        
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                                <b>Head Circumference: </b> <small>{this.props.patientnoteDetail.HeadCircumference}</small>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                                <b>Waist Circumference: </b> <small>{this.props.patientnoteDetail.WaistCircumference}</small>
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                                <b>Vision Right: </b> <small>{this.props.patientnoteDetail.VisionRight}</small>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                                <b>Vision Left: </b> <small>{this.props.patientnoteDetail.VisionLeft}</small>
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                                <b>Reflex SR Corneal: </b> <small>{this.props.patientnoteDetail.ReflexSRCorneal}</small>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                                <b>Reflex SR Abdomen: </b> <small>{this.props.patientnoteDetail.ReflexSRAbdomen}</small>
                                            </Typography>
                                        </td>
                                        
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                                <b>Reflex SR Cremasteric: </b> <small>{this.props.patientnoteDetail.ReflexSRCremasteric}</small>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                                <b>Reflex SR Plantar: </b> <small>{this.props.patientnoteDetail.ReflexSRPlantar}</small>
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                                <b>Reflex SL Corneal: </b> <small>{this.props.patientnoteDetail.ReflexSLCorneal}</small>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                                <b>Reflex SL Abdomen: </b> <small>{this.props.patientnoteDetail.ReflexSLAbdomen}</small>
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                                    <b>Reflex SL Cremasteric: </b> <small>{this.props.patientnoteDetail.ReflexSLCremasteric}</small>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                                <b>Reflex SL Plantar: </b> <small>{this.props.patientnoteDetail.ReflexSLPlantar}</small>
                                            </Typography>
                                        </td>
                                        
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                                <b>ReflexDRBiceps: </b> <small>{this.props.patientnoteDetail.ReflexDRBiceps}</small>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                                <b>Reflex DR Triceps: </b> <small>{this.props.patientnoteDetail.ReflexDRTriceps}</small>
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                                <b>Reflex DR Knee: </b> <small>{this.props.patientnoteDetail.ReflexDRKnee}</small>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                                <b>Reflex DR Ankle: </b> <small>{this.props.patientnoteDetail.ReflexDRAnkle}</small>
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                                <b>Reflex DL Biceps: </b> <small>{this.props.patientnoteDetail.ReflexDLBiceps}</small>
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                                <b>Reflex DL Triceps: </b> <small>{this.props.patientnoteDetail.ReflexDLTriceps}</small>
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                                <b>Reflex DL Ankle: </b> <small>{this.props.patientnoteDetail.ReflexDLAnkle}></small>
                                            </Typography></td>
                                        <td>
                                            <Typography variant="body2" gutterBottom>
                                                <b>Reflex DL Knee: </b> <small>{this.props.patientnoteDetail.ReflexDLKnee}</small>
                                            </Typography>
                                        </td>
                                        <td></td>
                                    </tr>
                                </table>
                                    
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

hpNote.propTypes = {
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

export default compose(withStyles(styles), withMobileDialog(), connect(mapStateToProps, mapDispatchToProps))(hpNote);