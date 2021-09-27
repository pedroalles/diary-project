import React from 'react';

import { TableRowCell, Input } from './TaskTable';

const TableRowCellTitle = ({ onClick, handleChange, editing, task }) => {
  return (
    <TableRowCell
      title
      onClick={ onClick }
    >
      { task.isEditing ?
        <Input
          type="text"
          id="title"
          value={ editing.title }
          onChange={ handleChange }
          placeholder="Update your title"
        />
        :
        task.title
      }
    </TableRowCell>
  );
};

export default TableRowCellTitle;
