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


class CustomTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: ['a','b','c'],
            remark: [],
        }
        this.allNormal = this.allNormal.bind(this);
        this.allUbnormal = this.allUbnormal.bind(this);
    }
    handleRemarkChange = (name, key, textb) => event => {
        var value = event.target.value;
        this.setState({
            [name]: [...this.state[name], {
                key: key,
                row: textb,
                value: value
            }]
        }, () => this.props.hadleTableRemarkEvent(this.props.tableData[key], this.state.remark, textb, key, this.state.selectedValue[key]));
    }
    handleChange = (name, key) => event => {
        var value = event.target.value;
        this.setState({
            [name]: [...this.state[name].splice(0, key), event.target.value]
        }, () => this.props.hadleTableEvent(this.props.tableData[key], value, this.state.remark[key]));
    };
    allNormal() {
        this.setState({
            selectedValue: []
        }, function(){
            let item  = [];
            this.props.tableData.map((prop, key) => {
                item.push('n'+key);
                this.props.hadleTableEvent(prop, 'n'+key, "");
            });
            this.setState({selectedValue: [...this.state.selectedValue, ...item]});
        });
    }
    allUbnormal() {
        this.setState({ 
            selectedValue: []
        }, function(){
            let item  = [];
            this.props.tableData.map((prop, key) => {
                item.push('u'+key);
                this.props.hadleTableEvent(prop, 'u'+key, "");
            });
            this.setState({selectedValue: [...this.state.selectedValue, ...item]});
        });
    }
    render() {
        const { classes, tableHead, tableData, tableHeaderColor, textBox, radio, disabled, dataTable } = this.props;
        
        return (
            <div className={classes.tableResponsive}>
                <Button 
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.allNormal}
                    disabled={disabled != "" ? disabled : false}
                >
                    All Normal
                </Button>
                <Button 
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.allUbnormal}
                    disabled={disabled != "" ? disabled : false}
                >
                    All Ubnormal
                </Button>
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
                                            checked={dataTable != undefined ? dataTable[key].Yes != undefined ? dataTable[key].Yes : dataTable[key].Normal : this.state.selectedValue[key] === "n" + key}
                                            onChange={this.handleChange('selectedValue', key)}
                                            value={"n" + key}
                                            disabled={disabled != "" ? disabled : false}
                                            name={"radio-button-demo-"+key}
                                            aria-label="Normal"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Radio
                                            checked={dataTable != undefined ? dataTable[key].Yes != undefined ? dataTable[key].No : dataTable[key].Abnormal : this.state.selectedValue[key] === "u" + key}
                                            onChange={this.handleChange('selectedValue', key)}
                                            value={"u" + key}
                                            disabled={disabled != "" ? disabled : false}
                                            name={"radio-button-demo-"+key}
                                            aria-label="Ubnormal"
                                        />
                                    </TableCell>
                                    {
                                        Array(textBox).length==1?
                                        [...Array(textBox)].map((textb, k) => {
                                            return (
                                                    <TableCell>
                                                        <TextField
                                                            id="standard-name"
                                                            disabled={disabled != "" ? disabled : false}
                                                            className={classes.textField}
                                                            value={dataTable != undefined ? dataTable[key][k==0?'Remark':'Remark'] : this.state.remark.filter(function (obj) {
                                                                if(obj.key==key&&obj.row==k)
                                                                    return obj;
                                                            }).value}
                                                            onChange={this.handleRemarkChange('remark', key, k)}
                                                            margin="normal"
                                                        />
                                                    </TableCell>
                                            );
                                        })
                                        :
                                        [...Array(textBox)].map((textb, k) => {
                                            return (
                                                    <TableCell>
                                                        <TextField
                                                            id="standard-name"
                                                            disabled={disabled != "" ? disabled : false}
                                                            className={classes.textField}
                                                            value={dataTable != undefined ? dataTable[key][k==0?'DiagnosisYear':'Remark'] : this.state.remark.filter(function (obj) {
                                                                if(obj.key==key&&obj.row==k)
                                                                    return obj;
                                                            }).value}
                                                            onChange={this.handleRemarkChange('remark', key, k)}
                                                            margin="normal"
                                                        />
                                                    </TableCell>
                                            );
                                        })
                                    }
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
