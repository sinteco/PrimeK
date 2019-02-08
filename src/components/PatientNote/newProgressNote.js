import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import TextField from '@material-ui/core/TextField';
import withStyles from "@material-ui/core/styles/withStyles";
import { compose } from 'redux';

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


class newProgressNote extends Component {

    render() {
        const { classes } = this.props;
        return (
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Progress Note</h4>
                    <p className={classes.cardCategoryWhite}>
                    {/* Created using Roboto Font Family */}
                    </p>
                </CardHeader>
                <CardBody>
                    <form>
                        <TextField
                            id="standard-multiline-flexible"
                            label="Problem List"
                            multiline
                            rowsMax="4"
                            fullWidth
                            //value={values.multiline}
                            //onChange={handleChange('multiline')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Current Management"
                            multiline
                            rowsMax="4"
                            fullWidth
                            //value={values.multiline}
                            //onChange={handleChange('multiline')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <selectTable />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Subjective findings"
                            multiline
                            rowsMax="4"
                            fullWidth
                            //value={values.multiline}
                            //onChange={handleChange('multiline')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="General Apperance And Condition"
                            multiline
                            rowsMax="4"
                            fullWidth
                            //value={values.multiline}
                            //onChange={handleChange('multiline')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="HEENT"
                            multiline
                            rowsMax="4"
                            fullWidth
                            //value={values.multiline}
                            //onChange={handleChange('multiline')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Neck"
                            multiline
                            rowsMax="4"
                            fullWidth
                            //value={values.multiline}
                            //onChange={handleChange('multiline')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Lung"
                            multiline
                            rowsMax="4"
                            fullWidth
                            //value={values.multiline}
                            //onChange={handleChange('multiline')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Heart"
                            multiline
                            rowsMax="4"
                            fullWidth
                            //value={values.multiline}
                            //onChange={handleChange('multiline')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Abdomen"
                            multiline
                            rowsMax="4"
                            fullWidth
                            //value={values.multiline}
                            //onChange={handleChange('multiline')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Extremeties"
                            multiline
                            rowsMax="4"
                            fullWidth
                            //value={values.multiline}
                            //onChange={handleChange('multiline')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Neuro"
                            multiline
                            rowsMax="4"
                            fullWidth
                            //value={values.multiline}
                            //onChange={handleChange('multiline')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Others"
                            multiline
                            rowsMax="4"
                            fullWidth
                            //value={values.multiline}
                            //onChange={handleChange('multiline')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Assessment"
                            multiline
                            rowsMax="4"
                            fullWidth
                            //value={values.multiline}
                            //onChange={handleChange('multiline')}
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Plan"
                            multiline
                            rowsMax="4"
                            fullWidth
                            //value={values.multiline}
                            //onChange={handleChange('multiline')}
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

export default compose(withStyles(style), connect(mapStateToProps, null))(newProgressNote);