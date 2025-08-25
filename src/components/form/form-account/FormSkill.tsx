import ErrorHandlingForm from '@/components/error/error-handling-form'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { UserSaaS } from '@/pages/form-saas'
import React from 'react'
import { Controller, type Control, type FieldErrors } from 'react-hook-form';

const skills: string[] = ['React.JS', 'VueJS', "Javascript", 'Tailwindcss', 'Laravel', 'PHP', 'C#', 'C++', 'NodeJS', 'NextJS', 'NestJS']

interface FormSkillsProps {
  control: Control<UserSaaS>
  errors: FieldErrors<UserSaaS>
}


const FormSkill: React.FC<FormSkillsProps> = ({ control, errors }) => {
  return (
    <>
      <Label htmlFor="skills" className="font-medium">Skills</Label>
      <Controller
        name="skills"
        control={control}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {field.value.length > 0
                  ? `${field.value.length > 3
                    ? field.value.slice(0, 3).join(", ") + `, ${field.value.length - 3} others ...`
                    : field.value.join(", ")}`
                  : "Select your skills"}

              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full max-h-[200px] overflow-y-auto">
              <div className="flex flex-col gap-2">
                {skills.map((skill) => (
                  <label
                    key={skill}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={field.value.includes(skill)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...field.value, skill])
                        } else {
                          field.onChange(
                            field.value.filter((v: string) => v !== skill)
                          )
                        }
                      }}
                    />
                    <span>{skill}</span>
                  </label>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}
      />
      {errors.skills && (
        <ErrorHandlingForm text={errors.skills.message} />
      )}</>
  )
}

export default FormSkill