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
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';


class CustomTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue0: 'a',
            selectedValue1: 'b',
            selectedValue2: 'c',
            selectedValue3: 'd',
            remark: ''
        }
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    render() {
        const { classes, tableHead, tableData, tableHeaderColor } = this.props;
        return (
            <div className={classes.tableResponsive}>
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
                                    <TableCell>{"i"}</TableCell>
                                    {prop.map((prop0, key) => {
                                        return (
                                            <TableCell 
                                                onClick={() => this.props.handleOnRowClick(prop[0])}
                                                className={classes.tableCell}
                                                key={key}
                                            >
                                            {prop0}
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell>
                                        <Radio
                                            checked={this.state.selectedValue0 + key === "a" + key}
                                            onChange={this.handleChange('selectedValue0' + key)}
                                            value={"a" + key}
                                            name={"radio-button-demo-"+key}
                                            aria-label="A"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Radio
                                            checked={this.state.selectedValue1 + key === "b" + key}
                                            onChange={this.handleChange('selectedValue1' + key)}
                                            value={"b" + key}
                                            name={"radio-button-demo-"+key}
                                            aria-label="B"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="standard-name"
                                            // label="Remark"
                                            className={classes.textField}
                                            value={this.state.remark}
                                            onChange={this.handleChange('remark' + key)}
                                            margin="normal"
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

CustomTable.defaultProps = {
    tableHeaderColor: "gray"
};

CustomTable.propTypes = {
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

export default withStyles(tableStyle)(CustomTable);
