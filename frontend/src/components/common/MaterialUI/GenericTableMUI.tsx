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


interface Action {
    name: string;
    label: string;
}

interface GenericTableProps {
    data: Record<string, any>[];
    columns: string[];
    actions?: Action[];
    onAction?: (name: string, item: Record<string, any>) => void;
    onAdd?: () => void; // Prop para el botón de agregar
    title?: string; // Opcional, título de la tabla
}

const GenericTableMUI: React.FC<GenericTableProps> = ({
    data,
    columns,
    actions = [],
    onAction = () => { },
    onAdd,
    title,
}) => {
    return (
        <Box>
            {title && <h2>{title}</h2>}
            {onAdd && (
                <Box mb={2}>
                    <Button variant="contained" color="primary" onClick={onAdd}>
                        Agregar
                    </Button>
                </Box>
            )}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((col) => (
                                <TableCell key={col}>{col}</TableCell>
                            ))}
                            {actions.length > 0 && <TableCell>Acciones</TableCell>}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={index}>
                                {columns.map((col) => (
                                    <TableCell key={col}>{item[col]}</TableCell>
                                ))}
                                {actions.length > 0 && (
                                    <TableCell>
                                        {actions.map((action) => (
                                            <Button
                                                key={action.name}
                                                variant="contained" // para que se vea relleno, no solo outline
                                                size="small"
                                                color={action.name === "edit" ? "primary" : action.name === "delete" ? "error" : "inherit"}
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
