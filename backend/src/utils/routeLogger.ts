export const logRoutes = (app: any) => {
  const router = app._router || app.router;
  if (!router?.stack) return;

  console.log('\n' + '═'.repeat(60));
  console.log(' 🚀  RESTAURANT MANAGEMENT SYSTEM - API ENDPOINTS');
  console.log('═'.repeat(60));
  
  let routerIndex = 0;
  const routerLabels = [
    'AUTH', 'USERS', 'ADDRESSES', 'RESTAURANTS', 'ADMIN_LIST', 
    'MENUS', 'ORDERS', 'CART', 'CHECKOUT', 'PAYMENTS', 'ADMIN'
  ];

  router.stack.forEach((middleware: any) => {
    // 1. Health check & System
    if (middleware.route) {
      const methods = Object.keys(middleware.route.methods).join(', ').toUpperCase();
      console.log(`\n [ SYSTEM ]`);
      console.log(`   ${methods.padEnd(8)} ${middleware.route.path}`);
      return;
    }

    // 2. Resource Routers
    if (middleware.name === 'router' && middleware.handle?.stack) {
      const label = routerLabels[routerIndex] || 'API';
      routerIndex++;

      console.log(`\n [ ${label} ]`);

      middleware.handle.stack.forEach((handler: any) => {
        if (handler.route) {
          const methods = Object.keys(handler.route.methods).join(', ').toUpperCase();
          const path = handler.route.path === '/' ? '(base)' : handler.route.path;
          console.log(`   ${methods.padEnd(8)} ${path}`);
        }
      });
    }
  });
  
  console.log('\n' + '═'.repeat(60) + '\n');
};
