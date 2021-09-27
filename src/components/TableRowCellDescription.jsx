import React from 'react';

import { TableRowCell, Input } from './TaskTable';

const TableRowCellDescription = ({ onClick, handleChange, editing, task }) => {
  return (
    <TableRowCell
      description
      onClick={ onClick }
    >
      { task.isEditing ?
        <Input
          type="text"
          id="description"
          value={ editing.description }
          onChange={ handleChange }
          placeholder="Update your description"
        />
        :
        task.description
      }
    </TableRowCell>
  );
};

export default TableRowCellDescription;
