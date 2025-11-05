import React from "react";
import { useLibrary } from "../context/LibraryContext";
import GenericTableMUI from "../components/common/MaterialUI/GenericTableMUI";
//import GenericTableTailwind from "../Tailwind/GenericTableTailwind"; // tu versión Tailwind

interface Action {
  name: string;
  label: string;
}

interface GenericTableProps {
  data: Record<string, any>[];
  columns: string[];
  actions?: Action[];
  onAction?: (name: string, item: Record<string, any>) => void;
  onAdd?: () => void;
  title?: string;
}

const GenericTable: React.FC<GenericTableProps> = (props) => {
  const { library } = useLibrary();
  if (library === "material") return <GenericTableMUI {...props} />;
  //return <GenericTableTailwind {...props} />;
};

export default GenericTable;
