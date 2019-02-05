import React, { Component } from 'react';
import Table from '../Table/CustomTableWithSelector';

export default class appointments extends Component {
  render() {
    return (
      <div>
        <Table
          tableHeaderColor="primary"
          tableHead={[" ", " ", "Normal", "Abnormal","Remark"]}
          tableData={[
            ["parents"],
            ["sublings"],
            ["others"]
          ]}
        />
      </div>
    )
  }
}
