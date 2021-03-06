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
import { fetchProgressNote, fetchPatientNoteDetail, fetchNoteSubCategory, savePatientNote } from '../../redux/actions/patientNoteAction';
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
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import qs from 'qs';

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

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const category = "PNC";

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
            disableBreastFeeding: true,
            disableImmunizationGiven: true,
            checkBreastFeeding: 'No',
            checkImmunizationGiven: 'No',
            BreastFeeding: '',
            ImmunizationGiven: '',
            disableNextAppointment: true,
            NextAppointment: new Date(),
            checkNextAppointment: false,
            checkFamilyPlaningPreviuoslyusedanyFPMethod: 'No',
            checkFamilyPlaningFPCounseledandProvided: 'No',
            checkFamilyPlaningFPCounselingGiven: 'No',
            familyPlaningMethodChosen: '',
            DeliveryDate: new Date()
        }
    }
    tabhandleChange = (event, value) => {
        this.setState({ value });
    };
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleDateChange = (date, name) => {
        this.setState({ [name]: date });
    };
    handleCheckedChange = name => event => {
        this.setState({ [name]: event.target.value }
            , function () {
                if (this.state.checkBreastFeeding==='Yes') {
                    this.setState({ disableBreastFeeding: false });
                } else {
                    this.setState({ disableBreastFeeding: true });
                }
                if (this.state.checkImmunizationGiven === 'Yes') {
                    this.setState({ disableImmunizationGiven: false });
                } else {
                    this.setState({ disableImmunizationGiven: true });
                }
                
            }
        )};
    handleCheckedBoxChange = name => event => {
        this.setState({ [name]: event.target.checked }, function () {
            if (this.state.checkNextAppointment) {
                this.setState({ disableNextAppointment: false });
            } else {
                this.setState({ disableNextAppointment: true });
            }
        });
    };
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
        const url = 'PatientNotes/GetNoteSubCategory/' + category;
        this.props.fetchNoteSubCategory(url);
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
            alert("saved Successfully");
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
                                maxWidth={'lg'}
                                fullScreen={fullScreen}
                                open={this.state.newdialogopen}
                                onClose={this.handleClose}
                                aria-labelledby="responsive-dialog-title"
                            >
                                <DialogTitle id="responsive-dialog-title">{"New " + category}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        <form>
                                            <AppBar position="static" color="default">
                                                <Tabs value={this.state.value} onChange={this.tabhandleChange}>
                                                    <Tab label="Mother" />
                                                    <Tab label="Infant" />
                                                </Tabs>
                                            </AppBar>
                                            {this.state.value === 0 && <TabContainer>
                                                <FormControl component="fieldset" className={classes.formControl}>
                                                    <FormGroup row>
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                            <DatePicker
                                                                margin="normal"
                                                                label="Delivery Date"
                                                                value={this.state.DeliveryDate}
                                                                onChange={(e) => this.handleDateChange(e,'DeliveryDate')}
                                                            />
                                                        </MuiPickersUtilsProvider>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Wt(kg)"
                                                            className={classes.textField}
                                                            value={this.state.weight}
                                                            onChange={this.handleChange('weight')}
                                                            margin="normal"
                                                            style={{ width: 100 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="BPS"
                                                            className={classes.textField}
                                                            value={this.state.BPS}
                                                            onChange={this.handleChange('BPS')}
                                                            margin="normal"
                                                            style={{ width: 100 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="BPD"
                                                            className={classes.textField}
                                                            value={this.state.BPD}
                                                            onChange={this.handleChange('BPD')}
                                                            margin="normal"
                                                            style={{ width: 100 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="Temp"
                                                            className={classes.textField}
                                                            value={this.state.Temp}
                                                            onChange={this.handleChange('Temp')}
                                                            margin="normal"
                                                            style={{ width: 100 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="Hb"
                                                            className={classes.textField}
                                                            value={this.state.Hb}
                                                            onChange={this.handleChange('Hb')}
                                                            margin="normal"
                                                            style={{ width: 100 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Subjective Finding"
                                                            className={classes.textField}
                                                            value={this.state.SubjectiveFinding}
                                                            onChange={this.handleChange('SubjectiveFinding')}
                                                            margin="normal"
                                                            style={{ width: 500 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Physical Exam"
                                                            multiline
                                                            className={classes.textField}
                                                            value={this.state.PhysicalExam}
                                                            onChange={this.handleChange('PhysicalExam')}
                                                            margin="normal"
                                                            style={{ width: 500 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Assessment"
                                                            multiline
                                                            className={classes.textField}
                                                            value={this.state.Assessment}
                                                            onChange={this.handleChange('Assessment')}
                                                            margin="normal"
                                                            style={{ width: 500 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Plan"
                                                            multiline
                                                            className={classes.textField}
                                                            value={this.state.Plan}
                                                            onChange={this.handleChange('Plan')}
                                                            margin="normal"
                                                            style={{ width: 500 }}
                                                        />
                                                    </FormGroup>
                                                    <br/>
                                                    <br/>
                                                    <FormLabel>Family Planing</FormLabel>
                                                    <FormGroup>
                                                        <FormGroup row>
                                                            <FormLabel style={{ marginTop: 16 }}>Previuosly used any FP Method: </FormLabel>
                                                            <RadioGroup
                                                                row
                                                                aria-label="position"
                                                                name="position"
                                                                value={this.state.checkFamilyPlaningPreviuoslyusedanyFPMethod}
                                                                onChange={this.handleCheckedChange('checkFamilyPlaningPreviuoslyusedanyFPMethod')}
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
                                                            <FormLabel style={{ marginTop: 16 }}>FP Counseling Given: </FormLabel>
                                                            <RadioGroup
                                                                row
                                                                aria-label="position"
                                                                name="position"
                                                                value={this.state.checkFamilyPlaningFPCounselingGiven}
                                                                onChange={this.handleCheckedChange('checkFamilyPlaningFPCounselingGiven')}
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
                                                            <FormControl style={{ width: 150, marginTop: -10, marginBottom: 10 }} className={classes.formControl}>
                                                                <InputLabel htmlFor="e">Method Chosen</InputLabel>
                                                                <Select
                                                                    value={this.state.familyPlaningMethodChosen}
                                                                    onChange={this.handleChange('familyPlaningMethodChosen')}
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
                                                        <FormGroup row>
                                                            <FormLabel style={{ marginTop: 16 }}>FP Counseled and Provided: </FormLabel>
                                                            <RadioGroup
                                                                row
                                                                aria-label="position"
                                                                name="position"
                                                                value={this.state.checkFamilyPlaningFPCounseledandProvided}
                                                                onChange={this.handleCheckedChange('checkFamilyPlaningFPCounseledandProvided')}
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
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={this.state.checkNextAppointment}
                                                                        onChange={this.handleCheckedBoxChange('checkNextAppointment')}
                                                                        value="checkNextAppointment"
                                                                        color="primary"
                                                                    />
                                                                }
                                                                style={{ marginLeft: 0, marginTop: 0 }}
                                                                labelPlacement="start"
                                                                label="Next Appointment"
                                                            />
                                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                <DatePicker
                                                                    disabled={this.state.disableNextAppointment}
                                                                    style={{marginLeft: 10, marginTop: 0}}
                                                                    margin="normal"
                                                                    // label="Date picker"
                                                                    value={this.state.NextAppointment}
                                                                    onChange={(e) => this.handleDateChange(e,'NextAppointment')}
                                                                />
                                                            </MuiPickersUtilsProvider>
                                                        </FormGroup>
                                                    </FormGroup>
                                                </FormControl>
                                            </TabContainer>}
                                            {this.state.value === 1 && <TabContainer>
                                                <FormControl component="fieldset" className={classes.formControl}>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="General Condition"
                                                            multiline
                                                            className={classes.textField}
                                                            // value={this.state.name}
                                                            // onChange={this.handleChange('name')}
                                                            margin="normal"
                                                            style={{ width: 500 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Wt(g)"
                                                            className={classes.textField}
                                                            // value={this.state.name}
                                                            // onChange={this.handleChange('name')}
                                                            margin="normal"
                                                            style={{ width: 100 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormLabel style={{ marginTop: 20 }}>Breast Feeding: </FormLabel>
                                                        <RadioGroup
                                                            row
                                                            aria-label="position"
                                                            name="position"
                                                            value={this.state.checkBreastFeeding}
                                                            onChange={this.handleCheckedChange('checkBreastFeeding')}
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
                                                        <TextField
                                                            id="standard-name"
                                                            disabled={this.state.disableBreastFeeding}
                                                            // label="Breast Feeding"
                                                            className={classes.textField}
                                                            value={this.state.BreastFeeding}
                                                            onChange={this.handleChange('BreastFeeding')}
                                                            margin="normal"
                                                            style={{ width: 300, marginLeft: 5 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormLabel style={{ marginTop: 20 }}>Immunization Given: </FormLabel>
                                                        <RadioGroup
                                                            row
                                                            aria-label="position"
                                                            name="position"
                                                            value={this.state.checkImmunizationGiven}
                                                            onChange={this.handleCheckedChange('checkImmunizationGiven')}
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
                                                        <TextField
                                                            id="standard-name"
                                                            disabled={this.state.disableImmunizationGiven}
                                                            // label="Immunization Given"
                                                            className={classes.textField}
                                                            value={this.state.ImmunizationGiven}
                                                            onChange={this.handleChange('ImmunizationGiven')}
                                                            margin="normal"
                                                            style={{ width: 300, marginLeft: 5 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Advice"
                                                            multiline
                                                            className={classes.textField}
                                                            // value={this.state.name}
                                                            // onChange={this.handleChange('name')}
                                                            margin="normal"
                                                            style={{ width: 500 }}
                                                        />
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
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

pNote.propTypes = {
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
    confirmStatus: state.patientNote.confirmStatus
});

const mapDispatchToProps = dispatch => ({
    fetchProgressNote: (url) => dispatch(fetchProgressNote(url)),
    fetchPatientNoteDetail: (url) => dispatch(fetchPatientNoteDetail(url)),
    fetchNoteSubCategory: (url) => dispatch(fetchNoteSubCategory(url)),
    savePatientNote: (url, data) => dispatch(savePatientNote(url, data)),
});

export default compose(withStyles(styles), withMobileDialog(), connect(mapStateToProps, mapDispatchToProps))(pNote);