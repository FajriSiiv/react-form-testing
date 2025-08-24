import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react";
import { Check, ChevronDownIcon, ChevronsUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ErrorHandlingForm from "@/components/error/error-handling-form";
import { useCountries } from "@/hooks/useLanguages";
import type { Country } from "@/lib/api/getLanguages";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface UserSaaS {
  fullname: string;
  username: string;
  email: string;
  tanggalLahir: Date;
  gender: 'male' | 'female' | 'other';
  country: string;
  hobbies: string[];
  skills: string[];
}

const hobbies = [
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


const FormSaaS = () => {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [openDate, setOpenDate] = useState(false)
  const { data: countries, loading } = useCountries();

  const { control, register, handleSubmit, setValue, formState: { errors } } = useForm<UserSaaS>({
    defaultValues: {
      tanggalLahir: undefined,
      gender: undefined
    }
  });

  const onSelectDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    setDate(selectedDate)
    setValue("tanggalLahir", selectedDate, { shouldValidate: true })
    setOpenDate(false)
  }


  const onSubmit: SubmitHandler<UserSaaS> = (data) => console.log(data)

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto outline-1 rounded-2xl p-5 relative">
        <h2 className="text-left text-3xl pb-4 font-semibold">Create your account</h2>

        <div className="flex flex-col gap-2 py-3">
          <Label htmlFor="fullname" className="font-medium">Fullname</Label>
          <Input id="fullname" {...register("fullname", { required: "Fullname is required" })} className="rounded-[4px] py-1.5 placeholder:font-medium" placeholder="Enter your full name" />
          {errors.fullname && (
            <ErrorHandlingForm text={errors.fullname.message} />
          )}
        </div>

        <div className="flex flex-col gap-2 py-3">
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
        </div>

        <div className="flex flex-col gap-2 py-3">
          <Label htmlFor="username" className="font-medium">Username</Label>
          <Input id="username" {...register("username", {
            required: "username is required", pattern: {
              value: /^[a-zA-Z0-9_]{3,16}$/,
              message: "Username must be 3-16 characters, letters, numbers, or underscore"
            }
          })} className="rounded-[4px] py-1.5" placeholder="Enter your username " />
          {errors.username && (
            <ErrorHandlingForm text={errors.username.message} />
          )}
        </div>
        <div className="flex flex-col gap-2 py-3 col-span-1 relative">
          <Label htmlFor="country" className="font-medium">Country</Label>
          <Controller
            name="country"
            control={control}
            rules={{ required: "country is required" }}
            render={({ field }) => {
              const selectedCountry = countries?.find((c) => c.name.common === field.value)

              return (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={!!field.value}
                      className="w-full justify-between"
                    >
                      {field.value ? (
                        <div className="flex justify-center items-center">
                          <span>{selectedCountry?.flag}</span> {selectedCountry?.name.common}
                        </div>
                      ) : (
                        "Pick your country"
                      )}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full pt-5"
                    side="bottom"
                    sideOffset={5}
                    align="start"
                    avoidCollisions={false}
                  >
                    <Command>
                      <CommandInput placeholder="Search country..." />
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {loading ? (
                          <CommandItem disabled>Loading...</CommandItem>
                        ) : (
                          countries?.map((c: Country, index) => (
                            <CommandItem
                              key={index}
                              value={c.name.common}
                              onSelect={() => field.onChange(c.name.common)}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value === c.name.common ? "opacity-100" : "opacity-0"
                                )}
                              />
                              <span>{c.flag}</span> {c.name.common}
                            </CommandItem>
                          ))
                        )}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              )
            }}
          />
          {errors.country && (
            <ErrorHandlingForm text={errors.country.message} />
          )}
        </div>



        <div className="grid grid-cols-2 py-3  gap-5">
          <div className="flex flex-col gap-2 col-span-1">
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
          </div>

          <div className="flex flex-col gap-2 col-span-1">
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
          </div>
        </div>
        <div className="flex flex-col gap-2 py-3 col-span-1 relative">
          <Label htmlFor="hobby" className="font-medium">Hobbies</Label>
          <Controller
            name="hobby"
            control={control}
            rules={{ required: "hobbies is required" }}
            render={({ field }) => {


              return (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={!!field.value}
                      className="w-full justify-between"
                    >
                      {field.value ? (
                        <div className="flex justify-center items-center">
                          {field?.value.toString()}
                        </div>
                      ) : (
                        "Pick your hobbies"
                      )}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full pt-5"
                    side="right"
                    sideOffset={-200}
                    align="start"
                    avoidCollisions={false}
                    sticky="partial"
                  >
                    <Command>
                      <CommandInput placeholder="Search country..." />
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {
                          hobbies?.map((hobby: string, index) => (
                            <CommandItem
                              key={index}
                              value={hobby}
                              onSelect={() => field.onChange(hobby)}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value === hobby ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {hobby}
                            </CommandItem>
                          )
                          )}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              )
            }}
          />
          {errors.country && (
            <ErrorHandlingForm text={errors.country.message} />
          )}
        </div>
        <div className="flex pt-10 pb-0 px-2 justify-end items-center">
          <Button type="submit" className="">Submit</Button>
        </div>

      </form>
    </div>
  )
}

export default FormSaaS