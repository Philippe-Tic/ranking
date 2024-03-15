import { FormGroup } from "@/components/FormGroup"
import { FormLabelProps, Input, InputGroup, InputProps, InputRightElement } from "@chakra-ui/react"
import { Controller, FieldValues, RegisterOptions, useFormContext } from "react-hook-form"

type FieldInputProps = {
  name: string
  placeholder?: string
  registerOptions?: RegisterOptions<FieldValues, string>
  inputProps?: InputProps
  label?: string
  labelProps?: FormLabelProps
  isRequired?: boolean
  helper?: string
  children?: React.ReactNode
}

export const FieldInput = ({ name, label, placeholder = '', isRequired = false, registerOptions, helper, inputProps, labelProps, children }: FieldInputProps) => {
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
            <InputGroup>
              <Input
                id={name}
                placeholder={placeholder}
                {...register(name, registeredOptions)}
                {...inputProps}
                {...field}
              />
              <InputRightElement>
                {children}
              </InputRightElement>
            </InputGroup>
          </FormGroup>
        )
      }}
    />
  )
}