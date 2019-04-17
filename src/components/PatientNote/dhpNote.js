import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/CustomTableWithPopUp.js";
import CustomTableWithSelector from '../Table/CustomTableWithSelector';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Moment from 'moment';
import { fetchPatientNotes } from '../../redux/actions/patientNoteAction';
import { fetchDHPNotesDatail } from '../../redux/actions/patientNoteAction';
import propTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from "material-ui-flat-pagination";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Collapsible from 'react-collapsible';
import FormLabel from '@material-ui/core/FormLabel';
import CustomTable from '../Diagnosis/CustomDiagnosis';
import TableWithDatePicker from '../Table/CustomTableWithSelector&Date';
import CustomTableWithTextBox from '../Table/CustomTableWithTextBox';

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

class dhpNote extends Component {
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
            a.push([[patientNote.Id], [patientNote.PatientId], [Moment(patientNote.DateTime).format('DD MMM YY')], [patientNote.NoteCategory], [patientNote.Note], [patientNote.Doctor]])
        });
        return a;
    }
    handleClick(offset) {
        this.setState({
            offset,
            page: (this.state.offset + 20) / 10
        });
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const patientNotesURL = '/PatientNotes/GetDHPNotesOfPatient/' + id + "?page=" + (this.state.offset + 20) / 10;
        this.props.fetchPatientNotes(patientNotesURL);
    }
    handleOnRowClick = (id) => {
        // const NoteCategory = this.props.patientNotes.filter(note => (note.Id == id ));
        // console.log(NoteCategory[0].NoteCategory);
        const URL = '/PatientNotes/GetDHPNotesDatail/' + id;
        this.props.fetchDHPNotesDatail(URL);
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
        const patientNotesURL = '/PatientNotes/GetDHPNotesOfPatient/' + id + "?page=" + this.state.page;
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
                            <h4 className={classes.cardTitleWhite}>Diabetes History And Physical Note</h4>
                            <p className={classes.cardCategoryWhite}>
                                {/* Here is a subtitle for this table */}
                            </p>
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to="NewDHPNote"
                                className={classes.button}
                            > new DHPNote </Button>
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
                                maxWidth={'md'}
                                open={this.state.detaildialog}
                                onClose={this.handleClose}
                                aria-labelledby="responsive-dialog-title"
                                classes={{ paper: classes.dialog }}
                            >
                                <DialogTitle id="responsive-dialog-title">{"History And Physical Note Detail"}</DialogTitle>
                                <DialogContent row>
                                    <form>
                                        <TextField
                                            disabled={true}
                                            id="standard-multiline-flexible"
                                            label="Chif Compliant"
                                            multiline
                                            rowsMax="4"
                                            fullWidth
                                            value={this.props.DM.ChiefComplaint != undefined ? this.props.DM.ChiefComplaint:''}
                                            // onChange={this.handleChange('chifcompliant')}
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                        <TextField
                                            disabled={true}
                                            id="standard-multiline-flexible"
                                            label="HPI"
                                            multiline
                                            rowsMax="4"
                                            fullWidth
                                            value={this.props.DM.HPI != undefined ? this.props.DM.HPI : ''}
                                            // onChange={this.handleChange('HPI')}
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                        <selectTable />
                                        <TextField
                                            disabled={true}
                                            id="standard-multiline-flexible"
                                            label="HMBG Values"
                                            multiline
                                            rowsMax="4"
                                            fullWidth
                                            value={this.props.DM.HMBGValues != undefined ? this.props.DM.HMBGValues : ''}
                                            // onChange={this.handleChange('HMBGValues')}
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                        <TextField
                                            disabled={true}
                                            id="standard-multiline-flexible"
                                            label="BP Home Monitoring Values"
                                            multiline
                                            rowsMax="4"
                                            fullWidth
                                            value={this.props.DM.BPHomeMonitoringValues != undefined ? this.props.DM.BPHomeMonitoringValues : ''}
                                            // onChange={this.handleChange('BPHomeMonitoringValues')}
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                        <TextField
                                            disabled={true}
                                            id="standard-multiline-flexible"
                                            label="Allergies:"
                                            multiline
                                            rowsMax="4"
                                            fullWidth
                                            value={this.props.DM.Allergies != undefined ? this.props.DM.Allergies : ''}
                                            // onChange={this.handleChange('Allergies')}
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                        <TextField
                                            disabled={true}
                                            id="standard-multiline-flexible"
                                            label="Medications:"
                                            multiline
                                            rowsMax="4"
                                            fullWidth
                                            value={this.props.DM.Medication != undefined ? this.props.DM.Medication : ''}
                                            // onChange={this.handleChange('Medications')}
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                        <br />
                                        <br />
                                        <Collapsible trigger="Habits >>" className={classes.collapsible}>
                                            {
                                                <CustomTableWithTextBox
                                                    tableHeaderColor="primary"
                                                    tableHead={[" ", "Problem", "Remark", "Quantity", "Frequency"]}
                                                    tableData={this.props.DMHabits.map(item => { return [item.Habit] })}
                                                    dataTable={this.props.DMHabits}
                                                    radio={2}
                                                    textbox={1}
                                                    hadleTableEvent={this.handleHabits}
                                                    disabled={true}
                                                />
                                            }
                                        </Collapsible>
                                        <br />
                                        <Collapsible trigger="Problem List with year of diagnosis >>" className={classes.collapsible}>
                                            {
                                                <CustomTableWithSelector
                                                    tableHeaderColor="primary"
                                                    tableHead={[" ", "Problem", "Yes", "No", "Diagnosis Year", "Remark"]}
                                                    tableData={this.props.DMProblemLists.map(item => { return [item.Problem] })}
                                                    radio={2}
                                                    textBox={2}
                                                    hadleTableEvent={this.handleProblemList}
                                                    hadleTableRemarkEvent={this.handleProblemListRemarks}
                                                    disabled={true}
                                                    dataTable={this.props.DMProblemLists}
                                                />
                                            }
                                        </Collapsible>
                                        <br />
                                        <Collapsible trigger="Other Medical Problem >>" className={classes.collapsible}>
                                            {
                                                <CustomTableWithSelector
                                                    tableHeaderColor="primary"
                                                    tableHead={[" ", "Problem", "Yes", "No", "Remark"]}
                                                    tableData={this.props.DMOtherProblems.map(item => { return [item.Problem] })}
                                                    hadleTableEvent={this.handleOtherMedicalProblem}
                                                    hadleTableRemarkEvent={this.handleOtherMedicalProblemRemarks}
                                                    radio={2}
                                                    textbox={1}
                                                    disabled={true}
                                                    dataTable={this.props.DMOtherProblems}
                                                />
                                            }
                                        </Collapsible>
                                        <br />
                                        <Collapsible trigger="Past Surgical Procedures >>" className={classes.collapsible}>
                                            {
                                                <TableWithDatePicker
                                                    tableHeaderColor="primary"
                                                    tableHead={[" ", "Problem", "Yes", "No", "Date", "Remark"]}
                                                    tableData={this.props.DMPastProcedures.map(item => { return [item.Procedure] })}
                                                    radio={2}
                                                    textbox={1}
                                                    hadleTableEvent={this.handlePastSurgicalProcedures}
                                                    hadleTableRemarkEvent={this.handlePastSurgicalProceduresRemarks}
                                                    disabled={true}
                                                    dataTable={this.props.DMPastProcedures}
                                                />
                                            }
                                        </Collapsible>
                                        <br />
                                        <Collapsible trigger="Vaccinations >>" className={classes.collapsible}>
                                            {
                                                <TableWithDatePicker
                                                    tableHeaderColor="primary"
                                                    tableHead={[" ", "vaccine", "Yes", "No", "Date", "Remark"]}
                                                    tableData={this.props.DMVaccinations.map(item => { return [item.Vaccine] })}
                                                    radio={2}
                                                    textbox={1}
                                                    hadleTableEvent={this.handleVaccinations}
                                                    hadleTableRemarkEvent={this.handleVaccinationsRemarks}
                                                    disabled={true}
                                                    dataTable={this.props.DMVaccinations}
                                                />
                                            }
                                        </Collapsible>
                                        <br />
                                        <Collapsible trigger="Patient Education >>" className={classes.collapsible}>
                                            {
                                                <TableWithDatePicker
                                                    tableHeaderColor="primary"
                                                    tableHead={[" ", "education", "Yes", "No", "Date", "Remark"]}
                                                    tableData={this.props.DMPatientEducations.map(item => { return [item.Education] })}
                                                    radio={2}
                                                    textbox={1}
                                                    hadleTableEvent={this.handlePatientEducation}
                                                    hadleTableRemarkEvent={this.handlePatientEducationRemarks}
                                                    disabled={true}
                                                    dataTable={this.props.DMPatientEducations}
                                                />
                                            }
                                        </Collapsible>
                                        <br />
                                        <Collapsible trigger="Exams >>" className={classes.collapsible}>
                                            {
                                                <TableWithDatePicker
                                                    tableHeaderColor="primary"
                                                    tableHead={[" ", "exam", "Yes", "No", "Date", "Remark"]}
                                                    tableData={this.props.DMExams.map(item => { return [item.Exam] })}
                                                    radio={2}
                                                    textbox={1}
                                                    hadleTableEvent={this.handleExams}
                                                    hadleTableRemarkEvent={this.handleExamsRemarks}
                                                    disabled={true}
                                                    dataTable={this.props.DMExams}
                                                />
                                            }
                                        </Collapsible>
                                        <br />
                                        <Collapsible trigger="ROS >>" className={classes.collapsible}>
                                            {
                                                <TableWithDatePicker
                                                    tableHeaderColor="primary"
                                                    tableHead={[" ", "system", "Yes", "No", "Date", "Remark"]}
                                                    tableData={this.props.DMros.map(item => { return [item.System] })}
                                                    radio={2}
                                                    textbox={1}
                                                    hadleTableEvent={this.handleROS}
                                                    hadleTableRemarkEvent={this.handleROSRemarks}
                                                    disabled={true}
                                                    dataTable={this.props.DMros}
                                                />
                                            }
                                        </Collapsible>
                                        <TextField
                                            disabled={true}
                                            id="standard-multiline-flexible"
                                            label="Dite"
                                            multiline
                                            rowsMax="4"
                                            fullWidth
                                            value={this.props.DM.Diet != undefined ? this.props.DM.Diet : ''}
                                            // onChange={this.handleChange('Dite')}
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                        <TextField
                                            disabled={true}
                                            id="standard-multiline-flexible"
                                            label="Excercise F.I.T.T. Frequency Intensity Type Time"
                                            multiline
                                            rowsMax="4"
                                            fullWidth
                                            value={this.props.DM.Exercise != undefined ? this.props.DM.Exercise : ''}
                                            // onChange={this.handleChange('ExcerciseFITTFrequencyIntensityTypeTime')}
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                        <br />
                                        <br />
                                        <Collapsible trigger="Physical Exam >>" className={classes.collapsible}>
                                            {
                                                <TableWithDatePicker
                                                    tableHeaderColor="primary"
                                                    tableHead={[" ", "system", "Yes", "No", "Date", "Remark"]}
                                                    tableData={this.props.DMPhysicalExams.map(item => { return [item.System] })}
                                                    radio={2}
                                                    textbox={1}
                                                    hadleTableEvent={this.handlePhysicalExam}
                                                    hadleTableRemarkEvent={this.handlePhysicalExamRemarks}
                                                    disabled={true}
                                                    dataTable={this.props.DMPhysicalExams}
                                                />
                                            }
                                        </Collapsible>
                                        {/* <br />
                                        <FormLabel component="legend">Diagnosis</FormLabel>
                                        <CustomTable
                                            tableHeaderColor="primary"
                                            tableHead={["Diagnosis", "Code", "Date", "Visit"]}
                                            diagnosis={this.state.diagnosis}
                                            addDiagnosis={this.addDiagnosis}
                                        /> */}
                                    </form>
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

dhpNote.propTypes = {
    fetchDHPNotesDatail: propTypes.func.isRequired,
    fetchVitalSigen: propTypes.func.isRequired,
    patientNotes: propTypes.array.isRequired,
    isLoading: propTypes.bool.isRequired,
    hasError: propTypes.bool.isRequired,
    // DM: propTypes.array.isRequired,
    // DMHabits: propTypes.array.isRequired,
    // DMProblemLists: propTypes.array.isRequired,
    // DMOtherProblems: propTypes.array.isRequired,
    // DMPastProcedures: propTypes.array.isRequired,
    // DMVaccinations: propTypes.array.isRequired,
    // DMPatientEducations: propTypes.array.isRequired,
    // DMExams: propTypes.array.isRequired,
    // DMros: propTypes.array.isRequired,
    // DMPhysicalExams: propTypes.array.isRequired,
}
const mapStateToProps = (state) => ({
    DM: state.patientNote.DM,
    DMHabits: state.patientNote.DMHabits,
    DMProblemLists: state.patientNote.DMProblemLists,
    DMOtherProblems: state.patientNote.DMOtherProblems,
    DMPastProcedures: state.patientNote.DMPastProcedures,
    DMVaccinations: state.patientNote.DMVaccinations,
    DMPatientEducations: state.patientNote.DMPatientEducations,
    DMExams: state.patientNote.DMExams,
    DMros: state.patientNote.DMros,
    DMPhysicalExams: state.patientNote.DMPhysicalExams,
    patientNotes: state.patientNote.patientnotes,
    isLoading: state.patientNote.isLoading,
    hasError: state.patientNote.hasError,
    totalCount: state.patientNote.totalCount,
    selectedPatient: state.assignments.selectedPatient
});
const mapDispatchToProps = dispatch => ({
    fetchPatientNotes: (url) => dispatch(fetchPatientNotes(url)),
    fetchDHPNotesDatail: (url) => dispatch(fetchDHPNotesDatail(url))
});

export default compose(withStyles(styles), withMobileDialog(), connect(mapStateToProps, mapDispatchToProps))(dhpNote);