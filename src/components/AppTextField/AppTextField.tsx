import { ChangeEventHandler } from 'react';

import { useFormikContext } from 'formik';
import _ from 'lodash';

import { Input, InputProps } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
export type AppTextFieldProps = {
  name: string;
  label: string;
  getter?: (values: any) => string;
  setter?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
} & Omit<InputProps, 'name' | 'label' | 'value' | 'onChange'>;

function AppTextField({
  id,
  name,
  label,
  getter,
  setter,
  ...restProps
}: AppTextFieldProps) {
  const { values, errors, setFieldValue, setFieldError, isSubmitting } =
    useFormikContext<any>();
  let val =
    typeof getter !== 'undefined' ? getter(values) : _.get(values, name);
  val = val === 0 ? 0 : val || '';
  const error: string = (_.get(errors, name) as string) || '';

  return (
    <div>
      <Label className="sr-only" htmlFor={id}>
        {label}
      </Label>
      <Input
        id={id}
        disabled={isSubmitting}
        value={val}
        onChange={
          typeof setter === 'undefined'
            ? (e) => {
                setFieldValue(name, e.target.value);
                setFieldError(name, '');
                e.target.value;
              }
            : setter
        }
        className={error ? 'border-red-600 outline-red-600' : ''}
        {...restProps}
      />
      {error ? (
        <p className="text-sm text-red-600 mt-2 mb-3 text-center">{error}</p>
      ) : null}
    </div>
  );
}

export default AppTextField;
