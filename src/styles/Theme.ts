import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: '#F6F7FE',
        color: '#1B254A'
      },
      html: {
       height: '100%'
     }
    }
  }
});