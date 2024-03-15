import { Alert, Heading, Text } from "@chakra-ui/react";

type InlineMessageProps = {
  size?: "sm" | "md" | "lg";
  title?: string;
  message?: string;
  status?: "success" | "error" | "info" | "warning";
}

export const InlineMessage = ({ size = 'md', title, message, status = 'info', ...rest }: InlineMessageProps) => {

  const sizes = {
    sm: {
      alertPadding: '4',
      titleFontSize: '1.5rem',
      textFontSize: '0.9rem'
    },
    md: {
      alertPadding: '6',
      titleFontSize: '2rem',
      textFontSize: '1rem'
    },
    lg: {
      alertPadding: '8',
      titleFontSize: '3rem',
      textFontSize: '1.5rem'
    }
  }

  return (
    <Alert
      borderRadius="md" status={status} variant="subtle"
      flexDirection="column" alignItems="center"
      h="fit-content"
      p={sizes[size].alertPadding}
      {...rest}
    >
      <Heading w="full" fontSize={sizes[size].titleFontSize} >{title}</Heading>
      <Text w="full" fontSize={sizes[size].textFontSize}>{message}</Text>
    </Alert>
  )
}