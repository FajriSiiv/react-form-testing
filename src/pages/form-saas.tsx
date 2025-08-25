import { Button } from "@/components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useCountries } from "@/hooks/useLanguages";
import FormFullname from "@/components/form/form-account/FormFullName";
import FormEmail from "@/components/form/form-account/FormEmail";
import FormCountry from "@/components/form/form-account/FormCountry";
import FormUsername from "@/components/form/form-account/FormUsername";
import FormGender from "@/components/form/form-account/FormGender";
import FormDateOfBirth from "@/components/form/form-account/FormDateOfBirth";
import FormHobby from "@/components/form/form-account/FormHobby";
import FormSkill from "@/components/form/form-account/FormSkill";

export interface UserSaaS {
  fullname: string;
  username: string;
  email: string;
  tanggalLahir: Date;
  gender: 'male' | 'female' | 'other';
  country: string;
  hobbies: string[];
  skills: string[];
}

const FormSaaS = () => {
  const { data: countries, loading } = useCountries();

  const { control, register, handleSubmit, setValue, formState: { errors } } = useForm<UserSaaS>({
    defaultValues: {
      tanggalLahir: undefined,
      gender: undefined,
      hobbies: [],
      skills: [],
      fullname: "",
      country: "",
      email: "",
      username: ""
    }
  });

  const onSubmit: SubmitHandler<UserSaaS> = (data) => console.log(data)

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto outline-1 rounded-2xl p-5 relative">
        <h2 className="text-left text-3xl pb-4 font-semibold">Create your account</h2>

        <div className="flex flex-col gap-2 py-3">
          <FormFullname errors={errors} register={register} />
        </div>

        <div className="flex flex-col gap-2 py-3">
          <FormUsername errors={errors} register={register} />
        </div>

        <div className="flex flex-col gap-2 py-3">
          <FormEmail errors={errors} register={register} />
        </div>

        <div className="flex flex-col gap-2 py-3 col-span-1 relative">
          <FormCountry control={control} countries={countries} errors={errors} loading={loading} register={register} />
        </div>

        <div className="grid grid-cols-2 py-3  gap-5">
          <div className="flex flex-col gap-2 col-span-1">
            <FormGender control={control} errors={errors} />
          </div>

          <div className="flex flex-col gap-2 col-span-1">
            <FormDateOfBirth register={register} setValue={setValue} errors={errors} />
          </div>
        </div>
        <div className="flex flex-col gap-2 py-3 col-span-1 relative">
          <FormHobby control={control} errors={errors} />
        </div>

        <div className="flex flex-col gap-2 py-3 col-span-1 relative">
          <FormSkill control={control} errors={errors} />
        </div>
        <div className="flex pt-10 pb-0 px-2 justify-end items-center">
          <Button type="submit" className="">Submit</Button>
        </div>

      </form>
    </div>
  )
}

export default FormSaaS