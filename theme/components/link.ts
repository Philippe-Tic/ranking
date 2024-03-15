import { defineStyleConfig } from '@chakra-ui/react';
import { defineStyle } from '@chakra-ui/styled-system';

export default defineStyleConfig({
  baseStyle: defineStyle({
    textDecoration: 'none',
    _hover: {
      textDecoration: 'none'
    }
  })
});
