'use client';

import AppTextField from '@/components/AppTextField';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Product from '@/types/Product';
import { Formik, Form } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Icons } from '@/components/icons';
import _ from 'lodash';
import AppTextarea from '@/components/AppTextarea';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export type ProductFormProps = { id: string };

function ProductForm({ id }: ProductFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id !== 'add') {
      const fetchProduct = async () => {
        try {
          setLoading(true);

          const response = await fetch(`/api/products/${id}`, {
            method: 'GET',
          });

          const data: Product = await response.json();

          if (response.status === 200) {
            setProduct(data);
          } else {
            throw data;
          }
        } catch (err: { error: string }) {
          const { dismiss } = toast({
            title: 'Failed To load Product',
            description: err.error,
            className: 'bg-red-600 text-white',
          });
          setTimeout(dismiss, 5000);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    } else {
      setLoading(false);
      setProduct(null);
    }
  }, [id]);

  return (
    <div>
      <Formik
        initialValues={
          product
            ? _.pick(product, [
                'name',
                'image',
                'price',
                'description',
                'stock',
              ])
            : {
                name: '',
                image: '',
                price: '',
                description: '',
                stock: '',
              }
        }
        validationSchema={Yup.object({
          name: Yup.string().required().label('Name'),
          image: Yup.string().required().label('Image'),
          price: Yup.number().required().label('Price'),
          stock: Yup.number().integer().required().label('Stock'),
          description: Yup.string().required().label('Description'),
        })}
        enableReinitialize
        validateOnBlur={false}
        validateOnMount={false}
        validateOnChange={false}
        onSubmit={async (values, { setSubmitting }) => {
          const isAdding = id === 'add';
          try {
            setSubmitting(true);
            const apiUrl = isAdding ? '/api/products' : '/api/products/' + id;
            const apiMethod = isAdding ? 'POST' : 'PUT';
            const response = await fetch(apiUrl, {
              method: apiMethod,
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });

            if (response.status === 200) {
              const { dismiss } = toast({
                title: isAdding ? 'Added Successfully' : 'Updated Successfully',
                description: isAdding
                  ? `Product ${values.name} added successfully`
                  : `Product ${values.name} updated successfully`,
                className: 'bg-red-600 text-white',
              });
              setTimeout(dismiss, 5000);
              if (isAdding) {
                const data = await response.json();
                router.replace(`/products/${data.id}`);
              }
            } else {
              throw await response.json();
            }
          } catch (err: { error: string }) {
            const { dismiss } = toast({
              title: isAdding ? 'Adding Failed' : 'Updating Failed',
              description: err.error,
              className: 'bg-red-600 text-white',
            });
            setTimeout(dismiss, 5000);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, values }) => {
          return (
            <Form className="p-2">
              <div className="grid gap-2">
                {values.image ? (
                  <div className="grid gap-1">
                    <Image
                      src={values.image}
                      alt={values.name}
                      width={120}
                      height={120}
                      unoptimized
                    />
                  </div>
                ) : null}
                <div className="grid gap-1">
                  <AppTextField
                    label="Image Url"
                    name="image"
                    id="image"
                    placeholder="Image Url"
                  />
                </div>

                <div className="grid gap-1">
                  <AppTextField
                    label="Name"
                    name="name"
                    id="name"
                    placeholder="Name"
                  />
                </div>
                <div className="grid gap-1">
                  <AppTextarea
                    label="Description"
                    name="description"
                    id="description"
                    placeholder="Description"
                  />
                </div>
                <div className="grid gap-1">
                  <AppTextField
                    label="Price"
                    name="price"
                    id="price"
                    placeholder="Price"
                    type="number"
                  />
                </div>
                <div className="grid gap-1">
                  <AppTextField
                    label="Stock"
                    name="stock"
                    id="stock"
                    placeholder="Stock"
                    type="number"
                    step={1}
                  />
                </div>
                <Button disabled={isSubmitting}>
                  {isSubmitting && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign In
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default ProductForm;
