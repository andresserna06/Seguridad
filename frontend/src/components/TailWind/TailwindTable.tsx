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
}

function TailwindTable<T extends Record<string, any>>({
  data,
  columns,
  actions = [],
  onAction,
  title = "Datos",
  onAdd,
  addButtonLabel = "Agregar",
}: TailwindTableProps<T>) {
  // Estado vacío
  if (data.length === 0) {
    return (
      <div className="space-y-4">
        {/* Header con título y botón agregar */}
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

        <div className="rounded-2xl shadow-card border border-stroke bg-white p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">👥</span>
            </div>
            <h3 className="text-lg font-semibold text-black mb-2">
              No hay datos disponibles
            </h3>
            <p className="text-sm text-body">
              Agrega algunos registros para comenzar
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getColumnLabel = (column: keyof T): string => {
    const label = String(column);
    return label.charAt(0).toUpperCase() + label.slice(1);
  };

  return (
    <div className="space-y-4">
      {/* Header con título y botón agregar */}
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
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={`
                    ${index % 2 === 0 ? "bg-white" : "bg-gray-2"}
                    hover:bg-gray transition-all duration-200 ease-in-out group
                  `}
                >
                  {columns.map((column) => (
                    <td key={String(column)} className="px-6 py-4">
                      {column === columns[0] ? (
                        <div className="flex items-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-semibold group-hover:scale-110 transition-transform duration-200">
                            {item[column]}
                          </span>
                        </div>
                      ) : (
                        <div className={`text-sm ${column === columns[1] ? 'font-medium text-black' : 'text-body'}`}>
                          {item[column]}
                        </div>
                      )}
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {actions.map((action) => (
                          <button
                            key={action.name}
                            onClick={() => onAction?.(action.name, item)}
                            className={`
                              group/btn relative px-3 py-2 rounded-xl
                              ${action.name === "edit" 
                                ? "bg-meta-5/10 hover:bg-meta-5/20 focus:ring-meta-5" 
                                : action.name === "delete"
                                ? "bg-danger/10 hover:bg-danger/20 focus:ring-danger"
                                : "bg-primary/10 hover:bg-primary/20 focus:ring-primary"
                              }
                              transition-all duration-200
                              hover:scale-110 hover:shadow-2
                              active:scale-95
                              focus:outline-none focus:ring-2 focus:ring-offset-2
                            `}
                            title={action.label}
                            aria-label={action.label}
                          >
                            <span className={`text-sm font-medium ${
                              action.name === "edit" 
                                ? "text-meta-5" 
                                : action.name === "delete"
                                ? "text-danger"
                                : "text-primary"
                            }`}>
                              {action.name === "edit" ? "✏️" : action.name === "delete" ? "🗑️" : "⚙️"}
                            </span>
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
        
        {/* Footer con contador */}
        <div className="px-6 py-3 bg-gray-2 border-t border-stroke">
          <p className="text-sm text-body text-center">
            Mostrando <span className="font-semibold text-primary">{data.length}</span> {data.length === 1 ? 'registro' : 'registros'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TailwindTable as <T extends Record<string, any>>(
  props: TailwindTableProps<T>
) => JSX.Element;