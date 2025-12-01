// ===========================
// DATA STORE (In-Memory)
// ===========================

let appState = {
  currentUser: null,
  items: [],
  warehouses: [],
  stockLevels: {}, // { itemId-warehouseId: quantity }
  stockMovements: [],
  purchaseOrders: [],
  salesOrders: [],
  alerts: [],
  users: [],
  categories: ['Electronics', 'Furniture', 'Clothing', 'Food', 'Tools']
};

// ===========================
// INITIALIZATION & SEEDING
// ===========================

function initializeApp() {
  seedData();
  setupEventListeners();
  setupRouting();
  startRealtimeSimulation();
}

function seedData() {
  // Users
  appState.users = [
    { email: 'admin@example.com', password: 'Admin@123', name: 'Admin User', role: 'Admin' },
    { email: 'manager@example.com', password: 'Manager@123', name: 'Manager User', role: 'Manager' },
    { email: 'viewer@example.com', password: 'Viewer@123', name: 'Viewer User', role: 'Viewer' }
  ];

  // Warehouses
  appState.warehouses = [
    { id: 'WH001', name: 'Main Warehouse', code: 'MAIN', address: '123 Industrial Blvd, City, ST 12345', status: 'Active' },
    { id: 'WH002', name: 'East Distribution Center', code: 'EAST', address: '456 Commerce St, Eastville, ST 23456', status: 'Active' },
    { id: 'WH003', name: 'West Distribution Center', code: 'WEST', address: '789 Logistics Ave, Westport, ST 34567', status: 'Active' }
  ];

  // Items (40 items across 5 categories)
  const itemTemplates = [
    // Electronics
    { sku: 'ELEC-001', name: 'Laptop ThinkPad X1', category: 'Electronics', description: 'High-performance business laptop', unit: 'pcs', reorderLevel: 10, costPrice: 1200, sellingPrice: 1500 },
    { sku: 'ELEC-002', name: 'Monitor Dell 27"', category: 'Electronics', description: '4K UHD monitor', unit: 'pcs', reorderLevel: 8, costPrice: 350, sellingPrice: 450 },
    { sku: 'ELEC-003', name: 'Keyboard Mechanical', category: 'Electronics', description: 'RGB mechanical keyboard', unit: 'pcs', reorderLevel: 15, costPrice: 80, sellingPrice: 120 },
    { sku: 'ELEC-004', name: 'Mouse Wireless', category: 'Electronics', description: 'Ergonomic wireless mouse', unit: 'pcs', reorderLevel: 20, costPrice: 25, sellingPrice: 40 },
    { sku: 'ELEC-005', name: 'Webcam HD', category: 'Electronics', description: '1080p HD webcam', unit: 'pcs', reorderLevel: 12, costPrice: 60, sellingPrice: 90 },
    { sku: 'ELEC-006', name: 'USB-C Hub', category: 'Electronics', description: '7-port USB-C hub', unit: 'pcs', reorderLevel: 25, costPrice: 35, sellingPrice: 55 },
    { sku: 'ELEC-007', name: 'Headphones Noise-Cancel', category: 'Electronics', description: 'Active noise cancellation', unit: 'pcs', reorderLevel: 10, costPrice: 200, sellingPrice: 300 },
    { sku: 'ELEC-008', name: 'Tablet 10"', category: 'Electronics', description: 'Android tablet', unit: 'pcs', reorderLevel: 8, costPrice: 250, sellingPrice: 350 },
    // Furniture
    { sku: 'FURN-001', name: 'Office Chair Ergonomic', category: 'Furniture', description: 'Adjustable ergonomic chair', unit: 'pcs', reorderLevel: 5, costPrice: 250, sellingPrice: 350 },
    { sku: 'FURN-002', name: 'Standing Desk', category: 'Furniture', description: 'Electric height-adjustable desk', unit: 'pcs', reorderLevel: 4, costPrice: 500, sellingPrice: 750 },
    { sku: 'FURN-003', name: 'Filing Cabinet', category: 'Furniture', description: '4-drawer metal cabinet', unit: 'pcs', reorderLevel: 6, costPrice: 150, sellingPrice: 220 },
    { sku: 'FURN-004', name: 'Bookshelf', category: 'Furniture', description: '5-tier wooden bookshelf', unit: 'pcs', reorderLevel: 8, costPrice: 120, sellingPrice: 180 },
    { sku: 'FURN-005', name: 'Conference Table', category: 'Furniture', description: '8-person conference table', unit: 'pcs', reorderLevel: 2, costPrice: 800, sellingPrice: 1200 },
    { sku: 'FURN-006', name: 'Guest Chair', category: 'Furniture', description: 'Stackable guest chair', unit: 'pcs', reorderLevel: 15, costPrice: 80, sellingPrice: 120 },
    { sku: 'FURN-007', name: 'Desk Lamp LED', category: 'Furniture', description: 'Adjustable LED desk lamp', unit: 'pcs', reorderLevel: 20, costPrice: 40, sellingPrice: 65 },
    { sku: 'FURN-008', name: 'Monitor Stand', category: 'Furniture', description: 'Wooden monitor riser', unit: 'pcs', reorderLevel: 18, costPrice: 30, sellingPrice: 50 },
    // Clothing
    { sku: 'CLTH-001', name: 'Safety Vest Hi-Vis', category: 'Clothing', description: 'High-visibility safety vest', unit: 'pcs', reorderLevel: 20, costPrice: 15, sellingPrice: 25 },
    { sku: 'CLTH-002', name: 'Work Gloves', category: 'Clothing', description: 'Heavy-duty work gloves', unit: 'pairs', reorderLevel: 50, costPrice: 8, sellingPrice: 15 },
    { sku: 'CLTH-003', name: 'Hard Hat', category: 'Clothing', description: 'Safety hard hat', unit: 'pcs', reorderLevel: 15, costPrice: 20, sellingPrice: 35 },
    { sku: 'CLTH-004', name: 'Safety Glasses', category: 'Clothing', description: 'Clear safety glasses', unit: 'pcs', reorderLevel: 30, costPrice: 10, sellingPrice: 18 },
    { sku: 'CLTH-005', name: 'Coveralls', category: 'Clothing', description: 'Full-body work coveralls', unit: 'pcs', reorderLevel: 12, costPrice: 45, sellingPrice: 75 },
    { sku: 'CLTH-006', name: 'Steel Toe Boots', category: 'Clothing', description: 'Safety steel toe boots', unit: 'pairs', reorderLevel: 10, costPrice: 80, sellingPrice: 130 },
    { sku: 'CLTH-007', name: 'Rain Jacket', category: 'Clothing', description: 'Waterproof rain jacket', unit: 'pcs', reorderLevel: 15, costPrice: 35, sellingPrice: 60 },
    { sku: 'CLTH-008', name: 'Uniform Shirt', category: 'Clothing', description: 'Company uniform shirt', unit: 'pcs', reorderLevel: 40, costPrice: 18, sellingPrice: 30 },
    // Food
    { sku: 'FOOD-001', name: 'Coffee Beans Premium', category: 'Food', description: 'Arabica coffee beans 1kg', unit: 'kg', reorderLevel: 30, costPrice: 12, sellingPrice: 20 },
    { sku: 'FOOD-002', name: 'Tea Bags Assorted', category: 'Food', description: 'Box of 100 tea bags', unit: 'boxes', reorderLevel: 25, costPrice: 8, sellingPrice: 14 },
    { sku: 'FOOD-003', name: 'Sugar Packets', category: 'Food', description: 'Box of 500 packets', unit: 'boxes', reorderLevel: 20, costPrice: 15, sellingPrice: 25 },
    { sku: 'FOOD-004', name: 'Bottled Water 24pk', category: 'Food', description: '24-pack bottled water', unit: 'cases', reorderLevel: 40, costPrice: 5, sellingPrice: 10 },
    { sku: 'FOOD-005', name: 'Energy Bars Box', category: 'Food', description: 'Box of 12 energy bars', unit: 'boxes', reorderLevel: 35, costPrice: 18, sellingPrice: 30 },
    { sku: 'FOOD-006', name: 'Instant Noodles', category: 'Food', description: 'Case of 24 cups', unit: 'cases', reorderLevel: 30, costPrice: 20, sellingPrice: 35 },
    { sku: 'FOOD-007', name: 'Protein Powder', category: 'Food', description: '2kg protein powder', unit: 'containers', reorderLevel: 15, costPrice: 35, sellingPrice: 55 },
    { sku: 'FOOD-008', name: 'Granola Mix', category: 'Food', description: '1kg granola mix', unit: 'kg', reorderLevel: 25, costPrice: 10, sellingPrice: 18 },
    // Tools
    { sku: 'TOOL-001', name: 'Power Drill Cordless', category: 'Tools', description: '18V cordless drill', unit: 'pcs', reorderLevel: 8, costPrice: 120, sellingPrice: 180 },
    { sku: 'TOOL-002', name: 'Screwdriver Set', category: 'Tools', description: '20-piece screwdriver set', unit: 'sets', reorderLevel: 15, costPrice: 25, sellingPrice: 40 },
    { sku: 'TOOL-003', name: 'Hammer Claw', category: 'Tools', description: '16oz claw hammer', unit: 'pcs', reorderLevel: 20, costPrice: 18, sellingPrice: 30 },
    { sku: 'TOOL-004', name: 'Tape Measure 25ft', category: 'Tools', description: '25ft tape measure', unit: 'pcs', reorderLevel: 25, costPrice: 12, sellingPrice: 20 },
    { sku: 'TOOL-005', name: 'Level 24"', category: 'Tools', description: '24-inch spirit level', unit: 'pcs', reorderLevel: 12, costPrice: 22, sellingPrice: 38 },
    { sku: 'TOOL-006', name: 'Wrench Set', category: 'Tools', description: 'Metric wrench set', unit: 'sets', reorderLevel: 10, costPrice: 45, sellingPrice: 75 },
    { sku: 'TOOL-007', name: 'Pliers Multi-Pack', category: 'Tools', description: '3-piece pliers set', unit: 'sets', reorderLevel: 18, costPrice: 30, sellingPrice: 50 },
    { sku: 'TOOL-008', name: 'Utility Knife', category: 'Tools', description: 'Retractable utility knife', unit: 'pcs', reorderLevel: 30, costPrice: 8, sellingPrice: 15 }
  ];

  appState.items = itemTemplates.map((item, index) => ({
    id: `ITM${String(index + 1).padStart(3, '0')}`,
    ...item,
    active: true
  }));

  // Initialize stock levels with random quantities
  appState.items.forEach(item => {
    appState.warehouses.forEach(warehouse => {
      const key = `${item.id}-${warehouse.id}`;
      const randomStock = Math.floor(Math.random() * 100) + 5;
      appState.stockLevels[key] = randomStock;
    });
  });

  // Generate historical stock movements (last 90 days)
  const movementTypes = ['Purchase', 'Sale', 'Adjustment', 'Transfer'];
  const now = new Date();
  
  for (let i = 0; i < 150; i++) {
    const daysAgo = Math.floor(Math.random() * 90);
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);
    
    const item = appState.items[Math.floor(Math.random() * appState.items.length)];
    const warehouse = appState.warehouses[Math.floor(Math.random() * appState.warehouses.length)];
    const type = movementTypes[Math.floor(Math.random() * movementTypes.length)];
    const qtyChange = type === 'Sale' ? -(Math.floor(Math.random() * 20) + 1) : Math.floor(Math.random() * 30) + 1;
    
    appState.stockMovements.push({
      id: `MOV${String(appState.stockMovements.length + 1).padStart(5, '0')}`,
      timestamp: date.toISOString(),
      itemId: item.id,
      warehouseId: warehouse.id,
      qtyChange,
      type,
      reference: type === 'Purchase' ? `PO${Math.floor(Math.random() * 100)}` : type === 'Sale' ? `SO${Math.floor(Math.random() * 100)}` : 'Manual',
      user: 'System'
    });
  }

  // Generate purchase orders
  const suppliers = ['ABC Supplies Inc', 'Global Distributors', 'TechSource Ltd', 'Premium Goods Co', 'MegaSupply Corp'];
  const poStatuses = ['Draft', 'Ordered', 'Received', 'Closed'];
  
  for (let i = 0; i < 20; i++) {
    const daysAgo = Math.floor(Math.random() * 60);
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);
    
    const lineItems = [];
    const numItems = Math.floor(Math.random() * 4) + 1;
    
    for (let j = 0; j < numItems; j++) {
      const item = appState.items[Math.floor(Math.random() * appState.items.length)];
      lineItems.push({
        itemId: item.id,
        quantity: Math.floor(Math.random() * 50) + 10,
        costPrice: item.costPrice
      });
    }
    
    const total = lineItems.reduce((sum, li) => sum + (li.quantity * li.costPrice), 0);
    
    appState.purchaseOrders.push({
      id: `PO${String(i + 1).padStart(4, '0')}`,
      supplier: suppliers[Math.floor(Math.random() * suppliers.length)],
      date: date.toISOString().split('T')[0],
      status: poStatuses[Math.floor(Math.random() * poStatuses.length)],
      warehouseId: appState.warehouses[Math.floor(Math.random() * appState.warehouses.length)].id,
      lineItems,
      total
    });
  }

  // Generate sales orders
  const customers = ['Acme Corporation', 'Beta Industries', 'Gamma Enterprises', 'Delta Solutions', 'Epsilon Systems'];
  const soStatuses = ['Draft', 'Confirmed', 'Fulfilled', 'Cancelled'];
  
  for (let i = 0; i < 15; i++) {
    const daysAgo = Math.floor(Math.random() * 45);
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);
    
    const lineItems = [];
    const numItems = Math.floor(Math.random() * 3) + 1;
    
    for (let j = 0; j < numItems; j++) {
      const item = appState.items[Math.floor(Math.random() * appState.items.length)];
      lineItems.push({
        itemId: item.id,
        quantity: Math.floor(Math.random() * 20) + 5,
        sellingPrice: item.sellingPrice
      });
    }
    
    const total = lineItems.reduce((sum, li) => sum + (li.quantity * li.sellingPrice), 0);
    
    appState.salesOrders.push({
      id: `SO${String(i + 1).padStart(4, '0')}`,
      customer: customers[Math.floor(Math.random() * customers.length)],
      date: date.toISOString().split('T')[0],
      status: soStatuses[Math.floor(Math.random() * soStatuses.length)],
      warehouseId: appState.warehouses[Math.floor(Math.random() * appState.warehouses.length)].id,
      lineItems,
      total
    });
  }

  // Generate alerts based on current stock levels
  generateAlerts();
}

function generateAlerts() {
  appState.alerts = [];
  
  appState.items.forEach(item => {
    appState.warehouses.forEach(warehouse => {
      const key = `${item.id}-${warehouse.id}`;
      const stock = appState.stockLevels[key] || 0;
      
      if (stock === 0) {
        appState.alerts.push({
          id: `ALT${String(appState.alerts.length + 1).padStart(5, '0')}`,
          itemId: item.id,
          warehouseId: warehouse.id,
          currentStock: stock,
          reorderLevel: item.reorderLevel,
          type: 'Out of Stock',
          status: 'New',
          timestamp: new Date().toISOString()
        });
      } else if (stock <= item.reorderLevel) {
        appState.alerts.push({
          id: `ALT${String(appState.alerts.length + 1).padStart(5, '0')}`,
          itemId: item.id,
          warehouseId: warehouse.id,
          currentStock: stock,
          reorderLevel: item.reorderLevel,
          type: 'Low Stock',
          status: Math.random() > 0.5 ? 'New' : 'Acknowledged',
          timestamp: new Date().toISOString()
        });
      }
    });
  });
}

// ===========================
// EVENT LISTENERS
// ===========================

function setupEventListeners() {
  // Login form
  document.getElementById('loginForm').addEventListener('submit', handleLogin);
  
  // Mobile menu
  document.getElementById('mobileMenuBtn').addEventListener('click', toggleMobileMenu);
  
  // User menu (logout)
  document.getElementById('userMenu').addEventListener('click', handleLogout);
  
  // Inventory filters
  document.getElementById('searchInput')?.addEventListener('input', filterInventory);
  document.getElementById('categoryFilter')?.addEventListener('change', filterInventory);
  document.getElementById('statusFilter')?.addEventListener('change', filterInventory);
  
  // Buttons
  document.getElementById('addItemBtn')?.addEventListener('click', () => openItemModal());
  document.getElementById('backToInventory')?.addEventListener('click', () => navigateTo('/inventory'));
  document.getElementById('createPOBtn')?.addEventListener('click', openPOModal);
  document.getElementById('createSOBtn')?.addEventListener('click', openSOModal);
  
  // Adjust stock form
  document.getElementById('adjustStockForm')?.addEventListener('submit', handleStockAdjustment);
  
  // Export buttons
  document.getElementById('exportSummaryBtn')?.addEventListener('click', () => exportToCSV('summary'));
  document.getElementById('exportLowStockBtn')?.addEventListener('click', () => exportToCSV('lowstock'));
  document.getElementById('exportMovementsBtn')?.addEventListener('click', () => exportToCSV('movements'));
}

// ===========================
// AUTHENTICATION
// ===========================

function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  const user = appState.users.find(u => u.email === email && u.password === password);
  
  if (user) {
    appState.currentUser = user;
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainApp').style.display = 'flex';
    
    // Update UI with user info
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userAvatar').textContent = user.name.charAt(0);
    
    // Show/hide elements based on role
    updateUIForRole();
    
    // Navigate to dashboard
    navigateTo('/dashboard');
    
    showToast('Welcome back, ' + user.name + '!', 'success');
  } else {
    showToast('Invalid credentials', 'error');
  }
}

function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    appState.currentUser = null;
    document.getElementById('mainApp').style.display = 'none';
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('loginForm').reset();
  }
}

function updateUIForRole() {
  const role = appState.currentUser.role;
  
  // Show settings only for Admin
  document.getElementById('settingsNav').style.display = role === 'Admin' ? 'flex' : 'none';
  
  // Show action buttons for Admin and Manager
  const canEdit = role === 'Admin' || role === 'Manager';
  document.getElementById('addItemBtn').style.display = canEdit ? 'inline-flex' : 'none';
  document.getElementById('addWarehouseBtn').style.display = role === 'Admin' ? 'inline-flex' : 'none';
  document.getElementById('createPOBtn').style.display = canEdit ? 'inline-flex' : 'none';
  document.getElementById('createSOBtn').style.display = canEdit ? 'inline-flex' : 'none';
  document.getElementById('adjustStockCard').style.display = canEdit ? 'block' : 'none';
}

// ===========================
// ROUTING
// ===========================

function setupRouting() {
  window.addEventListener('hashchange', handleRouteChange);
  handleRouteChange();
}

function handleRouteChange() {
  const hash = window.location.hash || '#/dashboard';
  const path = hash.substring(1);
  
  // Hide all pages
  document.querySelectorAll('.page-container').forEach(page => {
    page.classList.remove('active');
  });
  
  // Remove active from nav items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // Route to appropriate page
  if (path === '/dashboard') {
    showDashboard();
  } else if (path === '/inventory') {
    showInventory();
  } else if (path.startsWith('/inventory/')) {
    const itemId = path.split('/')[2];
    showItemDetail(itemId);
  } else if (path === '/warehouses') {
    showWarehouses();
  } else if (path === '/orders/purchase') {
    showPurchaseOrders();
  } else if (path === '/orders/sales') {
    showSalesOrders();
  } else if (path === '/alerts') {
    showAlerts();
  } else if (path === '/reports') {
    showReports();
  } else if (path === '/settings') {
    showSettings();
  }
}

function navigateTo(path) {
  window.location.hash = path;
}

// ===========================
// DASHBOARD
// ===========================

function showDashboard() {
  document.getElementById('dashboardPage').classList.add('active');
  document.querySelector('[data-page="dashboard"]').classList.add('active');
  
  // Calculate KPIs
  const totalSkus = appState.items.filter(i => i.active).length;
  const totalValue = calculateTotalInventoryValue();
  const lowStockCount = countLowStockItems();
  const openOrders = appState.purchaseOrders.filter(po => po.status !== 'Closed').length +
                     appState.salesOrders.filter(so => so.status !== 'Fulfilled' && so.status !== 'Cancelled').length;
  
  document.getElementById('totalSkus').textContent = totalSkus;
  document.getElementById('totalValue').textContent = formatCurrency(totalValue);
  document.getElementById('lowStockCount').textContent = lowStockCount;
  document.getElementById('openOrders').textContent = openOrders;
  
  // Recent alerts
  const recentAlerts = appState.alerts.filter(a => a.status === 'New').slice(0, 5);
  const alertsHtml = recentAlerts.length > 0 ? recentAlerts.map(alert => {
    const item = appState.items.find(i => i.id === alert.itemId);
    const warehouse = appState.warehouses.find(w => w.id === alert.warehouseId);
    return `
      <div style="padding: 12px; border-bottom: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-weight: 500;">${item.name}</div>
          <div style="font-size: 12px; color: var(--color-text-secondary);">${warehouse.name} - Stock: ${alert.currentStock}</div>
        </div>
        <span class="status-badge ${alert.type === 'Out of Stock' ? 'error' : 'warning'}">${alert.type}</span>
      </div>
    `;
  }).join('') : '<div class="empty-state">No new alerts</div>';
  
  document.getElementById('recentAlerts').innerHTML = alertsHtml;
  
  // Recent movements
  const recentMovements = appState.stockMovements.slice(-10).reverse();
  const movementsHtml = recentMovements.map(mov => {
    const item = appState.items.find(i => i.id === mov.itemId);
    const warehouse = appState.warehouses.find(w => w.id === mov.warehouseId);
    return `
      <tr>
        <td>${formatDate(mov.timestamp)}</td>
        <td>${item.name}</td>
        <td>${warehouse.name}</td>
        <td><span class="status-badge ${mov.type === 'Purchase' ? 'success' : mov.type === 'Sale' ? 'error' : 'info'}">${mov.type}</span></td>
        <td style="color: ${mov.qtyChange > 0 ? 'var(--color-success)' : 'var(--color-error)'}; font-weight: 500;">${mov.qtyChange > 0 ? '+' : ''}${mov.qtyChange}</td>
        <td>${mov.reference}</td>
      </tr>
    `;
  }).join('');
  
  document.querySelector('#recentMovementsTable tbody').innerHTML = movementsHtml;
  
  // Chart: Stock movements over last 7 days
  renderMovementsChart();
}

function renderMovementsChart() {
  const ctx = document.getElementById('movementsChart');
  if (!ctx) return;
  
  // Get last 7 days
  const days = [];
  const inflows = [];
  const outflows = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    days.push(dateStr);
    
    const dayMovements = appState.stockMovements.filter(m => m.timestamp.startsWith(dateStr));
    const inflowTotal = dayMovements.filter(m => m.qtyChange > 0).reduce((sum, m) => sum + m.qtyChange, 0);
    const outflowTotal = Math.abs(dayMovements.filter(m => m.qtyChange < 0).reduce((sum, m) => sum + m.qtyChange, 0));
    
    inflows.push(inflowTotal);
    outflows.push(outflowTotal);
  }
  
  // Destroy existing chart if any
  if (window.movementsChartInstance) {
    window.movementsChartInstance.destroy();
  }
  
  window.movementsChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: days.map(d => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
      datasets: [
        {
          label: 'Inflows',
          data: inflows,
          borderColor: '#1FB8CD',
          backgroundColor: 'rgba(31, 184, 205, 0.1)',
          tension: 0.4
        },
        {
          label: 'Outflows',
          data: outflows,
          borderColor: '#FFC185',
          backgroundColor: 'rgba(255, 193, 133, 0.1)',
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// ===========================
// INVENTORY
// ===========================

function showInventory() {
  document.getElementById('inventoryPage').classList.add('active');
  document.querySelector('[data-page="inventory"]').classList.add('active');
  
  // Populate category filter
  const categoryFilter = document.getElementById('categoryFilter');
  categoryFilter.innerHTML = '<option value="">All Categories</option>';
  appState.categories.forEach(cat => {
    categoryFilter.innerHTML += `<option value="${cat}">${cat}</option>`;
  });
  
  renderInventoryTable();
}

function renderInventoryTable(filteredItems = null) {
  const items = filteredItems || appState.items.filter(i => i.active);
  
  const tbody = document.querySelector('#inventoryTable tbody');
  const canEdit = appState.currentUser.role === 'Admin' || appState.currentUser.role === 'Manager';
  
  const html = items.map(item => {
    const totalStock = getTotalStock(item.id);
    const status = getStockStatus(item, totalStock);
    const statusClass = status === 'In Stock' ? 'success' : status === 'Low Stock' ? 'warning' : 'error';
    
    return `
      <tr onclick="navigateTo('/inventory/${item.id}')">
        <td><code>${item.sku}</code></td>
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td>${totalStock} ${item.unit}</td>
        <td>${item.reorderLevel}</td>
        <td><span class="status-badge ${statusClass}">${status}</span></td>
        <td onclick="event.stopPropagation()">
          ${canEdit ? `
            <div class="action-buttons">
              <button class="btn btn-sm btn-secondary" onclick="editItem('${item.id}')">Edit</button>
              <button class="btn btn-sm btn-outline" onclick="deleteItem('${item.id}')">Delete</button>
            </div>
          ` : '-'}
        </td>
      </tr>
    `;
  }).join('');
  
  tbody.innerHTML = html || '<tr><td colspan="7" class="empty-state">No items found</td></tr>';
}

function filterInventory() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  const status = document.getElementById('statusFilter').value;
  
  let filtered = appState.items.filter(i => i.active);
  
  if (search) {
    filtered = filtered.filter(i => 
      i.name.toLowerCase().includes(search) || 
      i.sku.toLowerCase().includes(search)
    );
  }
  
  if (category) {
    filtered = filtered.filter(i => i.category === category);
  }
  
  if (status) {
    filtered = filtered.filter(i => {
      const totalStock = getTotalStock(i.id);
      const itemStatus = getStockStatus(i, totalStock);
      return itemStatus === status;
    });
  }
  
  renderInventoryTable(filtered);
}

function getTotalStock(itemId) {
  let total = 0;
  appState.warehouses.forEach(warehouse => {
    const key = `${itemId}-${warehouse.id}`;
    total += appState.stockLevels[key] || 0;
  });
  return total;
}

function getStockStatus(item, totalStock) {
  if (totalStock === 0) return 'Out of Stock';
  if (totalStock <= item.reorderLevel) return 'Low Stock';
  return 'In Stock';
}

// ===========================
// ITEM DETAIL
// ===========================

function showItemDetail(itemId) {
  const item = appState.items.find(i => i.id === itemId);
  if (!item) {
    navigateTo('/inventory');
    return;
  }
  
  document.getElementById('itemDetailPage').classList.add('active');
  document.getElementById('itemDetailName').textContent = item.name;
  
  // Item info
  const infoHtml = `
    <div class="info-item">
      <div class="info-label">SKU</div>
      <div class="info-value"><code>${item.sku}</code></div>
    </div>
    <div class="info-item">
      <div class="info-label">Category</div>
      <div class="info-value">${item.category}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Description</div>
      <div class="info-value">${item.description}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Unit</div>
      <div class="info-value">${item.unit}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Reorder Level</div>
      <div class="info-value">${item.reorderLevel}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Cost Price</div>
      <div class="info-value">${formatCurrency(item.costPrice)}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Selling Price</div>
      <div class="info-value">${formatCurrency(item.sellingPrice)}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Total Stock</div>
      <div class="info-value">${getTotalStock(item.id)} ${item.unit}</div>
    </div>
  `;
  document.getElementById('itemInfo').innerHTML = infoHtml;
  
  // Stock by warehouse
  const stockHtml = appState.warehouses.map(warehouse => {
    const key = `${item.id}-${warehouse.id}`;
    const stock = appState.stockLevels[key] || 0;
    const status = stock === 0 ? 'Out of Stock' : stock <= item.reorderLevel ? 'Low Stock' : 'In Stock';
    const statusClass = status === 'In Stock' ? 'success' : status === 'Low Stock' ? 'warning' : 'error';
    
    return `
      <tr>
        <td>${warehouse.name}</td>
        <td><code>${warehouse.code}</code></td>
        <td>${stock} ${item.unit}</td>
        <td><span class="status-badge ${statusClass}">${status}</span></td>
      </tr>
    `;
  }).join('');
  document.querySelector('#itemStockTable tbody').innerHTML = stockHtml;
  
  // Recent movements
  const movements = appState.stockMovements
    .filter(m => m.itemId === item.id)
    .slice(-20)
    .reverse();
  
  const movementsHtml = movements.map(mov => {
    const warehouse = appState.warehouses.find(w => w.id === mov.warehouseId);
    return `
      <tr>
        <td>${formatDate(mov.timestamp)}</td>
        <td>${warehouse.name}</td>
        <td><span class="status-badge ${mov.type === 'Purchase' ? 'success' : mov.type === 'Sale' ? 'error' : 'info'}">${mov.type}</span></td>
        <td style="color: ${mov.qtyChange > 0 ? 'var(--color-success)' : 'var(--color-error)'}; font-weight: 500;">${mov.qtyChange > 0 ? '+' : ''}${mov.qtyChange}</td>
        <td>${mov.reference}</td>
        <td>${mov.user}</td>
      </tr>
    `;
  }).join('');
  document.querySelector('#itemMovementsTable tbody').innerHTML = movementsHtml || '<tr><td colspan="6" class="empty-state">No movements yet</td></tr>';
  
  // Populate warehouse dropdown for adjustment
  const warehouseSelect = document.getElementById('adjustWarehouse');
  warehouseSelect.innerHTML = appState.warehouses.map(w => 
    `<option value="${w.id}">${w.name}</option>`
  ).join('');
  
  // Store current item ID for adjustment
  window.currentItemId = itemId;
}

function handleStockAdjustment(e) {
  e.preventDefault();
  
  const itemId = window.currentItemId;
  const warehouseId = document.getElementById('adjustWarehouse').value;
  const qtyChange = parseInt(document.getElementById('adjustQuantity').value);
  const note = document.getElementById('adjustNote').value;
  
  const key = `${itemId}-${warehouseId}`;
  const currentStock = appState.stockLevels[key] || 0;
  const newStock = currentStock + qtyChange;
  
  if (newStock < 0) {
    showToast('Cannot reduce stock below zero', 'error');
    return;
  }
  
  // Update stock
  appState.stockLevels[key] = newStock;
  
  // Create movement
  appState.stockMovements.push({
    id: `MOV${String(appState.stockMovements.length + 1).padStart(5, '0')}`,
    timestamp: new Date().toISOString(),
    itemId,
    warehouseId,
    qtyChange,
    type: 'Adjustment',
    reference: note || 'Manual adjustment',
    user: appState.currentUser.name
  });
  
  // Update alerts
  generateAlerts();
  updateAlertBadge();
  
  // Trigger real-time update
  triggerRealtimeUpdate();
  
  showToast('Stock adjusted successfully', 'success');
  
  // Reset form and refresh view
  document.getElementById('adjustStockForm').reset();
  showItemDetail(itemId);
}

// ===========================
// WAREHOUSES
// ===========================

function showWarehouses() {
  document.getElementById('warehousesPage').classList.add('active');
  document.querySelector('[data-page="warehouses"]').classList.add('active');
  
  const grid = document.getElementById('warehousesGrid');
  const html = appState.warehouses.map(warehouse => {
    const totalItems = appState.items.filter(item => {
      const key = `${item.id}-${warehouse.id}`;
      return (appState.stockLevels[key] || 0) > 0;
    }).length;
    
    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">${warehouse.name}</h3>
        </div>
        <div class="card-body">
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Code</div>
              <div class="info-value"><code>${warehouse.code}</code></div>
            </div>
            <div class="info-item">
              <div class="info-label">Status</div>
              <div class="info-value"><span class="status-badge success">${warehouse.status}</span></div>
            </div>
            <div class="info-item" style="grid-column: 1 / -1;">
              <div class="info-label">Address</div>
              <div class="info-value">${warehouse.address}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Items Stocked</div>
              <div class="info-value">${totalItems}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  grid.innerHTML = html;
}

// ===========================
// PURCHASE ORDERS
// ===========================

function showPurchaseOrders() {
  document.getElementById('purchaseOrdersPage').classList.add('active');
  document.querySelector('[data-page="purchase-orders"]').classList.add('active');
  
  const canEdit = appState.currentUser.role === 'Admin' || appState.currentUser.role === 'Manager';
  
  const tbody = document.querySelector('#purchaseOrdersTable tbody');
  const html = appState.purchaseOrders.map(po => {
    const statusClass = po.status === 'Received' || po.status === 'Closed' ? 'success' : 'info';
    
    return `
      <tr>
        <td><code>${po.id}</code></td>
        <td>${po.supplier}</td>
        <td>${formatDate(po.date)}</td>
        <td><span class="status-badge ${statusClass}">${po.status}</span></td>
        <td>${formatCurrency(po.total)}</td>
        <td>
          ${canEdit && po.status === 'Ordered' ? `
            <button class="btn btn-sm btn-primary" onclick="receivePO('${po.id}')">Mark Received</button>
          ` : '-'}
        </td>
      </tr>
    `;
  }).join('');
  
  tbody.innerHTML = html;
}

function openPOModal() {
  document.getElementById('poModal').classList.add('active');
  document.getElementById('poForm').reset();
  
  // Set default date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('poDate').value = today;
  
  // Populate warehouse dropdown
  const warehouseSelect = document.getElementById('poWarehouse');
  warehouseSelect.innerHTML = appState.warehouses.map(w => 
    `<option value="${w.id}">${w.name}</option>`
  ).join('');
  
  // Add initial line item
  document.getElementById('poLineItems').innerHTML = '';
  addPOLineItem();
}

function addPOLineItem() {
  const container = document.getElementById('poLineItems');
  const index = container.children.length;
  
  const itemOptions = appState.items.map(i => 
    `<option value="${i.id}">${i.name} (${i.sku})</option>`
  ).join('');
  
  const html = `
    <div class="line-item-row">
      <select class="form-control po-item" required>
        <option value="">Select item...</option>
        ${itemOptions}
      </select>
      <input type="number" class="form-control po-qty" placeholder="Quantity" required min="1">
      <input type="number" class="form-control po-cost" placeholder="Cost" required min="0" step="0.01">
      <div class="po-subtotal" style="font-weight: 500;">$0.00</div>
      <button type="button" class="remove-item-btn" onclick="this.parentElement.remove()">&times;</button>
    </div>
  `;
  
  container.insertAdjacentHTML('beforeend', html);
  
  // Add change listeners for auto-calculation
  const row = container.lastElementChild;
  const itemSelect = row.querySelector('.po-item');
  const qtyInput = row.querySelector('.po-qty');
  const costInput = row.querySelector('.po-cost');
  const subtotalDiv = row.querySelector('.po-subtotal');
  
  itemSelect.addEventListener('change', () => {
    const item = appState.items.find(i => i.id === itemSelect.value);
    if (item) {
      costInput.value = item.costPrice;
      updatePOSubtotal(row);
    }
  });
  
  qtyInput.addEventListener('input', () => updatePOSubtotal(row));
  costInput.addEventListener('input', () => updatePOSubtotal(row));
}

function updatePOSubtotal(row) {
  const qty = parseFloat(row.querySelector('.po-qty').value) || 0;
  const cost = parseFloat(row.querySelector('.po-cost').value) || 0;
  const subtotal = qty * cost;
  row.querySelector('.po-subtotal').textContent = formatCurrency(subtotal);
}

function savePO() {
  const supplier = document.getElementById('poSupplier').value;
  const date = document.getElementById('poDate').value;
  const warehouseId = document.getElementById('poWarehouse').value;
  
  const lineItemRows = document.querySelectorAll('#poLineItems .line-item-row');
  const lineItems = [];
  
  lineItemRows.forEach(row => {
    const itemId = row.querySelector('.po-item').value;
    const quantity = parseInt(row.querySelector('.po-qty').value);
    const costPrice = parseFloat(row.querySelector('.po-cost').value);
    
    if (itemId && quantity && costPrice) {
      lineItems.push({ itemId, quantity, costPrice });
    }
  });
  
  if (!supplier || !date || !warehouseId || lineItems.length === 0) {
    showToast('Please fill all required fields', 'error');
    return;
  }
  
  const total = lineItems.reduce((sum, li) => sum + (li.quantity * li.costPrice), 0);
  
  const po = {
    id: `PO${String(appState.purchaseOrders.length + 1).padStart(4, '0')}`,
    supplier,
    date,
    status: 'Ordered',
    warehouseId,
    lineItems,
    total
  };
  
  appState.purchaseOrders.unshift(po);
  
  closeModal('poModal');
  showToast('Purchase order created successfully', 'success');
  showPurchaseOrders();
}

function receivePO(poId) {
  const po = appState.purchaseOrders.find(p => p.id === poId);
  if (!po) return;
  
  if (!confirm(`Mark PO ${poId} as received? This will update stock levels.`)) return;
  
  // Update stock levels
  po.lineItems.forEach(lineItem => {
    const key = `${lineItem.itemId}-${po.warehouseId}`;
    appState.stockLevels[key] = (appState.stockLevels[key] || 0) + lineItem.quantity;
    
    // Create stock movement
    appState.stockMovements.push({
      id: `MOV${String(appState.stockMovements.length + 1).padStart(5, '0')}`,
      timestamp: new Date().toISOString(),
      itemId: lineItem.itemId,
      warehouseId: po.warehouseId,
      qtyChange: lineItem.quantity,
      type: 'Purchase',
      reference: po.id,
      user: appState.currentUser.name
    });
  });
  
  po.status = 'Received';
  
  // Update alerts
  generateAlerts();
  updateAlertBadge();
  
  // Trigger real-time update
  triggerRealtimeUpdate();
  
  showToast('Purchase order received. Stock updated.', 'success');
  showPurchaseOrders();
}

// ===========================
// SALES ORDERS
// ===========================

function showSalesOrders() {
  document.getElementById('salesOrdersPage').classList.add('active');
  document.querySelector('[data-page="sales-orders"]').classList.add('active');
  
  const canEdit = appState.currentUser.role === 'Admin' || appState.currentUser.role === 'Manager';
  
  const tbody = document.querySelector('#salesOrdersTable tbody');
  const html = appState.salesOrders.map(so => {
    const statusClass = so.status === 'Fulfilled' ? 'success' : so.status === 'Cancelled' ? 'error' : 'info';
    
    return `
      <tr>
        <td><code>${so.id}</code></td>
        <td>${so.customer}</td>
        <td>${formatDate(so.date)}</td>
        <td><span class="status-badge ${statusClass}">${so.status}</span></td>
        <td>${formatCurrency(so.total)}</td>
        <td>
          ${canEdit && so.status === 'Confirmed' ? `
            <button class="btn btn-sm btn-primary" onclick="fulfillSO('${so.id}')">Mark Fulfilled</button>
          ` : '-'}
        </td>
      </tr>
    `;
  }).join('');
  
  tbody.innerHTML = html;
}

function openSOModal() {
  document.getElementById('soModal').classList.add('active');
  document.getElementById('soForm').reset();
  
  // Set default date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('soDate').value = today;
  
  // Populate warehouse dropdown
  const warehouseSelect = document.getElementById('soWarehouse');
  warehouseSelect.innerHTML = appState.warehouses.map(w => 
    `<option value="${w.id}">${w.name}</option>`
  ).join('');
  
  // Add initial line item
  document.getElementById('soLineItems').innerHTML = '';
  addSOLineItem();
}

function addSOLineItem() {
  const container = document.getElementById('soLineItems');
  
  const itemOptions = appState.items.map(i => 
    `<option value="${i.id}">${i.name} (${i.sku})</option>`
  ).join('');
  
  const html = `
    <div class="line-item-row">
      <select class="form-control so-item" required>
        <option value="">Select item...</option>
        ${itemOptions}
      </select>
      <input type="number" class="form-control so-qty" placeholder="Quantity" required min="1">
      <input type="number" class="form-control so-price" placeholder="Price" required min="0" step="0.01">
      <div class="so-subtotal" style="font-weight: 500;">$0.00</div>
      <button type="button" class="remove-item-btn" onclick="this.parentElement.remove()">&times;</button>
    </div>
  `;
  
  container.insertAdjacentHTML('beforeend', html);
  
  // Add change listeners for auto-calculation
  const row = container.lastElementChild;
  const itemSelect = row.querySelector('.so-item');
  const qtyInput = row.querySelector('.so-qty');
  const priceInput = row.querySelector('.so-price');
  
  itemSelect.addEventListener('change', () => {
    const item = appState.items.find(i => i.id === itemSelect.value);
    if (item) {
      priceInput.value = item.sellingPrice;
      updateSOSubtotal(row);
    }
  });
  
  qtyInput.addEventListener('input', () => updateSOSubtotal(row));
  priceInput.addEventListener('input', () => updateSOSubtotal(row));
}

function updateSOSubtotal(row) {
  const qty = parseFloat(row.querySelector('.so-qty').value) || 0;
  const price = parseFloat(row.querySelector('.so-price').value) || 0;
  const subtotal = qty * price;
  row.querySelector('.so-subtotal').textContent = formatCurrency(subtotal);
}

function saveSO() {
  const customer = document.getElementById('soCustomer').value;
  const date = document.getElementById('soDate').value;
  const warehouseId = document.getElementById('soWarehouse').value;
  
  const lineItemRows = document.querySelectorAll('#soLineItems .line-item-row');
  const lineItems = [];
  
  lineItemRows.forEach(row => {
    const itemId = row.querySelector('.so-item').value;
    const quantity = parseInt(row.querySelector('.so-qty').value);
    const sellingPrice = parseFloat(row.querySelector('.so-price').value);
    
    if (itemId && quantity && sellingPrice) {
      lineItems.push({ itemId, quantity, sellingPrice });
    }
  });
  
  if (!customer || !date || !warehouseId || lineItems.length === 0) {
    showToast('Please fill all required fields', 'error');
    return;
  }
  
  const total = lineItems.reduce((sum, li) => sum + (li.quantity * li.sellingPrice), 0);
  
  const so = {
    id: `SO${String(appState.salesOrders.length + 1).padStart(4, '0')}`,
    customer,
    date,
    status: 'Confirmed',
    warehouseId,
    lineItems,
    total
  };
  
  appState.salesOrders.unshift(so);
  
  closeModal('soModal');
  showToast('Sales order created successfully', 'success');
  showSalesOrders();
}

function fulfillSO(soId) {
  const so = appState.salesOrders.find(s => s.id === soId);
  if (!so) return;
  
  // Check if sufficient stock
  for (let lineItem of so.lineItems) {
    const key = `${lineItem.itemId}-${so.warehouseId}`;
    const currentStock = appState.stockLevels[key] || 0;
    if (currentStock < lineItem.quantity) {
      const item = appState.items.find(i => i.id === lineItem.itemId);
      showToast(`Insufficient stock for ${item.name}`, 'error');
      return;
    }
  }
  
  if (!confirm(`Mark SO ${soId} as fulfilled? This will reduce stock levels.`)) return;
  
  // Update stock levels
  so.lineItems.forEach(lineItem => {
    const key = `${lineItem.itemId}-${so.warehouseId}`;
    appState.stockLevels[key] = (appState.stockLevels[key] || 0) - lineItem.quantity;
    
    // Create stock movement
    appState.stockMovements.push({
      id: `MOV${String(appState.stockMovements.length + 1).padStart(5, '0')}`,
      timestamp: new Date().toISOString(),
      itemId: lineItem.itemId,
      warehouseId: so.warehouseId,
      qtyChange: -lineItem.quantity,
      type: 'Sale',
      reference: so.id,
      user: appState.currentUser.name
    });
  });
  
  so.status = 'Fulfilled';
  
  // Update alerts
  generateAlerts();
  updateAlertBadge();
  
  // Trigger real-time update
  triggerRealtimeUpdate();
  
  showToast('Sales order fulfilled. Stock updated.', 'success');
  showSalesOrders();
}

// ===========================
// ALERTS
// ===========================

function showAlerts() {
  document.getElementById('alertsPage').classList.add('active');
  document.querySelector('[data-page="alerts"]').classList.add('active');
  
  const canEdit = appState.currentUser.role === 'Admin' || appState.currentUser.role === 'Manager';
  
  const tbody = document.querySelector('#alertsTable tbody');
  const html = appState.alerts.map(alert => {
    const item = appState.items.find(i => i.id === alert.itemId);
    const warehouse = appState.warehouses.find(w => w.id === alert.warehouseId);
    const typeClass = alert.type === 'Out of Stock' ? 'error' : 'warning';
    const statusClass = alert.status === 'Resolved' ? 'success' : alert.status === 'Acknowledged' ? 'info' : 'warning';
    
    return `
      <tr>
        <td>${item.name}</td>
        <td>${warehouse.name}</td>
        <td>${alert.currentStock}</td>
        <td>${alert.reorderLevel}</td>
        <td><span class="status-badge ${typeClass}">${alert.type}</span></td>
        <td><span class="status-badge ${statusClass}">${alert.status}</span></td>
        <td>
          ${canEdit && alert.status === 'New' ? `
            <button class="btn btn-sm btn-secondary" onclick="acknowledgeAlert('${alert.id}')">Acknowledge</button>
          ` : canEdit && alert.status === 'Acknowledged' ? `
            <button class="btn btn-sm btn-primary" onclick="resolveAlert('${alert.id}')">Resolve</button>
          ` : '-'}
        </td>
      </tr>
    `;
  }).join('');
  
  tbody.innerHTML = html || '<tr><td colspan="7" class="empty-state">No alerts</td></tr>';
}

function acknowledgeAlert(alertId) {
  const alert = appState.alerts.find(a => a.id === alertId);
  if (alert) {
    alert.status = 'Acknowledged';
    updateAlertBadge();
    showToast('Alert acknowledged', 'success');
    showAlerts();
  }
}

function resolveAlert(alertId) {
  const alert = appState.alerts.find(a => a.id === alertId);
  if (alert) {
    alert.status = 'Resolved';
    updateAlertBadge();
    showToast('Alert resolved', 'success');
    showAlerts();
  }
}

function updateAlertBadge() {
  const newAlerts = appState.alerts.filter(a => a.status === 'New').length;
  const badge = document.getElementById('alertBadge');
  
  if (newAlerts > 0) {
    badge.textContent = newAlerts;
    badge.style.display = 'inline-flex';
  } else {
    badge.style.display = 'none';
  }
}

// ===========================
// REPORTS
// ===========================

function showReports() {
  document.getElementById('reportsPage').classList.add('active');
  document.querySelector('[data-page="reports"]').classList.add('active');
  
  // Stock Summary KPIs
  const totalValue = calculateTotalInventoryValue();
  const totalItems = appState.items.filter(i => i.active).length;
  const totalQty = Object.values(appState.stockLevels).reduce((sum, qty) => sum + qty, 0);
  
  document.getElementById('reportTotalValue').textContent = formatCurrency(totalValue);
  document.getElementById('reportTotalItems').textContent = totalItems;
  document.getElementById('reportTotalQty').textContent = totalQty;
  
  // Category Chart
  renderCategoryChart();
  
  // Warehouse Chart
  renderWarehouseChart();
  
  // Low Stock Report
  renderLowStockReport();
  
  // Movements Report
  renderMovementsReport();
}

function renderCategoryChart() {
  const ctx = document.getElementById('categoryChart');
  if (!ctx) return;
  
  const categoryData = {};
  appState.categories.forEach(cat => {
    categoryData[cat] = 0;
  });
  
  appState.items.forEach(item => {
    const totalStock = getTotalStock(item.id);
    const value = totalStock * item.costPrice;
    categoryData[item.category] = (categoryData[item.category] || 0) + value;
  });
  
  if (window.categoryChartInstance) {
    window.categoryChartInstance.destroy();
  }
  
  window.categoryChartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(categoryData),
      datasets: [{
        data: Object.values(categoryData),
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        },
        title: {
          display: true,
          text: 'Stock Value by Category'
        }
      }
    }
  });
}

function renderWarehouseChart() {
  const ctx = document.getElementById('warehouseChart');
  if (!ctx) return;
  
  const warehouseData = {};
  appState.warehouses.forEach(wh => {
    warehouseData[wh.name] = 0;
  });
  
  appState.items.forEach(item => {
    appState.warehouses.forEach(warehouse => {
      const key = `${item.id}-${warehouse.id}`;
      const stock = appState.stockLevels[key] || 0;
      const value = stock * item.costPrice;
      warehouseData[warehouse.name] += value;
    });
  });
  
  if (window.warehouseChartInstance) {
    window.warehouseChartInstance.destroy();
  }
  
  window.warehouseChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(warehouseData),
      datasets: [{
        label: 'Stock Value',
        data: Object.values(warehouseData),
        backgroundColor: '#1FB8CD'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Stock Value by Warehouse'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '$' + value.toLocaleString();
            }
          }
        }
      }
    }
  });
}

function renderLowStockReport() {
  const tbody = document.querySelector('#lowStockTable tbody');
  const lowStockItems = [];
  
  appState.items.forEach(item => {
    appState.warehouses.forEach(warehouse => {
      const key = `${item.id}-${warehouse.id}`;
      const stock = appState.stockLevels[key] || 0;
      
      if (stock <= item.reorderLevel) {
        lowStockItems.push({
          item,
          warehouse,
          stock,
          shortage: item.reorderLevel - stock
        });
      }
    });
  });
  
  const html = lowStockItems.map(ls => `
    <tr>
      <td>${ls.item.name}</td>
      <td>${ls.item.category}</td>
      <td>${ls.warehouse.name}</td>
      <td>${ls.stock}</td>
      <td>${ls.item.reorderLevel}</td>
      <td style="color: var(--color-error); font-weight: 500;">${ls.shortage}</td>
    </tr>
  `).join('');
  
  tbody.innerHTML = html || '<tr><td colspan="6" class="empty-state">No low stock items</td></tr>';
}

function renderMovementsReport() {
  // Chart
  const ctx = document.getElementById('movementsReportChart');
  if (ctx) {
    const days = [];
    const inflows = [];
    const outflows = [];
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      days.push(dateStr);
      
      const dayMovements = appState.stockMovements.filter(m => m.timestamp.startsWith(dateStr));
      const inflowTotal = dayMovements.filter(m => m.qtyChange > 0).reduce((sum, m) => sum + m.qtyChange, 0);
      const outflowTotal = Math.abs(dayMovements.filter(m => m.qtyChange < 0).reduce((sum, m) => sum + m.qtyChange, 0));
      
      inflows.push(inflowTotal);
      outflows.push(outflowTotal);
    }
    
    if (window.movementsReportChartInstance) {
      window.movementsReportChartInstance.destroy();
    }
    
    window.movementsReportChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: days.map(d => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
        datasets: [
          {
            label: 'Inflows',
            data: inflows,
            borderColor: '#1FB8CD',
            backgroundColor: 'rgba(31, 184, 205, 0.1)',
            tension: 0.4
          },
          {
            label: 'Outflows',
            data: outflows,
            borderColor: '#FFC185',
            backgroundColor: 'rgba(255, 193, 133, 0.1)',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            text: 'Stock Movements (Last 30 Days)'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  // Table
  const tbody = document.querySelector('#movementsReportTable tbody');
  const recentMovements = appState.stockMovements.slice(-50).reverse();
  
  const html = recentMovements.map(mov => {
    const item = appState.items.find(i => i.id === mov.itemId);
    const warehouse = appState.warehouses.find(w => w.id === mov.warehouseId);
    return `
      <tr>
        <td>${formatDate(mov.timestamp)}</td>
        <td>${item.name}</td>
        <td><span class="status-badge ${mov.type === 'Purchase' ? 'success' : mov.type === 'Sale' ? 'error' : 'info'}">${mov.type}</span></td>
        <td style="color: ${mov.qtyChange > 0 ? 'var(--color-success)' : 'var(--color-error)'}; font-weight: 500;">${mov.qtyChange > 0 ? '+' : ''}${mov.qtyChange}</td>
        <td>${warehouse.name}</td>
      </tr>
    `;
  }).join('');
  
  tbody.innerHTML = html;
}

// ===========================
// SETTINGS
// ===========================

function showSettings() {
  document.getElementById('settingsPage').classList.add('active');
  document.querySelector('[data-page="settings"]').classList.add('active');
  
  const tbody = document.querySelector('#usersTable tbody');
  const html = appState.users.map(user => `
    <tr>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td><span class="status-badge info">${user.role}</span></td>
    </tr>
  `).join('');
  
  tbody.innerHTML = html;
}

// ===========================
// MODALS
// ===========================

function openItemModal(itemId = null) {
  document.getElementById('itemModal').classList.add('active');
  
  const categorySelect = document.getElementById('itemCategory');
  categorySelect.innerHTML = appState.categories.map(cat => 
    `<option value="${cat}">${cat}</option>`
  ).join('');
  
  if (itemId) {
    const item = appState.items.find(i => i.id === itemId);
    if (item) {
      document.getElementById('itemModalTitle').textContent = 'Edit Item';
      document.getElementById('itemSku').value = item.sku;
      document.getElementById('itemName').value = item.name;
      document.getElementById('itemCategory').value = item.category;
      document.getElementById('itemDescription').value = item.description;
      document.getElementById('itemUnit').value = item.unit;
      document.getElementById('itemReorder').value = item.reorderLevel;
      document.getElementById('itemCost').value = item.costPrice;
      document.getElementById('itemPrice').value = item.sellingPrice;
      window.editingItemId = itemId;
    }
  } else {
    document.getElementById('itemModalTitle').textContent = 'Add New Item';
    document.getElementById('itemForm').reset();
    window.editingItemId = null;
  }
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
}

function saveItem() {
  const sku = document.getElementById('itemSku').value;
  const name = document.getElementById('itemName').value;
  const category = document.getElementById('itemCategory').value;
  const description = document.getElementById('itemDescription').value;
  const unit = document.getElementById('itemUnit').value;
  const reorderLevel = parseInt(document.getElementById('itemReorder').value);
  const costPrice = parseFloat(document.getElementById('itemCost').value);
  const sellingPrice = parseFloat(document.getElementById('itemPrice').value);
  
  if (!sku || !name || !category || !unit || isNaN(reorderLevel) || isNaN(costPrice) || isNaN(sellingPrice)) {
    showToast('Please fill all required fields', 'error');
    return;
  }
  
  if (window.editingItemId) {
    // Edit existing
    const item = appState.items.find(i => i.id === window.editingItemId);
    if (item) {
      Object.assign(item, { sku, name, category, description, unit, reorderLevel, costPrice, sellingPrice });
      showToast('Item updated successfully', 'success');
    }
  } else {
    // Add new
    const newItem = {
      id: `ITM${String(appState.items.length + 1).padStart(3, '0')}`,
      sku,
      name,
      category,
      description,
      unit,
      reorderLevel,
      costPrice,
      sellingPrice,
      active: true
    };
    
    appState.items.push(newItem);
    
    // Initialize stock levels to 0 for all warehouses
    appState.warehouses.forEach(warehouse => {
      const key = `${newItem.id}-${warehouse.id}`;
      appState.stockLevels[key] = 0;
    });
    
    showToast('Item added successfully', 'success');
  }
  
  closeModal('itemModal');
  showInventory();
}

function editItem(itemId) {
  openItemModal(itemId);
}

function deleteItem(itemId) {
  if (confirm('Are you sure you want to delete this item?')) {
    const item = appState.items.find(i => i.id === itemId);
    if (item) {
      item.active = false;
      showToast('Item deleted successfully', 'success');
      showInventory();
    }
  }
}

// ===========================
// REAL-TIME SIMULATION
// ===========================

function startRealtimeSimulation() {
  setInterval(() => {
    simulateRealtimeUpdate();
  }, 10000); // Every 10 seconds
}

function simulateRealtimeUpdate() {
  // Randomly generate a stock movement
  const shouldUpdate = Math.random() > 0.5;
  if (!shouldUpdate) return;
  
  const item = appState.items[Math.floor(Math.random() * appState.items.length)];
  const warehouse = appState.warehouses[Math.floor(Math.random() * appState.warehouses.length)];
  const type = Math.random() > 0.5 ? 'Purchase' : 'Sale';
  const qtyChange = type === 'Purchase' ? Math.floor(Math.random() * 20) + 5 : -(Math.floor(Math.random() * 10) + 1);
  
  const key = `${item.id}-${warehouse.id}`;
  const currentStock = appState.stockLevels[key] || 0;
  const newStock = Math.max(0, currentStock + qtyChange);
  
  appState.stockLevels[key] = newStock;
  
  appState.stockMovements.push({
    id: `MOV${String(appState.stockMovements.length + 1).padStart(5, '0')}`,
    timestamp: new Date().toISOString(),
    itemId: item.id,
    warehouseId: warehouse.id,
    qtyChange: newStock - currentStock,
    type,
    reference: type === 'Purchase' ? `PO-AUTO-${Math.floor(Math.random() * 1000)}` : `SO-AUTO-${Math.floor(Math.random() * 1000)}`,
    user: 'System'
  });
  
  // Update alerts
  generateAlerts();
  updateAlertBadge();
  
  // Trigger visual update
  triggerRealtimeUpdate();
}

function triggerRealtimeUpdate() {
  const liveDot = document.getElementById('liveDot');
  liveDot.classList.add('active');
  
  setTimeout(() => {
    liveDot.classList.remove('active');
  }, 1500);
  
  // Refresh current page if needed
  const currentHash = window.location.hash || '#/dashboard';
  if (currentHash === '#/dashboard') {
    showDashboard();
  } else if (currentHash === '#/inventory') {
    filterInventory();
  } else if (currentHash === '#/alerts') {
    showAlerts();
  }
}

// ===========================
// UTILITIES
// ===========================

function calculateTotalInventoryValue() {
  let total = 0;
  appState.items.forEach(item => {
    const totalStock = getTotalStock(item.id);
    total += totalStock * item.costPrice;
  });
  return total;
}

function countLowStockItems() {
  let count = 0;
  appState.items.forEach(item => {
    const totalStock = getTotalStock(item.id);
    if (totalStock <= item.reorderLevel) {
      count++;
    }
  });
  return count;
}

function formatCurrency(value) {
  return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function toggleMobileMenu() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('mobile-hidden');
}

function exportToCSV(reportType) {
  let csv = '';
  let filename = '';
  
  if (reportType === 'summary') {
    filename = 'stock-summary.csv';
    csv = 'Item,Category,Total Stock,Unit,Cost Price,Total Value\n';
    
    appState.items.forEach(item => {
      const totalStock = getTotalStock(item.id);
      const totalValue = totalStock * item.costPrice;
      csv += `"${item.name}","${item.category}",${totalStock},"${item.unit}",${item.costPrice},${totalValue}\n`;
    });
  } else if (reportType === 'lowstock') {
    filename = 'low-stock-report.csv';
    csv = 'Item,Category,Warehouse,Current Stock,Reorder Point,Shortage\n';
    
    appState.items.forEach(item => {
      appState.warehouses.forEach(warehouse => {
        const key = `${item.id}-${warehouse.id}`;
        const stock = appState.stockLevels[key] || 0;
        
        if (stock <= item.reorderLevel) {
          const shortage = item.reorderLevel - stock;
          csv += `"${item.name}","${item.category}","${warehouse.name}",${stock},${item.reorderLevel},${shortage}\n`;
        }
      });
    });
  } else if (reportType === 'movements') {
    filename = 'stock-movements.csv';
    csv = 'Date,Item,Type,Quantity,Warehouse,Reference,User\n';
    
    appState.stockMovements.slice(-100).forEach(mov => {
      const item = appState.items.find(i => i.id === mov.itemId);
      const warehouse = appState.warehouses.find(w => w.id === mov.warehouseId);
      csv += `"${formatDate(mov.timestamp)}","${item.name}","${mov.type}",${mov.qtyChange},"${warehouse.name}","${mov.reference}","${mov.user}"\n`;
    });
  }
  
  // Download CSV
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
  
  showToast('Report exported successfully', 'success');
}

// ===========================
// INITIALIZE APP
// ===========================

document.addEventListener('DOMContentLoaded', initializeApp);