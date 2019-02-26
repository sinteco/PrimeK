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
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
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
    },
    group1: {
        width: 'auto',
        height: 'auto',
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
    }
};

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
            rows: []
        }
    }
    tabhandleChange = (event, value) => {
        this.setState({ value });
    };
    handleChange = (key, name) => event => {
        let forms = [...this.state.forms];
        forms[key] = event.target.value;
        this.setState({ forms }, function () {
            console.log(this.state.forms);
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
                                                            tableData={[['Mother']]}
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
                                                            // value={this.state.name}
                                                            // onChange={this.handleChange('name')}
                                                            margin="normal"
                                                            style={{ width: 100 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="Prada"
                                                            className={classes.textField}
                                                            // value={this.state.name}
                                                            // onChange={this.handleChange('name')}
                                                            margin="normal"
                                                            style={{ width: 100 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="Abortion"
                                                            className={classes.textField}
                                                            // value={this.state.name}
                                                            // onChange={this.handleChange('name')}
                                                            margin="normal"
                                                            style={{ width: 100 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="No of childeren alive now"
                                                            className={classes.textField}
                                                            // value={this.state.name}
                                                            // onChange={this.handleChange('name')}
                                                            margin="normal"
                                                            style={{ width: 200 }}
                                                        />
                                                        <TextField
                                                            id="standard-name"
                                                            label="Ectopic"
                                                            className={classes.textField}
                                                            // value={this.state.name}
                                                            // onChange={this.handleChange('name')}
                                                            margin="normal"
                                                            style={{ width: 150 }}
                                                        />
                                                        <CoreTable className={classes.table}>
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell align="right">Calories</TableCell>
                                                                    <TableCell align="right">Fat (g)</TableCell>
                                                                    <TableCell align="right">Carbs (g)</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {this.state.rows.map(row => (
                                                                    <TableRow key={row.id}>
                                                                        <TableCell align="right">{row.calories}</TableCell>
                                                                        <TableCell align="right">{row.fat}</TableCell>
                                                                        <TableCell align="right">{row.carbs}</TableCell>
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
                                                                    // checked={this.state.checkedB}
                                                                    // onChange={this.handleChange('checkedB')}
                                                                    value="checkedB"
                                                                    color="primary"
                                                                />
                                                            }
                                                            style={{ marginLeft: 0 }}
                                                            labelPlacement="start"
                                                            label="LMP"
                                                        />
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                            <DatePicker
                                                                style={{ marginTop: 0, marginLeft: 20 }}
                                                                margin="normal"
                                                                label="Unknowen"
                                                                // value={selectedDate}
                                                                // onChange={this.handleDateChange}
                                                            />
                                                        </MuiPickersUtilsProvider>
                                                        <TextField
                                                            id="standard-name"
                                                            label="EDD"
                                                            className={classes.textField}
                                                            // value={this.state.name}
                                                            // onChange={this.handleChange('name')}
                                                            margin="normal"
                                                            style={{ width: 100, marginTop: 0, marginLeft: 0 }}
                                                        />
                                                        <FormControl style={{ width: 150, marginTop: 0, marginLeft: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="e">Menstrual Cycle</InputLabel>
                                                            <Select
                                                            // value={this.state.integumentary}
                                                            // onChange={this.handleChange('integumentary')}
                                                            >
                                                                <MenuItem value="Regular">Regular</MenuItem>
                                                                <MenuItem value="Iregular">Iregular</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        {/* <FormLabel component="legend">Family Planning</FormLabel> */}
                                                        <FormGroup row>
                                                            <RadioGroup
                                                                aria-label="FP Conseled"
                                                                name="FP Conseled"
                                                                className={classes.group}
                                                                // style={{ marginLeft: 0, marginTop: 0, padding: '0 10px 10px 10px' }}
                                                                value={this.state.hypertension}
                                                                onChange={this.handleChange('hypertension')}
                                                            >
                                                                <FormLabel>FP Conseled</FormLabel>
                                                                <FormControlLabel labelPlacement="start" value="Yes" control={<Radio />} label="Yes" />
                                                                <FormControlLabel labelPlacement="start" value="No" control={<Radio />} label="No" />
                                                            </RadioGroup>
                                                            <FormControl style={{ width: 150, marginTop: 0, marginLeft: 10 }} className={classes.formControl}>
                                                                <InputLabel htmlFor="visual acquity rt">Method Of Choice</InputLabel>
                                                                <Select
                                                                    value={this.state.visualacquityrt}
                                                                    onChange={this.handleChange('visualacquityrt')}
                                                                >
                                                                    <MenuItem value="Condom">Condom</MenuItem>
                                                                    <MenuItem value="Captive pill">Captive pill</MenuItem>
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
                                                                // value={this.state.name}
                                                                // onChange={this.handleChange('name')}
                                                                margin="normal"
                                                                style={{ width: 180, marginTop: 0, marginLeft: 0 }}
                                                            />
                                                            <FormGroup row>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            // checked={this.state.checkedB}
                                                                            // onChange={this.handleChange('checkedB')}
                                                                            value="checkedB"
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    style={{ marginLeft: 0 }}
                                                                    labelPlacement="start"
                                                                    label="Pallor"
                                                                />
                                                                <TextField
                                                                    id="standard-name"
                                                                    // label="Height (below 150cm)"
                                                                    className={classes.textField}
                                                                    // value={this.state.name}
                                                                    // onChange={this.handleChange('name')}
                                                                    margin="normal"
                                                                    style={{ width: 180, marginTop: 0, marginLeft: 10 }}
                                                                />
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            // checked={this.state.checkedB}
                                                                            // onChange={this.handleChange('checkedB')}
                                                                            value="checkedB"
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    style={{ marginLeft: 0 }}
                                                                    labelPlacement="start"
                                                                    label="Jaundice"
                                                                />
                                                                <TextField
                                                                    id="standard-name"
                                                                    // label="Height (below 150cm)"
                                                                    className={classes.textField}
                                                                    // value={this.state.name}
                                                                    // onChange={this.handleChange('name')}
                                                                    margin="normal"
                                                                    style={{ width: 180, marginTop: 0, marginLeft: 10 }}
                                                                />
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            // checked={this.state.checkedB}
                                                                            // onChange={this.handleChange('checkedB')}
                                                                            value="checkedB"
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    style={{ marginLeft: 0 }}
                                                                    labelPlacement="start"
                                                                    label="Chest Abnormality"
                                                                />
                                                                <TextField
                                                                    id="standard-name"
                                                                    // label="Height (below 150cm)"
                                                                    className={classes.textField}
                                                                    // value={this.state.name}
                                                                    // onChange={this.handleChange('name')}
                                                                    margin="normal"
                                                                    style={{ width: 180, marginTop: 0, marginLeft: 10 }}
                                                                />
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            // checked={this.state.checkedB}
                                                                            // onChange={this.handleChange('checkedB')}
                                                                            value="checkedB"
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    style={{ marginLeft: 0 }}
                                                                    labelPlacement="start"
                                                                    label="Heart Abnormality"
                                                                />
                                                                <TextField
                                                                    id="standard-name"
                                                                    // label="Height (below 150cm)"
                                                                    className={classes.textField}
                                                                    // value={this.state.name}
                                                                    // onChange={this.handleChange('name')}
                                                                    margin="normal"
                                                                    style={{ width: 180, marginTop: 0, marginLeft: 10 }}
                                                                />
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            // checked={this.state.checkedB}
                                                                            // onChange={this.handleChange('checkedB')}
                                                                            value="checkedB"
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    style={{ marginLeft: 0 }}
                                                                    labelPlacement="start"
                                                                    label="Breast Exam"
                                                                />
                                                                <TextField
                                                                    id="standard-name"
                                                                    // label="Height (below 150cm)"
                                                                    className={classes.textField}
                                                                    // value={this.state.name}
                                                                    // onChange={this.handleChange('name')}
                                                                    margin="normal"
                                                                    style={{ width: 180, marginTop: 0, marginLeft: 10 }}
                                                                />
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            // checked={this.state.checkedB}
                                                                            // onChange={this.handleChange('checkedB')}
                                                                            value="checkedB"
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    style={{ marginLeft: 0 }}
                                                                    labelPlacement="start"
                                                                    label="Vaginal Exam"
                                                                />
                                                                <TextField
                                                                    id="standard-name"
                                                                    // label="Height (below 150cm)"
                                                                    className={classes.textField}
                                                                    // value={this.state.name}
                                                                    // onChange={this.handleChange('name')}
                                                                    margin="normal"
                                                                    style={{ width: 180, marginTop: 0, marginLeft: 10 }}
                                                                />
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <TextField
                                                                    id="standard-name"
                                                                    label="Other"
                                                                    className={classes.textField}
                                                                    // value={this.state.name}
                                                                    // onChange={this.handleChange('name')}
                                                                    margin="normal"
                                                                    style={{ width: 180, marginTop: 0, marginLeft: 10 }}
                                                                />
                                                            </FormGroup>
                                                        </FormGroup>
                                                        <FormGroup style={{paddingLeft: 50}}>
                                                            <FormLabel component="legend">Lab Examination</FormLabel>
                                                            <FormGroup row>
                                                                <TextField
                                                                    id="standard-name"
                                                                    label="VDLR"
                                                                    className={classes.textField}
                                                                    // value={this.state.name}
                                                                    // onChange={this.handleChange('name')}
                                                                    margin="normal"
                                                                    style={{ width: 300, marginTop: 0, marginLeft: 0 }}
                                                                />
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <TextField
                                                                    id="standard-name"
                                                                    label="Blood Group"
                                                                    className={classes.textField}
                                                                    // value={this.state.name}
                                                                    // onChange={this.handleChange('name')}
                                                                    margin="normal"
                                                                    style={{ width: 200, marginTop: 0, marginLeft: 0 }}
                                                                />
                                                                <TextField
                                                                    id="standard-name"
                                                                    label="Rh"
                                                                    className={classes.textField}
                                                                    // value={this.state.name}
                                                                    // onChange={this.handleChange('name')}
                                                                    margin="normal"
                                                                    style={{ width: 200, marginTop: 0, marginLeft: 0 }}
                                                                />
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <TextField
                                                                    id="standard-name"
                                                                    label="U/A"
                                                                    className={classes.textField}
                                                                    // value={this.state.name}
                                                                    // onChange={this.handleChange('name')}
                                                                    margin="normal"
                                                                    style={{ width: 300, marginTop: 0, marginLeft: 0 }}
                                                                />
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <TextField
                                                                    id="standard-name"
                                                                    label="FBS"
                                                                    className={classes.textField}
                                                                    // value={this.state.name}
                                                                    // onChange={this.handleChange('name')}
                                                                    margin="normal"
                                                                    style={{ width: 100, marginTop: 0, marginLeft: 0 }}
                                                                />
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <TextField
                                                                    id="standard-name"
                                                                    label="Hgb"
                                                                    className={classes.textField}
                                                                    // value={this.state.name}
                                                                    // onChange={this.handleChange('name')}
                                                                    margin="normal"
                                                                    style={{ width: 100, marginTop: 0, marginLeft: 0 }}
                                                                />
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <TextField
                                                                    id="standard-name"
                                                                    label="HBsAg"
                                                                    className={classes.textField}
                                                                    // value={this.state.name}
                                                                    // onChange={this.handleChange('name')}
                                                                    margin="normal"
                                                                    style={{ width: 100, marginTop: 0, marginLeft: 0 }}
                                                                />
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <TextField
                                                                    id="standard-name"
                                                                    label="Other"
                                                                    className={classes.textField}
                                                                    // value={this.state.name}
                                                                    // onChange={this.handleChange('name')}
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
                                                                        // checked={this.state.checkedB}
                                                                        // onChange={this.handleChange('checkedB')}
                                                                        value="checkedB"
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
                                                                        // checked={this.state.checkedB}
                                                                        // onChange={this.handleChange('checkedB')}
                                                                        value="checkedB"
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
                                                                        // checked={this.state.checkedB}
                                                                        // onChange={this.handleChange('checkedB')}
                                                                        value="checkedB"
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
                                                                        // checked={this.state.checkedB}
                                                                        // onChange={this.handleChange('checkedB')}
                                                                        value="checkedB"
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
                                                                        // checked={this.state.checkedB}
                                                                        // onChange={this.handleChange('checkedB')}
                                                                        value="checkedB"
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
                                                                        // checked={this.state.checkedB}
                                                                        // onChange={this.handleChange('checkedB')}
                                                                        value="checkedB"
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
                                                                        // checked={this.state.checkedB}
                                                                        // onChange={this.handleChange('checkedB')}
                                                                        value="checkedB"
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
                                                                        // checked={this.state.checkedB}
                                                                        // onChange={this.handleChange('checkedB')}
                                                                        value="checkedB"
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
                                                                        // checked={this.state.checkedB}
                                                                        // onChange={this.handleChange('checkedB')}
                                                                        value="checkedB"
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
                                                                        // checked={this.state.checkedB}
                                                                        // onChange={this.handleChange('checkedB')}
                                                                        value="checkedB"
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
                                                                        // checked={this.state.checkedB}
                                                                        // onChange={this.handleChange('checkedB')}
                                                                        value="checkedB"
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
                                                                        // checked={this.state.checkedB}
                                                                        // onChange={this.handleChange('checkedB')}
                                                                        value="checkedB"
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
                                                                        // checked={this.state.checkedB}
                                                                        // onChange={this.handleChange('checkedB')}
                                                                        value="checkedB"
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
                                                                        // checked={this.state.checkedB}
                                                                        // onChange={this.handleChange('checkedB')}
                                                                        value="checkedB"
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
                                                                        // checked={this.state.checkedB}
                                                                        // onChange={this.handleChange('checkedB')}
                                                                        value="checkedB"
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
                                                                        // checked={this.state.checkedB}
                                                                        // onChange={this.handleChange('checkedB')}
                                                                        value="checkedB"
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
                                                                        // checked={this.state.checkedB}
                                                                        // onChange={this.handleChange('checkedB')}
                                                                        value="checkedB"
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
                                                                        // checked={this.state.checkedB}
                                                                        // onChange={this.handleChange('checkedB')}
                                                                        value="checkedB"
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
                                                                // value={this.state.name}
                                                                // onChange={this.handleChange('name')}
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
                                                                value={this.state.hypertension}
                                                                onChange={this.handleChange('hypertension')}
                                                            >
                                                                <FormLabel>Eligible for the basic component of the new antenatal care model</FormLabel>
                                                                <FormControlLabel labelPlacement="start" value="Yes" control={<Radio />} label="Yes" />
                                                                <FormControlLabel labelPlacement="start" value="No" control={<Radio />} label="No" />
                                                            </RadioGroup>
                                                        </FormGroup>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <FormLabel component="legend">HIV</FormLabel>
                                                        <FormGroup row>
                                                            <RadioGroup row
                                                                aria-label="lable"
                                                                name="name"
                                                                className={classes.group}
                                                                // style={{ marginLeft: 0, marginTop: 0, padding: '0 10px 10px 10px' }}
                                                                value={this.state.hypertension}
                                                                onChange={this.handleChange('hypertension')}
                                                            >
                                                                <FormLabel>Tested for HIV</FormLabel>
                                                                <FormControlLabel labelPlacement="start" value="Yes" control={<Radio />} label="Yes" />
                                                                <FormControlLabel labelPlacement="start" value="No" control={<Radio />} label="No" />
                                                            </RadioGroup>
                                                            <FormControl style={{ width: 150, marginTop: 0, marginLeft: 10 }} className={classes.formControl}>
                                                                <InputLabel htmlFor="visual acquity rt">HIV Test Result</InputLabel>
                                                                <Select
                                                                    value={this.state.visualacquityrt}
                                                                    onChange={this.handleChange('visualacquityrt')}
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
                                                                // value={this.state.name}
                                                                // onChange={this.handleChange('name')}
                                                                margin="normal"
                                                                style={{ width: 200, marginTop: 0 }}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <FormControl style={{ width: 150, marginTop: 0, marginLeft: 10 }} className={classes.formControl}>
                                                                <InputLabel htmlFor="visual acquity rt">Clinical Staging</InputLabel>
                                                                <Select
                                                                    value={this.state.visualacquityrt}
                                                                    onChange={this.handleChange('visualacquityrt')}
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
                                                                // value={this.state.name}
                                                                // onChange={this.handleChange('name')}
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
                                                                value={this.state.hypertension}
                                                                onChange={this.handleChange('hypertension')}
                                                            >
                                                                <FormLabel>Infant Feedings</FormLabel>
                                                                <FormControlLabel labelPlacement="start" value="Yes" control={<Radio />} label="Yes" />
                                                                <FormControlLabel labelPlacement="start" value="No" control={<Radio />} label="No" />
                                                            </RadioGroup>
                                                            <RadioGroup
                                                                style={{paddingLeft:10}}
                                                                aria-label="position"
                                                                name="position"
                                                                value={this.state.value}
                                                                onChange={this.handleChange}
                                                                row
                                                            >
                                                                <FormControlLabel
                                                                    value="bottom"
                                                                    control={<Radio color="primary" />}
                                                                    label="EBF(Breast)"
                                                                    labelPlacement="end"
                                                                />
                                                                <FormControlLabel
                                                                    value="bottom"
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
                                                                // value={this.state.hypertension}
                                                                // onChange={this.handleChange('hypertension')}
                                                            >
                                                                <FormLabel>Link to ART</FormLabel>
                                                                <FormControlLabel labelPlacement="start" value="Yes" control={<Radio />} label="Yes" />
                                                                <FormControlLabel labelPlacement="start" value="No" control={<Radio />} label="No" />
                                                            </RadioGroup>
                                                        </FormGroup>
                                                    </FormGroup>
                                                    <br/>
                                                    <FormGroup>
                                                        <FormLabel component="legend">Mother's PMTCT</FormLabel>
                                                        <FormGroup row>
                                                            <TextField
                                                                id="standard-name"
                                                                label="Confidentality Code"
                                                                className={classes.textField}
                                                                // value={this.state.name}
                                                                // onChange={this.handleChange('name')}
                                                                margin="normal"
                                                                style={{ width: 150, marginTop: 0 }}
                                                            />
                                                            <FormControl style={{ width: 150, marginTop: 0, marginLeft: 10 }} className={classes.formControl}>
                                                                <InputLabel htmlFor="visual acquity rt">Letter Code</InputLabel>
                                                                <Select
                                                                    value={this.state.visualacquityrt}
                                                                    onChange={this.handleChange('visualacquityrt')}
                                                                >
                                                                    <MenuItem value="CTRNR">CTRNR</MenuItem>
                                                                    <MenuItem value="CTRR">CTRR</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                            <FormControl style={{ width: 150, marginTop: 0, marginLeft: 10 }} className={classes.formControl}>
                                                                <InputLabel htmlFor="visual acquity rt">Result</InputLabel>
                                                                <Select
                                                                    value={this.state.visualacquityrt}
                                                                    onChange={this.handleChange('visualacquityrt')}
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
                                                        <FormGroup row>
                                                            <TextField
                                                                id="standard-name"
                                                                label="Confidentality Code"
                                                                className={classes.textField}
                                                                // value={this.state.name}
                                                                // onChange={this.handleChange('name')}
                                                                margin="normal"
                                                                style={{ width: 150, marginTop: 0 }}
                                                            />
                                                            <FormControl style={{ width: 150, marginTop: 0, marginLeft: 10 }} className={classes.formControl}>
                                                                <InputLabel htmlFor="visual acquity rt">Letter Code</InputLabel>
                                                                <Select
                                                                    value={this.state.visualacquityrt}
                                                                    onChange={this.handleChange('visualacquityrt')}
                                                                >
                                                                    <MenuItem value="CTRNR">CTRNR</MenuItem>
                                                                    <MenuItem value="CTRR">CTRR</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                            <FormControl style={{ width: 150, marginTop: 0, marginLeft: 10 }} className={classes.formControl}>
                                                                <InputLabel htmlFor="visual acquity rt">Result</InputLabel>
                                                                <Select
                                                                    value={this.state.visualacquityrt}
                                                                    onChange={this.handleChange('visualacquityrt')}
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
                                                        <FormGroup row>
                                                            <TextField
                                                                id="standard-name"
                                                                label="Gravida"
                                                                className={classes.textField}
                                                                // value={this.state.name}
                                                                // onChange={this.handleChange('name')}
                                                                margin="normal"
                                                                style={{ width: 100, marginTop: 0 }}
                                                            />
                                                            <TextField
                                                                id="standard-name"
                                                                label="Para"
                                                                className={classes.textField}
                                                                // value={this.state.name}
                                                                // onChange={this.handleChange('name')}
                                                                margin="normal"
                                                                style={{ width: 100, marginTop: 0 }}
                                                            />
                                                            <TextField
                                                                id="standard-name"
                                                                label="Abortion"
                                                                className={classes.textField}
                                                                // value={this.state.name}
                                                                // onChange={this.handleChange('name')}
                                                                margin="normal"
                                                                style={{ width: 100, marginTop: 0 }}
                                                            />
                                                            <TextField
                                                                id="standard-name"
                                                                label="No of childeren alive now"
                                                                className={classes.textField}
                                                                // value={this.state.name}
                                                                // onChange={this.handleChange('name')}
                                                                margin="normal"
                                                                style={{ width: 200, marginTop: 0 }}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <FormLabel component="legend">Client Agrees to Recive Message</FormLabel>
                                                            <FormGroup row>
                                                                <RadioGroup
                                                                    style={{ marginTop: 10 }}
                                                                    aria-label="position"
                                                                    name="position"
                                                                    value={this.state.value}
                                                                    onChange={this.handleChange}
                                                                    row
                                                                >
                                                                </RadioGroup>
                                                                <FormControlLabel
                                                                    value="end"
                                                                    control={<Radio color="primary" />}
                                                                    label="SMS"
                                                                    labelPlacement="end"
                                                                />
                                                                <FormControlLabel
                                                                    value="end"
                                                                    control={<Radio color="primary" />}
                                                                    label="IVR"
                                                                    labelPlacement="end"
                                                                />
                                                                <FormControl style={{ width: 150, marginTop: 0, marginLeft: 10 }} className={classes.formControl}>
                                                                    <InputLabel htmlFor="visual acquity rt">Language</InputLabel>
                                                                    <Select
                                                                    // value={this.state.visualacquityrt}
                                                                    // onChange={this.handleChange('visualacquityrt')}
                                                                    >
                                                                        <MenuItem value="English">English</MenuItem>
                                                                        <MenuItem value="Amharic">Amharic</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </FormGroup>
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