import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Eye } from 'lucide-react';

interface Column {
  header: string;
  accessor: string | ((row: any) => string);
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onApply?: (jobId: string) => void;
}

export default function DataTable({ columns, data, onView, onEdit, onDelete, onApply }: DataTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-x-auto"
    >
      <table className="min-w-full bg-white">
        <thead className="bg-gradient-to-r from-blue-300 to-purple-300 text-gray-800 uppercase text-sm leading-normal">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={`py-3 px-6 text-left ${index === 0 ? 'sticky left-0 bg-blue-300 z-10' : ''}`}>{column.header}</th>
            ))}
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data.map((row, rowIndex) => (
            <motion.tr
              key={rowIndex}
              className="border-b border-gray-200 hover:bg-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: rowIndex * 0.05 }}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className={`py-3 px-6 text-left whitespace-nowrap ${colIndex === 0 ? 'sticky left-0 bg-white z-10' : ''}`}>
                  <div className="flex items-center">
                    {typeof column.accessor === 'function'
                      ? column.accessor(row)
                      : row[column.accessor]}
                  </div>
                </td>
              ))}
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  {onView && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onView(row.id)}
                      className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                    >
                      <Eye size={16} />
                    </motion.button>
                  )}
                  {onEdit && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onEdit(row.id)}
                      className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"
                    >
                      <Edit size={16} />
                    </motion.button>
                  )}
                  {onDelete && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onDelete(row.id)}
                      className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  )}
                  {onApply && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onApply(row.id)}
                      className="w-4 mr-2 transform hover:text-green-500 hover:scale-110"
                    >
                      Apply
                    </motion.button>
                  )}
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
