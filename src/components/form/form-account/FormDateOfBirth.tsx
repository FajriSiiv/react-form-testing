import ErrorHandlingForm from '@/components/error/error-handling-form'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import type { UserSaaS } from '@/pages/form-saas'
import { ChevronDownIcon } from 'lucide-react'
import React, { useState } from 'react'
import type { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'

interface FormDateOfBirthProps {
  errors: FieldErrors<UserSaaS>;
  setValue: UseFormSetValue<UserSaaS>;
  register: UseFormRegister<UserSaaS>;
}

const FormDateOfBirth: React.FC<FormDateOfBirthProps> = ({ setValue, errors, register }) => {
  const [openDate, setOpenDate] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)

  const onSelectDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    setDate(selectedDate)
    setValue("tanggalLahir", selectedDate, { shouldValidate: true })
    setOpenDate(false)
  }


  return (
    <>
      <Label htmlFor="date" className="px-1">
        Date of Birth
      </Label>
      <Popover open={openDate} onOpenChange={setOpenDate}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className=" justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={onSelectDate}
          />
        </PopoverContent>
      </Popover>
      <Input type="hidden" {...register("tanggalLahir", { required: "Date of Birth is required" })} />
      {errors.tanggalLahir && (
        <ErrorHandlingForm text={errors.tanggalLahir.message} />
      )}
    </>
  )
}

export default FormDateOfBirth