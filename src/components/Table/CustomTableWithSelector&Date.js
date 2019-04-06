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
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';


class CustomTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: ['a', 'b', 'c'],
            remark: ['', '', ''],
            selectedDate: []
        }
        this.allNormal = this.allNormal.bind(this);
        this.allUbnormal = this.allUbnormal.bind(this);
    }
    handleChange = (name, key) => event => {
        var value = event.target.value;
        this.setState({
            [name]: [...this.state[name].splice(0, key), event.target.value]
        }, () => this.props.hadleTableEvent(this.props.tableData[key], value, this.state.remark[key]));
    };
    handleRemarkChange = (name, key) => event => {
        var value = event.target.value;
        this.setState({
            [name]: [...this.state[name].splice(0, key), event.target.value]
        }, () => this.props.hadleTableRemarkEvent(this.props.tableData[key], value, this.state.remark[key]));
    };
    handleDateChange = (date, name, key) => {
        this.setState({
            [name]: [...this.state[name].splice(0, key), date]
        }, () => console.log(this.state[name]));
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
    setDate(){
        this.props.tableData.map((obj)=>{
            var array = this.state.selectedDate;
            array.push(Date());
            this.setState({
                selectedDate: array
            });
        });
    }
    componentDidMount = () => {
        this.setDate();
    }
    
    render() {
        const { classes, tableHead, tableData, tableHeaderColor } = this.props;
         
        return (
            <div className={classes.tableResponsive}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.allNormal}
                >
                    All Normal
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.allUbnormal}
                >
                    All Ubnormal
                </Button>
                <Table className={classes.table} padding="checkbox">
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
                                <TableRow key={key}>
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
                                            checked={this.state.selectedValue[key] === "n" + key}
                                            onChange={this.handleChange('selectedValue', key)}
                                            value={"n" + key}
                                            name={"radio-button-demo-" + key}
                                            aria-label="Normal"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Radio
                                            checked={this.state.selectedValue[key] === "u" + key}
                                            onChange={this.handleChange('selectedValue', key)}
                                            value={"u" + key}
                                            name={"radio-button-demo-" + key}
                                            aria-label="Ubnormal"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DatePicker
                                                margin="normal"
                                                label="Date"
                                                value={this.state.selectedDate[key]}
                                                onChange={(e)=>this.handleDateChange(e,'selectedDate',key)}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="standard-name"
                                            // label="Remark"
                                            className={classes.textField}
                                            value={this.state.remark[key]}
                                            onChange={this.handleRemarkChange('remark', key)}
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
