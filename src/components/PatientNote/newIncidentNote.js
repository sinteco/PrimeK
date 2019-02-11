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
            note: '',
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
                    <h4 className={classes.cardTitleWhite}>Incident Note</h4>
                    <p className={classes.cardCategoryWhite}>
                        {/* Created using Roboto Font Family */}
                    </p>
                </CardHeader>
                <CardBody>
                    <form>
                        <TextField
                            disabled={this.state.disabledInput}
                            id="standard-multiline-flexible"
                            label="Note"
                            multiline
                            rowsMax="4"
                            fullWidth
                            value={this.state.note}
                            onChange={this.handleChange('note')}
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

export default compose(withStyles(style), connect(mapStateToProps, null))(newIncidentNote);