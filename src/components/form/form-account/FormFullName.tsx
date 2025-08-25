import ErrorHandlingForm from '@/components/error/error-handling-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { UserSaaS } from '@/pages/form-saas';
import type { FieldErrors, UseFormRegister } from 'react-hook-form'

interface FormFullnameProps {
  register: UseFormRegister<UserSaaS>;
  errors: FieldErrors<UserSaaS>;
}

const FormFullname: React.FC<FormFullnameProps> = ({ register, errors }) => {
  return (
    <>
      <Label htmlFor="fullname" className="font-medium">Fullname</Label>
      <Input id="fullname" {...register("fullname", { required: "Fullname is required" })} className="rounded-[4px] py-1.5 placeholder:font-medium" placeholder="Enter your full name" />
      {errors.fullname && (
        <ErrorHandlingForm text={errors.fullname.message} />
      )}
    </>
  )
}

export default FormFullname