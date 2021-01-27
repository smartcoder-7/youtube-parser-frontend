import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

import Title from './Title';

function DiscrepencyList({ emails }) {
  return (
    <React.Fragment>
      <Title>Recent Files</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Emails With Discrepancies</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {emails.map((email) => (
            <TableRow key={email.toString()}>
              <TableCell>{email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default DiscrepencyList;
