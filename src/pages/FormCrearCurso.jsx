import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from '@mui/material';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { post, get, put } from '../componentes/funciones/Funciones';

export const FormCrearCurso = () => {
    const [formData, setFormData] = useState({
        nombre: '',
    });

    const [cursos, setCursos] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const respuesta = await post('/cursos/crear', formData);
        const dato = await respuesta.json();
        console.log(dato)
        setFormData({
            nombre: '',
        });
        optenerCursos();
    };

    // Modificar toggleEstado para que haga la petición PUT
    const toggleEstado = async (id, estado) => {
        // Cambia entre 1 (Activo) y 0 (Inactivo)
        const nuevoEstado = estado === 1 ? 2 : 1;  // Si es '1' lo cambia a '0' (Inactivo), si es '0' lo cambia a '1' (Activo)

        const parametros = { id, estado: nuevoEstado }; // Parámetros para la petición

        // Enviar la solicitud PUT para actualizar el estado
        const respuesta = await put('/cursos/actualizarestadocur', parametros);
        const dato = await respuesta.json();

        if (dato.status === "succes") {
            // Actualizar el estado localmente en la tabla
            setCursos((prev) =>
                prev.map((item) =>
                    item.idcursos === id
                        ? { ...item, estado: nuevoEstado === 1 ? 'Activo' : 'Inactivo' } // Actualiza el estado
                        : item
                )
            );
        } else {
            console.error("Error al actualizar el estado del usuario");
        }
    };



    const optenerCursos = async () => {
        const respuesta = await get('/cursos/listar');
        const dato = await respuesta.json();
        console.log(dato)
        if (dato.status === 'succes') setCursos(dato.cursos);
    };

    useEffect(() => {
      optenerCursos();
    }, []);

    return (
        <Box p={2}>
            <Grid container spacing={2}>
                <Grid container justifyContent="center" alignItems="center">
                    <h1>Crear Cursos</h1>
                </Grid>

                {/* Formulario */}
                <Grid item xs={12} md={6}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        p={2}
                        boxShadow={3}
                        borderRadius={2}
                        sx={{
                            maxWidth: '500px',
                            margin: 'auto',
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" fullWidth variant="contained" color="primary">
                                    Crear Cursos
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

                {/* Tabla */}
                <Grid item xs={12} md={6}>
                    <TableContainer
                        component={Paper}
                        sx={{
                            maxHeight: '400px',
                            overflowY: 'auto',
                            boxShadow: 3,
                        }}
                    >
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Fecha</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cursos.map((row) => (
                                    <TableRow key={row.idcursos}>
                                        <TableCell>{row.idcursos}</TableCell>
                                        <TableCell>{row.nombre}</TableCell>
                                        <TableCell>{row.estado === 'Activo' ? 'Activo' : 'Inactivo'}</TableCell> {/* Mostrar "Activo" o "Inactivo" */}
                                        <TableCell>
                                            {new Date(row.fecha_registro).toLocaleDateString('es-ES')}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={() => toggleEstado(row.idcursos, row.estado === 'Activo' ? 1 : 2)} // Llama correctamente con 1 o 0
                                                color={row.estado === 'Activo' ? 'primary' : 'secondary'}
                                            >
                                                {row.estado === 'Activo' ? <ToggleOnIcon /> : <ToggleOffIcon />}
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Box>
    );
};