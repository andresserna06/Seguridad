// src/components/common/MaterialUI/GenericTableMUI.tsx
import React from "react";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    Button,
    Box,
} from "@mui/material";

// Acciones para cada fila
interface Action {
    name: string;
    label: string;
}

// Definición de columna: key = propiedad real, label = nombre mostrado
interface Column {
    key: string;
    label: string;
}

// Props del componente
interface GenericTableProps {
    data: Record<string, any>[];
    columns: Column[]; // ahora es Column[] en vez de string[]
    actions?: Action[];
    onAction?: (name: string, item: Record<string, any>) => void;
    onAdd?: () => void; // botón agregar
    title?: string; // título opcional
}

const GenericTableMUI: React.FC<GenericTableProps> = ({
    data,
    columns,
    actions = [],
    onAction = () => {},
    onAdd,
    title,
}) => {
    return (
        <Box>
            {title && <h2>{title}</h2>}

            {onAdd && (
                <Box mb={2}>
                    <Button variant="contained" color="success" onClick={onAdd}>
                        Agregar
                    </Button>
                </Box>
            )}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((col) => (
                                <TableCell key={col.key}>{col.label}</TableCell>
                            ))}
                            {actions.length > 0 && <TableCell>Acciones</TableCell>}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={index}>
                                {columns.map((col) => (
                                    <TableCell key={col.key}>{item[col.key]}</TableCell>
                                ))}

                                {actions.length > 0 && (
                                    <TableCell>
                                        {actions.map((action) => (
                                            <Button
                                                key={action.name}
                                                variant="contained"
                                                size="small"
                                                color={
                                                    action.name === "edit"
                                                        ? "primary"
                                                        : action.name === "delete"
                                                        ? "error"
                                                        : "inherit"
                                                }
                                                onClick={() => onAction(action.name, item)}
                                                style={{ marginRight: 8 }}
                                            >
                                                {action.label}
                                            </Button>
                                        ))}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default GenericTableMUI;
