import React from 'react';

import { TableRowCell } from './TaskTable';

import SaveButton from './SaveButton';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

const TableRowCellActions = ({ task, mode }) => {

  if (mode === 'task') {
    return (

      <TableRowCell center actions>
        { task.isEditing ?

          <SaveButton task={ task } mode="task" />
          :
          <EditButton task={ task } mode="task" />
        }
        <DeleteButton task={ task } mode="task" />

      </TableRowCell >

    );
  }

  if (mode === "update") {
    const { updateObj } = task;
    return (

      <TableRowCell center actions>

        { updateObj.isEditing ?

          <SaveButton task={ task } mode="update" />
          :
          <EditButton task={ task } mode="update" />
        }

        <DeleteButton task={ task } mode="update" />

      </TableRowCell >

    );
  }
};

export default TableRowCellActions;
