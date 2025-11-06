import React from "react";

interface Action {
  name: string;
  label: string;
}

interface TailwindTableProps<T> {
  data: T[];
  columns: (keyof T)[];
  actions?: Action[];
  onAction?: (action: string, item: T) => void;
  title?: string;
  onAdd?: () => void;
  addButtonLabel?: string;
  renderCell?: (item: T, col: keyof T, rowIndex: number) => React.ReactNode; // <-- aquí
}

function TailwindTable<T extends Record<string, any>>({
  data,
  columns,
  actions = [],
  onAction,
  title = "Datos",
  onAdd,
  addButtonLabel = "Agregar",
  renderCell, // <-- recibirlo
}: TailwindTableProps<T>) {
  const getColumnLabel = (column: keyof T): string => {
    const label = String(column);
    return label.charAt(0).toUpperCase() + label.slice(1);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-title-md font-semibold text-black">{title}</h2>
        {onAdd && (
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <span className="text-lg">➕</span>
            {addButtonLabel}
          </button>
        )}
      </div>

      {/* Tabla */}
      <div className="overflow-hidden rounded-2xl shadow-card border border-stroke bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-primary text-white">
                {columns.map((column) => (
                  <th
                    key={String(column)}
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    {getColumnLabel(column)}
                  </th>
                ))}
                {actions.length > 0 && (
                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">
                    Acciones
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke">
              {data.map((item, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-2"} hover:bg-gray transition-all duration-200 ease-in-out group`}
                >
                  {columns.map((column) => (
                    <td key={String(column)} className="px-6 py-4 text-sm text-body">
                      {renderCell ? renderCell(item, column, rowIndex) : item[column]}
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {actions.map((action) => (
                          <button
                            key={action.name}
                            onClick={() => onAction?.(action.name, item)}
                            className={`px-3 py-2 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 ${
                              action.name === "edit"
                                ? "bg-meta-5/10 hover:bg-meta-5/20 text-meta-5"
                                : action.name === "delete"
                                ? "bg-danger/10 hover:bg-danger/20 text-danger"
                                : "bg-primary/10 hover:bg-primary/20 text-primary"
                            }`}
                            title={action.label}
                          >
                            {action.name === "edit"
                              ? "✏️"
                              : action.name === "delete"
                              ? "🗑️"
                              : "❔"}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-2 border-t border-stroke">
          <p className="text-sm text-body text-center">
            Mostrando <span className="font-semibold text-primary">{data.length}</span>{" "}
            {data.length === 1 ? "registro" : "registros"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TailwindTable as <T extends Record<string, any>>(props: TailwindTableProps<T>) => JSX.Element;
