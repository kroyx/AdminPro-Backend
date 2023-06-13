
const getMenuFrontend = (role = 'USER_ROLE') => {

  const menu = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        {title: 'Main', url: './'},
        {title: 'Gráficas', url: 'grafica1'},
        {title: 'ProgressBar', url: 'progress'},
        {title: 'Promesas', url: 'promesas'},
        {title: 'Rxjs', url: 'rxjs'},
      ]
    },
    {
      title: 'Mantenimientos',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        {title: 'Hospitales', url: 'hospitales'},
        {title: 'Médicos', url: 'medicos'},
      ]
    },
  ];

  if (role === 'ADMIN_ROLE') {
    menu[1].submenu.unshift({title: 'Usuarios', url: 'usuarios'})
  }
  return menu;
}

module.exports = {
  getMenuFrontend
}