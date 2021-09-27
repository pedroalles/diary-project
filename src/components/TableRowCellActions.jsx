import React from 'react';

import { TableRowCell, Button } from './TaskTable';

const TableRowCellActions = ({ task, save, edit, del }) => {
  return (
    <TableRowCell
      center
      actions
    >
      { task.isEditing ?
        <Button save onClick={ save }>
          <i className="fas fa-save fa-2x"></i>
        </Button>
        :
        <Button edit onClick={ edit }>
          <i className="fas fa-pencil-alt fa-2x"></i>
        </Button>
      }
      <Button delete onClick={ del }>
        <i className="fas fa-trash fa-2x"></i>
      </Button>
    </TableRowCell >
  );
};

export default TableRowCellActions;
