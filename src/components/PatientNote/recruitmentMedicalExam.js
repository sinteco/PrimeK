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
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import qs from 'qs';
import FormGroup from '@material-ui/core/FormGroup';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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

const category = "Recruitment Medical Exam";

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
            hypertension: '',
            diabeticmellitus: '',
            Seizuredisorder: '',
            asthma: '',
            Psychariticillness:'',
            Allergies: '',
            Other: '',
            bps: '',
            bpd: '',
            pr: '',
            wt: '',
            ht: '',
            bmi: '',
            bloodgroup: '',
            visualacquityrt:'',
            visualacquitylt: '',
            hearinglt: '',
            hearingrt: '',
            Teeth: '',
            cardiovascular: '',
            textboxVisualacquityrt: '',
            textboxVisualacquitylt: '',
            textboxHearinglt: '',
            textboxHearingrt: '',
            textboxTeeth: '',
            textboxCardiovascular: '',
            respiratory: '',
            abdomen: '',
            musculoSkeletal: '',
            integumentary: '',
            mentalNeurological: '',
            textboxRespiratory: '',
            textboxAbdomen: '',
            textboxMusculoSkeletal: '',
            textboxIntegumentary: '',
            textboxMentalNeurological: '',
            sugar: '',
            albumin: '',
            pusCells: '',
            HCG: '',
            ovalParasites: '',
            bloodFilm: '',
            VDRL: '',
            hbsAg: '',
            antiHCVAb: '',
            HIV: '',
            WBC: '',
            HGB: '',
            ESR: '',
            FBS: '',
            SGPT: '',
            SGOT: '',
            ALKPH: '',
            BUN: '',
            CREA: '',
            comboboxWBC: '',
            comboboxHGB: '',
            comboboxESR: '',
            comboboxFBS: '',
            comboboxSGPT: '',
            comboboxSGOT: '',
            comboboxALKPH: '',
            comboboxBUN: '',
            comboboxCREA: '',
            EKG: '',
            chestXray: '',
            recommendation: '',
            fit: ''
        }
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
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
            Remark: null,
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
                                fullScreen={fullScreen}
                                maxWidth={'lg'}
                                open={this.state.newdialogopen}
                                onClose={this.handleClose}
                                aria-labelledby="responsive-dialog-title"
                            >
                                <DialogTitle id="responsive-dialog-title">{"New " + category}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        <form>
                                        <FormControl component="fieldset" className={classes.formControl}>
                                            <FormLabel component="legend">Illness History</FormLabel>
                                            <FormGroup row>
                                            <RadioGroup
                                                aria-label="Gender"
                                                name="gender1"
                                                className={classes.group}
                                                style={{padding: '0 10px 10px 10px'}}
                                                value={this.state.hypertension}
                                                onChange={this.handleChange('hypertension')}
                                            >
                                                <FormLabel>Hypertension</FormLabel>
                                                <FormControlLabel labelPlacement="start" value="Yes" control={<Radio />} label="Yes" />
                                                <FormControlLabel labelPlacement="start" value="No" control={<Radio />} label="No" />
                                            </RadioGroup>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <RadioGroup
                                                aria-label="Gender"
                                                name="gender1"
                                                className={classes.group}
                                                style={{padding: '0 10px 10px 10px'}}
                                                value={this.state.diabeticmellitus}
                                                onChange={this.handleChange('diabeticmellitus')}
                                            >   
                                                <FormLabel>Diabetis Mellitus</FormLabel>
                                                <FormControlLabel labelPlacement="start" value="Yes" control={<Radio />} label="Yes" />
                                                <FormControlLabel labelPlacement="start" value="No" control={<Radio />} label="No" />
                                            </RadioGroup>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <RadioGroup
                                                aria-label="Gender"
                                                name="gender1"
                                                className={classes.group}
                                                style={{padding: '0 10px 10px 10px'}}
                                                value={this.state.Seizuredisorder}
                                                onChange={this.handleChange('Seizuredisorder')}
                                            >   <FormLabel>Seizure Disorder</FormLabel>
                                                <FormControlLabel labelPlacement="start" value="Yes" control={<Radio />} label="Yes" />
                                                <FormControlLabel labelPlacement="start" value="No" control={<Radio />} label="No" />
                                            </RadioGroup>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <RadioGroup
                                                aria-label="Gender"
                                                name="gender1"
                                                className={classes.group}
                                                style={{padding: '0 10px 10px 10px'}}
                                                value={this.state.Psychariticillness}
                                                onChange={this.handleChange('Psychariticillness')}
                                            >   <FormLabel>Psycharitic illness</FormLabel>
                                                <FormControlLabel labelPlacement="start" value="Yes" control={<Radio />} label="Yes" />
                                                <FormControlLabel labelPlacement="start" value="No" control={<Radio />} label="No" />
                                            </RadioGroup>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <RadioGroup
                                                aria-label="Gender"
                                                name="gender1"
                                                className={classes.group}
                                                style={{padding: '0 10px 10px 10px'}}
                                                value={this.state.Allergies}
                                                onChange={this.handleChange('Allergies')}
                                            >
                                                <FormLabel>Allergies</FormLabel>
                                                <FormControlLabel labelPlacement="start" value="Yes" control={<Radio />} label="Yes" />
                                                <FormControlLabel labelPlacement="start" value="No" control={<Radio />} label="No" />
                                            </RadioGroup>
                                            <TextField
                                                id="standard-name"
                                                label="Other"
                                                className={classes.textField}
                                                value={this.state.Other}
                                                onChange={this.handleChange('Other')}
                                                margin="normal"
                                                style={{padding: '0 10px 10px 10px'}}
                                                />
                                            </FormGroup>
                                            <FormGroup row>
                                            <FormLabel component="legend">Vital Sign</FormLabel>
                                                <TextField
                                                    id="standard-name"
                                                    label="BP(S)"
                                                    className={classes.textField}
                                                    value={this.state.bps}
                                                    onChange={this.handleChange('bps')}
                                                    margin="normal"
                                                    style = {{width: 100}}
                                                    />
                                                <TextField
                                                    id="standard-name"
                                                    label="BP(D)"
                                                    className={classes.textField}
                                                    value={this.state.bpd}
                                                    onChange={this.handleChange('bpd')}
                                                    margin="normal"
                                                    style = {{width: 100}}
                                                    />
                                                <TextField
                                                    id="standard-name"
                                                    label="PR"
                                                    className={classes.textField}
                                                    value={this.state.pr}
                                                    onChange={this.handleChange('pr')}
                                                    margin="normal"
                                                    style = {{width: 100}}
                                                    />
                                                <TextField
                                                    id="standard-name"
                                                    label="Wt"
                                                    className={classes.textField}
                                                    value={this.state.wt}
                                                    onChange={this.handleChange('wt')}
                                                    margin="normal"
                                                    style = {{width: 100}}
                                                    />
                                                <TextField
                                                    id="standard-name"
                                                    label="Ht"
                                                    className={classes.textField}
                                                    value={this.state.ht}
                                                    onChange={this.handleChange('ht')}
                                                    margin="normal"
                                                    style = {{width: 100}}
                                                    />
                                                <TextField
                                                    id="standard-name"
                                                    label="BMI"
                                                    className={classes.textField}
                                                    value={this.state.bmi}
                                                    onChange={this.handleChange('bmi')}
                                                    margin="normal"
                                                    style = {{ width: 100 }}
                                                    />
                                                <FormControl style = {{ width: 105, marginTop: 16, marginLeft: 0 }} className={classes.formControl}>
                                                    <InputLabel htmlFor="blood group">Blood Group</InputLabel>
                                                    <Select
                                                        value={this.state.bloodgroup}
                                                        onChange={this.handleChange('bloodgroup')}
                                                    >
                                                        <MenuItem value=""><em>None</em></MenuItem>
                                                        <MenuItem value="A+">A+</MenuItem>
                                                        <MenuItem value="A-">A-</MenuItem>
                                                        <MenuItem value="B+">B+</MenuItem>
                                                        <MenuItem value="B-">B-</MenuItem>
                                                        <MenuItem value="O+">O+</MenuItem>
                                                        <MenuItem value="O-">O-</MenuItem>
                                                        <MenuItem value="AB+">AB+</MenuItem>
                                                        <MenuItem value="AB-">AB-</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormLabel component="legend">System Review</FormLabel>
                                                <FormGroup row>
                                                    <FormGroup row>
                                                        <FormControl style={{ width: 140, marginTop: 0, marginRight: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="visual acquity rt">Visual Acquity Rt</InputLabel>
                                                            <Select
                                                                value={this.state.visualacquityrt}
                                                                onChange={this.handleChange('visualacquityrt')}
                                                            >
                                                                <MenuItem value="Normal">Normal</MenuItem>
                                                                <MenuItem value="Abnormal">Abnormal</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <TextField
                                                            id="standard-name"
                                                            // label="BMI"
                                                            className={classes.textField}
                                                            value={this.state.textboxVisualacquityrt}
                                                            onChange={this.handleChange('textboxVisualacquityrt')}
                                                            margin="normal"
                                                            style={{ width: 100 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormControl style={{ width: 140, marginTop: 0, marginRight: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="visual acquity rt">Visual Acquity Lt</InputLabel>
                                                            <Select
                                                                value={this.state.visualacquitylt}
                                                                onChange={this.handleChange('visualacquitylt')}
                                                            >
                                                                <MenuItem value="Normal">Normal</MenuItem>
                                                                <MenuItem value="Abnormal">Abnormal</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <TextField
                                                            id="standard-name"
                                                            // label="BMI"
                                                            className={classes.textField}
                                                            value={this.state.textboxVisualacquitylt}
                                                            onChange={this.handleChange('textboxVisualacquitylt')}
                                                            margin="normal"
                                                            style={{ width: 100 }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormControl style={{ width: 140, marginTop: 0, marginRight: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="visual acquity rt">Hearing Lt</InputLabel>
                                                            <Select
                                                                value={this.state.hearinglt}
                                                                onChange={this.handleChange('hearingrt')}
                                                            >
                                                                <MenuItem value="Normal">Normal</MenuItem>
                                                                <MenuItem value="Abnormal">Abnormal</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <TextField
                                                            id="standard-name"
                                                            // label="BMI"
                                                            className={classes.textField}
                                                            value={this.state.textboxHearinglt}
                                                            onChange={this.handleChange('textboxHearingrt')}
                                                            margin="normal"
                                                            style = {{width: 100}}
                                                            />
                                                </FormGroup>
                                                </FormGroup>
                                                <FormGroup row>
                                                <FormGroup row>
                                                    <FormControl style={{ width: 140, marginTop: 0, marginRight: 0 }} className={classes.formControl}>
                                                        <InputLabel htmlFor="visual acquity rt">Hearing Rt</InputLabel>
                                                        <Select
                                                            value={this.state.hearingrt}
                                                            onChange={this.handleChange('hearingrt')}
                                                        >
                                                            <MenuItem value="Normal">Normal</MenuItem>
                                                            <MenuItem value="Abnormal">Abnormal</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    <TextField
                                                        id="standard-name"
                                                        // label="BMI"
                                                        className={classes.textField}
                                                        value={this.state.textboxHearingrt}
                                                        onChange={this.handleChange('name')}
                                                        margin="normal"
                                                        style = {{width: 100}}
                                                        />
                                                </FormGroup>
                                                <FormGroup row>
                                                    <FormControl style={{ width: 140, marginTop: 0, marginRight: 0 }} className={classes.formControl}>
                                                        <InputLabel htmlFor="visual acquity rt">Teeth</InputLabel>
                                                        <Select
                                                            value={this.state.Teeth}
                                                            onChange={this.handleChange('Teeth')}
                                                        >
                                                            <MenuItem value="Normal">Normal</MenuItem>
                                                            <MenuItem value="Abnormal">Abnormal</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    <TextField
                                                        id="standard-name"
                                                        // label="BMI"
                                                        className={classes.textField}
                                                        value={this.state.textboxTeeth}
                                                        onChange={this.handleChange('textboxTeeth')}
                                                        margin="normal"
                                                        style = {{width: 100}}
                                                        />
                                                </FormGroup>
                                                <FormGroup row>
                                                    <FormControl style={{ width: 140, marginTop: 0, marginRight: 0 }} className={classes.formControl}>
                                                        <InputLabel htmlFor="visual acquity rt">CardioVascular</InputLabel>
                                                        <Select
                                                            value={this.state.cardiovascular}
                                                            onChange={this.handleChange('cardiovascular')}
                                                        >
                                                            <MenuItem value="Normal">Normal</MenuItem>
                                                            <MenuItem value="Abnormal">Abnormal</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    <TextField
                                                        id="standard-name"
                                                        // label="BMI"
                                                        className={classes.textField}
                                                        value={this.state.textboxCardiovascular}
                                                        onChange={this.handleChange('textboxCardiovascular')}
                                                        margin="normal"
                                                        style = {{width: 100}}
                                                        />
                                                </FormGroup>
                                                </FormGroup>
                                                <FormGroup row>
                                                <FormGroup row>
                                                    <FormControl style={{ width: 140, marginTop: 0, marginRight: 0 }} className={classes.formControl}>
                                                        <InputLabel htmlFor="visual acquity rt">Respiratory</InputLabel>
                                                        <Select
                                                            value={this.state.respiratory}
                                                            onChange={this.handleChange('respiratory')}
                                                        >
                                                            <MenuItem value="Normal">Normal</MenuItem>
                                                            <MenuItem value="Abnormal">Abnormal</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    <TextField
                                                        id="standard-name"
                                                        // label="BMI"
                                                        className={classes.textField}
                                                        value={this.state.textboxRespiratory}
                                                        onChange={this.handleChange('textboxRespiratory')}
                                                        margin="normal"
                                                        style = {{width: 100}}
                                                        />
                                                </FormGroup>
                                                <FormGroup row>
                                                    <FormControl style={{ width: 140, marginTop: 0, marginRight: 0 }} className={classes.formControl}>
                                                        <InputLabel htmlFor="visual acquity rt">Abdomen</InputLabel>
                                                        <Select
                                                            value={this.state.abdomen}
                                                            onChange={this.handleChange('abdomen')}
                                                        >
                                                            <MenuItem value="Normal">Normal</MenuItem>
                                                            <MenuItem value="Abnormal">Abnormal</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    <TextField
                                                        id="standard-name"
                                                        // label="BMI"
                                                        className={classes.textField}
                                                        value={this.state.textboxAbdomen}
                                                        onChange={this.handleChange('textboxAbdomen')}
                                                        margin="normal"
                                                        style = {{width: 100}}
                                                        />
                                                </FormGroup>
                                                <FormGroup row>
                                                    <FormControl style={{ width: 140, marginTop: 0, marginRight: 0 }} className={classes.formControl}>
                                                        <InputLabel htmlFor="visual acquity rt">Musculo Skeletal</InputLabel>
                                                        <Select
                                                            value={this.state.musculoSkeletal}
                                                            onChange={this.handleChange('musculoSkeletal')}
                                                        >
                                                            <MenuItem value="Normal">Normal</MenuItem>
                                                            <MenuItem value="Abnormal">Abnormal</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    <TextField
                                                        id="standard-name"
                                                        // label="BMI"
                                                        className={classes.textField}
                                                        value={this.state.textboxMusculoSkeletal}
                                                        onChange={this.handleChange('textboxMusculoSkeletal')}
                                                        margin="normal"
                                                        style = {{width: 100}}
                                                        />
                                                </FormGroup>
                                                </FormGroup>
                                                <FormGroup row>
                                                <FormGroup row>
                                                    <FormControl style={{ width: 140, marginTop: 0, marginRight: 0 }} className={classes.formControl}>
                                                        <InputLabel htmlFor="visual acquity rt">lntegumentary</InputLabel>
                                                        <Select
                                                            value={this.state.integumentary}
                                                            onChange={this.handleChange('integumentary')}
                                                        >
                                                            <MenuItem value="Normal">Normal</MenuItem>
                                                            <MenuItem value="Abnormal">Abnormal</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    <TextField
                                                        id="standard-name"
                                                        // label="BMI"
                                                        className={classes.textField}
                                                        value={this.state.textboxIntegumentary}
                                                        onChange={this.handleChange('textboxIntegumentary')}
                                                        margin="normal"
                                                        style = {{width: 100}}
                                                        />
                                                </FormGroup>
                                                <FormGroup row>
                                                    <FormControl style={{ width: 180, marginTop: 0, marginRight: 0 }} className={classes.formControl}>
                                                        <InputLabel htmlFor="visual acquity rt">Mental Neurological</InputLabel>
                                                        <Select
                                                            value={this.state.mentalNeurological}
                                                            onChange={this.handleChange('mentalNeurological')}
                                                        >
                                                            <MenuItem value="Normal">Normal</MenuItem>
                                                            <MenuItem value="Abnormal">Abnormal</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    <TextField
                                                        id="standard-name"
                                                        // label="BMI"
                                                        className={classes.textField}
                                                        value={this.state.textboxMentalNeurological}
                                                        onChange={this.handleChange('textboxMentalNeurological')}
                                                        margin="normal"
                                                        style = {{width: 100}}
                                                        />
                                                </FormGroup>
                                                </FormGroup>
                                            </FormGroup>
                                                <FormGroup>
                                                    <FormLabel component="legend">Labratory Examination</FormLabel>
                                                    <FormGroup row>
                                                    <FormGroup row>
                                                        <FormControl style={{ width: 180, marginTop: 0, marginRight: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="sugar">Sugar</InputLabel>
                                                            <Select
                                                                value={this.state.sugar}
                                                                onChange={this.handleChange('sugar')}
                                                            >   
                                                                <MenuItem value=""><em>None</em></MenuItem>
                                                                <MenuItem value="Posetive">Posetive</MenuItem>
                                                                <MenuItem value="Negative">Negative</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="WBC"
                                                            className={classes.textField}
                                                            value={this.state.WBC}
                                                            onChange={this.handleChange('WBC')}
                                                            margin="normal"
                                                            style={{ width: 100,marginLeft: 20, marginTop: 0, }}
                                                        />
                                                        <FormControl style={{ width: 140, marginTop: 16, marginLeft: 0 }} className={classes.formControl}>
                                                            {/* <InputLabel htmlFor="visual acquity rt">WBC</InputLabel> */}
                                                            <Select
                                                                value={this.state.comboboxWBC}
                                                                onChange={this.handleChange('comboboxWBC')}
                                                            >
                                                                <MenuItem value="Normal">Normal</MenuItem>
                                                                <MenuItem value="Abnormal">Abnormal</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </FormGroup>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormGroup row>
                                                            <FormControl style={{ width: 180, marginTop: 0, marginRight: 0 }} className={classes.formControl}>
                                                                <InputLabel htmlFor="sugar">Albumin</InputLabel>
                                                                <Select
                                                                    value={this.state.albumin}
                                                                    onChange={this.handleChange('albumin')}
                                                                >
                                                                    <MenuItem value=""><em>None</em></MenuItem>
                                                                    <MenuItem value="Posetive">Posetive</MenuItem>
                                                                    <MenuItem value="Negative">Negative</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <TextField
                                                                id="standard-name"
                                                                label="HGB"
                                                                className={classes.textField}
                                                                value={this.state.HGB}
                                                                onChange={this.handleChange('HGB')}
                                                                margin="normal"
                                                                style={{ width: 100, marginLeft: 20, marginTop: 0, }}
                                                            />
                                                            <FormControl style={{ width: 140, marginTop: 16, marginLeft: 0 }} className={classes.formControl}>
                                                                {/* <InputLabel htmlFor="visual acquity rt">WBC</InputLabel> */}
                                                                <Select
                                                                    value={this.state.comboboxHGB}
                                                                    onChange={this.handleChange('comboboxHGB')}
                                                                >
                                                                    <MenuItem value="Normal">Normal</MenuItem>
                                                                    <MenuItem value="Abnormal">Abnormal</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </FormGroup>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormGroup row>
                                                            <FormControl style={{ width: 180, marginTop: 0, marginRight: 0 }} className={classes.formControl}>
                                                                <InputLabel htmlFor="sugar">Pus Cells</InputLabel>
                                                                <Select
                                                                    value={this.state.pusCells}
                                                                    onChange={this.handleChange('pusCells')}
                                                                >
                                                                    <MenuItem value=""><em>None</em></MenuItem>
                                                                    <MenuItem value="Posetive">Posetive</MenuItem>
                                                                    <MenuItem value="Negative">Negative</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <TextField
                                                                id="standard-name"
                                                                label="ESR"
                                                                className={classes.textField}
                                                                value={this.state.ESR}
                                                                onChange={this.handleChange('ESR')}
                                                                margin="normal"
                                                                style={{ width: 100, marginLeft: 20, marginTop: 0, }}
                                                            />
                                                            <FormControl style={{ width: 140, marginTop: 16, marginLeft: 0 }} className={classes.formControl}>
                                                                {/* <InputLabel htmlFor="visual acquity rt">WBC</InputLabel> */}
                                                                <Select
                                                                    value={this.state.comboboxESR}
                                                                    onChange={this.handleChange('comboboxESR')}
                                                                >
                                                                    <MenuItem value="Normal">Normal</MenuItem>
                                                                    <MenuItem value="Abnormal">Abnormal</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </FormGroup>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormGroup row>
                                                            <FormGroup row>
                                                                <FormControl style={{ width: 180, marginTop: 0, marginRight: 0 }} className={classes.formControl}>
                                                                    <InputLabel htmlFor="sugar">HCG</InputLabel>
                                                                    <Select
                                                                        value={this.state.HCG}
                                                                        onChange={this.handleChange('HCG')}
                                                                    >
                                                                        <MenuItem value=""><em>None</em></MenuItem>
                                                                        <MenuItem value="Posetive">Posetive</MenuItem>
                                                                        <MenuItem value="Negative">Negative</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </FormGroup>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <TextField
                                                                id="standard-name"
                                                                label="FBS"
                                                                className={classes.textField}
                                                                value={this.state.FBS}
                                                                onChange={this.handleChange('FBS')}
                                                                margin="normal"
                                                                style={{ width: 100, marginLeft: 20, marginTop: 0, }}
                                                            />
                                                            <FormControl style={{ width: 140, marginTop: 16, marginLeft: 0 }} className={classes.formControl}>
                                                                {/* <InputLabel htmlFor="visual acquity rt">WBC</InputLabel> */}
                                                                <Select
                                                                    value={this.state.comboboxFBS}
                                                                    onChange={this.handleChange('comboboxFBS')}
                                                                >
                                                                    <MenuItem value="Normal">Normal</MenuItem>
                                                                    <MenuItem value="Abnormal">Abnormal</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </FormGroup>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormGroup row>
                                                            <FormControl style={{ width: 180, marginTop: 0, marginRight: 0 }} className={classes.formControl}>
                                                                <InputLabel htmlFor="sugar">Stool Oval/Parasites</InputLabel>
                                                                <Select
                                                                    value={this.state.ovalParasites}
                                                                    onChange={this.handleChange('ovalParasites')}
                                                                >
                                                                    <MenuItem value=""><em>None</em></MenuItem>
                                                                    <MenuItem value='Posetive'>Posetive</MenuItem>
                                                                    <MenuItem value="Negative">Negative</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <TextField
                                                                id="standard-name"
                                                                label="SGPT"
                                                                className={classes.textField}
                                                                value={this.state.SGOT}
                                                                onChange={this.handleChange('SGOT')}
                                                                margin="normal"
                                                                style={{ width: 100, marginLeft: 20, marginTop: 0, }}
                                                            />
                                                            <FormControl style={{ width: 140, marginTop: 16, marginLeft: 0 }} className={classes.formControl}>
                                                                {/* <InputLabel htmlFor="visual acquity rt">WBC</InputLabel> */}
                                                                <Select
                                                                    value={this.state.comboboxSGOT}
                                                                    onChange={this.handleChange('comboboxSGOT')}
                                                                >
                                                                    <MenuItem value="Normal">Normal</MenuItem>
                                                                    <MenuItem value="Abnormal">Abnormal</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </FormGroup>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormGroup row>
                                                            <FormControl style={{ width: 180, marginTop: 0, marginRight: 0 }} className={classes.formControl}>
                                                                <InputLabel htmlFor="sugar">Blood Blood/Film</InputLabel>
                                                                <Select
                                                                    value={this.state.bloodFilm}
                                                                    onChange={this.handleChange('bloodFilm')}
                                                                >
                                                                    <MenuItem value=""><em>None</em></MenuItem>
                                                                    <MenuItem value="Posetive">Posetive</MenuItem>
                                                                    <MenuItem value="Negative">Negative</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <TextField
                                                                id="standard-name"
                                                                label="SGOT"
                                                                className={classes.textField}
                                                                value={this.state.SGOT}
                                                                onChange={this.handleChange('SGOT')}
                                                                margin="normal"
                                                                style={{ width: 100, marginLeft: 20, marginTop: 0, }}
                                                            />
                                                            <FormControl style={{ width: 140, marginTop: 16, marginLeft: 0 }} className={classes.formControl}>
                                                                {/* <InputLabel htmlFor="visual acquity rt">WBC</InputLabel> */}
                                                                <Select
                                                                    value={this.state.comboboxSGOT}
                                                                    onChange={this.handleChange('comboboxSGOT')}
                                                                >
                                                                    <MenuItem value="Normal">Normal</MenuItem>
                                                                    <MenuItem value="Abnormal">Abnormal</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </FormGroup>   
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormGroup row>
                                                            <FormControl style={{ width: 180, marginTop: 0, marginRight: 0 }} className={classes.formControl}>
                                                                <InputLabel htmlFor="sugar">VDRL</InputLabel>
                                                                <Select
                                                                    value={this.state.VDRL}
                                                                    onChange={this.handleChange('VDRL')}
                                                                >
                                                                    <MenuItem value=""><em>None</em></MenuItem>
                                                                    <MenuItem value="Posetive">Posetive</MenuItem>
                                                                    <MenuItem value="Negative">Negative</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <TextField
                                                                id="standard-name"
                                                                label="ALK.Ph"
                                                                className={classes.textField}
                                                                value={this.state.ALKPH}
                                                                onChange={this.handleChange('ALKPH')}
                                                                margin="normal"
                                                                style={{ width: 100, marginLeft: 20, marginTop: 0, }}
                                                            />
                                                            <FormControl style={{ width: 140, marginTop: 16, marginLeft: 0 }} className={classes.formControl}>
                                                                {/* <InputLabel htmlFor="visual acquity rt">WBC</InputLabel> */}
                                                                <Select
                                                                    value={this.state.comboboxALKPH}
                                                                    onChange={this.handleChange('comboboxALKPH')}
                                                                >
                                                                    <MenuItem value="Normal">Normal</MenuItem>
                                                                    <MenuItem value="Abnormal">Abnormal</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </FormGroup>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormGroup row>
                                                            <FormControl style={{ width: 180, marginTop: 0, marginRight: 0 }} className={classes.formControl}>
                                                                <InputLabel htmlFor="sugar">HBsAg</InputLabel>
                                                                <Select
                                                                    value={this.state.hbsAg}
                                                                    onChange={this.handleChange('hbsAg')}
                                                                >
                                                                    <MenuItem value=""><em>None</em></MenuItem>
                                                                    <MenuItem value="Posetive">Posetive</MenuItem>
                                                                    <MenuItem value="Negative">Negative</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <TextField
                                                                id="standard-name"
                                                                label="BUN"
                                                                className={classes.textField}
                                                                value={this.state.BUN}
                                                                onChange={this.handleChange('BUN')}
                                                                margin="normal"
                                                                style={{ width: 100, marginLeft: 20, marginTop: 0, }}
                                                            />
                                                            <FormControl style={{ width: 140, marginTop: 16, marginLeft: 0 }} className={classes.formControl}>
                                                                {/* <InputLabel htmlFor="visual acquity rt">WBC</InputLabel> */}
                                                                <Select
                                                                    value={this.state.comboboxBUN}
                                                                    onChange={this.handleChange('comboboxBUN')}
                                                                >
                                                                    <MenuItem value="Normal">Normal</MenuItem>
                                                                    <MenuItem value="Abnormal">Abnormal</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </FormGroup>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormGroup row>
                                                            <FormControl style={{ width: 180, marginTop: 0, marginRight: 0 }} className={classes.formControl}>
                                                                <InputLabel htmlFor="sugar">Anti HCV Ab</InputLabel>
                                                                <Select
                                                                    value={this.state.antiHCVAb}
                                                                    onChange={this.handleChange('antiHCVAb')}
                                                                >
                                                                    <MenuItem value=""><em>None</em></MenuItem>
                                                                    <MenuItem value="Posetive">Posetive</MenuItem>
                                                                    <MenuItem value="Negative">Negative</MenuItem>
                                                                </Select>
                                                        </FormControl>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <TextField
                                                                id="standard-name"
                                                                label="CRA"
                                                                className={classes.textField}
                                                                value={this.state.CREA}
                                                                onChange={this.handleChange('CREA')}
                                                                margin="normal"
                                                                style={{ width: 100, marginLeft: 20, marginTop: 0, }}
                                                            />
                                                            <FormControl style={{ width: 140, marginTop: 16, marginLeft: 0 }} className={classes.formControl}>
                                                                {/* <InputLabel htmlFor="visual acquity rt">WBC</InputLabel> */}
                                                                <Select
                                                                    value={this.state.comboboxCREA}
                                                                    onChange={this.handleChange('comboboxCREA')}
                                                                >
                                                                    <MenuItem value="Normal">Normal</MenuItem>
                                                                    <MenuItem value="Abnormal">Abnormal</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </FormGroup>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormControl style={{ width: 180, marginTop: 0, marginRight: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="sugar">HIV</InputLabel>
                                                            <Select
                                                                value={this.state.HIV}
                                                                onChange={this.handleChange('HIV')}
                                                            >
                                                                <MenuItem value=""><em>None</em></MenuItem>
                                                                <MenuItem value="Posetive">Posetive</MenuItem>
                                                                <MenuItem value="Negative">Negative</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <FormLabel component="legend">Imaging Studies</FormLabel>
                                                        <FormGroup row>
                                                            <FormControl style={{ width: 180, marginTop: 0, marginRight: 0 }} className={classes.formControl}>
                                                                <InputLabel htmlFor="sugar">EGK</InputLabel>
                                                                <Select
                                                                    value={this.state.EKG}
                                                                    onChange={this.handleChange('EKG')}
                                                                >
                                                                    <MenuItem value=""><em>None</em></MenuItem>
                                                                    <MenuItem value="Normal">Normal</MenuItem>
                                                                    <MenuItem value="Abnormal">Abnormal</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                            <FormControl style={{ width: 180, marginTop: 0, marginRight: 0 }} className={classes.formControl}>
                                                                <InputLabel htmlFor="sugar">Chest X-ray</InputLabel>
                                                                <Select
                                                                    value={this.state.chestXray}
                                                                    onChange={this.handleChange('chestXray')}
                                                                >
                                                                    <MenuItem value=""><em>None</em></MenuItem>
                                                                    <MenuItem value="Normal">Normal</MenuItem>
                                                                    <MenuItem value="Abnormal">Abnormal</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <TextField
                                                                id="standard-multiline-flexible"
                                                                label="Recommendation"
                                                                multiline
                                                                rowsMax="4"
                                                                value={this.state.recommendation}
                                                                onChange={this.handleChange('recommendation')}
                                                                className={classes.textField}
                                                                margin="normal"
                                                                style={{ width: 500}}
                                                            />
                                                            <RadioGroup
                                                                row
                                                                aria-label="Gender"
                                                                name="gender1"
                                                                className={classes.group}
                                                                style={{marginLeft: -11}}
                                                                // style={{ padding: '0 10px 10px 10px' }}
                                                                value={this.state.fit}
                                                                onChange={this.handleChange('fit')}
                                                            >
                                                                <FormControlLabel labelPlacement="start" value="Yes" control={<Radio />} label="Fit" />
                                                                <FormControlLabel labelPlacement="start" value="No" control={<Radio />} label="NotFit" />
                                                            </RadioGroup>
                                                        </FormGroup>
                                                    </FormGroup>
                                                </FormGroup>
                                        </FormControl>
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