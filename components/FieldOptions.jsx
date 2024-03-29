import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faPen,
  faGripVertical,
} from "@fortawesome/free-solid-svg-icons";

export default function FieldOptions({ onDelete, onEdit, dragHandleProps }) {
  return (
    <div className="absolute top-0 right-0 flex items-center space-x-2 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-in-out">
      <div {...dragHandleProps} className="cursor-move text-lg">
        <FontAwesomeIcon icon={faGripVertical} />
      </div>

      <FontAwesomeIcon
        icon={faPen}
        onClick={onEdit}
        className="cursor-pointer text-lg"
      />

      <FontAwesomeIcon
        icon={faTrashAlt}
        onClick={onDelete}
        className="cursor-pointer text-lg"
      />
    </div>
  );
}
