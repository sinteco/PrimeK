import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import { compose } from 'redux';
import TextField from '@material-ui/core/TextField';
import Table from '../Table/CustomTableWithSelector';
import FormLabel from '@material-ui/core/FormLabel';
import CustomTable from '../Diagnosis/CustomDiagnosis';
import { fetchPatientDiagnosis } from '../../redux/actions/diagnosisAction';
import { fetchNoteSubCategory, fetchFamilyHistory,fetchMedicalHistory, fetchPhysicalExam, fetchSocialHistory,fetchReviewofSystems } from '../../redux/actions/patientNoteAction';
import propTypes from 'prop-types';
import Collapsible from 'react-collapsible';
import Button from '@material-ui/core/Button';

const style = {
    typo: {
      paddingLeft: "25%",
      marginBottom: "40px",
      position: "relative"
    },
    note: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      bottom: "10px",
      color: "#c0c1c2",
      display: "block",
      fontWeight: "400",
      fontSize: "13px",
      lineHeight: "13px",
      left: "0",
      marginLeft: "20px",
      position: "absolute",
      width: "260px"
    },
    cardCategoryWhite: {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none"
    }
  };

class newHPNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diagnosis: [],
            chifcompliant: '',
            historyofpresentillness: '',
            currentmedications: '',
            allergies: '',
            assessment: '',
            plan: '',
            treatment: '',
            pastMedicalHistory: [],
            familyHistory: [],
            socialHistory: [],
            reviewofSystems: [],
            physicalExam: [],
            newDiagnosis: []
        }
        this.hadlePastMedicalHistory = this.hadlePastMedicalHistory.bind(this);
        this.hadlePastMedicalHistoryRemarks = this.hadlePastMedicalHistoryRemarks.bind(this);
    }
    hadlePastMedicalHistory(key, value) {
        this.setState({
            pastMedicalHistory: [...this.state.pastMedicalHistory, {
                name: key[0],
                value: value.substring(0, 1) == 'n' ? true : false,
                Remark: value
            }]
        },() => console.log(this.state.pastMedicalHistory));
    }
    hadlePastMedicalHistoryRemarks(key, value, index){
        // alert(key + " " + value);
        if(true) {
            var array = [...this.state.pastMedicalHistory]; // make a separate copy of the array
            //var index = array.indexOf(key);
            console.log(key[0]);
            console.log(array.map(function (e) { return e.name; }).indexOf(key[0]));
            if (index !== -1) {
                array.splice(index, 1);
                //this.setState({ pastMedicalHistory: array });
            }
        }
    }
    handleClick() {
        alert("handle save");
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    addDiagnosis = (selected) => {
        this.setState({
            diagnosis: [...this.state.diagnosis, ["2", "Minerva Hooper", "$23,789", "Curaçao"]]
        })
    }
    componentDidMount() {
        this.setState({
            // diagnosis: [...this.state.diagnosis, ["panadol", "34ft", "jan 7", "new"]]
        })
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const url = '/Diagnosis/GetDiagnosisOfPatient/' + id;
        this.props.fetchPatientDiagnosis(url);
        
        const medicalHistoryURL = 'PatientNotes/GetNoteSubCategory/Medical History';
        this.props.fetchMedicalHistory(medicalHistoryURL);

        const socialHistoryURL = 'PatientNotes/GetNoteSubCategory/Personal History';
        this.props.fetchSocialHistory(socialHistoryURL);

        const familyHistoryURL = 'PatientNotes/GetNoteSubCategory/Family History';
        this.props.fetchFamilyHistory(familyHistoryURL);

        const reviewofSystemsURL = 'PatientNotes/GetNoteSubCategory/Review of Systems';
        this.props.fetchReviewofSystems(reviewofSystemsURL);

        const physicalExamURL = 'PatientNotes/GetNoteSubCategory/Physical Exam';
        this.props.fetchPhysicalExam(physicalExamURL);

    }
    
    render() {
        const { classes } = this.props;
        return (
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>History And Physical Note</h4>
                    <p className={classes.cardCategoryWhite}>
                    {/* Created using Roboto Font Family */}
                    </p>
                </CardHeader>
                <CardBody>
                    <form>
                        <TextField
                            id="standard-multiline-flexible"
                            label="Chif Compliant"
                            multiline
                            rowsMax="4"
                            fullWidth
                            value={this.state.chifcompliant}
                            onChange={this.handleChange('chifcompliant')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="History Of Present illness"
                            multiline
                            rowsMax="4"
                            fullWidth
                            value={this.state.historyofpresentillness}
                            onChange={this.handleChange('historyofpresentillness')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <br />
                        <br />
                        <Collapsible trigger="Past Medical History >>" className={classes.collapsible}>
                            {
                                <Table
                                    tableHeaderColor="primary"
                                    tableHead={[" ", " ", "Normal", "Abnormal", "Remark"]}
                                    tableData={this.props.MedicalHistory.map(item => { return [item.Name] })}
                                    hadleTableEvent={this.hadlePastMedicalHistory}
                                    hadleTableRemarkEvent={this.hadlePastMedicalHistoryRemarks}
                                    radio={2}
                                    textbox={1}
                                />
                            }
                        </Collapsible>
                        <TextField
                            id="standard-multiline-flexible"
                            label="Current Medications"
                            multiline
                            rowsMax="4"
                            fullWidth
                            value={this.state.currentmedications}
                            onChange={this.handleChange('currentmedications')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Allergies"
                            multiline
                            rowsMax="4"
                            fullWidth
                            value={this.state.allergies}
                            onChange={this.handleChange('allergies')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <br/>
                        <br/>
                        <Collapsible trigger="Family History >>" className={classes.collapsible}>
                            {
                                <Table
                                    tableHeaderColor="primary"
                                    tableHead={[" ", " ", "Normal", "Abnormal", "Remark"]}
                                    tableData={this.props.FamilyHistory.map(item => { return [item.Name] })}
                                    radio={2}
                                    textbox={1}
                                />
                            }
                        </Collapsible>
                        <br />
                        <Collapsible trigger="Social History >>" className={classes.collapsible}>
                            {
                                <Table
                                    tableHeaderColor="primary"
                                    tableHead={[" ", " ", "Normal", "Abnormal", "Remark"]}
                                    tableData={this.props.SocialHistory.map(item => { return [item.Name] })}
                                    radio={0}
                                    textbox={1}
                                />
                            }
                        </Collapsible>
                        <br />
                        <Collapsible trigger="Review of Systems >>" className={classes.collapsible}>
                            {
                                <Table
                                    tableHeaderColor="primary"
                                    tableHead={[" ", " ", "Normal", "Abnormal", "Remark"]}
                                    tableData={this.props.ReviewofSystems.map(item => { return [item.Name] })}
                                    radio={2}
                                    textbox={1}
                                />
                            }
                        </Collapsible>
                        <br />
                        <Collapsible trigger="Physical Exam >>" className={classes.collapsible}>
                            {
                                <Table
                                    tableHeaderColor="primary"
                                    tableHead={[" ", " ", "Normal", "Abnormal", "Remark"]}
                                    tableData={this.props.PhysicalExam.map(item => { return [item.Name] })}
                                    radio={2}
                                    textbox={1}
                                />
                            }
                        </Collapsible>
                        <TextField
                            id="standard-multiline-flexible"
                            label="Assessment"
                            multiline
                            rowsMax="4"
                            fullWidth
                            value={this.state.assessment}
                            onChange={this.handleChange('assessment')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Plan"
                            multiline
                            rowsMax="4"
                            fullWidth
                            value={this.state.plan}
                            onChange={this.handleChange('plan')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Treatment"
                            multiline
                            rowsMax="4"
                            fullWidth
                            value={this.state.treatment}
                            onChange={this.handleChange('treatment')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <br/>
                        <br/>
                        <FormLabel component="legend">Diagnosis</FormLabel>
                        <CustomTable
                            tableHeaderColor="primary"
                            tableHead={["Diagnosis", "Code", "Date", "Visit"]}
                            diagnosis={this.state.diagnosis}
                            addDiagnosis={this.addDiagnosis}
                        />
                        <br/>
                        <Button onClick={this.handleClick} style={{ float: 'right' }} variant="contained" color="primary" className={classes.button}>
                            Save
                        </Button>
                    </form>
                </CardBody>
            </Card>
        );
    }
}

newHPNote.propTypes = {
    fetchFamilyHistory: propTypes.func.isRequired,
    fetchMedicalHistory: propTypes.func.isRequired,
    fetchPhysicalExam: propTypes.func.isRequired,
    fetchSocialHistory: propTypes.func.isRequired,
    fetchReviewofSystems: propTypes.func.isRequired,
    fetchNoteSubCategory: propTypes.func.isRequired,
    fetchPatientDiagnosis: propTypes.func.isRequired,
    patientDiagnosis: propTypes.array.isRequired,
    isLoading: propTypes.bool.isRequired,
    hasError: propTypes.bool.isRequired,
    noteSubCategory: propTypes.array.isRequired,
    SocialHistory: propTypes.array.isRequired,
    FamilyHistory: propTypes.array.isRequired,
    MedicalHistory: propTypes.array.isRequired,
    ReviewofSystems: propTypes.array.isRequired,
    PhysicalExam: propTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    patientDiagnosis: state.diagnosisOrder.patientDiagnosis,
    isLoading: state.diagnosisOrder.isLoading,
    hasError: state.diagnosisOrder.hasError,
    selectedPatient: state.assignments.selectedPatient,
    noteSubCategory: state.patientNote.noteSubCategory,
    SocialHistory: state.patientNote.SocialHistory,
    FamilyHistory: state.patientNote.FamilyHistory,
    MedicalHistory: state.patientNote.MedicalHistory,
    ReviewofSystems: state.patientNote.ReviewofSystems,
    PhysicalExam: state.patientNote.PhysicalExam,
});

const mapDispatchToProps = dispatch => ({
    fetchPatientDiagnosis: (url) => dispatch(fetchPatientDiagnosis(url)),
    fetchNoteSubCategory: (url) => dispatch(fetchNoteSubCategory(url)),
    fetchFamilyHistory: (url) => dispatch(fetchFamilyHistory(url)),
    fetchMedicalHistory: (url) => dispatch(fetchMedicalHistory(url)),
    fetchPhysicalExam: (url) => dispatch(fetchPhysicalExam(url)),
    fetchSocialHistory: (url) => dispatch(fetchSocialHistory(url)),
    fetchReviewofSystems: (url) => dispatch(fetchReviewofSystems(url)),
});

export default compose(withStyles(style), connect(mapStateToProps, mapDispatchToProps))(newHPNote);