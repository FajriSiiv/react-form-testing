import ErrorHandlingForm from '@/components/error/error-handling-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { UserSaaS } from '@/pages/form-saas';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

interface FormUsernameProps {
  register: UseFormRegister<UserSaaS>;
  errors: FieldErrors<UserSaaS>;
}
const FormUsername: React.FC<FormUsernameProps> = ({ register, errors }) => {
  return (
    <>
      <Label htmlFor="username" className="font-medium">Username</Label>
      <Input id="username" {...register("username", {
        required: "username is required", pattern: {
          value: /^[a-zA-Z0-9_]{3,16}$/,
          message: "Username must be 3-16 characters, letters, numbers, or underscore"
        }
      })} className="rounded-[4px] py-1.5" placeholder="Enter your username " />
      {errors.username && (
        <ErrorHandlingForm text={errors.username.message} />
      )}</>
  )
}

export default FormUsername