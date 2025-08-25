import ErrorHandlingForm from '@/components/error/error-handling-form'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { UserSaaS } from '@/pages/form-saas'
import React from 'react'
import { Controller, type Control, type FieldErrors } from 'react-hook-form'

const hobbies: string[] = [
  "Reading",
  "Writing",
  "Drawing",
  "Painting",
  "Cooking",
  "Baking",
  "Gardening",
  "Hiking",
  "Cycling",
  "Running",
  "Swimming",
  "Yoga",
  "Dancing",
  "Singing",
  "Playing Guitar",
  "Playing Piano",
  "Photography",
  "Traveling",
  "Fishing",
  "Camping",
  "Chess",
  "Video Gaming",
  "Board Games",
  "Knitting",
  "Sewing",
  "Calligraphy",
  "Collecting Stamps",
  "Collecting Coins",
  "Watching Movies",
  "Watching Anime",
  "Watching Sports",
  "Martial Arts",
  "Fitness Training",
  "Meditation",
  "Blogging",
  "Podcasting",
  "Learning Languages",
  "Coding",
  "Robotics",
  "Volunteering",
  "Bird Watching",
  "Skateboarding",
  "Surfing",
  "Snowboarding",
  "Skiing",
  "Cooking New Recipes",
  "DIY Projects",
  "3D Printing",
  "Origami",
  "Pet Training",
  "Astrology",
  "Astronomy"
];

interface FormHobbyProps {
  errors: FieldErrors<UserSaaS>
  control: Control<UserSaaS>
}


const FormHobby: React.FC<FormHobbyProps> = ({ errors, control }) => {
  return (
    <>
      <Label htmlFor="hobby" className="font-medium">Hobbies</Label>
      <Controller
        name="hobbies"
        control={control}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {field.value.length > 0
                  ? `${field.value.length > 3
                    ? field.value.slice(0, 3).join(", ") + `, ${field.value.length - 3} others ...`
                    : field.value.join(", ")}`
                  : "Select your hobbies"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full max-h-[200px] overflow-y-auto">
              <div className="flex flex-col gap-2">
                {hobbies.map((hobby) => (
                  <label
                    key={hobby}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={field.value.includes(hobby)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...field.value, hobby])
                        } else {
                          field.onChange(
                            field.value.filter((v: string) => v !== hobby)
                          )
                        }
                      }}
                    />
                    <span>{hobby}</span>
                  </label>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}
      />
      {errors.hobbies && (
        <ErrorHandlingForm text={errors.hobbies.message} />
      )}
    </>
  )
}

export default FormHobby