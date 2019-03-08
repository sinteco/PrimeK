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
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import qs from 'qs';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

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

const styles = theme => ({
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
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});

const category = "Neonatal Note";

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
            deliveryDate: new Date(),
            deliveryMethod: '',
            // indication: '',
            sex: '',
            birthWt: '',
            length: '',
            HC: '',
            GA: '',
            APGARscore1min: '',
            APGARscore5min: '',
            resuscitatedAtBirth: '',
            vitaminK: '',
            antibiotics: '',
            otherTreatment: '',
            dimorphicFeaturesBirth: '',
            PR: '',
            RR: '',
            temp: '',
            SaO2: '',
            HEENT: '',
            GUS: '',
            chest: '',
            anus: '',
            CSV: '',
            integumentary: '',
            abdomen: '',
            CSNMoro: '',
            grasp: '',
            sucking: '',
            tone: '',
            assesment: '',
            plan: '',
            babyremark: '',
            motherremark: '',
            gravida: '',
            para: '',
            abortion: '',
            Noofchildrenalive: '',
            ageofMother: '',
            bloodBloodandRH: '',
            VLDR: '',
            singleMultipleBirth: '',
            HBSAg: '',
            TB: '',
            HIVSTATUS: '',
            HIVDuration: '',
            OnArt: '',
            motherRegimen: '',
            infantRegimen: '',
            infantRegimenOptions: '',
            otherRiskFactors: '',
            LMP: new Date(),
            checkeLMP: true,
            disableLMP: true,
            laborOnset: '',
            chorioaminiontis: '',
            laborDuration: '',
            ROMDuration: '',
            MSAF: '',
            thickMeconium: '',
            indication: '',
            materialHypertension: '',
            DM: '',
            HxofFoulSmellingDischarge: ''
        }
    }
    tabhandleChange = (event, value) => {
        this.setState({ value });
    };
    handleChange = name => event => {
        this.setState({ [name]: event.target.value, })
    };
    handleCheckedChange = name => event => {
        this.setState({ [name]: event.target.checked }, function () {
            if(this.state.checkeLMP){
                this.setState({disableLMP:true});
            }else{
                this.setState({disableLMP:false});
            }
        });
    }
    handleDateChange = (date, name) => {
        this.setState({ [name]: date });
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
                                                    <Tab label="Baby" />
                                                    <Tab label="Mother" />
                                                </Tabs>
                                            </AppBar>
                                            {this.state.value === 0 && <TabContainer>
                                                <FormControl component="fieldset" className={classes.formControl}>
                                                    <FormLabel component="legend">Delivery</FormLabel>
                                                    <FormGroup row>
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                <DatePicker
                                                                    margin="normal"
                                                                    label="Date Time"
                                                                    value={this.state.deliveryDate}
                                                                    onChange={(e)=>this.handleDateChange(e,'deliveryDate')}
                                                                />
                                                        </MuiPickersUtilsProvider>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Delivery Method"
                                                            className={classes.textField}
                                                            value={this.state.deliveryMethod}
                                                            onChange={this.handleChange('deliveryMethod')}
                                                            margin="normal"
                                                            style={{ width: 150 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="Indication"
                                                            className={classes.textField}
                                                            value={this.state.indication}
                                                            onChange={this.handleChange('indication')}
                                                            margin="normal"
                                                            style={{ width: 100 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="Sex"
                                                            className={classes.textField}
                                                            value={this.state.sex}
                                                            onChange={this.handleChange('sex')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 100 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Birth wt.(gm)"
                                                            className={classes.textField}
                                                            value={this.state.birthWt}
                                                            onChange={this.handleChange('birthWt')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 100 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="Length(cm)"
                                                            className={classes.textField}
                                                            value={this.state.length}
                                                            onChange={this.handleChange('length')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 100 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="HC(cm)"
                                                            className={classes.textField}
                                                            value={this.state.HC}
                                                            onChange={this.handleChange('HC')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 100 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="GA"
                                                            className={classes.textField}
                                                            value={this.state.GA}
                                                            onChange={this.handleChange('GA')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 100 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="APGAR score as 1 min:"
                                                            className={classes.textField}
                                                            value={this.state.APGARscore1min}
                                                            onChange={this.handleChange('APGARscore1min')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 200 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="at 5min:"
                                                            className={classes.textField}
                                                            value={this.state.APGARscore5min}
                                                            onChange={this.handleChange('APGARscore5min')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 100 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormControl style={{ width: 170, marginTop: 0, marginLeft: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="e">Resuscitated at Birth</InputLabel>
                                                            <Select
                                                                value={this.state.resuscitatedAtBirth}
                                                                onChange={this.handleChange('resuscitatedAtBirth')}
                                                            >
                                                                <MenuItem value="Yes">Yes</MenuItem>
                                                                <MenuItem value="No">No</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <FormControl style={{ width: 140, marginTop: 0, marginLeft: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="e">Vitamin K</InputLabel>
                                                            <Select
                                                                value={this.state.vitaminK}
                                                                onChange={this.handleChange('vitaminK')}
                                                            >
                                                                <MenuItem value="Yes">Yes</MenuItem>
                                                                <MenuItem value="No">No</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Antibiotics"
                                                            className={classes.textField}
                                                            value={this.state.antibiotics}
                                                            onChange={this.handleChange('antibiotics')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 100, marginTop: 0 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="Other Treatment"
                                                            className={classes.textField}
                                                            value={this.state.otherTreatment}
                                                            onChange={this.handleChange('otherTreatment')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 150, marginTop: 0 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormControl style={{ width: 200, marginTop: 0, marginLeft: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="e">Dimorphic Features Birth</InputLabel>
                                                            <Select
                                                                value={this.state.dimorphicFeaturesBirth}
                                                                onChange={this.handleChange('dimorphicFeaturesBirth')}
                                                            >
                                                                <MenuItem value="Yes">Yes</MenuItem>
                                                                <MenuItem value="No">No</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <TextField
                                                            id="standard-name"
                                                            label="BR"
                                                            className={classes.textField}
                                                            value={this.state.BR}
                                                            onChange={this.handleChange('BR')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 100, marginTop: 0 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="RR"
                                                            className={classes.textField}
                                                            value={this.state.RR}
                                                            onChange={this.handleChange('RR')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 100, marginTop: 0 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="Temp"
                                                            className={classes.textField}
                                                            value={this.state.temp}
                                                            onChange={this.handleChange('temp')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 100, marginTop: 0 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="SaO2"
                                                            className={classes.textField}
                                                            value={this.state.SaO2}
                                                            onChange={this.handleChange('SaO2')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 100, marginTop: 0 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="HEENT"
                                                            className={classes.textField}
                                                            value={this.state.HEENT}
                                                            onChange={this.handleChange('HEENT')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 350, marginTop: 0 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="GUS"
                                                            className={classes.textField}
                                                            value={this.state.GUS}
                                                            onChange={this.handleChange('GUS')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 350, marginTop: 0 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Chest"
                                                            className={classes.textField}
                                                            value={this.state.chest}
                                                            onChange={this.handleChange('chest')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 350, marginTop: 0 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="Anus"
                                                            className={classes.textField}
                                                            value={this.state.anus}
                                                            onChange={this.handleChange('anus')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 350, marginTop: 0 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="CSV"
                                                            className={classes.textField}
                                                            value={this.state.CSV}
                                                            onChange={this.handleChange('CSV')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 350, marginTop: 0 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="Integumentary"
                                                            className={classes.textField}
                                                            value={this.state.integumentary}
                                                            onChange={this.handleChange('integumentary')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 350, marginTop: 0 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Abdomen"
                                                            className={classes.textField}
                                                            value={this.state.abdomen}
                                                            onChange={this.handleChange('abdomen')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 350, marginTop: 0 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="CSN Moro"
                                                            className={classes.textField}
                                                            value={this.state.CSNMoro}
                                                            onChange={this.handleChange('CSNMoro')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 130, marginTop: 0 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="Grasp"
                                                            className={classes.textField}
                                                            value={this.state.grasp}
                                                            onChange={this.handleChange('grasp')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 130, marginTop: 0 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="Sucking"
                                                            className={classes.textField}
                                                            value={this.state.sucking}
                                                            onChange={this.handleChange('sucking')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 130, marginTop: 0 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="Tone"
                                                            className={classes.textField}
                                                            value={this.state.tone}
                                                            onChange={this.handleChange('tone')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 130, marginTop: 0 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Assesment"
                                                            className={classes.textField}
                                                            value={this.state.assesment}
                                                            onChange={this.handleChange('assesment')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 350, marginTop: 0 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="Plan"
                                                            className={classes.textField}
                                                            value={this.state.plan}
                                                            onChange={this.handleChange('plan')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 350, marginTop: 0 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Remark"
                                                            className={classes.textField}
                                                            value={this.state.babyremark}
                                                            onChange={this.handleChange('babyremark')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 350, marginTop: 0 }}
                                                        />
                                                    </FormGroup>
                                                </FormControl>
                                            </TabContainer>}
                                            {this.state.value === 1 && <TabContainer>
                                                <FormControl component="fieldset" className={classes.formControl}>
                                                    <FormLabel component="legend">Past Obstetrics History (from ANC)</FormLabel>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Gravida"
                                                            className={classes.textField}
                                                            value={this.state.gravida}
                                                            onChange={this.handleChange('gravida')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 130, marginTop: 0 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="Para"
                                                            className={classes.textField}
                                                            value={this.state.para}
                                                            onChange={this.handleChange('para')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 130, marginTop: 0 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="Abortion"
                                                            className={classes.textField}
                                                            value={this.state.abortion}
                                                            onChange={this.handleChange('abortion')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 130, marginTop: 0 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="No of children alive"
                                                            className={classes.textField}
                                                            value={this.state.Noofchildrenalive}
                                                            onChange={this.handleChange('Noofchildrenalive')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 180, marginTop: 0 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Age of Mother"
                                                            className={classes.textField}
                                                            value={this.state.ageofMother}
                                                            onChange={this.handleChange('ageofMother')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 130, marginTop: 0 }}
                                                        />
                                                        <FormControl style={{ width: 160, marginTop: 0, marginLeft: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="e">Blood Blood and RH</InputLabel>
                                                            <Select
                                                                value={this.state.bloodBloodandRH}
                                                                onChange={this.handleChange('bloodBloodandRH')}
                                                            >
                                                                <MenuItem value="A-">A-</MenuItem>
                                                                <MenuItem value="A+">A+</MenuItem>
                                                                <MenuItem value="A-">AB-</MenuItem>
                                                                <MenuItem value="A-">AB+</MenuItem>
                                                                <MenuItem value="B-">B-</MenuItem>
                                                                <MenuItem value="B+">B+</MenuItem>
                                                                <MenuItem value="O-">O-</MenuItem>
                                                                <MenuItem value="O+">O+</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <FormControl style={{ width: 140, marginTop: 0, marginLeft: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="e">VLDR</InputLabel>
                                                            <Select
                                                                value={this.state.VLDR}
                                                                onChange={this.handleChange('VLDR')}
                                                            >
                                                                <MenuItem value="REACTIVE">REACTIVE</MenuItem>
                                                                <MenuItem value="NONREACTIVE">NONREACTIVE</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <FormControl style={{ width: 160, marginTop: 0, marginLeft: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="e">Single Multiple Birth</InputLabel>
                                                            <Select
                                                                value={this.state.singleMultipleBirth}
                                                                onChange={this.handleChange('singleMultipleBirth')}
                                                            >
                                                                <MenuItem value="SINGLTON">SINGLTON</MenuItem>
                                                                <MenuItem value="TWINS">TWINS</MenuItem>
                                                                <MenuItem value="TRIPLE">TRIPLE</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormControl style={{ width: 160, marginTop: 0, marginLeft: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="e">HBS Ag</InputLabel>
                                                            <Select
                                                                value={this.state.HBSAg}
                                                                onChange={this.handleChange('HBSAg')}
                                                            >
                                                                <MenuItem value="NEGATIVE">NEGATIVE</MenuItem>
                                                                <MenuItem value="POSETIVE">POSETIVE</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <FormControl style={{ width: 160, marginTop: 0, marginLeft: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="e">TB</InputLabel>
                                                            <Select
                                                                value={this.state.TB}
                                                                onChange={this.handleChange('TB')}
                                                            >
                                                                <MenuItem value="NEGATIVE">NEGATIVE</MenuItem>
                                                                <MenuItem value="POSETIVE">POSETIVE</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormControl style={{ width: 160, marginTop: 0, marginLeft: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="e">HIV STATUS</InputLabel>
                                                            <Select
                                                                value={this.state.HIVSTATUS}
                                                                onChange={this.handleChange('HIVSTATUS')}
                                                            >
                                                                <MenuItem value="NEGATIVE">NEGATIVE</MenuItem>
                                                                <MenuItem value="POSETIVE">POSETIVE</MenuItem>
                                                                <MenuItem value="UNKNOWN">UNKNOWN</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <TextField
                                                            id="standard-name"
                                                            label="HIV Duration"
                                                            className={classes.textField}
                                                            value={this.state.HIVDuration}
                                                            onChange={this.handleChange('HIVDuration')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 150, marginTop: 0 }}
                                                        />
                                                        <FormControl style={{ width: 160, marginTop: 0, marginLeft: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="e">On Art</InputLabel>
                                                            <Select
                                                                value={this.state.OnArt}
                                                                onChange={this.handleChange('OnArt')}
                                                            >
                                                                <MenuItem value="YES">YES</MenuItem>
                                                                <MenuItem value="NO">NO</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Mother Regimen"
                                                            className={classes.textField}
                                                            value={this.state.motherRegimen}
                                                            onChange={this.handleChange('motherRegimen')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 150, marginTop: 0, marginRight: 0 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Infant Regimen"
                                                            className={classes.textField}
                                                            value={this.state.infantRegimen}
                                                            onChange={this.handleChange('infantRegimen')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 150, marginTop: 0, marginRight: 0 }}
                                                        />
                                                        <FormControl style={{ width: 190, marginTop: 0, marginLeft: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="e">Infant Regimen Options</InputLabel>
                                                            <Select
                                                                value={this.state.infantRegimenOptions}
                                                                onChange={this.handleChange('infantRegimenOptions')}
                                                            >
                                                                <MenuItem value="YES">EBF</MenuItem>
                                                                <MenuItem value="NO">EFF</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Other Risk Factors"
                                                            className={classes.textField}
                                                            value={this.state.otherRiskFactors}
                                                            onChange={this.handleChange('otherRiskFactors')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 300, marginTop: 0, marginLeft: 0 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                    checked={this.state.checkeLMP}
                                                                    onChange={this.handleCheckedChange('checkeLMP')}
                                                                    value="checkeLMP"

                                                                />
                                                            }
                                                            style={{ marginLeft: 0 }}
                                                            labelPlacement="start"
                                                            label="LMP"
                                                        />
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                            <DatePicker
                                                                style={{ marginTop: 0, marginLeft: 30 }}
                                                                margin="normal"
                                                                label="Date picker"
                                                                value={this.state.LMP}
                                                                disabled={this.state.disableLMP}
                                                                onChange={(e) => this.handleDateChange(e,'LMP')}
                                                            />
                                                        </MuiPickersUtilsProvider>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormControl style={{ width: 190, marginTop: 0, marginLeft: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="e">Labor Onset</InputLabel>
                                                            <Select
                                                                value={this.state.laborOnset}
                                                                onChange={this.handleChange('laborOnset')}
                                                            >
                                                                <MenuItem value="SPONTANIUS">SPONTANIUS</MenuItem>
                                                                <MenuItem value="INDUCED">INDUCED</MenuItem>
                                                                <MenuItem value="PROM">PROM</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <FormControl style={{ width: 190, marginTop: 0, marginLeft: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="e">Chorioaminiontis</InputLabel>
                                                            <Select
                                                                value={this.state.chorioaminiontis}
                                                                onChange={this.handleChange('chorioaminiontis')}
                                                            >
                                                                <MenuItem value="YES">YES</MenuItem>
                                                                <MenuItem value="NO">NO</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Labor Duration"
                                                            className={classes.textField}
                                                            value={this.state.laborDuration}
                                                            onChange={this.handleChange('laborDuration')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 150, marginTop: 0, marginLeft: 0 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="ROM Duration"
                                                            className={classes.textField}
                                                            value={this.state.ROMDuration}
                                                            onChange={this.handleChange('ROMDuration')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 150, marginTop: 0, marginLeft: 0 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormControl style={{ width: 190, marginTop: 0, marginLeft: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="e">MSAF</InputLabel>
                                                            <Select
                                                                value={this.state.MSAF}
                                                                onChange={this.handleChange('MSAF')}
                                                            >
                                                                <MenuItem value="YES">YES</MenuItem>
                                                                <MenuItem value="NO">NO</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <FormControl style={{ width: 190, marginTop: 0, marginLeft: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="e">Thick Meconium</InputLabel>
                                                            <Select
                                                                value={this.state.thickMeconium}
                                                                onChange={this.handleChange('thickMeconium')}
                                                            >
                                                                <MenuItem value="YES">YES</MenuItem>
                                                                <MenuItem value="NO">NO</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Indication"
                                                            className={classes.textField}
                                                            value={this.state.indication}
                                                            onChange={this.handleChange('indication')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 300, marginTop: 0, marginLeft: 0 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormControl style={{ width: 180, marginTop: 0, marginLeft: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="e">Material Hypertension</InputLabel>
                                                            <Select
                                                                value={this.state.materialHypertension}
                                                                onChange={this.handleChange('materialHypertension')}
                                                            >
                                                                <MenuItem value="YES">YES</MenuItem>
                                                                <MenuItem value="NO">NO</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <FormControl style={{ width: 100, marginTop: 0, marginLeft: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="e">DM</InputLabel>
                                                            <Select
                                                                value={this.state.DM}
                                                                onChange={this.handleChange('DM')}
                                                            >
                                                                <MenuItem value="YES">YES</MenuItem>
                                                                <MenuItem value="NO">NO</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <FormControl style={{ width: 250, marginTop: 0, marginLeft: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="e">Hx of Foul Smelling Discharge</InputLabel>
                                                            <Select
                                                                value={this.state.HxofFoulSmellingDischarge}
                                                                onChange={this.handleChange('HxofFoulSmellingDischarge')}
                                                            >
                                                                <MenuItem value="YES">YES</MenuItem>
                                                                <MenuItem value="NO">NO</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Remark"
                                                            className={classes.textField}
                                                            value={this.state.motherremark}
                                                            onChange={this.handleChange('motherremark')}
                                                            margin="normal"
                                                            multiline
                                                            style={{ width: 500, marginTop: 0, marginLeft: 0 }}
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