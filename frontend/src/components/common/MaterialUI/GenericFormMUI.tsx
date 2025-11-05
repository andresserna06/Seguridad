import React from "react";
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
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface FieldType {
  name: string;
  label: string;
  type?: "text" | "number" | "email" | "password" | "select" | "datetime-local" | "checkbox";
  options?: { value: any; label: string }[];
  required?: boolean;
}

interface GenericFormFormikProps {
  open: boolean;
  title?: string;
  fields: FieldType[];
  initialData?: Record<string, any>;
  onClose: () => void;
  onSubmit: (formData: Record<string, any>) => void;
}

const GenericFormFormik: React.FC<GenericFormFormikProps> = ({
  open,
  title,
  fields,
  initialData,
  onClose,
  onSubmit
}) => {
  // Validación dinámica usando Yup
  const validationSchema = Yup.object(
    fields.reduce((acc, field) => {
      if (field.required) {
        if (field.type === "email") {
          acc[field.name] = Yup.string()
            .email("Email inválido")
            .required(`${field.label} es obligatorio`);
        } else if (field.type === "number") {
          acc[field.name] = Yup.number()
            .typeError("Debe ser un número")
            .required(`${field.label} es obligatorio`);
        } else if (field.type === "checkbox") {
          acc[field.name] = Yup.boolean();
        } else {
          acc[field.name] = Yup.string().required(`${field.label} es obligatorio`);
        }
      }
      return acc;
    }, {} as Record<string, any>)
  );

  // Valores iniciales
  const initialValues = fields.reduce((acc, field) => {
    if (field.type === "checkbox") {
      acc[field.name] = initialData?.[field.name] ?? false;
    } else {
      acc[field.name] = initialData?.[field.name] ?? "";
    }
    return acc;
  }, {} as Record<string, any>);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmit(values);
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Box display="flex" flexDirection="column" gap={2} mt={1}>
                {fields.map((field) => {
                  // Checkbox especial
                  if (field.type === "checkbox") {
                    return (
                      <div key={field.name} className="flex items-center gap-2">
                        <Field type="checkbox" name={field.name} />
                        <label htmlFor={field.name}>{field.label}</label>
                        <ErrorMessage name={field.name}>
                          {(msg) => <p style={{ color: "red", fontSize: "0.8rem" }}>{msg}</p>}
                        </ErrorMessage>
                      </div>
                    );
                  }

                  // Select
                  if (field.type === "select") {
                    return (
                      <div key={field.name}>
                        <Field name={field.name} as={TextField} select label={field.label} fullWidth>
                          {field.options?.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Field>
                        <ErrorMessage name={field.name}>
                          {(msg) => <p style={{ color: "red", fontSize: "0.8rem" }}>{msg}</p>}
                        </ErrorMessage>
                      </div>
                    );
                  }

                  // Otros tipos
                  return (
                    <div key={field.name}>
                      <Field
                        name={field.name}
                        as={TextField}
                        label={field.label}
                        type={field.type || "text"}
                        fullWidth
                      />
                      <ErrorMessage name={field.name}>
                        {(msg) => <p style={{ color: "red", fontSize: "0.8rem" }}>{msg}</p>}
                      </ErrorMessage>
                    </div>
                  );
                })}
              </Box>

              <DialogActions>
                <Button onClick={onClose} color="error">
                  Cancelar
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Guardar
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default GenericFormFormik;
