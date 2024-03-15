import { defineStyleConfig } from '@chakra-ui/react';

export default defineStyleConfig({
  variants: {
    primary: {
      color: 'yellow.500',
      bg: 'blue.800',
      _hover: {
        bg: 'blue.700',
        _disabled: {
          bg: 'blue.600'
        }
      },
    },
    secondary: {
      color: 'blue.800',
      bg: 'white',
      border: '1px solid',
      borderColor: 'blue.800',
      _hover: {
        bg: 'blue.50'
      }
    },
    tertiary: {
      color: 'blue.800',
      bg: 'white',
      _hover: {
        bg: 'blue.50'
      }
    },
    landing: {
      color: 'blue.800',
      bg: 'transparent',
      transition: '0.2s ease',
      border: '1px solid',
      borderColor: 'transparent',
      _hover: {
        border: '1px solid',
        borderColor:'blue.800'
      }
    },
    menu: {
      color: 'blue.800',
      bg: 'white',
      _hover: {
        bg: 'blue.50'
      }
    },
    alert: {
      color: 'white',
      bg: 'red.600',
      _hover: {
        bg: 'red.700'
      }
    }
  },
  defaultProps: {
    variant: 'primary'
  }
});
