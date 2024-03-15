import { inputAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyleConfig } from '@chakra-ui/react';

const { definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

export default defineStyleConfig({
  defaultProps: {
    variant: 'default',
  },
  variants: {
    default: definePartsStyle((props) => {
      return {
        field: {
          bg: 'white',
          border: '1px solid',
          borderColor: 'gray.300',
          boxShadow: 'sm',
          _focus: {
            boxShadow: `0 0 0 1px ${props.theme.colors.blue[500]}`,
            borderColor: 'blue.500'
          }
        },
      }
    }),
    uploader: definePartsStyle((props) => {
      return {
        field: {
          bg: 'white',
          border: '1px dashed',
          borderColor: 'gray.300',
          boxShadow: 'sm',
          _focus: {
            boxShadow: `0 0 0 1px ${props.theme.colors.blue[500]}`,
            borderColor: 'blue.500'
          }
        },
      }
    }),
  }
});
