import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  MenuItem
} from "@mui/material";

interface Field {
  name: string;
  label: string;
  type?: "text" | "number" | "email" | "password" | "select";
  options?: { value: any; label: string }[]; // 👈 añadida
}

interface GenericFormProps {
  open: boolean;
  title?: string;
  fields: Field[];
  initialData?: Record<string, any>;
  onClose: () => void;
  onSubmit: (formData: Record<string, any>) => void;
  selectOptions?: Record<string, { value: any; label: string }[]>;
}

const GenericFormMUI: React.FC<GenericFormProps> = ({
  open,
  title,
  fields,
  initialData,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    // Solo actualiza si initialData existe y no está vacío
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData(initialData);
    }
  }, [initialData]); // se ejecuta solo si initialData cambia realmente

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          {fields.map((field) =>
            field.type === "select" ? (
              <TextField
                key={field.name}
                select
                label={field.label}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                fullWidth
              >
                {field.options?.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                key={field.name}
                label={field.label}
                type={field.type || "text"}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                fullWidth
              />
            )
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="error">
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
