import ErrorHandlingForm from '@/components/error/error-handling-form'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from '@/components/ui/select'
import type { UserSaaS } from '@/pages/form-saas'
import React from 'react'
import { Controller, type Control, type FieldErrors, } from 'react-hook-form'

interface FormGenderProps {
  control: Control<UserSaaS>;
  errors: FieldErrors<UserSaaS>;
}

const FormGender: React.FC<FormGenderProps> = ({ control, errors }) => {
  return (
    <>
      <Label htmlFor="gender" className="font-medium">Gender</Label>
      <Controller
        name="gender"
        control={control}
        rules={{ required: "Gender is required" }}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger id="gender" className="w-full">
              <SelectValue placeholder="Pick your gender" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
      {errors.gender && (
        <ErrorHandlingForm text={errors.gender.message} />
      )}
    </>
  )
}

export default FormGender