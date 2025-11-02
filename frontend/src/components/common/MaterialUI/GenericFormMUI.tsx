import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";

interface Field {
  name: string; // nombre del campo (debe coincidir con la propiedad del objeto)
  label: string; // etiqueta visible
  type?: "text" | "number" | "email" | "password"; // tipo de input
}

interface GenericFormProps {
  open: boolean; // controlar apertura del modal
  title?: string; // título del formulario
  fields: Field[]; // definición de los campos del formulario
  initialData?: Record<string, any>; // datos iniciales (para update)
  onClose: () => void; // cerrar modal
  onSubmit: (formData: Record<string, any>) => void; // enviar datos
}

const GenericFormMUI: React.FC<GenericFormProps> = ({
  open,
  title,
  fields,
  initialData = {},
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    setFormData(initialData); // cargar datos iniciales si existen
  }, [initialData]);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    // opcional: reset formData si quieres limpiar después de enviar
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          {fields.map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              type={field.type || "text"}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              fullWidth
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GenericFormMUI;
