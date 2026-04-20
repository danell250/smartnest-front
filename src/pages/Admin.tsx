import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { catalogProducts } from "@/data/catalog";

const API_BASE = process.env.NODE_ENV === 'production' ? 'https://smartnestback.onrender.com' : 'http://localhost:3001';

export default function Admin() {
  const [orders, setOrders] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [lowStock, setLowStock] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory'>('orders');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Fetch orders
      const ordersRes = await fetch(`${API_BASE}/api/orders`);
      const ordersData = await ordersRes.json();
      if (ordersData.success) {
        setOrders(ordersData.orders);
      }

      // Fetch inventory
      const invRes = await fetch(`${API_BASE}/api/inventory`);
      const invData = await invRes.json();
      if (invData.success) {
        setInventory(invData.inventory);
      }

      // Fetch low stock
      const lowStockRes = await fetch(`${API_BASE}/api/inventory/low-stock`);
      const lowStockData = await lowStockRes.json();
      if (lowStockData.success) {
        setLowStock(lowStockData.lowStock);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const syncInventory = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/inventory/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: catalogProducts }),
      });
      const data = await response.json();
      if (data.success) {
        alert(`Synced ${data.count} products to inventory`);
        loadData();
      }
    } catch (error) {
      console.error('Sync failed:', error);
      alert('Failed to sync inventory');
    }
  };

  const updateOrderStatus = async (orderId: number, status: string) => {
    try {
      await fetch(`${API_BASE}/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      loadData();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-background py-20 container">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container">
        <h1 className="text-3xl font-bold text-foreground mb-8">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="text-2xl font-bold text-primary">{orders.length}</div>
            <div className="text-sm text-muted-foreground">Total Orders</div>
          </Card>
          <Card className="p-6">
            <div className="text-2xl font-bold text-green-600">
              {orders.filter((o) => o.status === 'processing').length}
            </div>
            <div className="text-sm text-muted-foreground">Processing</div>
          </Card>
          <Card className="p-6">
            <div className="text-2xl font-bold text-orange-600">
              {orders.filter((o) => o.status === 'pending').length}
            </div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </Card>
          <Card className="p-6">
            <div className="text-2xl font-bold text-red-600">{lowStock.length}</div>
            <div className="text-sm text-muted-foreground">Low Stock Items</div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <Button
            variant={activeTab === 'orders' ? 'default' : 'outline'}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </Button>
          <Button
            variant={activeTab === 'inventory' ? 'default' : 'outline'}
            onClick={() => setActiveTab('inventory')}
          >
            Inventory
          </Button>
        </div>

        {activeTab === 'orders' && (
          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3">Order #</th>
                    <th className="text-left p-3">Customer</th>
                    <th className="text-left p-3">Total</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Date</th>
                    <th className="text-left p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-border">
                      <td className="p-3 font-semibold">{order.orderNumber}</td>
                      <td className="p-3">{order.firstName} {order.lastName}</td>
                      <td className="p-3">R{order.total.toFixed(2)}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          order.status === 'processing' ? 'bg-green-100 text-green-700' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="p-3">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="px-3 py-1 border border-border rounded"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === 'inventory' && (
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Inventory Management</h2>
              <Button onClick={syncInventory}>Sync from Catalog</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3">Product</th>
                    <th className="text-left p-3">Brand</th>
                    <th className="text-left p-3">Price (ZAR)</th>
                    <th className="text-left p-3">Stock</th>
                    <th className="text-left p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item) => (
                    <tr key={item.id} className="border-b border-border">
                      <td className="p-3 font-semibold">{item.name}</td>
                      <td className="p-3">{item.brand}</td>
                      <td className="p-3">R{item.priceZAR.toFixed(2)}</td>
                      <td className="p-3">
                        <span className={`font-semibold ${
                          item.stockQuantity <= item.minStockLevel ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {item.stockQuantity}
                        </span>
                      </td>
                      <td className="p-3">
                        {item.stockQuantity <= item.minStockLevel ? (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Low Stock</span>
                        ) : (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">In Stock</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
