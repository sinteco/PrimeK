import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';


class CustomDiagnosis extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes, tableHead, tableData, tableHeaderColor } = this.props;
        return (
            <div className={classes.tableResponsive}>
                <FormGroup row>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Visit</InputLabel>
                        <Select
                            native
                            // value={this.state.age}
                            // onChange={this.handleChange('age')}
                            inputProps={{
                                name: 'age',
                                id: 'age-native-simple',
                            }}
                        >
                            <option value="" />
                            <option value={10}>diag</option>
                            <option value={20}>diag1</option>
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" className={classes.button}>
                        Add
                    </Button>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Visit</InputLabel>
                        <Select
                            native
                            // value={this.state.age}
                            // onChange={this.handleChange('age')}
                            inputProps={{
                                name: 'age',
                                id: 'age-native-simple',
                            }}
                        >
                            <option value="" />
                            <option value={10}>New</option>
                            <option value={20}>Revisit</option>
                        </Select>
                    </FormControl>
                </FormGroup>
                <Table className={classes.table}>
                    {tableHead !== undefined ? (
                        <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                            <TableRow>
                                {tableHead.map((prop, key) => {
                                    return (
                                        <TableCell
                                            className={classes.tableCell + " " + classes.tableHeadCell}
                                            key={key}
                                        >
                                            {prop}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        </TableHead>
                    ) : null}
                    <TableBody>
                        {tableData.map((prop, key) => {
                            return (
                                <TableRow key={key} style={{ cursor: 'pointer' }}>
                                    {prop.map((prop0, key) => {
                                        return (
                                            <TableCell onClick={() => this.props.handleOnRowClick(prop[0])} className={classes.tableCell} key={key}>
                                                {prop0}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

CustomDiagnosis.defaultProps = {
    tableHeaderColor: "gray"
};

CustomDiagnosis.propTypes = {
    classes: PropTypes.object.isRequired,
    tableHeaderColor: PropTypes.oneOf([
        "warning",
        "primary",
        "danger",
        "success",
        "info",
        "rose",
        "gray"
    ]),
    tableHead: PropTypes.arrayOf(PropTypes.string),
    tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default withStyles(tableStyle)(CustomDiagnosis);
