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
import propTypes from 'prop-types';

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
            diagnosis: []
        }
    }
    addDiagnosis = (selected) => {
        this.setState({
            diagnosis: [...this.state.diagnosis, ["2", "Minerva Hooper", "$23,789", "Curaçao"]]
        })
    }
    componentDidMount() {
        this.setState({
            diagnosis: [...this.state.diagnosis, ["1", "Dakota Rice", "$36,738", "Niger"]]
        })
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const url = '/Diagnosis/GetDiagnosisOfPatient/' + id;
        this.props.fetchPatientDiagnosis(url);
    }
    
    render() {
        {console.log(this.props.patientDiagnosis)}
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
                            //value={values.multiline}
                            //onChange={handleChange('multiline')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="History Of Present illness"
                            multiline
                            rowsMax="4"
                            fullWidth
                            //value={values.multiline}
                            //onChange={handleChange('multiline')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <selectTable />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Current Medications"
                            multiline
                            rowsMax="4"
                            fullWidth
                            //value={values.multiline}
                            //onChange={handleChange('multiline')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Allergies"
                            multiline
                            rowsMax="4"
                            fullWidth
                            //value={values.multiline}
                            //onChange={handleChange('multiline')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Assessment"
                            multiline
                            rowsMax="4"
                            fullWidth
                            //value={values.multiline}
                            //onChange={handleChange('multiline')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Plan"
                            multiline
                            rowsMax="4"
                            fullWidth
                            //value={values.multiline}
                            //onChange={handleChange('multiline')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Treatment"
                            multiline
                            rowsMax="4"
                            fullWidth
                            //value={values.multiline}
                            //onChange={handleChange('multiline')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <br/>
                        <br/>
                        <FormLabel style={{marginBottom: '-4px'}} component="legend">Family History</FormLabel>
                        <Table
                            tableHeaderColor="primary"
                            tableHead={[" ", " ", "Normal", "Abnormal", "Remark"]}
                            tableData={[["parents"], ["sublings"], ["others"]]}
                            radio={2}
                            textbox={1}
                        />
                        <br />
                        <br />
                        <FormLabel style={{ marginBottom: '-4px' }} component="legend">Social History</FormLabel>
                        <Table
                            tableHeaderColor="primary"
                            tableHead={[" ", " ", "Normal", "Abnormal", "Remark"]}
                            tableData={[
                                ["Habits"],
                                ["Employment History"],
                                ["Education"],
                                ["Social activities"],
                                ["Environment"],
                                ["Perinatal History"],
                                ["Developemnt History"],
                                ["Nutritional History"],
                                ["Vaccination History"],
                                ["Ealy development"],
                                ["Other"]
                            ]}
                            radio={2}
                            textbox={1}
                        />
                        <br />
                        <br />
                        <FormLabel style={{ marginBottom: '-4px' }} component="legend">Review of Systems</FormLabel>
                        <Table
                            tableHeaderColor="primary"
                            tableHead={[" ", " ", "Normal", "Abnormal", "Remark"]}
                            tableData={[
                                ["Head"],
                                ["Ears"],
                                ["Eyes"],
                                ["Nose"],
                                ["Mouth and throat"],
                                ["Glands"],
                                ["Respiratory"],
                                ["Cardiovascular"],
                                ["Gastrointestinal"],
                                ["Genitourinary"],
                                ["Integumentary"],
                                ["Allergy"],
                                ["Locomotion"],
                                ["CNS"],
                                ["Other"]
                            ]}
                            radio={2}
                            textbox={1}
                        />
                        <br />
                        <br />
                        <FormLabel style={{ marginBottom: '-4px' }} component="legend">Physical Exam</FormLabel>
                        <Table
                            tableHeaderColor="primary"
                            tableHead={[" ", " ", "Normal", "Abnormal", "Remark"]}
                            tableData={[
                                ["General Appearance"],
                                ["HEENT"],
                                ["Lymphoglandular"],
                                ["Respiratory"],
                                ["CVS"],
                                ["Gastrointestinal"],
                                ["Genitourinary"],
                                ["Integumentary"],
                                ["Musculoskeletal"],
                                ["CNS"],
                                ["Other"]
                            ]}
                            radio={2}
                            textbox={1}
                        />
                        <br />
                        <br />
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
    fetchPatientDiagnosis: propTypes.func.isRequired,
    patientDiagnosis: propTypes.array.isRequired,
    isLoading: propTypes.bool.isRequired,
    hasError: propTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    patientDiagnosis: state.diagnosisOrder.patientDiagnosis,
    isLoading: state.diagnosisOrder.isLoading,
    hasError: state.diagnosisOrder.hasError,
    selectedPatient: state.assignments.selectedPatient
});

const mapDispatchToProps = dispatch => ({
    fetchPatientDiagnosis: (url) => dispatch(fetchPatientDiagnosis(url))
});

export default compose(withStyles(style), connect(mapStateToProps, mapDispatchToProps))(newHPNote);