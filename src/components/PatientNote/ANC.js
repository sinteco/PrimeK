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
import { fetchProgressNote, fetchPatientNoteDetail, fetchNoteSubCategory, savePatientNote, fetchANCRiskFactor, fetchANCPresentation, fetchFPMethodType, fetchDepartment } from '../../redux/actions/patientNoteAction';
import propTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from "material-ui-flat-pagination";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import CustomTableWithSelector from '../Table/CustomTableWithSelector';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import qs from 'qs';
import Select from '@material-ui/core/Select';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import CoreTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Slide from '@material-ui/core/Slide';
import Switch from '@material-ui/core/Switch';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}
function Transition(props) {
    return <Slide direction="up" {...props} />;
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ( {
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
    },
    group1: {
        width: 'auto',
        height: 'auto',
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
    },
    dropdownStyle:
    {
        border: "1px solid black",
        borderRadius: "5%",
        backgroundColor: 'lightgrey',
        zIndex : 1500,
        position: 'fixed'
    }
});

const category = "ANC Follow Up";

class pNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            page: 1,
            newdialogopen: false,
            disabledInput: true,
            forms: [],
            open: false,
            value: 0,
            addform: false,
            rows: [],
            obstetrichistoryDeliveryAgeOfChild: '',
            obstetrichistoryDeliveryMode: '',
            obstetrichistoryGA: '',
            obstetrichistoryDeliveryPlace: '',
            obstetrichistoryWeight: '',
            obstetrichistoryLBOrSB: '',
            obstetrichistorySex: '',
            obstetrichistoryRemark: '',
            EDDUnknowen: false,
            EDD: new Date(),
            disableEDD: true,
            menstrualCycle: '',
            FPConseled: '',
            Height: '',
            Pallor: '',
            CheckedPallor: '',
            disablePallor: true,
            Jaundice: '',
            CheckedJaundice: '',
            disableJaundice: true,
            ChestAbnormality: '',
            CheckedChestAbnormality: '',
            disableChestAbnormality: true,
            HeartAbnormality: '',
            CheckedHeartAbnormality: '',
            disableHeartAbnormality: true,
            BreastExam: '',
            CheckedBreastExam: '',
            disableBreastExam: true,
            VaginalExam: '',
            CheckedVaginalExam: '',
            disableCheckedVaginalExam: true,
            GeneralExaminationOther: '',
            editLabResult: false,
            disableVDLR: true,
            disableBloodGroup: true,
            disableRh: true,
            disableUA: true,
            disableFBS: true,
            disableHGB: true,
            disableHBSAG: true,
            disableLabExaminationOther: true,
            disableMethodOfChoice: true,
            MethodOfChoice: '',
            FPConseled: 'No',
            presentPragnancy: false,
            gravida: '',
            para:'',
            abortion: '',
            noOfchilderenalivenow: '',
            ectopic: '',
            VDLR: '',
            BloodGroup: '',
            Rh: '',
            UA: '',
            FBS: '',
            Hgb: '',
            HBsAg: '',
            LabExaminationOther: '',
            Previousstillbirth: '',
            Historyofspontaniusabortion: '',
            Birthweigthoflastbaby2500g: '',
            Birthweigthoflastbaby4500g: '',
            Lastpragnancyhospitaladmission: '',
            Previoussurgeryonreproductivetract: '',
            Diagnosedorsuspectedmultiplepragnancy: '',
            Agelessthan16years: '',
            Agelessthan16years: '',
            ISOimmunuzationRH: '',
            Veginalbleeding: '',
            Pelvicmass: '',
            Diastolicbloodpressure90mmHg: '',
            insulindependentdiabetesmellitus: '',
            Renaldisease: '',
            Cardiacdisease: '',
            Knownsubstanceabuse: '',
            anyOtherservermedicaldisease: '',
            othersigns: '',
            Eligibleforthebasiccomponent: 'No',
            TestedforHIV: 'No',
            HIVTestResult: '',
            NutritionalAssesment: '',
            ClinicalStaging: '',
            CD4Count: '',
            InfantFeedings: '',
            Feeding: '',
            LinktoART: '',
            MothersConfidentalityCode: '',
            MothersLetterCode: '',
            MothersResult: '',
            PartnersConfidentalityCode: '',
            PartnersLetterCode: '',
            PartnersResult: '',
            presentPragnancyGravida: '',
            presentPragnancyPara: '',
            presentPragnancyAbortion: '',
            presentPragnancyNoofChilderenAliveNow: '',
            ReciveMessageIn: '',
            ReciveMessageLanguage: '',
            presentPragnancys: [],
            ppDateTime: new Date(),
            ppVisitNo: '',
            ppGA: '',
            ppBPS: '',
            ppBPD: '',
            ppWeight: '',
            ppAnemia: '',
            ppEdema: '',
            ppPresentation: '',
            ppTT: '',
            ppIronOrVitamine: 'No',
            ppDite: '',
            ppSF: '',
            ppFHB: '',
            ppClinicalNote: '',
            ppUltasound: '',
            ppOptedforPPFP: '',
            ppFamilyPlanningMethod: '',
            disableppFamilyPlanningMethod: true,
            ppRiskFactor: '',
            ppRiskFactorOther: '',
            pplab: '',
            ppNextAppointment: new Date(),
            ppcheckNextAppointment: false,
            disableppNextAppointment: true,
            ppAppointmentNote: '',
            ppAppointmentDept: ''
        }
    }
    tabhandleChange = (event, value) => {
        this.setState({ value });
    };
    handleDateChange = (date, name) => {
        this.setState({ [name]: date });
    };
    handleANCRiskFactorChange = name => event => {
        if (!this.state.ppRiskFactor.includes(event.target.value)){
            this.setState({
                [name]: [...this.state.ppRiskFactor, event.target.value]
            }, function () {
                console.log(this.state.ppRiskFactor);
            });
        }else{
            var array = [...this.state.ppRiskFactor]; // make a separate copy of the array
            var index = array.indexOf(event.target.value)
            if (index !== -1) {
                array.splice(index, 1);
                this.setState({ ppRiskFactor: array });
            }
        }
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        }, function () {
            console.log(this.state.ppRiskFactor);
        });
    };
    handleCheckedChange = name => event => {
        this.setState({ [name]: event.target.checked }, function () {
            if (this.state.EDDUnknowen) {
                this.setState({ disableEDD: false });
            }else{
                this.setState({ disableEDD: true });
            }
            if(this.state.CheckedPallor){
                this.setState({ disablePallor: false });
            }else{
                this.setState({ disablePallor: true });
            }
            if (this.state.CheckedJaundice) {
                this.setState({ disableJaundice: false });
            } else {
                this.setState({ disableJaundice: true });
            }
            if (this.state.CheckedChestAbnormality) {
                this.setState({ disableChestAbnormality: false });
            } else {
                this.setState({ disableChestAbnormality: true });
            }
            if (this.state.CheckedHeartAbnormality) {
                this.setState({ disableHeartAbnormality: false });
            } else {
                this.setState({ disableHeartAbnormality: true });
            }
            if (this.state.CheckedBreastExam) {
                this.setState({ disableBreastExam: false });
            } else {
                this.setState({ disableBreastExam: true });
            }
            if (this.state.CheckedVaginalExam) {
                this.setState({ disableCheckedVaginalExam: false });
            } else {
                this.setState({ disableCheckedVaginalExam: true });
            }
            if(!this.state.editLabResult){
                this.setState({ 
                    disableVDLR: true,
                    disableBloodGroup: true,
                    disableRh: true,
                    disableUA: true,
                    disableFBS: true,
                    disableHGB: true,
                    disableHBSAG: true,
                    disableLabExaminationOther: true
                 });
            }else{
                this.setState({
                    disableVDLR: false,
                    disableBloodGroup: false,
                    disableRh: false,
                    disableUA: false,
                    disableFBS: false,
                    disableHGB: false,
                    disableHBSAG: false,
                    disableLabExaminationOther: false
                });
            }
            if(this.state.ppOptedforPPFP){
                this.setState({ disableppFamilyPlanningMethod: false});
            }else{
                this.setState({ disableppFamilyPlanningMethod: true });
            }
        });
    };
    handleCheckedBoxChange = name => event => {
        this.setState({ [name]: event.target.value }, function () {
            if (this.state.FPConseled === 'Yes') {
                this.setState({ disableMethodOfChoice: false });
            } else {
                this.setState({ disableMethodOfChoice: true });
            }
            if(this.state.ppcheckNextAppointment){
                this.setState({disableppNextAppointment:false});
            }else{
                this.setState({disableppNextAppointment:true});
            }
        });
    };
    handlePresentPragnancyOpen = () => {
        const ANCRiskFactorURL = '/PatientNotes/GetANCRiskFactor/0';
        this.props.fetchANCRiskFactor(ANCRiskFactorURL);
        const ANCPresentationURL = '/PatientNotes/GetANCPresentation/0';
        this.props.fetchANCPresentation(ANCPresentationURL);
        const FPMethodTypeURL = '/PatientNotes/GetFPMethodType/0';
        this.props.fetchFPMethodType(FPMethodTypeURL);
        const DepartmentURL = '/PatientNotes/GetDepartment/0';
        this.props.fetchDepartment(DepartmentURL);
        this.setState({ presentPragnancy: true })
    }
    handlePresentPragnancyEdit = () => {
        this.setState({ presentPragnancy: true })
    }
    handlePresentPragnancyClose = () => {
        this.setState({ presentPragnancy: false })
    }
    handleAddformOpen = () => {
        this.setState({ addform: true })
    }
    handleAddformClose = () => {
        this.setState({ addform: false })
    }
    handlePresentPragnancyAdd = () => {
        this.setState({
            presentPragnancys: [...this.state.presentPragnancys,
            {
                ppDateTime: this.state.ppDateTime,
                ppVisitNo: this.state.ppVisitNo,
                ppGA: this.state.ppGA,
                ppBPS: this.state.ppBPS,
                ppBPD: this.state.ppBPD,
                ppWeight: this.state.ppWeight,
                ppAnemia: this.state.ppAnemia,
                ppEdema: this.state.ppEdema,
                ppPresentation: this.state.ppPresentation,
                ppTT: this.state.ppTT,
                ppIronOrVitamine: this.state.ppIronOrVitamine,
                ppDite: this.state.ppDite,
                ppSF: this.state.ppSF,
                ppFHB: this.state.ppFHB,
                ppClinicalNote: this.state.ppClinicalNote,
                ppUltasound: this.state.ppUltasound,
                ppOptedforPPFP: this.state.ppOptedforPPFP,
                ppFamilyPlanningMethod: this.state.ppFamilyPlanningMethod,
                ppRiskFactor: this.state.ppRiskFactor,
                ppRiskFactorOther: this.state.ppRiskFactorOther,
                pplab: this.state.pplab,
                ppNextAppointment: this.state.ppNextAppointment,
                ppcheckNextAppointment: this.state.ppcheckNextAppointment,
                ppAppointmentNote: this.state.ppAppointmentNote,
                ppAppointmentDept: this.state.ppAppointmentDept
            }], function () {
                console.log(this.state.presentPragnancys);
                this.setState({
                    ppDateTime: '',
                    ppVisitNo: '',
                    ppGA: '',
                    ppBPS: '',
                    ppBPD: '',
                    ppWeight: '',
                    ppAnemia: '',
                    ppEdema: '',
                    ppPresentation: '',
                    ppTT: '',
                    ppIronOrVitamine: '',
                    ppDite: '',
                    ppSF: '',
                    ppFHB: '',
                    ppClinicalNote: '',
                    ppUltasound: '',
                    ppOptedforPPFP: '',
                    ppFamilyPlanningMethod: '',
                    ppRiskFactor: '',
                    ppRiskFactorOther: '',
                    pplab: '',
                    ppNextAppointment: '',
                    ppcheckNextAppointment: '',
                    ppAppointmentNote: '',
                    ppAppointmentDept: ''
                });
            }
        })
    }
    handleAddform = () => {
        this.setState({
            rows: [...this.state.presentPragnancys, 
                {
                    DeliveryAgeOfChild: this.state.obstetrichistoryDeliveryAgeOfChild,
                    DeliveryMode: this.state.obstetrichistoryDeliveryMode,
                    GA: this.state.obstetrichistoryGA,
                    DeliveryPlace: this.state.obstetrichistoryDeliveryPlace,
                    Weight: this.state.obstetrichistoryWeight,
                    LBOrSB: this.state.obstetrichistoryLBOrSB,
                    Sex: this.state.obstetrichistorySex,
                    Remark: this.state.obstetrichistoryRemark
                }
            ],
            addform: false
        }, function () {
            console.log(this.state.presentPragnancys);
            this.setState({
                DeliveryAgeOfChild: '',
                DeliveryMode: '',
                GA: '',
                DeliveryPlace: '',
                Weight: '',
                LBOrSB: '',
                Sex: '',
                Remark: ''
            });
        });
    }
    returnarrays() {
        var a = new Array();
        this.props.progressNotes.map((progressNote) => {
            a.push([[progressNote.Id], [progressNote.PatientId], [Moment(progressNote.DateTime).format('d MMM')], [progressNote.NoteCategory], [progressNote.Note]])
        });
        return a;
    }
    handleClick(offset) {
        this.setState({
            offset,
            page: (this.state.offset + 20) / 10
        });
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const URL = '/PatientNotes/GetDeathNoteOfPatient/' + id + "?page=" + (this.state.offset + 20) / 10 + "&category=" + category;
        this.props.fetchRadOrders(URL);
    }
    handleOnRowClick = (id) => {
        const URL = '/PatientNotes/GetPatientNoteDetails/' + id;
        this.props.fetchPatientNoteDetail(URL);
        return this.props.patientnoteDetail ?
            this.handleClickOpen()
            : <CircularProgress className={this.props.classes.progress} />

    }
    handleClickOpen = () => {
        this.setState({ open: true, disabledInput: true });
    };
    newdialogClickOpen = () => {
        const subNoteURL = 'PatientNotes/GetNoteSubCategory/ANC Medical Surgical History';
        this.props.fetchNoteSubCategory(subNoteURL);
        this.setState({ disabledInput: false, newdialogopen: true });
    };
    savePatientNote = () => {
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const inputdata = {
            PatientId: id,
            NoteCategory: category,
            note: " ",
            DateTime: new Date(),
            Value: this.state.forms,
            Remark: null
        }
        if (id === 0) {
            alert("patient is not selected");
            return
        }
        const URL = '/PatientNotes';
        this.setState({ newdialogopen: false });
        console.log(inputdata);
        this.props.savePatientNote(URL, qs.stringify(inputdata));

        if (!this.props.isLoading && !this.props.hasError) {
            alert("Saved Successfully");
            //reload after save
            const reloadURL = '/PatientNotes/GetNotesOfPatient/' + id + "?page=" + this.state.page + "&category=" + category;
            this.props.fetchProgressNote(reloadURL);
        }
    }
    handleClose = () => {
        this.setState({ open: false, newdialogopen: false });
    };
    componentWillMount() {
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const URL = '/PatientNotes/GetNotesOfPatient/' + id + "?page=" + this.state.page + "&category=" + category;
        this.props.fetchProgressNote(URL);
    }
    render() {
        const { classes } = this.props;
        const { fullScreen } = this.props;
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>{category}</h4>
                            <p className={classes.cardCategoryWhite}>
                                {/* Here is a subtitle for this table */}<br />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.newdialogClickOpen}
                                    className={classes.button}
                                >
                                    New {category}
                                </Button>
                            </p>
                        </CardHeader>
                        <CardBody>
                            {this.props.isLoading ? <CircularProgress className={classes.progress} /> : ""}
                            <Table
                                tableHeaderColor="primary"
                                tableHead={["Id", "Patient", "Datetime", "Category", "Note"]}
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
                                open={this.state.open}
                                onClose={this.handleClose}
                                aria-labelledby="responsive-dialog-title"
                            >
                                <DialogTitle id="responsive-dialog-title">{category + " Detail"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        <form>
                                            {
                                                this.props.patientnoteDetail.map(
                                                    (note, k) =>
                                                        <TextField
                                                            disabled={this.state.disabledInput}
                                                            id="standard-multiline-flexible"
                                                            label={note.NoteSubcategory}
                                                            multiline
                                                            rowsMax="4"
                                                            fullWidth
                                                            value={note.Value}
                                                            // onChange={this.handleChange('dateofadmission')}
                                                            className={classes.textField}
                                                            margin="normal"
                                                        />
                                                )
                                            }
                                        </form>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClose} color="primary">
                                        Close
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog
                                fullScreen={fullScreen}
                                open={this.state.newdialogopen}
                                maxWidth={'lg'}
                                onClose={this.handleClose}
                                aria-labelledby="responsive-dialog-title"
                            >
                                <DialogTitle id="responsive-dialog-title">{"New " + category}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        <form>
                                            <AppBar position="static" color="default">
                                                <Tabs value={this.state.value} onChange={this.tabhandleChange}>
                                                    <Tab label="History And Physical" />
                                                    <Tab label="Present Pregnancy" />
                                                </Tabs>
                                            </AppBar>
                                            {this.state.value === 0 && <TabContainer>
                                                <FormControl component="fieldset" className={classes.formControl}>
                                                    <FormLabel component="legend">Medical/Surgery History</FormLabel>
                                                    <FormGroup row>
                                                        <CustomTableWithSelector
                                                            tableHeaderColor="primary"
                                                            tableHead={[" ", "Problem", "Yes", "No", "Remark"]}
                                                            tableData={this.props.noteSubCategory.map(item => { return [item.Name] })}
                                                            radio={2}
                                                            textbox={1}
                                                        />
                                                    </FormGroup>
                                                    <br/>
                                                    <FormLabel component="legend">Past Obtemeistic History</FormLabel>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Gravida"
                                                            className={classes.textField}
                                                            value={this.state.gravida}
                                                            onChange={this.handleChange('gravida')}
                                                            margin="normal"
                                                            style={{ width: 100 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="Para"
                                                            className={classes.textField}
                                                            value={this.state.para}
                                                            onChange={this.handleChange('para')}
                                                            margin="normal"
                                                            style={{ width: 100 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="Abortion"
                                                            className={classes.textField}
                                                            value={this.state.abortion}
                                                            onChange={this.handleChange('abortion')}
                                                            margin="normal"
                                                            style={{ width: 100 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="No of childeren alive now"
                                                            className={classes.textField}
                                                            value={this.state.noOfchilderenalivenow}
                                                            onChange={this.handleChange('noOfchilderenalivenow')}
                                                            margin="normal"
                                                            style={{ width: 200 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="Ectopic"
                                                            className={classes.textField}
                                                            value={this.state.ectopic}
                                                            onChange={this.handleChange('ectopic')}
                                                            margin="normal"
                                                            style={{ width: 150 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <Button
                                                            className={classes.button}
                                                            variant="contained"
                                                            onClick={this.handleAddformOpen}
                                                            color="primary"
                                                        >
                                                            Add
                                                        </Button>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <CoreTable className={classes.table}>
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell align="right">Delivery Age Of Child</TableCell>
                                                                    <TableCell align="right">Delivery Mode</TableCell>
                                                                    <TableCell align="right">GA</TableCell>
                                                                    <TableCell align="right">Place of Delivery</TableCell>
                                                                    <TableCell align="right">Wt(g)</TableCell>
                                                                    <TableCell align="right">LB/SB</TableCell>
                                                                    <TableCell align="right">Sex</TableCell>
                                                                    <TableCell align="right">Remark</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {this.state.rows.map(row => (
                                                                    <TableRow key={row.id}>
                                                                        <TableCell align="right">{row.DeliveryAgeOfChild}</TableCell>
                                                                        <TableCell align="right">{row.DeliveryMode}</TableCell>
                                                                        <TableCell align="right">{row.GA}</TableCell>
                                                                        <TableCell align="right">{row.DeliveryPlace}</TableCell>
                                                                        <TableCell align="right">{row.Weight}</TableCell>
                                                                        <TableCell align="right">{row.LBOrSB}</TableCell>
                                                                        <TableCell align="right">{row.Sex}</TableCell>
                                                                        <TableCell align="right">{row.Remark}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </CoreTable>
                                                    </FormGroup>
                                                    <br/>
                                                    <FormLabel component="legend">History of Present Pregnancy</FormLabel>
                                                    <FormGroup row>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.state.EDDUnknowen}
                                                                    onChange={this.handleCheckedChange('EDDUnknowen')}
                                                                    value="EDDUnknowen"
                                                                    color="primary"
                                                                />
                                                            }
                                                            style={{ marginLeft: 0, marginTop: 0 }}
                                                            labelPlacement="start"
                                                            label="LMP"
                                                        />
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                            <DatePicker
                                                                style={{ marginTop: 0, marginLeft: 20 }}
                                                                margin="normal"
                                                                label="Unknowen"
                                                                value={this.state.EDD}
                                                                onChange={(e) => this.handleDateChange(e,'EDD')}
                                                                disabled={this.state.disableEDD}
                                                            />
                                                        </MuiPickersUtilsProvider>
                                                        <TextField
                                                            id="standard-name"
                                                            label="EDD"
                                                            className={classes.textField}
                                                            value={this.state.EDD}
                                                            disabled={true}
                                                            // onChange={this.handleChange('ED')}
                                                            margin="normal"
                                                            style={{ width: 125, marginTop: 0, marginLeft: 0, marginRight: 15 }}
                                                        />
                                                        <FormControl style={{ width: 150, marginTop: 0, marginLeft: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="e">Menstrual Cycle</InputLabel>
                                                            <Select
                                                                value={this.state.menstrualCycle}
                                                                onChange={this.handleChange('menstrualCycle')}
                                                            >
                                                                <MenuItem value="Regular">Regular</MenuItem>
                                                                <MenuItem value="Iregular">Iregular</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        {/* <FormLabel component="legend">Family Planning</FormLabel> */}
                                                        <FormGroup>
                                                            <RadioGroup
                                                                row
                                                                aria-label="FP Conseled"
                                                                name="FP Conseled"
                                                                className={classes.group}
                                                                style={{ marginLeft: 0, marginTop: 0, padding: '0 10px 10px 10px' }}
                                                                value={this.state.FPConseled}
                                                                onChange={this.handleCheckedBoxChange('FPConseled')}
                                                            >
                                                                <FormLabel style={{ marginTop: 16 }}>FP Conseled: </FormLabel>
                                                                <FormControlLabel labelPlacement="start" value="Yes" control={<Radio />} label="Yes" />
                                                                <FormControlLabel labelPlacement="start" value="No" control={<Radio />} label="No" />
                                                            </RadioGroup>
                                                            <FormControl style={{ width: 150, marginTop: -28, marginLeft: 10 }} className={classes.formControl}>
                                                                <InputLabel htmlFor="MethodOfChoice">Method Of Choice</InputLabel>
                                                                <Select
                                                                    disabled={this.state.disableMethodOfChoice}
                                                                    value={this.state.MethodOfChoice}
                                                                    onChange={this.handleChange('MethodOfChoice')}
                                                                >
                                                                    <MenuItem value="Condom">Condom</MenuItem>
                                                                    <MenuItem value="Contraceptivepill">Contraceptive pill</MenuItem>
                                                                    <MenuItem value="EmergencyContraceptivepill">Emergency Contraceptive pill</MenuItem>
                                                                    <MenuItem value="Implant-Implanon">Implant - Implanon</MenuItem>
                                                                    <MenuItem value="Implant-Jadelle">Implant - Jadelle</MenuItem>
                                                                    <MenuItem value="Implant-Sino">Implant - Sino</MenuItem>
                                                                    <MenuItem value="Injectable">Injectable</MenuItem>
                                                                    <MenuItem value="IUCD-CopperT-380A">IUCD - Copper T-380A</MenuItem>
                                                                    <MenuItem value="IUCD-LNG-CuT">IUCD - LNG - CuT</MenuItem>
                                                                    <MenuItem value="IUCD-LNG-Mirena">IUCD - LNG - Mirena</MenuItem>
                                                                    <MenuItem value="MLS">MLS</MenuItem>
                                                                    <MenuItem value="MSV">MSV</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </FormGroup>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormGroup>
                                                            <FormLabel component="legend">General Examination</FormLabel>
                                                            <TextField
                                                                id="standard-name"
                                                                label="Height (below 150cm)"
                                                                className={classes.textField}
                                                                value={this.state.Height}
                                                                onChange={this.handleChange('Height')}
                                                                margin="normal"
                                                                style={{ width: 180, marginTop: 0, marginLeft: 0 }}
                                                            />
                                                            <FormGroup row>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={this.state.CheckedPallor}
                                                                            onChange={this.handleCheckedChange('CheckedPallor')}
                                                                            value="CheckedPallor"
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    style={{ marginLeft: 0 }}
                                                                    labelPlacement="start"
                                                                    label="Pallor"
                                                                />
                                                                <TextField
                                                                    disabled={this.state.disablePallor}
                                                                    id="standard-name"
                                                                    // label="Height (below 150cm)"
                                                                    className={classes.textField}
                                                                    value={this.state.Pallor}
                                                                    onChange={this.handleChange('Pallor')}
                                                                    margin="normal"
                                                                    style={{ width: 180, marginTop: 0, marginLeft: 10 }}
                                                                />
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={this.state.CheckedJaundice}
                                                                            onChange={this.handleCheckedChange('CheckedJaundice')}
                                                                            value="CheckedJaundice"
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    style={{ marginLeft: 0 }}
                                                                    labelPlacement="start"
                                                                    label="Jaundice"
                                                                />
                                                                <TextField
                                                                    disabled={this.state.disableJaundice}
                                                                    id="standard-name"
                                                                    // label="Height (below 150cm)"
                                                                    className={classes.textField}
                                                                    value={this.state.Jaundice}
                                                                    onChange={this.handleChange('Jaundice')}
                                                                    margin="normal"
                                                                    style={{ width: 180, marginTop: 0, marginLeft: 10 }}
                                                                />
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={this.state.CheckedChestAbnormality}
                                                                            onChange={this.handleCheckedChange('CheckedChestAbnormality')}
                                                                            value="CheckedChestAbnormality"
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    style={{ marginLeft: 0 }}
                                                                    labelPlacement="start"
                                                                    label="Chest Abnormality"
                                                                />
                                                                <TextField
                                                                    disabled={this.state.disableChestAbnormality}
                                                                    id="standard-name"
                                                                    // label="Height (below 150cm)"
                                                                    className={classes.textField}
                                                                    value={this.state.ChestAbnormality}
                                                                    onChange={this.handleChange('ChestAbnormality')}
                                                                    margin="normal"
                                                                    style={{ width: 180, marginTop: 0, marginLeft: 10 }}
                                                                />
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={this.state.CheckedHeartAbnormality}
                                                                            onChange={this.handleCheckedChange('CheckedHeartAbnormality')}
                                                                            value="CheckedHeartAbnormality"
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    style={{ marginLeft: 0 }}
                                                                    labelPlacement="start"
                                                                    label="Heart Abnormality"
                                                                />
                                                                <TextField
                                                                    disabled={this.state.disableHeartAbnormality}
                                                                    id="standard-name"
                                                                    // label="Height (below 150cm)"
                                                                    className={classes.textField}
                                                                    value={this.state.HeartAbnormality}
                                                                    onChange={this.handleChange('HeartAbnormality')}
                                                                    margin="normal"
                                                                    style={{ width: 180, marginTop: 0, marginLeft: 10 }}
                                                                />
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={this.state.CheckedBreastExam}
                                                                            onChange={this.handleCheckedChange('CheckedBreastExam')}
                                                                            value="CheckedBreastExam"
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    style={{ marginLeft: 0 }}
                                                                    labelPlacement="start"
                                                                    label="Breast Exam"
                                                                />
                                                                <TextField
                                                                    disabled={this.state.disableBreastExam}
                                                                    id="standard-name"
                                                                    // label="Height (below 150cm)"
                                                                    className={classes.textField}
                                                                    value={this.state.BreastExam}
                                                                    onChange={this.handleChange('BreastExam')}
                                                                    margin="normal"
                                                                    style={{ width: 180, marginTop: 0, marginLeft: 10 }}
                                                                />
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={this.state.CheckedVaginalExam}
                                                                            onChange={this.handleChange('CheckedVaginalExam')}
                                                                            value="CheckedVaginalExam"
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    style={{ marginLeft: 0 }}
                                                                    labelPlacement="start"
                                                                    label="Vaginal Exam"
                                                                />
                                                                <TextField
                                                                    disabled={this.state.disableCheckedVaginalExam}
                                                                    id="standard-name"
                                                                    // label="Height (below 150cm)"
                                                                    className={classes.textField}
                                                                    value={this.state.VaginalExam}
                                                                    onChange={this.handleChange('VaginalExam')}
                                                                    margin="normal"
                                                                    style={{ width: 180, marginTop: 0, marginLeft: 10 }}
                                                                />
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <TextField
                                                                    id="standard-name"
                                                                    label="Other"
                                                                    className={classes.textField}
                                                                    value={this.state.GeneralExaminationOther}
                                                                    onChange={this.handleChange('GeneralExaminationOther')}
                                                                    margin="normal"
                                                                    style={{ width: 180, marginTop: 0, marginLeft: 10 }}
                                                                />
                                                            </FormGroup>
                                                        </FormGroup>
                                                        <FormGroup style={{paddingLeft: 50}}>
                                                            <FormGroup row>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={this.state.editLabResult}
                                                                            onChange={this.handleCheckedChange('editLabResult')}
                                                                            value="editLabResult"
                                                                        />
                                                                    }
                                                                    label="Edit Lab Result"
                                                                />
                                                            </FormGroup>
                                                            <FormLabel component="legend">Lab Examination</FormLabel>
                                                            <FormGroup row>
                                                                <TextField
                                                                    disabled={this.state.disableVDLR}
                                                                    id="standard-name"
                                                                    label="VDLR"
                                                                    className={classes.textField}
                                                                    value={this.state.VDLR}
                                                                    onChange={this.handleChange('VDLR')}
                                                                    margin="normal"
                                                                    style={{ width: 300, marginTop: 0, marginLeft: 0 }}
                                                                />
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <TextField
                                                                    disabled={this.state.disableBloodGroup}
                                                                    id="standard-name"
                                                                    label="Blood Group"
                                                                    className={classes.textField}
                                                                    value={this.state.BloodGroup}
                                                                    onChange={this.handleChange('BloodGroup')}
                                                                    margin="normal"
                                                                    style={{ width: 200, marginTop: 0, marginLeft: 0 }}
                                                                />
                                                                <TextField
                                                                    disabled={this.state.disableRh}
                                                                    id="standard-name"
                                                                    label="Rh"
                                                                    className={classes.textField}
                                                                    value={this.state.Rh}
                                                                    onChange={this.handleChange('Rh')}
                                                                    margin="normal"
                                                                    style={{ width: 200, marginTop: 0, marginLeft: 0 }}
                                                                />
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <TextField
                                                                    disabled={this.state.disableUA}
                                                                    id="standard-name"
                                                                    label="U/A"
                                                                    className={classes.textField}
                                                                    value={this.state.UA}
                                                                    onChange={this.handleChange('UA')}
                                                                    margin="normal"
                                                                    style={{ width: 300, marginTop: 0, marginLeft: 0 }}
                                                                />
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <TextField
                                                                    disabled={this.state.disableFBS}
                                                                    id="standard-name"
                                                                    label="FBS"
                                                                    className={classes.textField}
                                                                    value={this.state.FBS}
                                                                    onChange={this.handleChange('FBS')}
                                                                    margin="normal"
                                                                    style={{ width: 100, marginTop: 0, marginLeft: 0 }}
                                                                />
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <TextField
                                                                    disabled={this.state.disableHGB}
                                                                    id="standard-name"
                                                                    label="Hgb"
                                                                    className={classes.textField}
                                                                    value={this.state.Hgb}
                                                                    onChange={this.handleChange('Hgb')}
                                                                    margin="normal"
                                                                    style={{ width: 100, marginTop: 0, marginLeft: 0 }}
                                                                />
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <TextField
                                                                    disabled={this.state.disableHBSAG}
                                                                    id="standard-name"
                                                                    label="HBsAg"
                                                                    className={classes.textField}
                                                                    value={this.state.HBsAg}
                                                                    onChange={this.handleChange('HBsAg')}
                                                                    margin="normal"
                                                                    style={{ width: 100, marginTop: 0, marginLeft: 0 }}
                                                                />
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <TextField
                                                                    disabled={this.state.disableLabExaminationOther}
                                                                    id="standard-name"
                                                                    label="Other"
                                                                    className={classes.textField}
                                                                    value={this.state.LabExaminationOther}
                                                                    onChange={this.handleChange('LabExaminationOther')}
                                                                    margin="normal"
                                                                    style={{ width: 300, marginTop: 0, marginLeft: 0 }}
                                                                />
                                                            </FormGroup>
                                                        </FormGroup>
                                                    </FormGroup>
                                                    <br/>
                                                    <FormLabel component="legend">Criteria for classifiying for the basic component of the new antinatal care model</FormLabel>
                                                    <FormGroup>
                                                        <FormLabel component="legend">Obtemeistic History</FormLabel>
                                                        <FormGroup row>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={this.state.Previousstillbirth}
                                                                        onChange={this.handleChange('Previousstillbirth')}
                                                                        value="Previousstillbirth"
                                                                        color="primary"
                                                                    />
                                                                }
                                                                style={{ marginLeft: 0 }}
                                                                label="Previous stillbirth or neonatal tools"
                                                            />
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={this.state.Historyofspontaniusabortion}
                                                                        onChange={this.handleChange('Historyofspontaniusabortion')}
                                                                        value="Historyofspontaniusabortion"
                                                                        color="primary"
                                                                    />
                                                                }
                                                                style={{ marginLeft: 0 }}
                                                                label="History of 3 or more consicuative spontanius abortion"
                                                            />
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={this.state.Birthweigthoflastbaby2500g}
                                                                        onChange={this.handleChange('Birthweigthoflastbaby2500g')}
                                                                        value="Birthweigthoflastbaby2500g"
                                                                        color="primary"
                                                                    />
                                                                }
                                                                style={{ marginLeft: 0 }}
                                                                label="Birth weigth of last baby <2500g"
                                                            />
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={this.state.Birthweigthoflastbaby4500g}
                                                                        onChange={this.handleChange('Birthweigthoflastbaby4500g')}
                                                                        value="Birthweigthoflastbaby4500g"
                                                                        color="primary"
                                                                    />
                                                                }
                                                                style={{ marginLeft: 0 }}
                                                                label="Birth weigth of last baby <4500g"
                                                            />
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={this.state.Lastpragnancyhospitaladmission}
                                                                        onChange={this.handleChange('Lastpragnancyhospitaladmission')}
                                                                        value="Lastpragnancyhospitaladmission"
                                                                        color="primary"
                                                                    />
                                                                }
                                                                style={{ marginLeft: 0 }}
                                                                label="Last pragnancy: hospital admission for hypertension or pie - eclaimpsita / eclaimpsita"
                                                            />
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={this.state.Previoussurgeryonreproductivetract}
                                                                        onChange={this.handleChange('Previoussurgeryonreproductivetract')}
                                                                        value="Previoussurgeryonreproductivetract"
                                                                        color="primary"
                                                                    />
                                                                }
                                                                style={{ marginLeft: 0 }}
                                                                label="Previous surgery on reproductive tract(Myomectomy, removal of sputum, cone biopsy CS, cervical cerenage)"
                                                            />
                                                        </FormGroup>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <FormLabel component="legend">Current Pragnancy</FormLabel>
                                                        <FormGroup row>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={this.state.Diagnosedorsuspectedmultiplepragnancy}
                                                                        onChange={this.handleChange('Diagnosedorsuspectedmultiplepragnancy')}
                                                                        value="Diagnosedorsuspectedmultiplepragnancy"
                                                                        color="primary"
                                                                    />
                                                                }
                                                                style={{ marginLeft: 0 }}
                                                                label="Diagnosed or suspected multiple pragnancy"
                                                            />
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={this.state.Agelessthan16years}
                                                                        onChange={this.handleChange('Agelessthan16years')}
                                                                        value="Agelessthan16years"
                                                                        color="primary"
                                                                    />
                                                                }
                                                                style={{ marginLeft: 0 }}
                                                                label="Age less than 16 years"
                                                            />
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={this.state.Agemorethan40years}
                                                                        onChange={this.handleChange('Agemorethan40years')}
                                                                        value="Agemorethan40years"
                                                                        color="primary"
                                                                    />
                                                                }
                                                                style={{ marginLeft: 0 }}
                                                                label="Age more than 40 years"
                                                            />
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={this.state.ISOimmunuzationRH}
                                                                        onChange={this.handleChange('ISOimmunuzationRH')}
                                                                        value="ISOimmunuzationRH"
                                                                        color="primary"
                                                                    />
                                                                }
                                                                style={{ marginLeft: 0 }}
                                                                label="ISO immunuzation RH(-) inceurrent or in previous pragnancy"
                                                            />
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={this.state.Veginalbleeding}
                                                                        onChange={this.handleChange('Veginalbleeding')}
                                                                        value="Veginalbleeding"
                                                                        color="primary"
                                                                    />
                                                                }
                                                                style={{ marginLeft: 0 }}
                                                                label="Veginal bleeding"
                                                            />
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={this.state.Pelvicmass}
                                                                        onChange={this.handleChange('Pelvicmass')}
                                                                        value="Pelvicmass"
                                                                        color="primary"
                                                                    />
                                                                }
                                                                style={{ marginLeft: 0 }}
                                                                label="Pelvic mass"
                                                            />
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={this.state.Diastolicbloodpressure90mmHg}
                                                                        onChange={this.handleChange('Diastolicbloodpressure90mmHg')}
                                                                        value="Diastolicbloodpressure90mmHg"
                                                                        color="primary"
                                                                    />
                                                                }
                                                                style={{ marginLeft: 0 }}
                                                                label="Diastolic blood pressure 90mm Hg or more at booking"
                                                            />
                                                        </FormGroup>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <FormLabel component="legend">General Medical</FormLabel>
                                                        <FormGroup row>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={this.state.insulindependentdiabetesmellitus}
                                                                        onChange={this.handleChange('insulindependentdiabetesmellitus')}
                                                                        value="insulindependentdiabetesmellitus"
                                                                        color="primary"
                                                                    />
                                                                }
                                                                style={{ marginLeft: 0 }}
                                                                label="insulin - dependent diabetes mellitus"
                                                            />
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={this.state.Renaldisease}
                                                                        onChange={this.handleChange('Renaldisease')}
                                                                        value="Renaldisease"
                                                                        color="primary"
                                                                    />
                                                                }
                                                                style={{ marginLeft: 0 }}
                                                                label="Renal disease"
                                                            />
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={this.state.Cardiacdisease}
                                                                        onChange={this.handleChange('Cardiacdisease')}
                                                                        value="Cardiacdisease"
                                                                        color="primary"
                                                                    />
                                                                }
                                                                style={{ marginLeft: 0 }}
                                                                label="Cardiac disease"
                                                            />
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={this.state.Knownsubstanceabuse}
                                                                        onChange={this.handleChange('Knownsubstanceabuse')}
                                                                        value="Knownsubstanceabuse"
                                                                        color="primary"
                                                                    />
                                                                }
                                                                style={{ marginLeft: 0 }}
                                                                label="Known substance abuse (including heavy alchol drinking)"
                                                            />
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={this.state.anyOtherservermedicaldisease}
                                                                        onChange={this.handleChange('anyOtherservermedicaldisease')}
                                                                        value="anyOtherservermedicaldisease"
                                                                        color="primary"
                                                                    />
                                                                }
                                                                style={{ marginLeft: 0 }}
                                                                label="any Other server medical disease or condition"
                                                            />
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <TextField
                                                                id="standard-name"
                                                                label="Please specify other signs"
                                                                className={classes.textField}
                                                                value={this.state.othersigns}
                                                                onChange={this.handleChange('othersigns')}
                                                                margin="normal"
                                                                style={{ width: 400 }}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <RadioGroup row
                                                                aria-label="lable"
                                                                name="name"
                                                                className={classes.group}
                                                                // style={{ marginLeft: 0, marginTop: 0, padding: '0 10px 10px 10px' }}
                                                                value={this.state.Eligibleforthebasiccomponent}
                                                                onChange={this.handleChange('Eligibleforthebasiccomponent')}
                                                            >
                                                                <FormLabel style={{ marginTop: 16 }}>Eligible for the basic component of the new antenatal care model</FormLabel>
                                                                <FormControlLabel labelPlacement="start" value="Yes" control={<Radio />} label="Yes" />
                                                                <FormControlLabel labelPlacement="start" value="No" control={<Radio />} label="No" />
                                                            </RadioGroup>
                                                        </FormGroup>
                                                    </FormGroup>
                                                    <br/>
                                                    <FormGroup>
                                                        <FormLabel component="legend">HIV</FormLabel>
                                                        <FormGroup row>
                                                            <RadioGroup row
                                                                aria-label="lable"
                                                                name="name"
                                                                className={classes.group}
                                                                // style={{ marginLeft: 0, marginTop: 0, padding: '0 10px 10px 10px' }}
                                                                value={this.state.TestedforHIV}
                                                                onChange={this.handleChange('TestedforHIV')}
                                                            >
                                                                <FormLabel style={{ marginTop: 19 }}>Tested for HIV:</FormLabel>
                                                                <FormControlLabel labelPlacement="start" value="Yes" control={<Radio />} label="Yes" />
                                                                <FormControlLabel labelPlacement="start" value="No" control={<Radio />} label="No" />
                                                            </RadioGroup>
                                                            <FormControl style={{ width: 150, marginTop: 0, marginLeft: 10 }} className={classes.formControl}>
                                                                <InputLabel htmlFor="visual acquity rt">HIV Test Result</InputLabel>
                                                                <Select
                                                                    value={this.state.HIVTestResult}
                                                                    onChange={this.handleChange('HIVTestResult')}
                                                                >
                                                                    <MenuItem value="Condom">Reactive</MenuItem>
                                                                    <MenuItem value="Captive pill">NonReactive</MenuItem>
                                                                    <MenuItem value="Incomplete">Incomplete</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                            <TextField
                                                                id="standard-name"
                                                                label="Nutritional Assesment"
                                                                className={classes.textField}
                                                                value={this.state.NutritionalAssesment}
                                                                onChange={this.handleChange('NutritionalAssesment')}
                                                                margin="normal"
                                                                style={{ width: 200, marginTop: 0 }}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup style={{ marginTop: -10 }} row>
                                                            <FormControl style={{ width: 150, marginTop: 0, marginLeft: 0 }} className={classes.formControl}>
                                                                <InputLabel htmlFor="visual acquity rt">Clinical Staging</InputLabel>
                                                                <Select
                                                                    value={this.state.ClinicalStaging}
                                                                    onChange={this.handleChange('ClinicalStaging')}
                                                                >
                                                                    <MenuItem value="Stage I">Stage I</MenuItem>
                                                                    <MenuItem value="Stage II">Stage II</MenuItem>
                                                                    <MenuItem value="Stage III">Stage III</MenuItem>
                                                                    <MenuItem value="Stage IV">Stage IV</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                            <TextField
                                                                id="standard-name"
                                                                label="CD4 Count"
                                                                className={classes.textField}
                                                                value={this.state.CD4Count}
                                                                onChange={this.handleChange('CD4Count')}
                                                                margin="normal"
                                                                style={{ width: 100, marginTop: 0 }}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <RadioGroup
                                                                aria-label="lable"
                                                                name="name"
                                                                className={classes.group1}
                                                                // style={{ marginLeft: 0, marginTop: 0, padding: '0 10px 10px 10px' }}
                                                                value={this.state.InfantFeedings}
                                                                onChange={this.handleChange('InfantFeedings')}
                                                            >
                                                                <FormLabel style={{ marginTop: 16 }}>Infant Feedings</FormLabel>
                                                                <FormControlLabel labelPlacement="start" value="Yes" control={<Radio />} label="Yes" />
                                                                <FormControlLabel labelPlacement="start" value="No" control={<Radio />} label="No" />
                                                            </RadioGroup>
                                                            <RadioGroup
                                                                style={{paddingLeft:10}}
                                                                aria-label="position"
                                                                name="position"
                                                                value={this.state.Feeding}
                                                                onChange={this.handleChange('Feeding')}
                                                                row
                                                            >
                                                                <FormControlLabel
                                                                    value="EBF(Breast)"
                                                                    control={<Radio color="primary" />}
                                                                    label="EBF(Breast)"
                                                                    labelPlacement="end"
                                                                />
                                                                <FormControlLabel
                                                                    value="Formula Feeding"
                                                                    control={<Radio color="primary" />}
                                                                    label="Formula Feeding"
                                                                    labelPlacement="end"
                                                                />
                                                            </RadioGroup>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <RadioGroup
                                                                aria-label="lable"
                                                                name="name"
                                                                className={classes.group1}
                                                                // style={{ marginLeft: 0, marginTop: 0, padding: '0 10px 10px 10px' }}
                                                                value={this.state.LinktoART}
                                                                onChange={this.handleChange('LinktoART')}
                                                            >
                                                                <FormLabel style={{ marginTop: 16 }}>Link to ART</FormLabel>
                                                                <FormControlLabel labelPlacement="start" value="Yes" control={<Radio />} label="Yes" />
                                                                <FormControlLabel labelPlacement="start" value="No" control={<Radio />} label="No" />
                                                            </RadioGroup>
                                                        </FormGroup>
                                                    </FormGroup>
                                                    <br/>
                                                    <FormGroup>
                                                        <FormLabel component="legend">Mother's PMTCT</FormLabel>
                                                        <FormGroup style={{ marginTop: -20 }} row>
                                                            <TextField
                                                                id="standard-name"
                                                                label="Confidentality Code"
                                                                className={classes.textField}
                                                                value={this.state.MothersConfidentalityCode}
                                                                onChange={this.handleChange('MothersConfidentalityCode')}
                                                                margin="normal"
                                                                style={{ width: 150, marginTop: 0 }}
                                                            />
                                                            <FormControl style={{ width: 150, marginTop: 0, marginLeft: 10 }} className={classes.formControl}>
                                                                <InputLabel htmlFor="visual acquity rt">Letter Code</InputLabel>
                                                                <Select
                                                                    value={this.state.MothersLetterCode}
                                                                    onChange={this.handleChange('MothersLetterCode')}
                                                                >
                                                                    <MenuItem value="CTRNR">CTRNR</MenuItem>
                                                                    <MenuItem value="CTRR">CTRR</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                            <FormControl style={{ width: 150, marginTop: 0, marginLeft: 10 }} className={classes.formControl}>
                                                                <InputLabel htmlFor="visual acquity rt">Result</InputLabel>
                                                                <Select
                                                                    value={this.state.MothersResult}
                                                                    onChange={this.handleChange('MothersResult')}
                                                                >
                                                                    <MenuItem value="Condom">Reactive</MenuItem>
                                                                    <MenuItem value="Captive pill">NonReactive</MenuItem>
                                                                    <MenuItem value="Incomplete">Incomplete</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </FormGroup>
                                                    </FormGroup>
                                                    <br/>
                                                    <FormGroup>
                                                        <FormLabel component="legend">Partner's PMTCT</FormLabel>
                                                        <FormGroup style={{ marginTop: -20 }} row>
                                                            <TextField
                                                                id="standard-name"
                                                                label="Confidentality Code"
                                                                className={classes.textField}
                                                                value={this.state.PartnersConfidentalityCode}
                                                                onChange={this.handleChange('PartnersConfidentalityCode')}
                                                                margin="normal"
                                                                style={{ width: 150, marginTop: 0 }}
                                                            />
                                                            <FormControl style={{ width: 150, marginTop: 0, marginLeft: 10 }} className={classes.formControl}>
                                                                <InputLabel htmlFor="visual acquity rt">Letter Code</InputLabel>
                                                                <Select
                                                                    value={this.state.PartnersLetterCode}
                                                                    onChange={this.handleChange('PartnersLetterCode')}
                                                                >
                                                                    <MenuItem value="CTRNR">CTRNR</MenuItem>
                                                                    <MenuItem value="CTRR">CTRR</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                            <FormControl style={{ width: 150, marginLeft: 10 }} className={classes.formControl}>
                                                                <InputLabel htmlFor="visual acquity rt">Result</InputLabel>
                                                                <Select
                                                                    value={this.state.PartnersResult}
                                                                    onChange={this.handleChange('PartnersResult')}
                                                                >
                                                                    <MenuItem value="Condom">Reactive</MenuItem>
                                                                    <MenuItem value="Captive pill">NonReactive</MenuItem>
                                                                    <MenuItem value="Incomplete">Incomplete</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </FormGroup>
                                                    </FormGroup>
                                                </FormControl>
                                            </TabContainer>}
                                            {this.state.value === 1 && <TabContainer>
                                                <FormControl component="fieldset" className={classes.formControl}>
                                                    <FormLabel component="legend"></FormLabel>
                                                    <FormGroup row>
                                                        <FormGroup style={{ marginRight:10, marginTop: 20 }} row>
                                                            <FormGroup>
                                                                <Button
                                                                    className={classes.button}
                                                                    variant="contained"
                                                                    onClick={this.handlePresentPragnancyOpen}
                                                                    color="primary"
                                                                >
                                                                    Add
                                                                </Button>
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Button
                                                                    className={classes.button}
                                                                    variant="contained"
                                                                    onClick={this.handlePresentPragnancyEdit}
                                                                    color="primary"
                                                                >
                                                                    Edit
                                                                </Button>
                                                            </FormGroup>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <TextField
                                                                id="standard-name"
                                                                label="Gravida"
                                                                className={classes.textField}
                                                                value={this.state.presentPragnancyGravida}
                                                                onChange={this.handleChange('presentPragnancyGravida')}
                                                                margin="normal"
                                                                style={{ width: 100 }}
                                                            />
                                                            <TextField
                                                                id="standard-name"
                                                                label="Para"
                                                                className={classes.textField}
                                                                value={this.state.presentPragnancyPara}
                                                                onChange={this.handleChange('presentPragnancyPara')}
                                                                margin="normal"
                                                                style={{ width: 100 }}
                                                            />
                                                            <TextField
                                                                id="standard-name"
                                                                label="Abortion"
                                                                className={classes.textField}
                                                                value={this.state.presentPragnancyAbortion}
                                                                onChange={this.handleChange('presentPragnancyParaAbortion')}
                                                                margin="normal"
                                                                style={{ width: 100 }}
                                                            />
                                                            <TextField
                                                                id="standard-name"
                                                                label="No of childeren alive now"
                                                                className={classes.textField}
                                                                value={this.state.presentPragnancyNoofChilderenAliveNow}
                                                                onChange={this.handleChange('presentPragnancyNoofChilderenAliveNow')}
                                                                margin="normal"
                                                                style={{ width: 200 }}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup style={{ paddingLeft: 10 }}>
                                                            <FormLabel component="legend">Client Agrees to Recive Message</FormLabel>
                                                            <FormGroup row>
                                                                <RadioGroup
                                                                    style={{ marginTop: -10 }}
                                                                    aria-label="position"
                                                                    name="position"
                                                                    value={this.state.ReciveMessageIn}
                                                                    onChange={this.handleChange('ReciveMessageIn')}
                                                                    row
                                                                >
                                                                    <FormControlLabel
                                                                        value="SMS"
                                                                        control={<Radio color="primary" />}
                                                                        label="SMS"
                                                                        labelPlacement="end"
                                                                    />
                                                                    <FormControlLabel
                                                                        value="IVR"
                                                                        control={<Radio color="primary" />}
                                                                        label="IVR"
                                                                        labelPlacement="end"
                                                                    />
                                                                </RadioGroup>
                                                                <FormControl style={{ width: 150, marginTop: -20, marginLeft: 10 }} className={classes.formControl}>
                                                                    <InputLabel htmlFor="Language">Language</InputLabel>
                                                                    <Select
                                                                        value={this.state.ReciveMessageLanguage}
                                                                        onChange={this.handleChange('ReciveMessageLanguage')}
                                                                    >
                                                                        <MenuItem value="English">English</MenuItem>
                                                                        <MenuItem value="Amharic">Amharic</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </FormGroup>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <CoreTable className={classes.table}>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>Visit No</TableCell>
                                                                        <TableCell align="right">Date</TableCell>
                                                                        <TableCell align="right">GA(w)</TableCell>
                                                                        <TableCell align="right">Wt(kg)</TableCell>
                                                                        <TableCell align="right">BP</TableCell>
                                                                        <TableCell align="right">Anemia</TableCell>
                                                                        <TableCell align="right">SF(cm)</TableCell>
                                                                        <TableCell align="right">FHB(min)</TableCell>
                                                                        <TableCell align="right">Edema</TableCell>
                                                                        <TableCell align="right">Presentation</TableCell>
                                                                        <TableCell align="right">TT</TableCell>
                                                                        <TableCell align="right">Iron Vitamine</TableCell>
                                                                        <TableCell align="right">Dite</TableCell>
                                                                        <TableCell align="right">Next Appointment</TableCell>
                                                                        <TableCell align="right">Risk Factor</TableCell>
                                                                        <TableCell align="right">Opted PPFP Method</TableCell>
                                                                        <TableCell align="right">Provider</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {this.state.presentPragnancys.map(row => (
                                                                        <TableRow key={row.id}>
                                                                            <TableCell component="th" scope="row">
                                                                                {row.name}
                                                                            </TableCell>
                                                                            <TableCell align="right">{row.ppDateTime}</TableCell>
                                                                            <TableCell align="right">{row.ppGA}</TableCell>
                                                                            <TableCell align="right">{row.ppWeight}</TableCell>
                                                                            <TableCell align="right">{row.ppBPS}{"/"}{row.ppBPD}</TableCell>
                                                                            <TableCell align="right">{row.ppAnemia}</TableCell>
                                                                            <TableCell align="right">{row.ppSF}</TableCell>
                                                                            <TableCell align="right">{row.ppFHB}</TableCell>
                                                                            <TableCell align="right">{row.ppEdema}</TableCell>
                                                                            <TableCell align="right">{row.ppPresentation}</TableCell>
                                                                            <TableCell align="right">{row.ppTT}</TableCell>
                                                                            <TableCell align="right">{row.ppIronOrVitamine}</TableCell>
                                                                            <TableCell align="right">{row.ppDite}</TableCell>
                                                                            <TableCell align="right">{row.ppNextAppointment}</TableCell>
                                                                            <TableCell align="right">{row.ppRiskFactor}</TableCell>
                                                                            <TableCell align="right">{row.ppOptedforPPFP}</TableCell>
                                                                            <TableCell align="right">{row.pppro}</TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </CoreTable>
                                                        </FormGroup>
                                                    </FormGroup>
                                                </FormControl>
                                            </TabContainer>}
                                        </form>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClose} color="primary">
                                        Close
                                    </Button>
                                    <Button onClick={this.savePatientNote} color="primary">
                                        Save
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog
                                style={{ zIndex: 1400 }}
                                open={this.state.addform}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={this.handleAddformClose}
                                aria-labelledby="alert-dialog-slide-title"
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogTitle id="alert-dialog-slide-title">
                                    {"Obstetric History"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                        <FormGroup>
                                            <TextField
                                                id="standard-name"
                                                label="Age Of Child"
                                                className={classes.textField}
                                                value={this.state.obstetrichistoryDeliveryAgeOfChild}
                                                onChange={this.handleChange('obstetrichistoryDeliveryAgeOfChild')}
                                                margin="normal"
                                                style={{ width: 200, marginTop: 0 }}
                                            />
                                            <FormControl style={{ width: 200, marginTop: 0 }} className={classes.formControl}>
                                                <InputLabel htmlFor="visual">Delivery Mode</InputLabel>
                                                <Select
                                                    MenuProps={{ classes: { paper: classes.dropdownStyle } }}
                                                    value={this.state.obstetrichistoryDeliveryMode}
                                                    onChange={this.handleChange('obstetrichistoryDeliveryMode')}
                                                >
                                                    <MenuItem value="Assisted Breach">Assisted Breach</MenuItem>
                                                    <MenuItem value="Caesarean Section">Caesarean Section</MenuItem>
                                                    <MenuItem value="Instrumental">Instrumental</MenuItem>
                                                    <MenuItem value="SVD">SVD</MenuItem>
                                                    <MenuItem value="Other">Other</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <TextField
                                                id="standard-name"
                                                label="GA"
                                                className={classes.textField}
                                                value={this.state.obstetrichistoryGA}
                                                onChange={this.handleChange('obstetrichistoryGA')}
                                                margin="normal"
                                                style={{ width: 200, marginTop: 0 }}
                                            />
                                            <FormControl style={{ width: 200, marginTop: 0 }} className={classes.formControl}>
                                                <InputLabel htmlFor="visual">Delivery Place</InputLabel>
                                                <Select
                                                    value={this.state.obstetrichistoryDeliveryPlace}
                                                    onChange={this.handleChange('obstetrichistoryDeliveryPlace')}
                                                >
                                                    <MenuItem value="Health Care">Health Care</MenuItem>
                                                    <MenuItem value="Home">Home</MenuItem>
                                                    <MenuItem value="Other">Other</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <TextField
                                                id="standard-name"
                                                label="Weight (g)"
                                                className={classes.textField}
                                                value={this.state.obstetrichistoryWeight}
                                                onChange={this.handleChange('obstetrichistoryWeight')}
                                                margin="normal"
                                                style={{ width: 200, marginTop: 0 }}
                                            />
                                            <FormControl style={{ width: 200, marginTop: 0 }} className={classes.formControl}>
                                                <InputLabel htmlFor="visual">LB/SB</InputLabel>
                                                <Select
                                                    value={this.state.obstetrichistoryLBOrSB}
                                                    onChange={this.handleChange('obstetrichistoryLBOrSB')}
                                                >
                                                    <MenuItem value="CTRNR">LB</MenuItem>
                                                    <MenuItem value="CTRR">SB</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <FormControl style={{ width: 200, marginTop: 0 }} className={classes.formControl}>
                                                <InputLabel htmlFor="visual">Sex</InputLabel>
                                                <Select
                                                    value={this.state.obstetrichistorySex}
                                                    onChange={this.handleChange('obstetrichistorySex')}
                                                >
                                                    <MenuItem value="CTRNR">Male</MenuItem>
                                                    <MenuItem value="CTRR">Female</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <TextField
                                                id="standard-name"
                                                label="Remark"
                                                className={classes.textField}
                                                value={this.state.obstetrichistoryRemark}
                                                onChange={this.handleChange('obstetrichistoryRemark')}
                                                margin="normal"
                                                style={{ width: 200, marginTop: 0 }}
                                            />
                                        </FormGroup>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleAddform} color="primary">
                                        Save
                                    </Button>
                                    <Button onClick={this.handleAddformClose} color="primary">
                                        Close
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog
                                style={{ zIndex: 1400 }}
                                maxWidth={'lg'}
                                open={this.state.presentPragnancy}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={this.handlePresentPragnancyClose}
                                aria-labelledby="alert-dialog-slide-title"
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogTitle id="alert-dialog-slide-title">
                                    {"Present Pragnancy"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                        <FormControl>
                                            <FormGroup row>
                                                <FormGroup style={{ paddingRight: 25 }}>
                                                    <FormGroup row>
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                            <DatePicker
                                                                style={{ width: 200 }}
                                                                margin="normal"
                                                                label="Date Time"
                                                                value={this.state.ppDateTime}
                                                                onChange={(e) => this.handleDateChange(e,'ppDateTime')}
                                                            />
                                                        </MuiPickersUtilsProvider>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Visit No"
                                                            disabled={true}
                                                            className={classes.textField}
                                                            value={this.state.ppVisitNo}
                                                            onChange={this.handleChange('ppVisitNo')}
                                                            margin="normal"
                                                            style={{ width: 200, marginTop: 0, marginLeft: 0 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="GA"
                                                            className={classes.textField}
                                                            value={this.state.ppGA}
                                                            onChange={this.handleChange('ppGA')}
                                                            margin="normal"
                                                            style={{ width: 200, marginTop: 0, marginLeft: 0 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="BPS"
                                                            className={classes.textField}
                                                            value={this.state.ppBPS}
                                                            onChange={this.handleChange('ppBPS')}
                                                            margin="normal"
                                                            style={{ width: 100, marginTop: 0, marginLeft: 0 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="BPD"
                                                            className={classes.textField}
                                                            value={this.state.ppBPD}
                                                            onChange={this.handleChange('ppBPD')}
                                                            margin="normal"
                                                            style={{ width: 100, marginTop: 0, marginLeft: 0 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Weight(kg)"
                                                            className={classes.textField}
                                                            value={this.state.ppWeight}
                                                            onChange={this.handleChange('ppWeight')}
                                                            margin="normal"
                                                            style={{ width: 100, marginTop: 0, marginLeft: 0 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormControl style={{ width: 200, marginTop: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="visual">Anemia</InputLabel>
                                                            <Select
                                                                style={{position:'relative'}}
                                                                value={this.state.ppAnemia}
                                                                onChange={this.handleChange('ppAnemia')}
                                                            >
                                                                <MenuItem value="None">None</MenuItem>
                                                                <MenuItem value="Wiled">Wiled</MenuItem>
                                                                <MenuItem value="Moderate">Moderate</MenuItem>
                                                                <MenuItem value="Severe">Severe</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormControl style={{ width: 200, marginTop: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="visual">Edema</InputLabel>
                                                            <Select
                                                                value={this.state.ppEdema}
                                                                onChange={this.handleChange('ppEdema')}
                                                            >
                                                                <MenuItem value="None">None</MenuItem>
                                                                <MenuItem value="Trace">Trace</MenuItem>
                                                                <MenuItem value="+1">+1</MenuItem>
                                                                <MenuItem value="+2">+2</MenuItem>
                                                                <MenuItem value="+3">+3</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormControl style={{ width: 200, marginTop: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="visual">Presentation</InputLabel>
                                                            <Select
                                                                value={this.state.ppPresentation}
                                                                onChange={this.handleChange('ppPresentation')}
                                                            >
                                                                {
                                                                    this.props.ANCPresentation.map((item) =>
                                                                        <MenuItem value={item.Name}>{item.Name}</MenuItem>
                                                                    )
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormControl style={{ width: 200, marginTop: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="visual">TT</InputLabel>
                                                            <Select
                                                                value={this.state.ppTT}
                                                                onChange={this.handleChange('ppTT')}
                                                            >
                                                                <MenuItem value="None">None</MenuItem>
                                                                <MenuItem value="TT1">TT1</MenuItem>
                                                                <MenuItem value="TT2">TT2</MenuItem>
                                                                <MenuItem value="TT3">TT3</MenuItem>
                                                                <MenuItem value="TT4">TT4</MenuItem>
                                                                <MenuItem value="TT5">TT5</MenuItem>
                                                                <MenuItem value="Completed">Completed</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormLabel style={{ marginTop: 16 }}>Iron/Vitamine: </FormLabel>
                                                        <RadioGroup
                                                            row
                                                            aria-label="position"
                                                            name="position"
                                                            value={this.state.ppIronOrVitamine}
                                                            onChange={this.handleCheckedBoxChange('ppIronOrVitamine')}
                                                        >
                                                            <FormControlLabel
                                                                value="Yes"
                                                                control={<Radio color="primary" />}
                                                                label="Yes"
                                                                labelPlacement="start"
                                                            />
                                                            <FormControlLabel
                                                                value="No"
                                                                control={<Radio color="primary" />}
                                                                label="No"
                                                                labelPlacement="start"
                                                            />
                                                        </RadioGroup>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Dite"
                                                            multiline
                                                            className={classes.textField}
                                                            value={this.state.ppDite}
                                                            onChange={this.handleChange('ppDite')}
                                                            margin="normal"
                                                            style={{ width: 200, marginTop: 0, marginLeft: 0 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="SF"
                                                            multiline
                                                            className={classes.textField}
                                                            value={this.state.ppSF}
                                                            onChange={this.handleChange('ppSF')}
                                                            margin="normal"
                                                            style={{ width: 200, marginTop: 0, marginLeft: 0 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormControl style={{ width: 200, marginTop: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="visual">FHB</InputLabel>
                                                            <Select
                                                                value={this.state.ppFHB}
                                                                onChange={this.handleChange('ppFHB')}
                                                            >
                                                                <MenuItem value="POSETIVE">POSETIVE</MenuItem>
                                                                <MenuItem value="NEGATIVE">NEGATIVE</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Clinical Note"
                                                            multiline
                                                            className={classes.textField}
                                                            value={this.state.ppClinicalNote}
                                                            onChange={this.handleChange('ppClinicalNote')}
                                                            margin="normal"
                                                            style={{ width: 200, marginTop: 0, marginLeft: 0 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Ultasound"
                                                            multiline
                                                            className={classes.textField}
                                                            value={this.state.ppUltasound}
                                                            onChange={this.handleChange('ppUltasound')}
                                                            margin="normal"
                                                            style={{ width: 200, marginTop: 0, marginLeft: 0 }}
                                                        />
                                                    </FormGroup>
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormLabel>Family Planning</FormLabel>
                                                    <FormGroup row>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.state.ppOptedforPPFP}
                                                                    onChange={this.handleCheckedChange('ppOptedforPPFP')}
                                                                    value="ppOptedforPPFP"
                                                                    color="primary"
                                                                />
                                                            }
                                                            style={{ marginLeft: 0, marginTop: 10 }}
                                                            labelPlacement="start"
                                                            label="Opted for PPFP"
                                                        />
                                                        <FormControl style={{ width: 200, marginLeft: 10, marginTop: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="visual">Method</InputLabel>
                                                            <Select
                                                                disabled={this.state.disableppFamilyPlanningMethod}
                                                                value={this.state.ppFamilyPlanningMethod}
                                                                onChange={this.handleChange('ppFamilyPlanningMethod')}
                                                            >
                                                                { 
                                                                    this.props.FPMethodType.map((item)=>
                                                                        <MenuItem value={item.Name}>{item.Name}</MenuItem>
                                                                    )
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                    </FormGroup>
                                                    <FormLabel>Risk Factor</FormLabel>
                                                    <FormGroup>
                                                        {
                                                            this.props.ANCRiskFactor.map((item)=>
                                                                <FormControlLabel
                                                                    control={<Checkbox 
                                                                        onChange={this.handleANCRiskFactorChange('ppRiskFactor')}
                                                                        label={item.Name}
                                                                        value={item.Name} />}
                                                                    label={item.Name}
                                                                />
                                                            )
                                                        }
                                                        
                                                        <TextField
                                                            id="standard-name"
                                                            label="Other"
                                                            className={classes.textField}
                                                            value={this.state.ppRiskFactorOther}
                                                            onChange={this.handleChange('ppRiskFactorOther')}
                                                            margin="normal"
                                                            style={{ width: 200, marginTop: 0, marginLeft: 0 }}
                                                        />
                                                    </FormGroup>
                                                    <FormLabel>Lab</FormLabel>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            // label="Other"
                                                            multiline
                                                            className={classes.textField}
                                                            value={this.state.ppHeartAbnormality}
                                                            onChange={this.handleChange('ppHeartAbnormality')}
                                                            margin="normal"
                                                            style={{ width: 200, marginTop: 0, marginLeft: 0 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.state.ppcheckNextAppointment}
                                                                    onChange={this.handleCheckedBoxChange('ppcheckNextAppointment')}
                                                                    value="ppcheckNextAppointment"
                                                                    color="primary"
                                                                />
                                                            }
                                                            style={{ marginLeft: 0, marginTop: 0 }}
                                                            labelPlacement="start"
                                                            label="Next Appointment"
                                                        />
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                            <DatePicker
                                                                disabled={this.state.disableppNextAppointment}
                                                                style={{ marginLeft: 10, marginTop: 0 }}
                                                                margin="normal"
                                                                value={this.state.ppNextAppointment}
                                                                onChange={(e) => this.handleDateChange(e, 'ppNextAppointment')}
                                                            />
                                                        </MuiPickersUtilsProvider>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormControl style={{ width: 200, marginTop: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="visual">Appointment Note</InputLabel>
                                                            <Select
                                                                value={this.state.ppAppointmentNote}
                                                            onChange={this.handleChange('ppAppointmentNote')}
                                                            >
                                                                <MenuItem value="Elective CS">Elective CS</MenuItem>
                                                                <MenuItem value="Induction">Induction</MenuItem>
                                                                <MenuItem value="Next Follo-up">Next Follo-up</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormControl style={{ width: 200, marginTop: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="visual">Appointment Dept</InputLabel>
                                                            <Select
                                                                value={this.state.ppAppointmentDept}
                                                                onChange={this.handleChange('ppAppointmentDept')}
                                                            >
                                                                {
                                                                    this.props.Department.map((item) =>
                                                                        <MenuItem value={item.Name}>{item.Name}</MenuItem>
                                                                    )
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                    </FormGroup>
                                                    <br/>
                                                    <FormLabel>Client Agrees to Recive Message</FormLabel>
                                                    <FormGroup>
                                                        <FormGroup row>
                                                            <FormLabel style={{ marginTop: 16 }}>SMS: </FormLabel>
                                                            <RadioGroup
                                                                disabled={true}
                                                                row
                                                                aria-label="position"
                                                                name="position"
                                                            // value={this.state.checkFamilyPlaningFPCounseledandProvided}
                                                            // onChange={this.handleCheckedChange('checkFamilyPlaningFPCounseledandProvided')}
                                                            >
                                                                <FormControlLabel
                                                                    value="Yes"
                                                                    disabled={true}
                                                                    control={<Radio color="primary" />}
                                                                    label="Yes"
                                                                    labelPlacement="start"
                                                                />
                                                                <FormControlLabel
                                                                    value="No"
                                                                    disabled={true}
                                                                    control={<Radio color="primary" />}
                                                                    label="No"
                                                                    labelPlacement="start"
                                                                />
                                                            </RadioGroup>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <FormLabel style={{ marginTop: 16 }}>IVR: </FormLabel>
                                                            <RadioGroup
                                                                row
                                                                aria-label="position"
                                                                name="position"
                                                            // value={this.state.checkFamilyPlaningFPCounseledandProvided}
                                                            // onChange={this.handleCheckedChange('checkFamilyPlaningFPCounseledandProvided')}
                                                            >
                                                                <FormControlLabel
                                                                    value="Yes"
                                                                    disabled={true}
                                                                    control={<Radio color="primary" />}
                                                                    label="Yes"
                                                                    labelPlacement="start"
                                                                />
                                                                <FormControlLabel
                                                                    value="No"
                                                                    disabled={true}
                                                                    control={<Radio color="primary" />}
                                                                    label="No"
                                                                    labelPlacement="start"
                                                                />
                                                            </RadioGroup>
                                                        </FormGroup>
                                                        <FormControl disabled={true} style={{ width: 200, marginTop: -30 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="visual">Language</InputLabel>
                                                            <Select
                                                            // value={this.state.obstetrichistorySex}
                                                            // onChange={this.handleChange('obstetrichistorySex')}
                                                            >
                                                                <MenuItem value="CTRNR">Male</MenuItem>
                                                                <MenuItem value="CTRR">Female</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </FormGroup>
                                                </FormGroup>
                                            </FormGroup>
                                        </FormControl>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handlePresentPragnancyAdd} color="primary">
                                        Save
                                    </Button>
                                    <Button onClick={this.handlePresentPragnancyClose} color="primary">
                                        Cancel
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

pNote.propTypes = {
    fetchANCRiskFactor: propTypes.isRequired,
    fetchANCPresentation: propTypes.isRequired,
    fetchFPMethodType: propTypes.isRequired,
    fetchDepartment: propTypes.isRequired,
    savePatientNote: propTypes.isRequired,
    fetchNoteSubCategory: propTypes.isRequired,
    fetchProgressNote: propTypes.isRequired,
    fetchPatientNoteDetail: propTypes.isRequired,
    isLoading: propTypes.bool.isRequired,
    hasError: propTypes.bool.isRequired,
    progressNotes: propTypes.array.isRequired,
    fullScreen: propTypes.bool.isRequired,
    patientnoteDetail: propTypes.array.isRequired,
    noteSubCategory: propTypes.array.isRequired,
    confirmStatus: propTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    progressNotes: state.patientNote.progressNotes,
    isLoading: state.patientNote.isLoading,
    hasError: state.patientNote.hasError,
    totalCount: state.patientNote.totalCount,
    selectedPatient: state.assignments.selectedPatient,
    patientnoteDetail: state.patientNote.patientnoteDetail,
    noteSubCategory: state.patientNote.noteSubCategory,
    confirmStatus: state.patientNote.confirmStatus,
    ANCRiskFactor: state.patientNote.ANCRiskFactor,
    ANCPresentation: state.patientNote.ANCPresentation,
    FPMethodType: state.patientNote.FPMethodType,
    Department: state.patientNote.Department
});

const mapDispatchToProps = dispatch => ({
    fetchProgressNote: (url) => dispatch(fetchProgressNote(url)),
    fetchPatientNoteDetail: (url) => dispatch(fetchPatientNoteDetail(url)),
    fetchNoteSubCategory: (url) => dispatch(fetchNoteSubCategory(url)),
    savePatientNote: (url, data) => dispatch(savePatientNote(url, data)),
    fetchANCRiskFactor: (url) => dispatch(fetchANCRiskFactor(url)),
    fetchANCPresentation: (url) => dispatch(fetchANCPresentation(url)),
    fetchFPMethodType: (url) => dispatch(fetchFPMethodType(url)),
    fetchDepartment: (url) => dispatch(fetchDepartment(url))
});

export default compose(withStyles(styles), withMobileDialog(), connect(mapStateToProps, mapDispatchToProps))(pNote);