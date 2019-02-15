import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import { compose } from 'redux';
import TextField from '@material-ui/core/TextField';
import Table from '../Table/CustomTableWithSelector';
import TableWithDatePicker from '../Table/CustomTableWithSelector&Date';
import CustomTableWithTextBox from '../Table/CustomTableWithTextBox';
import FormLabel from '@material-ui/core/FormLabel';
import CustomTable from '../Diagnosis/CustomDiagnosis';
import { fetchPatientDiagnosis } from '../../redux/actions/diagnosisAction';
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

class newDHPNote extends Component {
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
            diagnosis: [...this.state.diagnosis, ["panadol", "34ft", "jan 7", "new"]]
        })
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const url = '/Diagnosis/GetDiagnosisOfPatient/' + id;
        this.props.fetchPatientDiagnosis(url);
    }

    render() {
        { console.log(this.props.patientDiagnosis) }
        const { classes } = this.props;
        return (
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Diabetis History And Physical Note</h4>
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
                            label="HPI"
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
                            label="HMBG  Values"
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
                            label="BP Home Monitoring Values"
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
                            label="Allergies:"
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
                            label="Medications:"
                            multiline
                            rowsMax="4"
                            fullWidth
                            //value={values.multiline}
                            //onChange={handleChange('multiline')}
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
                                    tableData={[["Cigarattes"], ["Alchol"], ["Chat"]]}
                                    radio={2}
                                    textbox={1}
                                />
                            }
                        </Collapsible>
                        <br />
                        <Collapsible trigger="Problem List with year of diagnosis >>" className={classes.collapsible}>
                            {
                                <Table
                                    tableHeaderColor="primary"
                                    tableHead={[" ", "Problem", "Yes", "No", "Diagnosis Year", "Remark"]}
                                    tableData={[
                                        ["Diabetes"],
                                        ["Other"]
                                    ]}
                                    radio={2}
                                    textBox={2}
                                />
                            }
                        </Collapsible>
                        <br />
                        <Collapsible trigger="Other Medical Problem >>" className={classes.collapsible}>
                            {
                                <Table
                                    tableHeaderColor="primary"
                                    tableHead={[" ", "Problem", "Yes", "No", "Remark"]}
                                    tableData={[
                                        ["CAD"],
                                        ["PVD"],
                                        ["Other"]
                                    ]}
                                    radio={2}
                                    textbox={1}
                                />
                            }
                        </Collapsible>
                        <br />
                        <Collapsible trigger="Past Surgical Procedures >>" className={classes.collapsible}>
                            {
                                <TableWithDatePicker
                                    tableHeaderColor="primary"
                                    tableHead={[" ", "Problem", "Yes", "No", "Date", "Remark"]}
                                    tableData={[
                                        ["General Appearance"],
                                        ["HEENT"],
                                        ["Other"]
                                    ]}
                                    radio={2}
                                    textbox={1}
                                />
                            }
                        </Collapsible>
                        <br/>
                        <Collapsible trigger="Vaccinations >>" className={classes.collapsible}>
                            {
                                <TableWithDatePicker
                                    tableHeaderColor="primary"
                                    tableHead={[" ", "vaccine", "Yes", "No", "Date", "Remark"]}
                                    tableData={[
                                        ["General Appearance"],
                                        ["HEENT"],
                                        ["Other"]
                                    ]}
                                    radio={2}
                                    textbox={1}
                                />
                            }
                        </Collapsible>
                        <br />
                        <Collapsible trigger="Patient Education >>" className={classes.collapsible}>
                            {
                                <TableWithDatePicker
                                    tableHeaderColor="primary"
                                    tableHead={[" ", "education", "Yes", "No", "Date", "Remark"]}
                                    tableData={[
                                        ["General Appearance"],
                                        ["HEENT"],
                                        ["Other"]
                                    ]}
                                    radio={2}
                                    textbox={1}
                                />
                            }
                        </Collapsible>
                        <br />
                        <Collapsible trigger="Exams >>" className={classes.collapsible}>
                            {
                                <TableWithDatePicker
                                    tableHeaderColor="primary"
                                    tableHead={[" ", "exam", "Yes", "No", "Date", "Remark"]}
                                    tableData={[
                                        ["General Appearance"],
                                        ["HEENT"],
                                        ["Other"]
                                    ]}
                                    radio={2}
                                    textbox={1}
                                />
                            }
                        </Collapsible>
                        <br />
                        <Collapsible trigger="ROS >>" className={classes.collapsible}>
                            {
                                <TableWithDatePicker
                                    tableHeaderColor="primary"
                                    tableHead={[" ", "system", "Yes", "No", "Date", "Remark"]}
                                    tableData={[
                                        ["General Appearance"],
                                        ["HEENT"],
                                        ["Other"]
                                    ]}
                                    radio={2}
                                    textbox={1}
                                />
                            }
                        </Collapsible>
                        <TextField
                            id="standard-multiline-flexible"
                            label="Dite"
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
                            label="Excercise F.I.T.T. Frequency Intensity Type Time"
                            multiline
                            rowsMax="4"
                            fullWidth
                            //value={values.multiline}
                            //onChange={handleChange('multiline')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <br />
                        <Collapsible trigger="Physical Exam >>" className={classes.collapsible}>
                            {
                                <TableWithDatePicker
                                    tableHeaderColor="primary"
                                    tableHead={[" ", "system", "Yes", "No", "Date", "Remark"]}
                                    tableData={[
                                        ["General Appearance"],
                                        ["HEENT"],
                                        ["Other"]
                                    ]}
                                    radio={2}
                                    textbox={1}
                                />
                            }
                        </Collapsible>
                    </form>
                </CardBody>
            </Card>
        );
    }
}

newDHPNote.propTypes = {
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

export default compose(withStyles(style), connect(mapStateToProps, mapDispatchToProps))(newDHPNote);