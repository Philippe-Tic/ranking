import { extendTheme } from "@chakra-ui/react"
import '@fontsource/inter'
import '@fontsource/league-gothic'
import Button from './components/button'
import Heading from './components/heading'
import Input from './components/input'
import Link from './components/link'
import Text from './components/text'
import Textarea from './components/textarea'

export const theme = extendTheme({
  fonts: {
    heading: `'League Gothic'`,
    body: `'Inter'`,
  },
  colors: {
    background: "#F3F5FC",
    blue: {
      50: "#F3F5FC",
      100: "#DAE2F6",
      200: "#B1C1EC",
      300: "#849DE1",
      400: "#5B7CD7",
      500: "#3159C9",
      600: "#2747A0",
      700: "#1C3373",
      800: "#12214A",
      900: "#070D1D",
      950: "#040710"
    },
    yellow: {
      50: "#FFFBE5",
      100: "#FFF8D1",
      200: "#FFF09E",
      300: "#FFEA70",
      400: "#FFE23D",
      500: "#FFD90F",
      600: "#D6B600",
      700: "#A38B00",
      800: "#6B5B00",
      900: "#383000",
      950: "#191600"
    },
    gray: {
      50: "##f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
      950: "#020617"
    }
  },
  components: {
    Button,
    Link,
    Heading,
    Text,
    Input,
    Textarea,
  }
})
