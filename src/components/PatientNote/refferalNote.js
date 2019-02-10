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
import { fetchProgressNote, fetchPatientNoteDetail } from '../../redux/actions/patientNoteAction';
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

class refferalNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            page: 1,

            refferto: '',
            history: '',
            pysicalexamfinding: '',
            labratoryfinding: '',
            diagnosisandtreatment: '',
            reasonforrefferal: '',
            pysicianname: '',
            disabledInput: true,

            open: false,
        }
    }
    returnarrays() {
        var a = new Array();
        this.props.progressNotes.map((progressNote) => {
            a.push([[progressNote.Id],[progressNote.PatientId], [Moment(progressNote.DateTime).format('d MMM')], [progressNote.NoteCategory], [progressNote.Note]])
        });
        return a;
    }
    handleClick(offset) {
        this.setState({
            offset,
            page: (this.state.offset + 20) / 10
        });
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const URL = '/PatientNotes/GetRefferalNoteOfPatient/' + id + "?page=" + (this.state.offset + 20) / 10;
        this.props.fetchRadOrders(URL);
    }
    handleOnRowClick = (id) => {
        const URL = '/PatientNotes/GetPatientNoteDetails/' + id;
        this.props.fetchPatientNoteDetail(URL);
        return this.props.patientnoteDetail ? 
            [this.props.patientnoteDetail.map(
                (note)=>
                    {
                        if(note.NoteSubcategory=="Diagnosis and Treatment")
                        {
                            this.setState({diagnosisandtreatment: note.Value})
                        }
                        if(note.NoteSubcategory=="History")
                        {
                            this.setState({history: note.Value})
                        }
                        if(note.NoteSubcategory=="Pertinent Laboratory/Imaging study Findings")
                        {
                            this.setState({labratoryfinding: note.Value})
                        }
                        if(note.NoteSubcategory=="Pertinent Physical Exam Finding")
                        {
                            this.setState({pysicalexamfinding: note.Value})
                        }
                        if(note.NoteSubcategory=="Reason for Referral")
                        {
                            this.setState({reasonforrefferal: note.Value})
                        }
                        if(note.NoteSubcategory=="Referred to")
                        {
                            this.setState({refferto: note.Value})
                        }
                        if(note.NoteSubcategory=="Referring Physician Name")
                        {
                            this.setState({pysicianname: note.Value})
                        }
                    }),this.handleClickOpen()]    
            : <CircularProgress className={this.props.classes.progress} />
        
    }
    handleClickOpen = () => {
        this.setState({ open: true });
      };
    
    handleClose = () => {
    this.setState({ open: false });
    };
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    componentWillMount() {
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const URL = '/PatientNotes/GetRefferalNoteOfPatient/' + id + "?page=" + this.state.page;
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
                            <h4 className={classes.cardTitleWhite}>Refferal Note</h4>
                            <p className={classes.cardCategoryWhite}>
                                {/* Here is a subtitle for this table */}<br />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component={Link}
                                    to="newRefferalNote"
                                    className={classes.button}
                                >
                                    New Refferal Note
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
                                <DialogTitle id="responsive-dialog-title">{" Refferal Note Detail"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                    <form>
                                        <TextField
                                            disabled={this.state.disabledInput}
                                            id="standard-multiline-flexible"
                                            label="Reffer To"
                                            multiline
                                            rowsMax="4"
                                            fullWidth
                                            value={this.state.refferto}
                                            onChange={this.handleChange('refferto')}
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                        <TextField
                                            disabled={this.state.disabledInput}
                                            id="standard-multiline-flexible"
                                            label="History"
                                            multiline
                                            rowsMax="4"
                                            fullWidth
                                            value={this.state.history}
                                            onChange={this.handleChange('history')}
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                        <TextField
                                            disabled={this.state.disabledInput}
                                            id="standard-multiline-flexible"
                                            label="Pertinent Physical Exam Finding"
                                            multiline
                                            rowsMax="4"
                                            fullWidth
                                            value={this.state.pysicalexamfinding}
                                            onChange={this.handleChange('pysicalexamfinding')}
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                        <selectTable />
                                        <TextField
                                            disabled={this.state.disabledInput}
                                            id="standard-multiline-flexible"
                                            label="Pertinent Labratory/Imaging study Findings"
                                            multiline
                                            rowsMax="4"
                                            fullWidth
                                            value={this.state.labratoryfinding}
                                            onChange={this.handleChange('labratoryfinding')}
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                        <TextField
                                            disabled={this.state.disabledInput}
                                            id="standard-multiline-flexible"
                                            label="Diagnosis And Treatment"
                                            multiline
                                            rowsMax="4"
                                            fullWidth
                                            value={this.state.diagnosisandtreatment}
                                            onChange={this.handleChange('diagnosisandtreatment')}
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                        <TextField
                                            disabled={this.state.disabledInput}
                                            id="standard-multiline-flexible"
                                            label="Reason for Refferal"
                                            multiline
                                            rowsMax="4"
                                            fullWidth
                                            value={this.state.reasonforrefferal}
                                            onChange={this.handleChange('reasonforrefferal')}
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                        <TextField
                                            disabled={this.state.disabledInput}
                                            id="standard-multiline-flexible"
                                            label="Refering Physician Name"
                                            multiline
                                            rowsMax="4"
                                            fullWidth
                                            value={this.state.pysicianname}
                                            onChange={this.handleChange('pysicianname')}
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                    </form>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClose} color="primary">
                                        Close
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

refferalNote.propTypes = {
    fetchProgressNote: propTypes.isRequired,
    fetchPatientNoteDetail: propTypes.isRequired,
    isLoading: propTypes.bool.isRequired,
    hasError: propTypes.bool.isRequired,
    progressNotes: propTypes.array.isRequired,
    fullScreen: propTypes.bool.isRequired,
    patientnoteDetail: propTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    progressNotes: state.patientNote.progressNotes,
    isLoading: state.patientNote.isLoading,
    hasError: state.patientNote.hasError,
    totalCount: state.patientNote.totalCount,
    selectedPatient: state.assignments.selectedPatient,
    patientnoteDetail: state.patientNote.patientnoteDetail
});

const mapDispatchToProps = dispatch => ({
    fetchProgressNote: (url) => dispatch(fetchProgressNote(url)),
    fetchPatientNoteDetail: (url) => dispatch(fetchPatientNoteDetail(url))
});

export default compose(withStyles(styles),withMobileDialog(), connect(mapStateToProps, mapDispatchToProps))(refferalNote);