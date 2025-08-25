import ErrorHandlingForm from '@/components/error/error-handling-form'
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { Country } from '@/lib/api/getLanguages';
import { cn } from '@/lib/utils';
import type { UserSaaS } from '@/pages/form-saas';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Controller, type Control, type FieldErrors, type UseFormRegister } from 'react-hook-form'

interface FormCountryProps {
  register: UseFormRegister<UserSaaS>;
  errors: FieldErrors<UserSaaS>;
  control: Control<UserSaaS>;
  countries: Country[] | null;
  loading: boolean;
}

const FormCountry: React.FC<FormCountryProps> = ({ control, countries, loading, errors }) => {
  return (
    <>
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
    </>
  )
}

export default FormCountry