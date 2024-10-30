import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Textarea from "@/Components/Textarea";
import TextInput from "@/Components/TextInput";
import Wyswyg from "@/Components/Wyswyg";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function ApplyForm({ job }) {

  const { data, setData, post, reset, processing, errors } = useForm({
    first_name: '',
    last_name: '',
    email: '',
    resume: '',
    cover_letter: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('job.apply', { id: job.id }));
  };

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    reset()
  }, [job]);


  return (
    <form onSubmit={ submit }>
      <div className="flex gap-4">
        <div className="flex-1">
          <InputLabel htmlFor="first_name" value="First Name" />

          <TextInput
            id="first_name"
            name="first_name"
            value={ data.first_name }
            className="mt-1 block w-full"
            autoComplete="title"
            onChange={ (e) => setData('first_name', e.target.value) }
            required
          />

          <InputError message={ errors.first_name } className="mt-2" />
        </div>
        <div className="flex-1">
          <InputLabel htmlFor="last_name" value="Last Name" />

          <TextInput
            id="last_name"
            name="last_name"
            value={ data.last_name }
            className="mt-1 block w-full"
            autoComplete="last_name"
            onChange={ (e) => setData('last_name', e.target.value) }
            required
          />

          <InputError message={ errors.last_name } className="mt-2" />
        </div>
      </div>
      <div className="mt-4">
        <InputLabel htmlFor="email" value="Email" />

        <TextInput
          id="email"
          name="email"
          type="email"
          value={ data.email }
          className="mt-1 block w-full"
          autoComplete="email"
          onChange={ (e) => setData('email', e.target.value) }
          required
        />

        <InputError message={ errors.email } className="mt-2" />
      </div>

      <div className="mt-4">
        <InputLabel htmlFor="resume" value="Upload your Resume" />
        <TextInput
          id="resume"
          name="resume"
          type="file"
          className="mt-1 block w-full"
          onChange={ e => setData('resume', e.target.files[0]) }
          required
        />
        <InputError message={ errors.resume } className="mt-2" />
      </div>

      <div className="mt-4">
        <InputLabel htmlFor="cover_letter" value="Cover Letter" />
        <Wyswyg
          id="cover_letter"
          name="cover_letter"
          value={ data.cover_letter }
          className="mt-1 block w-full"
          autoComplete="title"
          onChange={ (newValue) => handleChange('cover_letter', newValue) }
          required
        />
        <InputError message={ errors.cover_letter } className="mt-2" />
      </div>

      <div className="flex items-center justify-end mt-4">
        <PrimaryButton className="ms-4" disabled={ processing }>
          Apply
        </PrimaryButton>
      </div>
    </form>
  )
}
