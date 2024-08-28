
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Rutas } from "./componentes/rutas/Rutas";

function App() {

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Ocupa toda la altura de la ventana
        }}
      >
        <Grid
          container
          spacing={7}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minWidth: '300px', maxWidth: '400px' }} // Ajusta el ancho mínimo del formulario

        >
          <Grid item>
            <Rutas />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default App
