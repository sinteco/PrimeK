import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });
  
class selectTable extends Component {
    render() {
        const rows = [
            [0,'Frozen yoghurt', 159, 6.0, 24, 4.0],
            [1,'Ice cream sandwich', 237, 9.0, 37, 4.3],
            [2,'Eclair', 262, 16.0, 24, 6.0],
            [3,'Cupcake', 305, 3.7, 67, 4.3],
            [4,'Gingerbread', 356, 16.0, 49, 3.9],
          ];
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat (g)</TableCell>
                        <TableCell align="right">Carbs (g)</TableCell>
                        <TableCell align="right">Protein (g)</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map(row => (
                        <TableRow key={row[0]}>
                        <TableCell component="th" scope="row">
                            {row[1]}
                        </TableCell>
                        <TableCell align="right">{row[2]}</TableCell>
                        <TableCell align="right">{row[3]}</TableCell>
                        <TableCell align="right">{row[4]}</TableCell>
                        <TableCell align="right">{row[5]}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default withStyles(styles)(selectTable);