import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

export interface FieldType {
  name: string;
  label: string;
  type?: "text" | "number" | "email" | "password" | "select" | "datetime-local" | "checkbox";
  options?: { value: any; label: string }[];
  required?: boolean;
}

interface GenericTailwindFormProps {
  open?: boolean;
  fields: FieldType[];
  initialData?: Record<string, any>;
  onSubmit: (formData: Record<string, any>, helpers?: FormikHelpers<any>) => Promise<void>;
  onCancel: () => void;
  title?: string;
}

const GenericTailwindForm: React.FC<GenericTailwindFormProps> = ({
  open,
  fields,
  initialData = {},
  onSubmit,
  onCancel,
  title,
}) => {
  if (!open) return null;

  // Validación dinámica con Yup
  const validationSchema = Yup.object(
    fields.reduce((acc, field) => {
      if (field.required) {
        switch (field.type) {
          case "email":
            acc[field.name] = Yup.string()
              .email("Email inválido")
              .required(`${field.label} es obligatorio`);
            break;
          case "number":
            acc[field.name] = Yup.number()
              .typeError("Debe ser un número")
              .required(`${field.label} es obligatorio`);
            break;
          case "checkbox":
            acc[field.name] = Yup.boolean();
            break;
          default:
            acc[field.name] = Yup.string().required(`${field.label} es obligatorio`);
        }
      }
      return acc;
    }, {} as Record<string, any>)
  );

  // Valores iniciales
  const initialValues = fields.reduce((acc, field) => {
    if (field.type === "checkbox") {
      acc[field.name] = initialData[field.name] ?? false;
    } else {
      acc[field.name] = initialData[field.name] ?? "";
    }
    return acc;
  }, {} as Record<string, any>);

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-md bg-white">
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            {fields.map((field) => (
              <div key={field.name} className="flex flex-col">
                {field.type !== "checkbox" && (
                  <label htmlFor={field.name} className="mb-1 font-semibold">
                    {field.label}
                  </label>
                )}

                {field.type === "select" && field.options ? (
                  <Field
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
                  </Field>
                ) : field.type === "checkbox" ? (
                  <div className="flex items-center gap-2">
                    <Field type="checkbox" name={field.name} />
                    <label htmlFor={field.name}>{field.label}</label>
                  </div>
                ) : (
                  <Field
                    name={field.name}
                    type={field.type}
                    placeholder={field.label}
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
                disabled={isSubmitting}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
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
