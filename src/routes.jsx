// definicion de las rutas del sistema que seran
// desplegadas en pantalla
import React from 'react';

const Examen = React.lazy(() => import('../src/components/Exam'));
const Header = React.lazy(() => import('../src/components/layout/Header'));
const Admin = React.lazy(() => import('../src/components/Admin'));
const Registro = React.lazy(()=>import('../src/components/signin/SingIn'))

const routes = [
    { path: '/pld/examen', exact: true, component: Examen },
    { path: '/pld/administracion', exact: true, component: Admin },
    { path: '/pld/registro', exact: true, component: Registro }
];

export default routes;