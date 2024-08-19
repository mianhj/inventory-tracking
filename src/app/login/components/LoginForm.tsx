'use client';

import React, { useState } from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import AppTextField from '@/components/AppTextField';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast();

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().required().email().label('Email'),
          password: Yup.string().required().min(6).label('Password'),
        })}
        enableReinitialize
        validateOnBlur={false}
        validateOnMount={false}
        validateOnChange={false}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setSubmitting(true);

            const response = await fetch('/api/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });

            if (response.status === 200) {
              // intentionally not using the next.js redirect the page
              window.location.href = '/products';
            } else {
              throw await response.json();
            }
          } catch (err: { error: string }) {
            const { dismiss } = toast({
              title: 'Login Failed',
              description: err.error,
              className: 'bg-red-600 text-white',
            });
            setTimeout(dismiss, 5000);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <AppTextField
                    label="Email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    type="email"
                  />
                </div>
                <div className="grid gap-1">
                  <AppTextField
                    label="Password"
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Password"
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
