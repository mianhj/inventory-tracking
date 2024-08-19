import { ChangeEventHandler } from 'react';
import { useFormikContext } from 'formik';
import _ from 'lodash';
import { Label } from '@/components/ui/label';
import { Textarea, TextareaProps } from '@/components/ui/textarea';
export type AppTextareaProps = {
  name: string;
  label: string;
  getter?: (values: any) => string;
  setter?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
} & Omit<TextareaProps, 'name' | 'label' | 'value' | 'onChange'>;

function AppTextarea({
  id,
  name,
  label,
  getter,
  setter,
  ...restProps
}: AppTextareaProps) {
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
      <Textarea
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

export default AppTextarea;
