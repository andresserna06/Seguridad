import { User } from "../../../models/user";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface TailwindUserFormProps {
  mode: number; // 1 = crear, 2 = actualizar
  handleCreate?: (values: User) => void;
  handleUpdate?: (values: User) => void;
  user?: User | null;
}

const TailwindUserForm: React.FC<TailwindUserFormProps> = ({
  mode,
  handleCreate,
  handleUpdate,
  user,
}) => {
  const handleSubmit = (values: User) => {
    if (mode === 1 && handleCreate) handleCreate(values);
    else if (mode === 2 && handleUpdate) handleUpdate(values);
    else console.error("No function provided for the current mode");
  };

  return (
    <Formik
      initialValues={
        user
          ? user
          : {
              name: "",
              email: "",
              phone: "",
              password: "",
            }
      }
      validationSchema={Yup.object({
        name: Yup.string().required("El nombre es obligatorio"),
        email: Yup.string()
          .email("Correo electrónico inválido")
          .required("El email es obligatorio"),
        password:
          mode === 1
            ? Yup.string()
                .min(6, "La contraseña debe tener al menos 6 caracteres")
                .required("La contraseña es obligatoria")
            : Yup.string().notRequired(),
      })}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ handleSubmit }) => (
        <Form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white dark:bg-boxdark p-8 rounded-2xl shadow-md border border-gray-200 dark:border-strokedark"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
            {mode === 1 ? "Crear Usuario" : "Actualizar Usuario"}
          </h2>

          <div className="space-y-5">
            {/* Nombre */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
              >
                Nombre
              </label>
              <Field
                type="text"
                name="name"
                placeholder="Ingresa el nombre completo"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
              >
                Correo electrónico
              </label>
              <Field
                type="email"
                name="email"
                placeholder="correo@ejemplo.com"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Contraseña */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
              >
                Contraseña {mode === 2 && "(opcional)"}
              </label>
              <Field
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {mode === 1 ? "Crear Usuario" : "Actualizar Usuario"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TailwindUserForm;
