import ErrorHandlingForm from '@/components/error/error-handling-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { UserSaaS } from '@/pages/form-saas';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

interface FormEmailProps {
  register: UseFormRegister<UserSaaS>;
  errors: FieldErrors<UserSaaS>;
}

const FormEmail: React.FC<FormEmailProps> = ({ register, errors }) => {
  return (
    <>
      <Label htmlFor="email" className="font-medium">Email</Label>
      <Input id="email" {...register("email", {
        required: "Email is required", pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Invalid email format"
        }
      })} className="rounded-[4px] py-1.5" placeholder="Enter your email address" />
      {errors.email && (
        <ErrorHandlingForm text={errors.email.message} />
      )}
    </>
  )
}

export default FormEmail