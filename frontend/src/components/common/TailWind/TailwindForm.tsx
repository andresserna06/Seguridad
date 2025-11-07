import React from "react";
import { Formik, Form, Field as FormikField, ErrorMessage } from "formik";
import * as Yup from "yup";

export interface Field {
  name: string;
  label: string;
  type: "text" | "number" | "select" | "email" | "password" | "checkbox" | "datetime-local"; // ← AGREGADO
  options?: { value: string; label: string }[];
  required?: boolean;
}

interface GenericTailwindFormProps {
  title?: string;
  fields: Field[];
  initialData?: Record<string, any>;
  onSubmit: (formData: Record<string, any>) => Promise<void>;
  onCancel: () => void;
}

const GenericTailwindForm: React.FC<GenericTailwindFormProps> = ({
  title,
  fields,
  initialData = {},
  onSubmit,
  onCancel,
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
        } else if (field.type === "datetime-local") {
          // ← AGREGADO: Validación para datetime-local
          acc[field.name] = Yup.string().required(`${field.label} es obligatorio`);
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
    <div className="max-w-md mx-auto p-4">
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await onSubmit(values);
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {fields.map((field) => (
              <div key={field.name} className="flex flex-col">
                <label htmlFor={field.name} className="mb-1 font-semibold">
                  {field.label}
                </label>

                {/* Checkbox */}
                {field.type === "checkbox" ? (
                  <div className="flex items-center gap-2">
                    <FormikField type="checkbox" name={field.name} />
                    <ErrorMessage name={field.name}>
                      {(msg) => <p className="text-red-500 text-sm">{msg}</p>}
                    </ErrorMessage>
                  </div>
                ) : field.type === "select" && field.options ? (
                  // Select
                  <FormikField
                    as="select"
                    name={field.name}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecciona...</option>
                    {field.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </FormikField>
                ) : (
                  // Otros tipos (incluyendo datetime-local)
                  <FormikField
                    name={field.name}
                    type={field.type}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}

                <ErrorMessage name={field.name}>
                  {(msg) => <p className="text-red-500 text-sm">{msg}</p>}
                </ErrorMessage>
              </div>
            ))}

            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Cancelar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GenericTailwindForm;