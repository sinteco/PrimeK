import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

const Assignment = ({item}) => (
                <TableRow>
                    <Checkbox />
                    <TableCell>{item.CardNumber}</TableCell>
                    <TableCell>{item.PatientFullName}</TableCell>
                    <TableCell>{item.DoctorFullName}</TableCell>
                    <TableCell>{item.Date}</TableCell>
                </TableRow>
	);

export default Assignment;
