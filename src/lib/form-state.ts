export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialFormState: FormState = { status: "idle", message: "" };

export type AdminFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const adminInitialState: AdminFormState = { status: "idle", message: "" };
