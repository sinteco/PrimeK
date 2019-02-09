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


class newRefferalNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refferto: '',
            history: '',
            pysicalexamfinding: '',
            labratoryfinding: '',
            diagnosisandtreatment: '',
            reasonforrefferal: '',
            pysicianname: '',
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
                    <h4 className={classes.cardTitleWhite}>Refferal Note</h4>
                    <p className={classes.cardCategoryWhite}>
                    {/* Created using Roboto Font Family */}
                    </p>
                </CardHeader>
                <CardBody>
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
                </CardBody>
            </Card>
        );
    }
}
function mapStateToProps(state) {
    return {

    };
}

export default compose(withStyles(style), connect(mapStateToProps, null))(newRefferalNote);