import { Box, FormControl, FormControlProps, FormErrorMessage, FormHelperText, FormLabel, FormLabelProps, useColorModeValue } from "@chakra-ui/react"
import { ReactNode } from "react"
import { FieldErrors, FieldValues } from "react-hook-form"

type FormGroupProps = {
  errors?: FieldErrors<FieldValues>
  name: string
  isRequired?: boolean
  label?: string
  labelProps?: FormLabelProps
  helper?: string
  children: ReactNode
} & FormControlProps

export const FormGroup = ({ isRequired = false, errors, name, label, helper, labelProps, children, ...rest }: FormGroupProps) => {
  const color = useColorModeValue('red.500', 'red.300')

  const renderError = () => {
    let errorDec = errors as any;
    name?.split('.')?.forEach(namePart => {
      errorDec = errorDec?.[namePart];
    });
    return errorDec;
  };

  return (
    <FormControl isInvalid={!!renderError()} {...rest}>
      {label && <FormLabel htmlFor={name} {...labelProps}>{label} {isRequired && <Box as="span" color={color}>*</Box>}</FormLabel>}
      {children}
      <FormErrorMessage>
        {`${renderError()?.message || errors?.[name] && errors?.[name]?.message}`}
      </FormErrorMessage>
      {helper && <FormHelperText>{helper}</FormHelperText>}
    </FormControl>
  )
}