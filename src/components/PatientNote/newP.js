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
            note: '',
            disabledInput: false
        }
    }
    handleChange = (key, name) => event => {
        let cpy = Object.assign({}, this.state.forms, 
            {
                name : name,
                value : event.target.value
            });
        this.setState({ forms: cpy },function() {
            console.log(this.state.forms);
        });
    };
    componentDidMount = () => {
        const url = 'PatientNotes/GetNoteSubCategory/death Note';
        this.props.fetchNoteSubCategory(url);
    }
    
    render() {
        { console.log(this.props.noteSubCategory); }
        const { classes } = this.props;
        return (
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>new Note</h4>
                    <p className={classes.cardCategoryWhite}>
                        {/* Created using Roboto Font Family */}
                    </p>
                </CardHeader>
                <CardBody>
                    <form>
                        {
                            this.props.noteSubCategory.map(
                                (item, key)=>
                                    <TextField
                                        disabled={this.state.disabledInput}
                                        id="standard-multiline-flexible"
                                        label={item.Name}
                                        multiline
                                        rowsMax="4"
                                        fullWidth
                                        value={this.state.forms[key]}
                                        onChange={this.handleChange(key,item.Name)}
                                        className={classes.textField}
                                        margin="normal"
                                        />
                                    
                            )
                        }
                        
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