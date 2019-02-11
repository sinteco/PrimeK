import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import TextField from '@material-ui/core/TextField';
import withStyles from "@material-ui/core/styles/withStyles";
import { compose } from 'redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

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


class newDeathNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateofadmission: new Date(),
            dateofdeath: new Date(),
            timeofdeath: new Date(),
            pysicalexam: '',
            labratoryandimagingstudies: '',
            hospitalcourse: '',
            immediatecauthofdeath: '',
            postmortemfindings: '',
            finaldiagnosis: '',
            physicianconfirmingdeath: '',
            treatingphysician: '',
            hospitalmedicaldirector: '',
            hospitaladministrator: '',
            disabledInput: false
        }
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    render() {
        const { classes } = this.props;
        return (
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Death Note</h4>
                    <p className={classes.cardCategoryWhite}>
                        {/* Created using Roboto Font Family */}
                    </p>
                </CardHeader>
                <CardBody>
                    <form>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            margin="normal"
                            label="Date Of Admission"
                            value={this.state.dateofadmission}
                            onChange={this.handleChange('dateofadmission')}
                        />
                        <DatePicker
                            margin="normal"
                            label="Date Of Death"
                            value={this.state.dateofdeath}
                            onChange={this.handleChange('dateofdeath')}
                        />
                        <TimePicker
                            margin="normal"
                            label="Time Of Death"
                            value={this.state.timeofdeath}
                            onChange={this.handleChange('timeofdeath')}
                        /></MuiPickersUtilsProvider>
                        <selectTable />
                        <TextField
                            disabled={this.state.disabledInput}
                            id="standard-multiline-flexible"
                            label="Brief Medical History and Physical Exam"
                            multiline
                            rowsMax="4"
                            fullWidth
                            value={this.state.pysicalexam}
                            onChange={this.handleChange('pysicalexam')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            disabled={this.state.disabledInput}
                            id="standard-multiline-flexible"
                            label="Pertinent Laboratory and Imageing Studies"
                            multiline
                            rowsMax="4"
                            fullWidth
                            value={this.state.labratoryandimagingstudies}
                            onChange={this.handleChange('labratoryandimagingstudies')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            disabled={this.state.disabledInput}
                            id="standard-multiline-flexible"
                            label="Hospital Course"
                            multiline
                            rowsMax="4"
                            fullWidth
                            value={this.state.hospitalcourse}
                            onChange={this.handleChange('hospitalcourse')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            disabled={this.state.disabledInput}
                            id="standard-multiline-flexible"
                            label="Immediate Cause of Death"
                            multiline
                            rowsMax="4"
                            fullWidth
                            value={this.state.immediatecauthofdeath}
                            onChange={this.handleChange('immediatecauthofdeath')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            disabled={this.state.disabledInput}
                            id="standard-multiline-flexible"
                            label="Immediate Cause of Death"
                            multiline
                            rowsMax="4"
                            fullWidth
                            value={this.state.immediatecauthofdeath}
                            onChange={this.handleChange('immediatecauthofdeath')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            disabled={this.state.disabledInput}
                            id="standard-multiline-flexible"
                            label="Post Mortem Findings"
                            multiline
                            rowsMax="4"
                            fullWidth
                            value={this.state.postmortemfindings}
                            onChange={this.handleChange('postmortemfindings')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            disabled={this.state.disabledInput}
                            id="standard-multiline-flexible"
                            label="Final Diagnosis"
                            multiline
                            rowsMax="4"
                            fullWidth
                            value={this.state.finaldiagnosis}
                            onChange={this.handleChange('finaldiagnosis')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            disabled={this.state.disabledInput}
                            id="standard-multiline-flexible"
                            label="Physician Confirming Death"
                            multiline
                            rowsMax="4"
                            fullWidth
                            value={this.state.physicianconfirmingdeath}
                            onChange={this.handleChange('physicianconfirmingdeath')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            disabled={this.state.disabledInput}
                            id="standard-multiline-flexible"
                            label="Treating Physician"
                            multiline
                            rowsMax="4"
                            fullWidth
                            value={this.state.treatingphysician}
                            onChange={this.handleChange('treatingphysician')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            disabled={this.state.disabledInput}
                            id="standard-multiline-flexible"
                            label="Hospital Course"
                            multiline
                            rowsMax="4"
                            fullWidth
                            value={this.state.hospitalcourse}
                            onChange={this.handleChange('hospitalcourse')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            disabled={this.state.disabledInput}
                            id="standard-multiline-flexible"
                            label="Hospital Administrator"
                            multiline
                            rowsMax="4"
                            fullWidth
                            value={this.state.hospitaladministrator}
                            onChange={this.handleChange('hospitaladministrator')}
                            className={classes.textField}
                            margin="normal"
                        />
                    </form>
                </CardBody>
            </Card>
        );
    }
}
function mapStateToProps(state) {
    return {

    };
}

export default compose(withStyles(style), connect(mapStateToProps, null))(newDeathNote);