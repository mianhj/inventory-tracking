import * as Yup from 'yup';

export const updateProductSchema = Yup.object({
  name: Yup.string().label('Name').trim().min(1).max(100).required(),
  image: Yup.string().label('Image').required(),
  price: Yup.number().min(0).required(),
  stock: Yup.number().min(0).integer().required(),
  reason: Yup.string().optional(),
});
