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
import { fetchNoteSubCategory } from '../../redux/actions/patientNoteAction';
import propTypes from 'prop-types';
import Collapsible from 'react-collapsible';

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

    let MedicalHistory = [];
    let SocialHistory = [];
    let FamilyHistory = [];
    let ReviewofSystems = [];
    let PhysicalExam = [];

class newHPNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diagnosis: [],
            chifcompliant: '',
            historyofpresentillness: '',
        }
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    returMedicalHistory() {
        var a = new Array();
        this.props.noteSubCategory.map((noteSub) => {
            a.push([[noteSub.Name]])
        });
        return a;
    }
    returnSocialHistory(){
        const medicalHistoryURL = 'PatientNotes/GetNoteSubCategory/Personal History';
        this.props.fetchNoteSubCategory(medicalHistoryURL);
        var a = new Array();
        this.props.noteSubCategory.map((noteSub) => {
            a.push([[noteSub.Name]])
        });
        return a;
    }
    returnFamilyHistory(){
        const medicalHistoryURL = 'PatientNotes/GetNoteSubCategory/Family History';
        this.props.fetchNoteSubCategory(medicalHistoryURL);
        var a = new Array();
        this.props.noteSubCategory.map((noteSub) => {
            a.push([[noteSub.Name]])
        });
        return a;
    }
    returnReviewofSystems(){
        const medicalHistoryURL = 'PatientNotes/GetNoteSubCategory/Review of Systems';
        this.props.fetchNoteSubCategory(medicalHistoryURL);
        var a = new Array();
        this.props.noteSubCategory.map((noteSub) => {
            a.push([[noteSub.Name]])
        });
        return a;
    }
    returnPhysicalExam(){
        const medicalHistoryURL = 'PatientNotes/GetNoteSubCategory/PhysicalExam';
        this.props.fetchNoteSubCategory(medicalHistoryURL);
        var a = new Array();
        this.props.noteSubCategory.map((noteSub) => {
            a.push([[noteSub.Name]])
        });
        return a;
    }
    addDiagnosis = (selected) => {
        this.setState({
            diagnosis: [...this.state.diagnosis, ["2", "Minerva Hooper", "$23,789", "Curaçao"]]
        })
    }
    componentDidMount() {
        this.setState({
            diagnosis: [...this.state.diagnosis, ["panadol", "34ft", "jan 7", "new"]]
        })
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const url = '/Diagnosis/GetDiagnosisOfPatient/' + id;
        this.props.fetchPatientDiagnosis(url);
        
        const medicalHistoryURL = 'PatientNotes/GetNoteSubCategory/Medical History';
        this.props.fetchNoteSubCategory(medicalHistoryURL);
        MedicalHistory = this.returMedicalHistory();

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
                                    tableData={MedicalHistory}
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
                                    tableData={MedicalHistory}
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
                                    tableData={SocialHistory}
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
                                    tableData={ReviewofSystems}
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
                                    tableData={PhysicalExam}
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
                    </form>
                </CardBody>
            </Card>
        );
    }
}

newHPNote.propTypes = {
    fetchNoteSubCategory: propTypes.func.isRequired,
    fetchPatientDiagnosis: propTypes.func.isRequired,
    patientDiagnosis: propTypes.array.isRequired,
    isLoading: propTypes.bool.isRequired,
    hasError: propTypes.bool.isRequired,
    noteSubCategory: propTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    patientDiagnosis: state.diagnosisOrder.patientDiagnosis,
    isLoading: state.diagnosisOrder.isLoading,
    hasError: state.diagnosisOrder.hasError,
    selectedPatient: state.assignments.selectedPatient,
    noteSubCategory: state.patientNote.noteSubCategory,
});

const mapDispatchToProps = dispatch => ({
    fetchPatientDiagnosis: (url) => dispatch(fetchPatientDiagnosis(url)),
    fetchNoteSubCategory: (url) => dispatch(fetchNoteSubCategory(url))
});

export default compose(withStyles(style), connect(mapStateToProps, mapDispatchToProps))(newHPNote);