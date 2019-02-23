import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomTableWithPopUp from "components/Table/CustomTableWithPopUp.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Moment from 'moment';
import { fetchProgressNote, fetchPatientNoteDetail, savePatientNote, fetchTeeth } from '../../redux/actions/patientNoteAction';
import propTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from "material-ui-flat-pagination";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import qs from 'qs';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { FormGroup } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import DentalFormTable from '../../components/Table/dentalFormTable';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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

const category = "Dental History";

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
        const url = '/PatientNotes/GetTeeth/' + 0;
        this.props.fetchTeeth(url);
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
                            <CustomTableWithPopUp
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
                                            <AppBar position="static" color="default">
                                                <Tabs value={this.state.value} onChange={this.tabhandleChange}>
                                                    <Tab label="Initial Evaluation" />
                                                    <Tab label="Exams" />
                                                </Tabs>
                                            </AppBar>
                                            {this.state.value === 0 && <TabContainer>
                                                <FormControl component="fieldset" className={classes.formControl}>
                                                    <FormGroup row>
                                                        <FormGroup>
                                                            <TextField
                                                                id="standard-name"
                                                                label="Chif Compliant"
                                                                className={classes.textField}
                                                                // value={this.state.name}
                                                                // onChange={this.handleChange('name')}
                                                                margin="normal"
                                                                multiline
                                                                style={{ width: 400, marginTop: 0, }}
                                                            />
                                                            <br/>
                                                            <FormLabel component="legend">Initia Examination</FormLabel>
                                                            <FormGroup row>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                            value="checkedI"
                                                                        />
                                                                    }
                                                                    label="Health History Reviewed"
                                                                />
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                            value="checkedI"
                                                                        />
                                                                    }
                                                                    label="Soft Tissue Examined"
                                                                />
                                                                <FormControl style={{ width: 90, marginTop: 0, marginRight: 0 }} className={classes.formControl}>
                                                                    <InputLabel htmlFor="visual acquity rt">TMJ WNL</InputLabel>
                                                                    <Select
                                                                        value={this.state.visualacquityrt}
                                                                        onChange={this.handleChange('visualacquityrt')}
                                                                    >
                                                                        <MenuItem value="Yes">Yes</MenuItem>
                                                                        <MenuItem value="No">No</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                            value="checkedI"
                                                                        />
                                                                    }
                                                                    label="Oral Cancer Screen"
                                                                />
                                                                <TextField
                                                                    id="standard-name"
                                                                    // label="Chif Compliant"
                                                                    className={classes.textField}
                                                                    // value={this.state.name}
                                                                    // onChange={this.handleChange('name')}
                                                                    margin="normal"
                                                                    multiline
                                                                    style={{ width: 100, marginLeft: 0 }}
                                                                />
                                                                <FormControl style={{ width: 200, marginTop: 0, marginRight: 0 }} className={classes.formControl}>
                                                                    <InputLabel htmlFor="visual acquity rt">Lymph Nodes WNA</InputLabel>
                                                                    <Select
                                                                        // value={this.state.visualacquityrt}
                                                                        // onChange={this.handleChange('visualacquityrt')}
                                                                    >
                                                                        <MenuItem value="Yes">Yes</MenuItem>
                                                                        <MenuItem value="No">No</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </FormGroup>
                                                            <br/>
                                                            <FormLabel component="legend">Periodental Tissue</FormLabel>
                                                            <FormGroup row>
                                                                <FormControl style={{ width: 100, marginTop: 0, marginRight: 0 }} className={classes.formControl}>
                                                                    <InputLabel htmlFor="visual acquity rt">Plaque</InputLabel>
                                                                    <Select
                                                                    // value={this.state.visualacquityrt}
                                                                    // onChange={this.handleChange('visualacquityrt')}
                                                                    >
                                                                        <MenuItem value="Yes">Yes</MenuItem>
                                                                        <MenuItem value="No">No</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                                <FormControl style={{ width: 100, marginTop: 0, marginRight: 0 }} className={classes.formControl}>
                                                                    <InputLabel htmlFor="visual acquity rt">Calculus</InputLabel>
                                                                    <Select
                                                                    // value={this.state.visualacquityrt}
                                                                    // onChange={this.handleChange('visualacquityrt')}
                                                                    >
                                                                        <MenuItem value="Yes">Yes</MenuItem>
                                                                        <MenuItem value="No">No</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                                <FormControl style={{ width: 100, marginTop: 0, marginRight: 0 }} className={classes.formControl}>
                                                                    <InputLabel htmlFor="visual acquity rt">Stain</InputLabel>
                                                                    <Select
                                                                    // value={this.state.visualacquityrt}
                                                                    // onChange={this.handleChange('visualacquityrt')}
                                                                    >
                                                                        <MenuItem value="Yes">Yes</MenuItem>
                                                                        <MenuItem value="No">No</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                                <FormControl style={{ width: 120, marginTop: 0, marginRight: 0 }} className={classes.formControl}>
                                                                    <InputLabel htmlFor="visual acquity rt">Oral Hygiene</InputLabel>
                                                                    <Select
                                                                    // value={this.state.visualacquityrt}
                                                                    // onChange={this.handleChange('visualacquityrt')}
                                                                    >
                                                                        <MenuItem value="Yes">Yes</MenuItem>
                                                                        <MenuItem value="No">No</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                            value="checkedI"
                                                                        />
                                                                    }
                                                                    label="Gingivits"
                                                                />
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                            value="checkedI"
                                                                        />
                                                                    }
                                                                    label="Acute"
                                                                />
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                            value="checkedI"
                                                                        />
                                                                    }
                                                                    label="Chronic"
                                                                />
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                            value="checkedI"
                                                                        />
                                                                    }
                                                                    label="Edematous"
                                                                />
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                            value="checkedI"
                                                                        />
                                                                    }
                                                                    label="Hemorhagic"
                                                                />
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                            value="checkedI"
                                                                        />
                                                                    }
                                                                    label="Periodontitis"
                                                                />
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                            value="checkedI"
                                                                        />
                                                                    }
                                                                    label="Local"
                                                                />
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                            value="checkedI"
                                                                        />
                                                                    }
                                                                    label="Gen"
                                                                />
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                            value="checkedI"
                                                                        />
                                                                    }
                                                                    label="Mobility +2"
                                                                />
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                            value="checkedI"
                                                                        />
                                                                    }
                                                                    label="Pocketing +5"
                                                                />
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                            value="checkedI"
                                                                        />
                                                                    }
                                                                    label="Furca"
                                                                />
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Table style={{ width: 100}} className={classes.table}>
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell>
                                                                                <TextField
                                                                                    id="standard-name"
                                                                                    // label="Chif Compliant"
                                                                                    className={classes.textField}
                                                                                    // value={this.state.name}
                                                                                    // onChange={this.handleChange('name')}
                                                                                    margin="normal"
                                                                                    style={{ width: 100, marginTop: 0 }}
                                                                                />
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <TextField
                                                                                    id="standard-name"
                                                                                    // label="Chif Compliant"
                                                                                    className={classes.textField}
                                                                                    // value={this.state.name}
                                                                                    // onChange={this.handleChange('name')}
                                                                                    margin="normal"
                                                                                    style={{ width: 100, marginTop: 0 }}
                                                                                />
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        <TableRow>
                                                                            <TableCell>
                                                                                <TextField
                                                                                    id="standard-name"
                                                                                    // label="Chif Compliant"
                                                                                    className={classes.textField}
                                                                                    // value={this.state.name}
                                                                                    // onChange={this.handleChange('name')}
                                                                                    margin="normal"
                                                                                    style={{ width: 100, marginTop: 0 }}
                                                                                />
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <TextField
                                                                                    id="standard-name"
                                                                                    // label="Chif Compliant"
                                                                                    className={classes.textField}
                                                                                    // value={this.state.name}
                                                                                    // onChange={this.handleChange('name')}
                                                                                    margin="normal"
                                                                                    style={{ width: 100, marginTop: 0 }}
                                                                                />
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    </TableBody>
                                                                </Table>
                                                                <Table style={{ width: 100 }} className={classes.table}>
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell>
                                                                                <FormControlLabel
                                                                                    control={
                                                                                        <Checkbox
                                                                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                                            value="checkedI"
                                                                                        />
                                                                                    }
                                                                                    label="Type1"
                                                                                />
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <FormControlLabel
                                                                                    control={
                                                                                        <Checkbox
                                                                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                                            value="checkedI"
                                                                                        />
                                                                                    }
                                                                                    label="Type3"
                                                                                />
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        <TableRow>
                                                                            <TableCell>
                                                                                <FormControlLabel
                                                                                    control={
                                                                                        <Checkbox
                                                                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                                            value="checkedI"
                                                                                        />
                                                                                    }
                                                                                    label="Type2"
                                                                                />
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                <FormControlLabel
                                                                                    control={
                                                                                        <Checkbox
                                                                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                                            value="checkedI"
                                                                                        />
                                                                                    }
                                                                                    label="Type4"
                                                                                />
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    </TableBody>
                                                                </Table>
                                                            </FormGroup>
                                                            <br/>
                                                            <FormLabel component="legend">TX.REC'D:</FormLabel>
                                                            <FormGroup>
                                                                <FormGroup row>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                                value="checkedI"
                                                                            />
                                                                        }
                                                                        label="P/P"
                                                                    />
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                                value="checkedI"
                                                                            />
                                                                        }
                                                                        label="Perior Charting"
                                                                    />
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                                value="checkedI"
                                                                            />
                                                                        }
                                                                        label="Perior Charting"
                                                                    />
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                                value="checkedI"
                                                                            />
                                                                        }
                                                                        label="3 MO"
                                                                    />
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                                value="checkedI"
                                                                            />
                                                                        }
                                                                        label="4 MO"
                                                                    />
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                                value="checkedI"
                                                                            />
                                                                        }
                                                                        label="6 MO"
                                                                    />
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                                value="checkedI"
                                                                            />
                                                                        }
                                                                        label="ALT"
                                                                    />
                                                                </FormGroup>
                                                                <FormGroup row>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                                value="checkedI"
                                                                            />
                                                                        }
                                                                        label="OHI"
                                                                    />
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                                value="checkedI"
                                                                            />
                                                                        }
                                                                        label="RT Plane"
                                                                    />
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                                value="checkedI"
                                                                            />
                                                                        }
                                                                        label="Re-Eval"
                                                                    />
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                                value="checkedI"
                                                                            />
                                                                        }
                                                                        label="POSS REF."
                                                                    />
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                                value="checkedI"
                                                                            />
                                                                        }
                                                                        label="Refferal Needed"
                                                                    />
                                                                </FormGroup>
                                                                <FormGroup>
                                                                    <TextField
                                                                        id="standard-name"
                                                                        label="Note"
                                                                        multiline
                                                                        style={{ width: 400 }}
                                                                        className={classes.textField}
                                                                        value={this.state.name}
                                                                        onChange={this.handleChange('name')}
                                                                        margin="normal"

                                                                    />
                                                                </FormGroup>
                                                            </FormGroup>
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <FormLabel component="legend">Existing Restoration</FormLabel>
                                                            <FormGroup row>
                                                                <DentalFormTable
                                                                    tableHeaderColor="primary"
                                                                    tableHead={[" ", "Teeth", "Remark"]}
                                                                    tableData={this.props.teeths.map(item=>{return [item]})}
                                                                    radio={2}
                                                                    textbox={1}
                                                                />
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <FormControl style={{ width: 90, marginTop: 0, marginLeft: 0 }} className={classes.formControl}>
                                                                    <InputLabel htmlFor="visual acquity rt">UD</InputLabel>
                                                                    <Select
                                                                        value={this.state.visualacquityrt}
                                                                        onChange={this.handleChange('visualacquityrt')}
                                                                    >
                                                                        <MenuItem value="Yes">Yes</MenuItem>
                                                                        <MenuItem value="No">No</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                                <FormControl style={{ width: 90, marginTop: 0, marginLeft: 0 }} className={classes.formControl}>
                                                                    <InputLabel htmlFor="visual acquity rt">LD</InputLabel>
                                                                    <Select
                                                                        value={this.state.visualacquityrt}
                                                                        onChange={this.handleChange('visualacquityrt')}
                                                                    >
                                                                        <MenuItem value="Yes">Yes</MenuItem>
                                                                        <MenuItem value="No">No</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                                <TextField
                                                                    id="standard-name"
                                                                    label="Styplane"
                                                                    style={{ width: 100, marginTop: 0, marginLeft: 0 }}
                                                                    className={classes.textField}
                                                                    // value={this.state.name}
                                                                    onChange={this.handleChange('name')}
                                                                    margin="normal"

                                                                />
                                                            </FormGroup>
                                                        </FormGroup>
                                                    </FormGroup>
                                                </FormControl>
                                            </TabContainer>}
                                            {console.log(this.props.teeths)}
                                            {this.state.value === 1 && <TabContainer>
                                                <FormGroup>
                                                    <FormGroup row>
                                                        <DentalFormTable
                                                            tableHeaderColor="primary"
                                                            tableHead={[" ", "Teeth", "Remark"]}
                                                            tableData={this.props.teeths.map(item=>{return [item]})}
                                                            radio={2}
                                                            textbox={1}
                                                        />
                                                    </FormGroup>
                                                   <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Note"
                                                            style={{ width: 280, marginTop: 0, marginLeft: 0 }}
                                                            className={classes.textField}
                                                            // value={this.state.name}
                                                            onChange={this.handleChange('name')}
                                                            margin="normal"

                                                        />
                                                    </FormGroup> 
                                                    <FormGroup row>
                                                        <FormControl style={{ width: 140, marginTop: 0, marginLeft: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="visual acquity rt">Styplate/Flipper</InputLabel>
                                                            <Select
                                                                // value={this.state.visualacquityrt}
                                                                // onChange={this.handleChange('visualacquityrt')}
                                                            >
                                                                <MenuItem value="Yes">U</MenuItem>
                                                                <MenuItem value="No">L</MenuItem>
                                                                <MenuItem value="U&L">U&L</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.state.checkedA}
                                                                    onChange={this.handleChange('checkedA')}
                                                                    value="checkedA"
                                                                />
                                                            }
                                                            labelPlacement="start"
                                                            label="T"
                                                        />
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.state.checkedA}
                                                                    onChange={this.handleChange('checkedA')}
                                                                    value="checkedA"
                                                                />
                                                            }
                                                            labelPlacement="start"
                                                            label="C"
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormControl style={{ width: 50, marginTop: 0, marginLeft: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="visual acquity rt">UD</InputLabel>
                                                            <Select
                                                            // value={this.state.visualacquityrt}
                                                            // onChange={this.handleChange('visualacquityrt')}
                                                            >
                                                                <MenuItem value="FUD">FUD</MenuItem>
                                                                <MenuItem value="PUD">PUF</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.state.checkedA}
                                                                    onChange={this.handleChange('checkedA')}
                                                                    value="checkedA"
                                                                />
                                                            }
                                                            label="Reline"
                                                        />
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.state.checkedA}
                                                                    onChange={this.handleChange('checkedA')}
                                                                    value="checkedA"
                                                                />
                                                            }
                                                            labelPlacement="start"
                                                            label="T"
                                                        />
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.state.checkedA}
                                                                    onChange={this.handleChange('checkedA')}
                                                                    value="checkedA"
                                                                />
                                                            }
                                                            labelPlacement="start"
                                                            label="C"
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <FormControl style={{ width: 50, marginTop: 0, marginLeft: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="visual acquity rt">LD</InputLabel>
                                                            <Select
                                                            // value={this.state.visualacquityrt}
                                                            // onChange={this.handleChange('visualacquityrt')}
                                                            >
                                                                <MenuItem value="Yes">FLD</MenuItem>
                                                                <MenuItem value="No">PLD</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.state.checkedA}
                                                                    onChange={this.handleChange('checkedA')}
                                                                    value="checkedA"
                                                                />
                                                            }
                                                            label="Reline"
                                                        />
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.state.checkedA}
                                                                    onChange={this.handleChange('checkedA')}
                                                                    value="checkedA"
                                                                />
                                                            }
                                                            labelPlacement="start"
                                                            label="T"
                                                        />
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={this.state.checkedA}
                                                                    onChange={this.handleChange('checkedA')}
                                                                    value="checkedA"
                                                                />
                                                            }
                                                            labelPlacement="start"
                                                            label="C"
                                                        />
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <TextField
                                                            id="standard-name"
                                                            label="RP"
                                                            style={{ width: 180, marginTop: 0, marginLeft: 0 }}
                                                            className={classes.textField}
                                                            // value={this.state.name}
                                                            onChange={this.handleChange('name')}
                                                            margin="normal"

                                                        />
                                                        <FormControl style={{ width: 100, marginTop: 0, marginLeft: 0 }} className={classes.formControl}>
                                                            <InputLabel htmlFor="pro flo">PRO/FLO</InputLabel>
                                                            <Select
                                                            // value={this.state.visualacquityrt}
                                                            // onChange={this.handleChange('visualacquityrt')}
                                                            >
                                                                <MenuItem value="Y">Y</MenuItem>
                                                                <MenuItem value="N">N</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </FormGroup>
                                                </FormGroup>
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
    fetchTeeth: propTypes.isRequired,
    fetchProgressNote: propTypes.isRequired,
    fetchPatientNoteDetail: propTypes.isRequired,
    isLoading: propTypes.bool.isRequired,
    hasError: propTypes.bool.isRequired,
    progressNotes: propTypes.array.isRequired,
    fullScreen: propTypes.bool.isRequired,
    patientnoteDetail: propTypes.array.isRequired,
    noteSubCategory: propTypes.array.isRequired,
    confirmStatus: propTypes.string.isRequired,
    teeths: propTypes.array.isRequired
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
    teeths: state.patientNote.teeths
});

const mapDispatchToProps = dispatch => ({
    fetchProgressNote: (url) => dispatch(fetchProgressNote(url)),
    fetchPatientNoteDetail: (url) => dispatch(fetchPatientNoteDetail(url)),
    fetchTeeth: (url) => dispatch(fetchTeeth(url)),
    savePatientNote: (url, data) => dispatch(savePatientNote(url, data)),
});

export default compose(withStyles(styles), withMobileDialog(), connect(mapStateToProps, mapDispatchToProps))(pNote);