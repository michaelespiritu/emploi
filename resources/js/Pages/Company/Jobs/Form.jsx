import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import JobCategories from '@/Components/JobCategories';
import PrimaryButton from '@/Components/PrimaryButton';
import Select from '@/Components/Select';
import Textarea from '@/Components/Textarea';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Form({ buttonText = 'Create', categories }) {
  const [hasAShortDescription, setHasAShortDescription] = useState(false)

  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
    short_description: '',
    category_id: '',
    location: '',
    budget: '',
    hours_per_week: '',
    type: '',
    contract_type: '',
    contract_length: '',
    status: '',
  });

  const submit = (e) => {
    e.preventDefault();

    post(route('job.create'));
  };

  return (
    <form onSubmit={ submit }>
      <div>
        <InputLabel htmlFor="title" value="Title" />

        <TextInput
          id="title"
          name="title"
          value={ data.title }
          className="mt-1 block w-full"
          autoComplete="title"
          isFocused={ true }
          onChange={ (e) => setData('title', e.target.value) }
          required
        />

        <InputError message={ errors.title } className="mt-2" />
      </div>

      <div className="mt-4">
        <InputLabel htmlFor="description" value="Description" />

        <Textarea
          id="description"
          name="description"
          value={ data.description }
          className="mt-1 block w-full"
          autoComplete="title"
          onChange={ (e) => setData('description', e.target.value) }
          required
        />

        <InputError message={ errors.description } className="mt-2" />
      </div>

      <div className="mt-4 flex">
        <InputLabel htmlFor="hasAShortDescription" className="flex items-center gap-1">
          <Checkbox
            id="hasAShortDescription"
            name="hasAShortDescription"
            value={ hasAShortDescription }
            className="mt-1"
            autoComplete="title"
            onChange={ (e) => setHasAShortDescription(e.target.checked) }
          /> Do you have a short Description
        </InputLabel>

        <InputError message={ errors.description } className="mt-2" />
      </div>

      { (hasAShortDescription) &&
        <div className="mt-4">
          <InputLabel htmlFor="short_description" value="Short Description" />

          <Textarea
            id="short_description"
            name="short_description"
            value={ data.short_description }
            className="mt-1 block w-full"
            autoComplete="title"
            onChange={ (e) => setData('short_description', e.target.value) }
            required
          />

          <InputError message={ errors.short_description } className="mt-2" />
        </div>
      }

      <div className="mt-4">
        <InputLabel htmlFor="category_id" value="Category" />

        <Select
          options={ categories }
          id="category_id"
          name="category_id"
          value={ data.category_id }
          className="mt-1 block w-full"
          autoComplete="title"
          onChange={ (e) => setData('category_id', e.target.value) }
          required />

        <InputError message={ errors.category_id } className="mt-2" />
      </div>

      <div className="mt-4">
        <InputLabel htmlFor="location" value="Location" />

        <TextInput
          id="location"
          name="location"
          value={ data.location }
          className="mt-1 block w-full"
          autoComplete="title"
          onChange={ (e) => setData('location', e.target.value) }
          required
        />

        <InputError message={ errors.location } className="mt-2" />
      </div>

      <div className="mt-4">
        <InputLabel htmlFor="budget" value="Budget" />

        <TextInput
          id="budget"
          name="budget"
          value={ data.budget }
          className="mt-1 block w-full"
          autoComplete="title"
          onChange={ (e) => setData('budget', e.target.value) }
          required
        />

        <InputError message={ errors.budget } className="mt-2" />
      </div>

      <div className="mt-4">
        <InputLabel htmlFor="hours_per_week" value="Hours Per Week" />

        <TextInput
          id="hours_per_week"
          name="hours_per_week"
          value={ data.hours_per_week }
          className="mt-1 block w-full"
          autoComplete="title"
          onChange={ (e) => setData('hours_per_week', e.target.value) }
          required
        />

        <InputError message={ errors.hours_per_week } className="mt-2" />
      </div>

      <div className="mt-4">
        <InputLabel htmlFor="type" value="Type" />
        <Select
          id="type"
          name="type"
          value={ data.type }
          className="mt-1 block w-full"
          autoComplete="title"
          onChange={ (e) => setData('type', e.target.value) }
          required
          options={ [
            {
              value: "Full Time",
              text: "Full Time"
            },
            {
              value: "Part Time",
              text: "Part TIme"
            }
          ] }
        />

        <InputError message={ errors.type } className="mt-2" />
      </div>

      <div className="mt-4">
        <InputLabel htmlFor="contract_type" value="Contract Type" />

        <Select
          id="contract_type"
          name="contract_type"
          value={ data.contract_type }
          className="mt-1 block w-full"
          autoComplete="title"
          onChange={ (e) => setData('contract_type', e.target.value) }
          required
          options={ [
            {
              value: "Permanent",
              text: "Permanent"
            },
            {
              value: "Contractual",
              text: "Contractual"
            }
          ] }
        />

        <InputError message={ errors.contract_type } className="mt-2" />
      </div>

      { data.contract_type === 'Permanent' ? (
        <input type="hidden" value="Permanent" />
      ) : (
        <div className="mt-4">
          <InputLabel htmlFor="contract_length" value="Contract Length" />

          <TextInput
            id="contract_length"
            name="contract_length"
            value={ data.contract_length }
            className="mt-1 block w-full"
            autoComplete="title"
            onChange={ (e) => setData('contract_length', e.target.value) }
            required
          />

          <InputError message={ errors.contract_length } className="mt-2" />
        </div>
      ) }


      <div className="flex items-center justify-end mt-4">
        <PrimaryButton className="ms-4" disabled={ processing }>
          { buttonText }
        </PrimaryButton>
      </div>
    </form>
  )
}
