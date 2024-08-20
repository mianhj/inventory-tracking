import * as Yup from 'yup';
export async function validateRequest(schema: Yup.Schema, payload: any) {
  try {
    await schema.validate(payload);
    return null;
  } catch (validationError: any) {
    const { path, errors } = validationError;
    return {
      [path]: errors[0],
    };
  }
}
