import { createMultiStyleConfigHelpers, defineStyleConfig } from '@chakra-ui/react';

const { definePartsStyle } =
  createMultiStyleConfigHelpers([])

export default defineStyleConfig({
  defaultProps: {
    variant: 'default',
  },
  variants: {
    default: definePartsStyle((props: any) => {
      return {
        bg: 'white',
        border: '1px solid',
        borderColor: 'gray.300',
        boxShadow: 'sm',
        _focus: {
          boxShadow: `0 0 0 1px ${props.theme.colors.blue[500]}`,
          borderColor: 'blue.500'
        }
      }
    }),
  }
});
