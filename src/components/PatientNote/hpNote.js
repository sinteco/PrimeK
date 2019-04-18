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
import { fetchPatientNotes, fetchHPNoteDetail } from '../../redux/actions/patientNoteAction';
import propTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from "material-ui-flat-pagination";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Collapsible from 'react-collapsible';
import CustomTableWithSelector from '../Table/CustomTableWithSelector';
import { Link } from "react-router-dom";

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

class hpNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            page: 1,
            detaildialog: false
        }
        this.detaildialoguClose = this.detaildialoguClose.bind(this);
    }
    returnarrays() {
        var a = new Array();
        this.props.patientNotes.map((patientNote) => {
            a.push([[patientNote.Id], [patientNote.PatientId], [Moment(patientNote.DateTime).format('DD MMM YY')], [patientNote.NoteCategory], [patientNote.Note], [patientNote.Doctor]])
        });
        return a;
    }
    handleClick(offset) {
        this.setState({
            offset,
            page: (this.state.offset + 20) / 10
        });
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const patientNotesURL = '/HPNotes/GetHPNotesOfPatient/' + id + "?page=" + (this.state.offset + 20) / 10;
        this.props.fetchPatientNotes(patientNotesURL);
    }
    handleOnRowClick = (id) => {
        // const NoteCategory = this.props.patientNotes.filter(note => (note.Id == id ));
        // console.log(NoteCategory[0].NoteCategory);
        const URL = '/HPNotes/GetHPNoteDetail/' + id;
        this.props.fetchHPNoteDetail(URL);
        // console.log(this.props.patientnoteDetail);
        this.setState({
            detaildialog: true
        })
    }
    detaildialoguClose() {
        this.setState({
            detaildialog: false
        })
    }
    componentWillMount() {
        const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
        const patientNotesURL = '/HPNotes/GetHPNotesOfPatient/' + id + "?page=" + this.state.page;
        this.props.fetchPatientNotes(patientNotesURL);
    }
    render() {
        const { fullScreen } = this.props;
        const { classes } = this.props;
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>History And Physical Note</h4>
                            <p className={classes.cardCategoryWhite}>
                                {/* Here is a subtitle for this table */}
                            </p>
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to="NewHPOrder"
                                className={classes.button}
                            > new HPNote </Button>
                        </CardHeader>
                        <CardBody>
                            {this.props.isLoading ? <CircularProgress className={classes.progress} /> : ""}
                            <Table
                                tableHeaderColor="primary"
                                tableHead={["Id", "Patient", "DateTime", "Category", "Note", "Doctor"]}
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
                                open={this.state.detaildialog}
                                onClose={this.handleClose}
                                aria-labelledby="responsive-dialog-title"
                                classes={{ paper: classes.dialog }}
                            >
                                <DialogTitle id="responsive-dialog-title">{"History And Physical Note Detail"}</DialogTitle>
                                <DialogContent row>
                                    <form>
                                        <TextField
                                            id="standard-multiline-flexible"
                                            label="Chif Compliant *"
                                            multiline
                                            rowsMax="4"
                                            fullWidth
                                            value={this.props.hpNote != undefined ? this.props.hpNote.chifcompliant : ''}
                                            // onChange={this.handleChange('chifcompliant')}
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                        <TextField
                                            id="standard-multiline-flexible"
                                            label="History Of Present illness"
                                            multiline
                                            rowsMax="4"
                                            fullWidth
                                            value={this.props.hpNote != undefined ? this.props.hpNote.historyofpresentillness : ''}
                                            // onChange={this.handleChange('historyofpresentillness')}
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                        <br />
                                        <br />
                                        <Collapsible trigger="Past Medical History >>" className={classes.collapsible}>
                                            {
                                                <Table
                                                    tableHeaderColor="primary"
                                                    tableHead={[" ", " ", "Normal", "Abnormal", "Remark"]}
                                                    tableData={this.props.hpNote != undefined ? this.props.hpNote.medicalHistorys.map(item => { return [item.NoteSubcategory] }):''}
                                                    hadleTableEvent={this.hadlePastMedicalHistory}
                                                    hadleTableRemarkEvent={this.hadlePastMedicalHistoryRemarks}
                                                    radio={2}
                                                    textbox={1}
                                                />
                                            }
                                        </Collapsible>
                                        <TextField
                                            id="standard-multiline-flexible"
                                            label="Current Medications"
                                            multiline
                                            rowsMax="4"
                                            fullWidth
                                            value={this.props.hpNote != undefined ? this.props.hpNote.currentmedications: ''}
                                            // onChange={this.handleChange('currentmedications')}
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                        <TextField
                                            id="standard-multiline-flexible"
                                            label="Allergies"
                                            multiline
                                            rowsMax="4"
                                            fullWidth
                                            value={this.props.hpNote != undefined ? this.props.hpNote.allergies:''}
                                            // onChange={this.handleChange('allergies')}
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                        <br />
                                        <br />
                                        <Collapsible trigger="Family History >>" className={classes.collapsible}>
                                            {
                                                <CustomTableWithSelector
                                                    tableHeaderColor="primary"
                                                    tableHead={[" ", " ", "Normal", "Abnormal", "Remark"]}
                                                    tableData={this.props.hpNote != undefined ? this.props.hpNote.FamilyHistory.map(item => { return [item.NoteSubcategory] }):''}
                                                    radio={2}
                                                    textbox={1}
                                                    hadleTableEvent={this.handleFamilyHistory}
                                                    hadleTableRemarkEvent={this.handleFamilyHistoryRemarks}
                                                />
                                            }
                                        </Collapsible>
                                        <br />
                                        <Collapsible trigger="Social History >>" className={classes.collapsible}>
                                            {
                                                <CustomTableWithSelector
                                                    tableHeaderColor="primary"
                                                    tableHead={[" ", " ", "Normal", "Abnormal", "Remark"]}
                                                    tableData={this.props.hpNote != undefined ? this.props.hpNote.SocialHistory.map(item => { return [item.NoteSubcategory] }): ''}
                                                    radio={0}
                                                    textbox={1}
                                                    hadleTableEvent={this.handleSocialHistory}
                                                    hadleTableRemarkEvent={this.handleSocialHistoryRemarks}
                                                />
                                            }
                                        </Collapsible>
                                        <br />
                                        <Collapsible trigger="Review of Systems >>" className={classes.collapsible}>
                                            {
                                                <CustomTableWithSelector
                                                    tableHeaderColor="primary"
                                                    tableHead={[" ", " ", "Normal", "Abnormal", "Remark"]}
                                                    tableData={this.props.hpNote != undefined ? this.props.hpNote.ReviewofSystem.map(item => { return [item.NoteSubcategory] }): ''}
                                                    radio={2}
                                                    textbox={1}
                                                    hadleTableEvent={this.handleReviewofSystems}
                                                    hadleTableRemarkEvent={this.handleReviewofSystemsRemarks}
                                                />
                                            }
                                        </Collapsible>
                                        <br />
                                        <Collapsible trigger="Physical Exam >>" className={classes.collapsible}>
                                            {
                                                <CustomTableWithSelector
                                                    tableHeaderColor="primary"
                                                    tableHead={[" ", " ", "Normal", "Abnormal", "Remark"]}
                                                    tableData={this.props.hpNote != undefined ? this.props.hpNote.PhysicalExam.map(item => { return [item.NoteSubcategory] }): ''}
                                                    radio={2}
                                                    textbox={1}
                                                    hadleTableEvent={this.handlePhysicalExam}
                                                    hadleTableRemarkEvent={this.handlePhysicalExamRemarks}
                                                />
                                            }
                                        </Collapsible>
                                        <TextField
                                            id="standard-multiline-flexible"
                                            label="Assessment"
                                            multiline
                                            rowsMax="4"
                                            fullWidth
                                            value={this.props.hpNote != undefined ? this.props.hpNote.assessment: ''}
                                            // onChange={this.handleChange('assessment')}
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                        <TextField
                                            id="standard-multiline-flexible"
                                            label="Plan"
                                            multiline
                                            rowsMax="4"
                                            fullWidth
                                            value={this.props.hpNote != undefined ? this.props.hpNote.plan: ''}
                                            // onChange={this.handleChange('plan')}
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                        <TextField
                                            id="standard-multiline-flexible"
                                            label="Treatment"
                                            multiline
                                            rowsMax="4"
                                            fullWidth
                                            value={this.props.hpNote != undefined ? this.props.hpNote.treatment: ''}
                                            // onChange={this.handleChange('treatment')}
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                        {/* <br /> */}
                                        {/* <br /> */}
                                        {/* <FormLabel component="legend">Diagnosis</FormLabel>
                                        <CustomTable
                                            tableHeaderColor="primary"
                                            tableHead={["Diagnosis", "Code", "Date", "Visit"]}
                                            diagnosis={this.state.diagnosis}
                                            addDiagnosis={this.addDiagnosis}
                                        />
                                        <br /> */}
                                    </form>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.detaildialoguClose} color="primary" autoFocus>
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

hpNote.propTypes = {
    fetchHPNoteDetail: propTypes.func.isRequired,
    fetchVitalSigen: propTypes.func.isRequired,
    patientNotes: propTypes.array.isRequired,
    isLoading: propTypes.bool.isRequired,
    hasError: propTypes.bool.isRequired,
    hpNote: propTypes.array.isRequired,
}
const mapStateToProps = (state) => ({
    fetchHPNoteDetail: state.patientNote.fetchHPNoteDetail,
    patientNotes: state.patientNote.patientnotes,
    isLoading: state.patientNote.isLoading,
    hasError: state.patientNote.hasError,
    totalCount: state.patientNote.totalCount,
    selectedPatient: state.assignments.selectedPatient,
    hpNote: state.patientNote.medicalHistorys
});
const mapDispatchToProps = dispatch => ({
    fetchPatientNotes: (url) => dispatch(fetchPatientNotes(url)),
    fetchHPNoteDetail: (url) => dispatch(fetchHPNoteDetail(url))
});

export default compose(withStyles(styles), withMobileDialog(), connect(mapStateToProps, mapDispatchToProps))(hpNote);