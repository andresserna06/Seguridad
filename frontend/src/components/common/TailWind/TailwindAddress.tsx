import React from "react";

export interface InfoItem {
  label: string;
  value: string | number;
}

export interface Action {
  label: string;
  onClick: () => void;
  color?: "primary" | "error" | "success" | "inherit";
}

interface TailwindAddressProps {
  title: string;
  info?: InfoItem[];
  url?: string;
  actions?: Action[];
  emptyState?: { label: string; onAdd: () => void };
}

const TailwindAddress: React.FC<TailwindAddressProps> = ({
  title,
  info = [],
  url,
  actions = [],
  emptyState,
}) => {
  // Mapeo de colores a clases Tailwind
  const colorClasses = {
    primary: "bg-blue-600 hover:bg-blue-700",
    error: "bg-red-600 hover:bg-red-700",
    success: "bg-green-600 hover:bg-green-700",
    inherit: "bg-gray-500 hover:bg-gray-600",
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-4 bg-white rounded-lg shadow-md">
      {/* Título */}
      <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>

      {/* Mapa o imagen */}
      {url && (
        <div className="w-full h-64 rounded-md overflow-hidden mb-4">
          <iframe
            src={url}
            width="100%"
            height="100%"
            loading="lazy"
            className="w-full h-full border-0"
          ></iframe>
        </div>
      )}

      {/* Información */}
      {info.length > 0 ? (
        <div className="space-y-2">
          {info.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between border-b border-gray-200 pb-1"
            >
              <span className="font-semibold">{item.label}:</span>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      ) : emptyState ? (
        <div className="text-center mt-4">
          <p className="text-gray-600">{emptyState.label}</p>
          <button
            onClick={emptyState.onAdd}
            className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Agregar
          </button>
        </div>
      ) : null}

      {/* Acciones */}
      {actions.length > 0 && (
        <div className="mt-6 flex justify-center gap-3">
          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={action.onClick}
              className={`px-4 py-2 text-white rounded transition ${colorClasses[action.color || "primary"]
                }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TailwindAddress;
