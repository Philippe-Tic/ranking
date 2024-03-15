import { FormGroup } from "@/components/FormGroup"
import { Box, Flex, FormLabelProps, Icon, IconButton, Input, InputProps, Text } from "@chakra-ui/react"
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form"
import { FaTrash } from "react-icons/fa6"

type FieldInputProps = {
  hidden?: boolean
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

export const FieldUploader = ({ hidden, name, label, placeholder = 'format .jpg, .png - 10Mb', isRequired = false, registerOptions, helper, inputProps, labelProps,  children }: FieldInputProps) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext()

  const registeredOptions = isRequired ? {
    required: "Ce champ est requis.",
    ...registerOptions,
  } : registerOptions

  const imageValue = watch("image");

  return (
    <FormGroup isRequired={isRequired} name={name} label={label} labelProps={labelProps} errors={errors} helper={helper}>
      <Input variant="uploader" p='0' as={Flex} alignItems='center'
      >
        <Text px='4' position='absolute' maxW="full" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
          {imageValue?.[0]?.name || <Text as='span' color='gray.500'>{placeholder}</Text>}
        </Text>
        <Box position='relative'></Box>
        <Input
          id={name}
          aria-hidden={hidden ? 'true' : 'false'}
          opacity={0}
          {...inputProps}
          {...register(name, registeredOptions)}
          type='file'
        />
        {
          imageValue?.[0]?.name && (
            <IconButton onClick={() => setValue(name, undefined)} variant="alert" size='sm' aria-label="delete" mr='1' icon={<Icon as={FaTrash} />} />
          )
        }
      </Input>
    </FormGroup>
  )
}