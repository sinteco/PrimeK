import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import TextField from '@material-ui/core/TextField';
import withStyles from "@material-ui/core/styles/withStyles";
import { compose } from 'redux';
import { fetchNoteSubCategory } from '../../redux/actions/patientNoteAction';
import propTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import DateFnsUtils from '@date-io/date-fns';
import Moment from 'moment';
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


class newIncidentNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forms: [],
            disabledInput: false
        }
    }
    handleChange = (key, name) => event => {
        let forms = [...this.state.forms];
        forms[key] = event.target.value;
        this.setState({ forms },function() {
            console.log(this.state.forms);
        });
    };
    handleDatechange = (event, date) => {
        console.log(date);
    }
    componentDidMount = () => {
        const url = 'PatientNotes/GetNoteSubCategory/death Note';
        this.props.fetchNoteSubCategory(url);
    };
    
    render() {
        { console.log(this.props.noteSubCategory); }
        const { classes } = this.props;
        return (
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>New Custom Note</h4>
                    <p className={classes.cardCategoryWhite}>
                        {/* Created using Roboto Font Family */}
                    </p>
                </CardHeader>
                <CardBody>
                    <form>
                        {this.props.isLoading ? <CircularProgress className={classes.progress} /> : ""}
                        {
                            this.props.noteSubCategory.map(
                                (item, key) => item.InputType == ""?
                                        <TextField
                                                disabled={this.state.disabledInput}
                                                id="standard-multiline-flexible"
                                                label={item.Name}
                                                multiline
                                                rowsMax="4"
                                                fullWidth
                                                value={item.name}
                                                onChange={this.handleChange(key, item.Name)}
                                                className={classes.textField}
                                                margin="normal"
                                        /> : <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <DatePicker
                                                        margin="normal"
                                                        label={item.Name}
                                                        // formatDate={(date) => Moment(date).format('YYYY-MM-DD')}
                                                        value={new Date(item.name)}
                                                        onChange={(date)=>{
                                                            let forms = [...this.state.forms];
                                                            forms[key] = date;
                                                            this.setState({ forms }, function () {
                                                                console.log(this.state.forms);
                                                            }); 
                                                        }}
                                                    />
                                            </MuiPickersUtilsProvider>
                            )
                        }
                        <br/>
                        <br/>
                        <Button variant="contained" color="primary" onClick={()=>console.log(this.state.forms)} color="primary">
                            Save
                        </Button>
                        
                    </form>
                </CardBody>
            </Card>
        );
    }
}

newIncidentNote.propTypes = {
    fetchNoteSubCategory: propTypes.isRequired,
    isLoading: propTypes.bool.isRequired,
    hasError: propTypes.bool.isRequired,
    noteSubCategory: propTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    noteSubCategory: state.patientNote.noteSubCategory,
    isLoading: state.patientNote.isLoading,
    hasError: state.patientNote.hasError
});

const mapDispatchToProps = dispatch => ({
    fetchNoteSubCategory: (url) => dispatch(fetchNoteSubCategory(url))
});

export default compose(withStyles(style), connect(mapStateToProps, mapDispatchToProps))(newIncidentNote);