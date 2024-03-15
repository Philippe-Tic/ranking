import { FormGroup } from "@/components/FormGroup"
import { FormControlProps, FormLabelProps, Textarea, TextareaProps } from "@chakra-ui/react"
import { Controller, FieldValues, RegisterOptions, useFormContext } from "react-hook-form"

type FieldtextareaProps = {
  name: string
  placeholder?: string
  registerOptions?: RegisterOptions<FieldValues, string>
  textareaProps?: TextareaProps
  label?: string
  labelProps?: FormLabelProps
  isRequired?: boolean
  helper?: string
} & FormControlProps

export const FieldTextarea = ({ name, label, placeholder = '', isRequired = false, registerOptions, helper, textareaProps, labelProps, ...rest }: FieldtextareaProps) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext()

  const registeredOptions = isRequired ? {
    required: "Ce champ est requis.",
    ...registerOptions,
  } : registerOptions

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      render={({ field }) => {
        return (
          <FormGroup isRequired={isRequired} name={name} label={label} labelProps={labelProps} errors={errors} helper={helper}>
            <Textarea
              id={name}
              placeholder={placeholder}
              {...register(name, registeredOptions)}
              {...textareaProps}
              {...field}
            />
          </FormGroup>
        )
      }}
    />
  )
}