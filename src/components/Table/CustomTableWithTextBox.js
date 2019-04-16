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


class CustomTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: ['a', 'b', 'c'],
            remark: []
        }
        this.allNormal = this.allNormal.bind(this);
        this.allUbnormal = this.allUbnormal.bind(this);
    }
    handleChange = (name, key, row) => event => {
        var value = event.target.value;
        this.setState({
            remark: [...this.state.remark, {
                key: key,
                value: value,
                row: row
            }]
        }, () => this.props.hadleTableEvent(value,this.props.tableData[key][0],row));
    };
    allNormal() {
        this.setState({
            selectedValue: []
        }, function () {
            let item = [];
            this.props.tableData.map((prop, key) => {
                item.push('n' + key);
            });
            this.setState({ selectedValue: [...this.state.selectedValue, ...item] });
        });
    }
    allUbnormal() {
        this.setState({
            selectedValue: []
        }, function () {
            let item = [];
            this.props.tableData.map((prop, key) => {
                item.push('u' + key);
            });
            this.setState({ selectedValue: [...this.state.selectedValue, ...item] });
        });
    }
    render() {
        const { classes, tableHead, tableData, tableHeaderColor, disabled, dataTable } = this.props;
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
                                        <TextField
                                            id="standard-name"
                                            // label="Remark"
                                            disabled={disabled!=""?disabled:false}
                                            className={classes.textField}
                                            value={dataTable != undefined ? dataTable[key].Remark : this.state.remark.filter(function(obj) {
                                                if(obj.key == key && obj.row == 'r1')
                                                    return(obj);
                                            }).value}
                                            onChange={this.handleChange('remark', key, "r1")}
                                            margin="normal"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="standard-name"
                                            // label="Remark"
                                            disabled={disabled != "" ? disabled : false}
                                            className={classes.textField}
                                            value={dataTable != undefined ? dataTable[key].Quantity : this.state.remark.filter((obj) => {
                                                if (obj.key == key && obj.row == 'r2')
                                                    return(obj);
                                            }).value}
                                            onChange={this.handleChange('remark', key, "r2")}
                                            margin="normal"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="standard-name"
                                            // label="Remark"
                                            disabled={disabled != "" ? disabled : false}
                                            className={classes.textField}
                                            value={dataTable != undefined ? dataTable[key].Frequency : this.state.remark.filter((obj) => {
                                                if (obj.key == key && obj.row == 'r3')
                                                    return(obj)
                                            }).value}
                                            onChange={this.handleChange('remark', key, "r3")}
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
