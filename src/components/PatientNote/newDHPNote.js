import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
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
import { saveHPNote,fetchDMHabit,fetchDMOtherProblem,fetchDMProblemList,fetchDMPastProcedure,fetchDMVaccination,fetchDMPatientEducation,fetchDMExam,fetchDMROS, fetchPhysicalExam } from '../../redux/actions/patientNoteAction';
import propTypes from 'prop-types';
import Collapsible from 'react-collapsible';
import Moment from 'moment';

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
            diagnosis: [],
            chifcompliant: '',
            HPI: '',
            HMBGValues: '',
            BPHomeMonitoringValues: '',
            Allergies: '',
            Medications: '',
            Dite: '',
            ExcerciseFITTFrequencyIntensityTypeTime: '',
            habits: [],
            problemListWithYearOfDiagnosis:[],
            diagnosisTableNo: 1,
            OtherMedicalProblem: [],
            pastSurgicalProcedures: [],
            vaccinations: [],
            patientEducation: [],
            exams: [],
            ROS: [],
            physicalExam: []
        }
        this.handleHabits = this.handleHabits.bind(this);
        this.handleProblemList = this.handleProblemList.bind(this);
        this.handleProblemListRemarks = this.handleProblemListRemarks.bind(this);
        this.handleOtherMedicalProblem = this.handleOtherMedicalProblem.bind(this);
        this.handleOtherMedicalProblemRemarks = this.handleOtherMedicalProblemRemarks.bind(this);
        this.handlePastSurgicalProcedures = this.handlePastSurgicalProcedures.bind(this);
        this.handlePastSurgicalProceduresRemarks = this.handlePastSurgicalProceduresRemarks.bind(this);
        this.handleVaccinations = this.handleVaccinations.bind(this);
        this.handleVaccinationsRemarks = this.handleVaccinationsRemarks.bind(this);
        this.handlePatientEducation = this.handlePatientEducation.bind(this);
        this.handlePatientEducationRemarks = this.handlePatientEducationRemarks.bind(this);
        this.handleExams = this.handleExams.bind(this);
        this.handleExamsRemarks = this.handleExamsRemarks.bind(this);
        this.handleROS = this.handleROS.bind(this);
        this.handleROSRemarks = this.handleROSRemarks.bind(this);
        this.handlePhysicalExam = this.handlePhysicalExam.bind(this);
        this.handlePhysicalExamRemarks = this.handlePhysicalExamRemarks.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    addDiagnosis = (selected, visit) => {
        // console.log(selected);
        if (selected != "" && visit != "" && !this.state.diagnosis.map(function (e) { return e[1]; }).includes(selected)) {
            this.setState({
                diagnosis: [...this.state.diagnosis, [this.state.diagnosisTableNo, selected, new Date().toLocaleDateString("en-US"), visit]],
                diagnosisTableNo: this.state.diagnosisTableNo + 1
            })
        }
    }
    handleOtherMedicalProblem(key, value, prevalue){
        if (!this.state.OtherMedicalProblem.map(function (e) { return e.name; }).includes(key[0])) {
            this.setState({
                OtherMedicalProblem: [...this.state.OtherMedicalProblem, {
                    name: key[0],
                    value: value.substring(0, 1) == 'n' ? true : false,
                    Remark: "",
                    // diagnosisYear: ""
                }]
            }, () => console.log(this.state.OtherMedicalProblem));
        } else {
            var array = [...this.state.OtherMedicalProblem]; // make a separate copy of the array
            var index = array.map(function (e) { return e.name; }).indexOf(key[0]);
            if (index !== -1) {
                array.splice(index, 1);
                array.push(
                    {
                        name: key[0],
                        value: value.substring(0, 1) == 'n' ? true : false,
                        Remark: prevalue['value'],
                        // diagnosisYear: ""
                    }
                );
                console.log(array);
                this.setState({ OtherMedicalProblem: array });
            }
        }
    }
    handleProblemList(key, value, prevalue) {
        if (!this.state.problemListWithYearOfDiagnosis.map(function (e) { return e.name; }).includes(key[0])) {
            this.setState({
                problemListWithYearOfDiagnosis: [...this.state.problemListWithYearOfDiagnosis, {
                    name: key[0],
                    value: value.substring(0, 1) == 'n' ? true : false,
                    Remark: "",
                    diagnosisYear: ""
                }]
            }, () => console.log(this.state.problemListWithYearOfDiagnosis));
        } else {
            var array = [...this.state.problemListWithYearOfDiagnosis]; // make a separate copy of the array
            var index = array.map(function (e) { return e.name; }).indexOf(key[0]);
            if (index !== -1) {
                array.splice(index, 1);
                array.push(
                    {
                        name: key[0],
                        value: value.substring(0, 1) == 'n' ? true : false,
                        Remark: prevalue['value'],
                        diagnosisYear: ""
                    }
                );
                console.log(array);
                this.setState({ problemListWithYearOfDiagnosis: array });
            }
        }
    }
    handleProblemListRemarks(key, value,textb, rowkey, prevalue) {
        if (true) {
            var array = [...this.state.problemListWithYearOfDiagnosis]; // make a separate copy of the array
            var index = array.map(function (e) { return e.name; }).indexOf(key[0]);
            var remark = '';
            var diagnosisyear = '';
            var prvremark = '';
            var prvdiagnosisyear = '';
            if (value.filter(function (obj) { if (obj.key == rowkey && obj.row == textb && textb == 1) { return obj.value; } }).length){
                remark = value.filter(function (obj) { if (obj.key == rowkey && obj.row == textb && textb == 1) { return obj.value; } })[0].value;
            }
            if (value.filter(function (obj) { if (obj.key == rowkey && obj.row == textb && textb == 0) { return obj.value; } }).length){
                diagnosisyear = value.filter(function (obj) { if (obj.key == rowkey && obj.row == textb && textb == 0) { return obj.value; } })[0].value;
            }
            if (array.filter(function (obj) {return obj.name == key[0];}).length){
                prvremark = array.filter(function (obj) { return obj.name == key[0]; })[0].Remark;
                prvdiagnosisyear = array.filter(function (obj) { return obj.name == key[0]; })[0].diagnosisYear;
            }
            if (index !== -1) {
                array.splice(index, 1);
                if(textb==1){
                    array.push(
                        {
                            name: key[0],
                            value: prevalue.substring(0, 1) == 'n' ? true : false,
                            Remark: remark,
                            diagnosisYear: prvdiagnosisyear
                        }
                    );
                }else if(textb==0){
                    array.push(
                        {
                            name: key[0],
                            value: prevalue.substring(0, 1) == 'n' ? true : false,
                            Remark: prvremark,
                            diagnosisYear: diagnosisyear
                        }
                    );
                }
                // console.log(value.filter(function (obj) { if (obj.key == rowkey && obj.row == textb && textb == 1) { return obj; } })[0].value);
                console.log(array);
                this.setState({ problemListWithYearOfDiagnosis: array });
            }
        }
    }
    handleOtherMedicalProblemRemarks(key, value, textb, rowkey, prevalue) {
        if (true) {
            var array = [...this.state.OtherMedicalProblem]; // make a separate copy of the array
            var index = array.map(function (e) { return e.name; }).indexOf(key[0]);
            var remark = '';
            if (value.filter(function (obj) { if (obj.key == rowkey && obj.row == textb && textb == 0) { return obj.value; } }).length) {
                remark = value.filter(function (obj) { if (obj.key == rowkey && obj.row == textb && textb == 0) { return obj.value; } })[0].value;
            }
            if (index !== -1) {
                array.splice(index, 1);
                if (textb == 0) {
                    array.push(
                        {
                            name: key[0],
                            value: prevalue.substring(0, 1) == 'n' ? true : false,
                            Remark: remark
                        }
                    );
                }
                console.log(array);
                this.setState({ OtherMedicalProblem: array });
            }
        }
    }
    handlePastSurgicalProcedures(key, value, prevalue) {
        //console.log(key+" "+value+" "+prevalue);
        if (!this.state.pastSurgicalProcedures.map(function (e) { return e.name; }).includes(key[0])) {
            this.setState({
                pastSurgicalProcedures: [...this.state.pastSurgicalProcedures, {
                    name: key[0],
                    value: value.substring(0, 1) == 'n' ? true : false,
                    Remark: "",
                    date: Moment(Date()).format('YYYY-MM-DD')
                }]
            }, () => console.log(this.state.pastSurgicalProcedures));
        } else {
            var array = [...this.state.pastSurgicalProcedures]; // make a separate copy of the array
            var index = array.map(function (e) { return e.name; }).indexOf(key[0]);
            if (index !== -1) {
                array.splice(index, 1);
                array.push(
                    {
                        name: key[0],
                        value: value.substring(0, 1) == 'n' ? true : false,
                        Remark: prevalue,
                        date: Moment(Date()).format('YYYY-MM-DD')
                    }
                );
                console.log(array);
                this.setState({ pastSurgicalProcedures: array });
            }
        }
    }
    handlePastSurgicalProceduresRemarks(key, value, prevalue, date){
        //console.log(key + " " + value + " " + prevalue);
        if (true) {
            var array = [...this.state.pastSurgicalProcedures]; // make a separate copy of the array
            var index = array.map(function (e) { return e.name; }).indexOf(key[0]);
            if (index !== -1) {
                array.splice(index, 1);
                array.push(
                    {
                        name: key[0],
                        value: prevalue.substring(0, 1) == 'n' ? true : false,
                        Remark: value,
                        date: Moment(date).format('YYYY-MM-DD')
                    }
                );
                console.log(array);
                this.setState({ pastSurgicalProcedures: array });
            }
        }
    }
    handleVaccinations(key, value, prevalue) {
        //console.log(key+" "+value+" "+prevalue);
        if (!this.state.vaccinations.map(function (e) { return e.name; }).includes(key[0])) {
            this.setState({
                vaccinations: [...this.state.vaccinations, {
                    name: key[0],
                    value: value.substring(0, 1) == 'n' ? true : false,
                    Remark: "",
                    date: Moment(Date()).format('YYYY-MM-DD')
                }]
            }, () => console.log(this.state.vaccinations));
        } else {
            var array = [...this.state.vaccinations]; // make a separate copy of the array
            var index = array.map(function (e) { return e.name; }).indexOf(key[0]);
            if (index !== -1) {
                array.splice(index, 1);
                array.push(
                    {
                        name: key[0],
                        value: value.substring(0, 1) == 'n' ? true : false,
                        Remark: prevalue,
                        date: Moment(Date()).format('YYYY-MM-DD')
                    }
                );
                console.log(array);
                this.setState({ vaccinations: array });
            }
        }
    }
    handleVaccinationsRemarks(key, value, prevalue, date) {
        //console.log(key + " " + value + " " + prevalue);
        if (true) {
            var array = [...this.state.vaccinations]; // make a separate copy of the array
            var index = array.map(function (e) { return e.name; }).indexOf(key[0]);
            if (index !== -1) {
                array.splice(index, 1);
                array.push(
                    {
                        name: key[0],
                        value: prevalue.substring(0, 1) == 'n' ? true : false,
                        Remark: value,
                        date: Moment(date).format('YYYY-MM-DD')
                    }
                );
                console.log(array);
                this.setState({ vaccinations: array });
            }
        }
    }
    handlePatientEducation(key, value, prevalue) {
        //console.log(key+" "+value+" "+prevalue);
        if (!this.state.patientEducation.map(function (e) { return e.name; }).includes(key[0])) {
            this.setState({
                patientEducation: [...this.state.patientEducation, {
                    name: key[0],
                    value: value.substring(0, 1) == 'n' ? true : false,
                    Remark: "",
                    date: Moment(Date()).format('YYYY-MM-DD')
                }]
            }, () => console.log(this.state.patientEducation));
        } else {
            var array = [...this.state.patientEducation]; // make a separate copy of the array
            var index = array.map(function (e) { return e.name; }).indexOf(key[0]);
            if (index !== -1) {
                array.splice(index, 1);
                array.push(
                    {
                        name: key[0],
                        value: value.substring(0, 1) == 'n' ? true : false,
                        Remark: prevalue,
                        date: Moment(Date()).format('YYYY-MM-DD')
                    }
                );
                console.log(array);
                this.setState({ patientEducation: array });
            }
        }
    }
    handlePatientEducationRemarks(key, value, prevalue, date) {
        //console.log(key + " " + value + " " + prevalue);
        if (true) {
            var array = [...this.state.patientEducation]; // make a separate copy of the array
            var index = array.map(function (e) { return e.name; }).indexOf(key[0]);
            if (index !== -1) {
                array.splice(index, 1);
                array.push(
                    {
                        name: key[0],
                        value: prevalue.substring(0, 1) == 'n' ? true : false,
                        Remark: value,
                        date: Moment(date).format('YYYY-MM-DD')
                    }
                );
                console.log(array);
                this.setState({ patientEducation: array });
            }
        }
    }
    handleExams(key, value, prevalue) {
        //console.log(key+" "+value+" "+prevalue);
        if (!this.state.exams.map(function (e) { return e.name; }).includes(key[0])) {
            this.setState({
                exams: [...this.state.exams, {
                    name: key[0],
                    value: value.substring(0, 1) == 'n' ? true : false,
                    Remark: "",
                    date: Moment(Date()).format('YYYY-MM-DD')
                }]
            }, () => console.log(this.state.exams));
        } else {
            var array = [...this.state.exams]; // make a separate copy of the array
            var index = array.map(function (e) { return e.name; }).indexOf(key[0]);
            if (index !== -1) {
                array.splice(index, 1);
                array.push(
                    {
                        name: key[0],
                        value: value.substring(0, 1) == 'n' ? true : false,
                        Remark: prevalue,
                        date: Moment(Date()).format('YYYY-MM-DD')
                    }
                );
                console.log(array);
                this.setState({ exams: array });
            }
        }
    }
    handleExamsRemarks(key, value, prevalue, date) {
        //console.log(key + " " + value + " " + prevalue);
        if (true) {
            var array = [...this.state.exams]; // make a separate copy of the array
            var index = array.map(function (e) { return e.name; }).indexOf(key[0]);
            if (index !== -1) {
                array.splice(index, 1);
                array.push(
                    {
                        name: key[0],
                        value: prevalue.substring(0, 1) == 'n' ? true : false,
                        Remark: value,
                        date: Moment(date).format('YYYY-MM-DD')
                    }
                );
                console.log(array);
                this.setState({ exams: array });
            }
        }
    }
    handleROS(key, value, prevalue) {
        //console.log(key+" "+value+" "+prevalue);
        if (!this.state.ROS.map(function (e) { return e.name; }).includes(key[0])) {
            this.setState({
                ROS: [...this.state.ROS, {
                    name: key[0],
                    value: value.substring(0, 1) == 'n' ? true : false,
                    Remark: "",
                    date: Moment(Date()).format('YYYY-MM-DD')
                }]
            }, () => console.log(this.state.ROS));
        } else {
            var array = [...this.state.ROS]; // make a separate copy of the array
            var index = array.map(function (e) { return e.name; }).indexOf(key[0]);
            if (index !== -1) {
                array.splice(index, 1);
                array.push(
                    {
                        name: key[0],
                        value: value.substring(0, 1) == 'n' ? true : false,
                        Remark: prevalue,
                        date: Moment(Date()).format('YYYY-MM-DD')
                    }
                );
                console.log(array);
                this.setState({ ROS: array });
            }
        }
    }
    handleROSRemarks(key, value, prevalue, date) {
        //console.log(key + " " + value + " " + prevalue);
        if (true) {
            var array = [...this.state.ROS]; // make a separate copy of the array
            var index = array.map(function (e) { return e.name; }).indexOf(key[0]);
            if (index !== -1) {
                array.splice(index, 1);
                array.push(
                    {
                        name: key[0],
                        value: prevalue.substring(0, 1) == 'n' ? true : false,
                        Remark: value,
                        date: Moment(date).format('YYYY-MM-DD')
                    }
                );
                console.log(array);
                this.setState({ ROS: array });
            }
        }
    }
    handlePhysicalExam(key, value, prevalue) {
        //console.log(key+" "+value+" "+prevalue);
        if (!this.state.physicalExam.map(function (e) { return e.name; }).includes(key[0])) {
            this.setState({
                physicalExam: [...this.state.physicalExam, {
                    name: key[0],
                    value: value.substring(0, 1) == 'n' ? true : false,
                    Remark: "",
                    date: Moment(Date()).format('YYYY-MM-DD')
                }]
            }, () => console.log(this.state.physicalExam));
        } else {
            var array = [...this.state.physicalExam]; // make a separate copy of the array
            var index = array.map(function (e) { return e.name; }).indexOf(key[0]);
            if (index !== -1) {
                array.splice(index, 1);
                array.push(
                    {
                        name: key[0],
                        value: value.substring(0, 1) == 'n' ? true : false,
                        Remark: prevalue,
                        date: Moment(Date()).format('YYYY-MM-DD')
                    }
                );
                console.log(array);
                this.setState({ physicalExam: array });
            }
        }
    }
    handlePhysicalExamRemarks(key, value, prevalue, date) {
        //console.log(key + " " + value + " " + prevalue);
        if (true) {
            var array = [...this.state.physicalExam]; // make a separate copy of the array
            var index = array.map(function (e) { return e.name; }).indexOf(key[0]);
            if (index !== -1) {
                array.splice(index, 1);
                array.push(
                    {
                        name: key[0],
                        value: prevalue.substring(0, 1) == 'n' ? true : false,
                        Remark: value,
                        date: Moment(date).format('YYYY-MM-DD')
                    }
                );
                console.log(array);
                this.setState({ physicalExam: array });
            }
        }
    }
    handleHabits(key, value, row){
        if (true) {
            var array = [...this.state.habits]; // make a separate copy of the array
            var index = array.findIndex(obj => obj.name == value && obj.row == row);
            if (index !== -1) {
                array.splice(index, 1);
                array.push(
                    {
                        value: key,
                        row: row,
                        name: value
                    }
                );
                console.log(array);
                this.setState({ habits: array });
            }else{
                array.push(
                    {
                        value: key,
                        row: row,
                        name: value
                    }
                );
                console.log(array);
                this.setState({ habits: array });
            }
        }
    }
    handleSave() {
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const input = {
            PatientId: id,
            Diagnosis: this.state.diagnosis,
            Habits: this.state.habits,
            ProblemListWithYearOfDiagnosis: this.state.problemListWithYearOfDiagnosis,
            OtherMedicalProblem: this.state.OtherMedicalProblem,
            PastSurgicalProcedures: this.state.pastSurgicalProcedures,
            Vaccinations: this.state.vaccinations,
            PatientEducation: this.state.patientEducation,
            Exams: this.state.exams,
            ROS: this.state.ROS,
            PhysicalExam: this.state.physicalExam,

            Chifcompliant: this.state.chifcompliant,
            HPI: this.state.HPI,
            HMBGValues: this.state.HMBGValues,
            BPHomeMonitoringValues: this.state.BPHomeMonitoringValues,
            Allergies: this.state.Allergies,
            Medications: this.state.Medications,
            Dite: this.state.Dite,
            ExcerciseFITTFrequencyIntensityTypeTime: this.state.ExcerciseFITTFrequencyIntensityTypeTime
        }
        if (id === 0) {
            alert("patient is not selected");
            return
        }
        const url = "/DMs";
        this.props.saveHPNote(input, url);
        if (true) {
            alert(" handle save successfully ");
            this.props.history.push("DHPNote");
        }
    }
    componentDidMount() {
        this.setState({
            // diagnosis: [...this.state.diagnosis, ["panadol", "34ft", "jan 7", "new"]]
        })
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const url = '/Diagnosis/GetDiagnosisOfPatient/' + id;
        this.props.fetchPatientDiagnosis(url);

        const DMHabitURL = 'PatientNotes/GetNoteSubCategory/DM Habit';
        this.props.fetchDMHabit(DMHabitURL);
        const DMOtherProblemURL = 'PatientNotes/GetNoteSubCategory/DM Other Problem';
        this.props.fetchDMOtherProblem(DMOtherProblemURL);
        const DMProblemListURL = 'PatientNotes/GetNoteSubCategory/DM Problem List';
        this.props.fetchDMProblemList(DMProblemListURL);
        const DMPastProcedureURL = 'PatientNotes/GetNoteSubCategory/DM Past Procedure';
        this.props.fetchDMPastProcedure(DMPastProcedureURL);
        const DMVaccinationURL = 'PatientNotes/GetNoteSubCategory/DM Vaccination';
        this.props.fetchDMVaccination(DMVaccinationURL);
        const DMPatientEducationURL = 'PatientNotes/GetNoteSubCategory/DM Patient Education';
        this.props.fetchDMPatientEducation(DMPatientEducationURL);
        const DMExamURL = 'PatientNotes/GetNoteSubCategory/DM Exam';
        this.props.fetchDMExam(DMExamURL);
        const DMROSURL = 'PatientNotes/GetNoteSubCategory/DM ROS';
        this.props.fetchDMROS(DMROSURL);
        const PhysicalExamURL = 'PatientNotes/GetNoteSubCategory/Physical Exam';
        this.props.fetchPhysicalExam(PhysicalExamURL);
    }

    render() {
        // { console.log(this.props.patientDiagnosis) }
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
                            value={this.state.chifcompliant}
                            onChange={this.handleChange('chifcompliant')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="HPI"
                            multiline
                            rowsMax="4"
                            fullWidth
                            value={this.state.HPI}
                            onChange={this.handleChange('HPI')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <selectTable />
                        <TextField
                            id="standard-multiline-flexible"
                            label="HMBG Values"
                            multiline
                            rowsMax="4"
                            fullWidth
                            value={this.state.HMBGValues}
                            onChange={this.handleChange('HMBGValues')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="BP Home Monitoring Values"
                            multiline
                            rowsMax="4"
                            fullWidth
                            value={this.state.BPHomeMonitoringValues}
                            onChange={this.handleChange('BPHomeMonitoringValues')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Allergies:"
                            multiline
                            rowsMax="4"
                            fullWidth
                            value={this.state.Allergies}
                            onChange={this.handleChange('Allergies')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Medications:"
                            multiline
                            rowsMax="4"
                            fullWidth
                            value={this.state.Medications}
                            onChange={this.handleChange('Medications')}
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
                                    tableData={this.props.DMHabit.map(item => { return [item.Name] })}
                                    radio={2}
                                    textbox={1}
                                    hadleTableEvent={this.handleHabits}
                                />
                            }
                        </Collapsible>
                        <br />
                        <Collapsible trigger="Problem List with year of diagnosis >>" className={classes.collapsible}>
                            {
                                <Table
                                    tableHeaderColor="primary"
                                    tableHead={[" ", "Problem", "Yes", "No", "Diagnosis Year", "Remark"]}
                                    tableData={this.props.DMProblemList.map(item => { return [item.Name] })}
                                    radio={2}
                                    textBox={2}
                                    hadleTableEvent={this.handleProblemList}
                                    hadleTableRemarkEvent={this.handleProblemListRemarks}
                                />
                            }
                        </Collapsible>
                        <br />
                        <Collapsible trigger="Other Medical Problem >>" className={classes.collapsible}>
                            {
                                <Table
                                    tableHeaderColor="primary"
                                    tableHead={[" ", "Problem", "Yes", "No", "Remark"]}
                                    tableData={this.props.DMOtherProblem.map(item => { return [item.Name] })}
                                    hadleTableEvent={this.handleOtherMedicalProblem}
                                    hadleTableRemarkEvent={this.handleOtherMedicalProblemRemarks}
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
                                    tableData={this.props.DMPastProcedure.map(item => { return [item.Name] })}
                                    radio={2}
                                    textbox={1}
                                    hadleTableEvent={this.handlePastSurgicalProcedures}
                                    hadleTableRemarkEvent={this.handlePastSurgicalProceduresRemarks}
                                />
                            }
                        </Collapsible>
                        <br/>
                        <Collapsible trigger="Vaccinations >>" className={classes.collapsible}>
                            {
                                <TableWithDatePicker
                                    tableHeaderColor="primary"
                                    tableHead={[" ", "vaccine", "Yes", "No", "Date", "Remark"]}
                                    tableData={this.props.DMVaccination.map(item => { return [item.Name] })}
                                    radio={2}
                                    textbox={1}
                                    hadleTableEvent={this.handleVaccinations}
                                    hadleTableRemarkEvent={this.handleVaccinationsRemarks}
                                />
                            }
                        </Collapsible>
                        <br />
                        <Collapsible trigger="Patient Education >>" className={classes.collapsible}>
                            {
                                <TableWithDatePicker
                                    tableHeaderColor="primary"
                                    tableHead={[" ", "education", "Yes", "No", "Date", "Remark"]}
                                    tableData={this.props.DMPatientEducation.map(item => { return [item.Name] })}
                                    radio={2}
                                    textbox={1}
                                    hadleTableEvent={this.handlePatientEducation}
                                    hadleTableRemarkEvent={this.handlePatientEducationRemarks}
                                />
                            }
                        </Collapsible>
                        <br />
                        <Collapsible trigger="Exams >>" className={classes.collapsible}>
                            {
                                <TableWithDatePicker
                                    tableHeaderColor="primary"
                                    tableHead={[" ", "exam", "Yes", "No", "Date", "Remark"]}
                                    tableData={this.props.DMExam.map(item => { return [item.Name] })}
                                    radio={2}
                                    textbox={1}
                                    hadleTableEvent={this.handleExams}
                                    hadleTableRemarkEvent={this.handleExamsRemarks}
                                />
                            }
                        </Collapsible>
                        <br />
                        <Collapsible trigger="ROS >>" className={classes.collapsible}>
                            {
                                <TableWithDatePicker
                                    tableHeaderColor="primary"
                                    tableHead={[" ", "system", "Yes", "No", "Date", "Remark"]}
                                    tableData={this.props.DMROS.map(item => { return [item.Name] })}
                                    radio={2}
                                    textbox={1}
                                    hadleTableEvent={this.handleROS}
                                    hadleTableRemarkEvent={this.handleROSRemarks}
                                />
                            }
                        </Collapsible>
                        <TextField
                            id="standard-multiline-flexible"
                            label="Dite"
                            multiline
                            rowsMax="4"
                            fullWidth
                            value={this.state.Dite}
                            onChange={this.handleChange('Dite')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Excercise F.I.T.T. Frequency Intensity Type Time"
                            multiline
                            rowsMax="4"
                            fullWidth
                            value={this.state.ExcerciseFITTFrequencyIntensityTypeTime}
                            onChange={this.handleChange('ExcerciseFITTFrequencyIntensityTypeTime')}
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
                                    tableData={this.props.PhysicalExam.map(item => { return [item.Name] })}
                                    radio={2}
                                    textbox={1}
                                    hadleTableEvent={this.handlePhysicalExam}
                                    hadleTableRemarkEvent={this.handlePhysicalExamRemarks}
                                />
                            }
                        </Collapsible>
                        <br />
                        <FormLabel component="legend">Diagnosis</FormLabel>
                        <CustomTable
                            tableHeaderColor="primary"
                            tableHead={["Diagnosis", "Code", "Date", "Visit"]}
                            diagnosis={this.state.diagnosis}
                            addDiagnosis={this.addDiagnosis}
                        />
                        <br />
                        <Button onClick={this.handleSave} style={{ float: 'right' }} variant="contained" color="primary" className={classes.button}>
                            Save
                        </Button>
                    </form>
                </CardBody>
            </Card>
        );
    }
}

newDHPNote.propTypes = {
    fetchPhysicalExam: propTypes.func.isRequired,
    fetchDMHabit: propTypes.func.isRequired,
    fetchDMOtherProblem: propTypes.func.isRequired,
    fetchDMProblemList: propTypes.func.isRequired,
    fetchDMPastProcedure: propTypes.func.isRequired,
    fetchDMVaccination: propTypes.func.isRequired,
    fetchDMPatientEducation: propTypes.func.isRequired,
    fetchDMExam: propTypes.func.isRequired,
    fetchDMROS: propTypes.func.isRequired,
    fetchPatientDiagnosis: propTypes.func.isRequired,
    patientDiagnosis: propTypes.array.isRequired,
    isLoading: propTypes.bool.isRequired,
    hasError: propTypes.bool.isRequired,
    DMHabit: propTypes.array.isRequired,
    DMOtherProblem: propTypes.array.isRequired,
    DMProblemList: propTypes.array.isRequired,
    DMPastProcedure: propTypes.array.isRequired,
    DMVaccination: propTypes.array.isRequired,
    DMPatientEducation: propTypes.array.isRequired,
    DMExam: propTypes.array.isRequired,
    DMROS: propTypes.array.isRequired,
    PhysicalExam: propTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    patientDiagnosis: state.diagnosisOrder.patientDiagnosis,
    isLoading: state.diagnosisOrder.isLoading,
    hasError: state.diagnosisOrder.hasError,
    selectedPatient: state.assignments.selectedPatient,
    DMHabit: state.patientNote.DMHabit,
    DMOtherProblem: state.patientNote.DMOtherProblem,
    DMProblemList: state.patientNote.DMProblemList,
    DMPastProcedure: state.patientNote.DMPastProcedure,
    DMVaccination: state.patientNote.DMVaccination,
    DMPatientEducation: state.patientNote.DMPatientEducation,
    DMExam: state.patientNote.DMExam,
    DMROS: state.patientNote.DMROS,
    PhysicalExam: state.patientNote.PhysicalExam,
});

const mapDispatchToProps = dispatch => ({
    fetchPatientDiagnosis: (url) => dispatch(fetchPatientDiagnosis(url)),
    fetchDMHabit: (url) => dispatch(fetchDMHabit(url)),
    fetchDMOtherProblem: (url) => dispatch(fetchDMOtherProblem(url)),
    fetchDMProblemList: (url) => dispatch(fetchDMProblemList(url)),
    fetchDMPastProcedure: (url) => dispatch(fetchDMPastProcedure(url)),
    fetchDMVaccination: (url) => dispatch(fetchDMVaccination(url)),
    fetchDMPatientEducation: (url) => dispatch(fetchDMPatientEducation(url)),
    fetchDMExam: (url) => dispatch(fetchDMExam(url)),
    fetchDMROS: (url) => dispatch(fetchDMROS(url)),
    fetchPhysicalExam: (url) => dispatch(fetchPhysicalExam(url)),
    saveHPNote: (data, url) => dispatch(saveHPNote(data, url))
});

export default compose(withStyles(style), connect(mapStateToProps, mapDispatchToProps))(newDHPNote);