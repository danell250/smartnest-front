import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { storefrontInfo } from "@/data/storefront";
import { ArrowLeft, AlertCircle, Truck } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const API_BASE = process.env.NODE_ENV === 'production' ? 'https://smartnestback.onrender.com' : 'http://localhost:3001';

export default function Checkout() {
  const { items, getTotalPrice } = useCart();
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    province: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [estimatedDays, setEstimatedDays] = useState(0);
  const [customerId, setCustomerId] = useState<number | null>(null);

  const subtotal = getTotalPrice();
  const tax = subtotal * (15 / 115);
  const total = subtotal + tax + shippingCost;

  // Calculate shipping when province changes
  useEffect(() => {
    if (formData.province) {
      calculateShipping(formData.province);
    }
  }, [formData.province, items]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h1 className="text-foreground">Your cart is empty</h1>
            <p className="text-muted-foreground">Please add items before checking out.</p>
            <Button
              onClick={() => setLocation("/")}
              className="bg-primary hover:bg-blue-700 text-white gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Shop
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateShipping = async (province: string) => {
    try {
      const response = await fetch(`${API_BASE}/api/shipping/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ province, totalWeight: items.length * 3 }),
      });
      const data = await response.json();
      if (data.success) {
        setShippingCost(data.shippingCost);
        setEstimatedDays(data.estimatedDays);
      }
    } catch (error) {
      console.error('Shipping calculation failed:', error);
    }
  };

  const handleSecureCheckout = async () => {
    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.postalCode || !formData.province) {
      alert("Please fill in all fields");
      return;
    }

    setIsProcessing(true);

    try {
      // Create or get customer
      const customerResponse = await fetch(`${API_BASE}/api/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const customerData = await customerResponse.json();

      if (!customerData.success) {
        throw new Error('Failed to create customer');
      }

      setCustomerId(customerData.customerId);

      setIsProcessing(false);
      return { customerId: customerData.customerId };
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Failed to process checkout. Please try again.');
      setIsProcessing(false);
      return null;
    }
  };

  const createPayPalOrder = () => {
    return handleSecureCheckout().then((orderData) => {
      if (!orderData) {
        throw new Error("Order data is missing");
      }
      // Convert ZAR to USD (approximate rate - in production, use a real API)
      const zarToUsdRate = 0.055;
      const totalUsd = (total * zarToUsdRate).toFixed(2);
      
      return totalUsd;
    });
  };

  const onApprove = async (data: any) => {
    // Create order in backend after PayPal approval
    if (!customerId) {
      alert('Customer information missing. Please try again.');
      return;
    }

    setIsProcessing(true);

    try {
      const orderResponse = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId,
          items,
          subtotal,
          tax,
          shipping: shippingCost,
          total,
          shippingAddress: formData.address,
          city: formData.city,
          province: formData.province,
          postalCode: formData.postalCode,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error('Failed to create order');
      }

      // Update order with PayPal payment info
      await fetch(`${API_BASE}/api/orders/${orderData.orderId}/payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentId: data.orderID,
          paymentStatus: 'COMPLETED',
        }),
      });

      alert(`Payment successful! Order #${orderData.orderNumber} has been placed.`);
      // Clear cart and redirect
      localStorage.removeItem("smartnest-cart");
      setLocation("/");
    } catch (error) {
      console.error('Order creation failed:', error);
      alert('Failed to create order. Please contact support.');
    } finally {
      setIsProcessing(false);
    }
  };

  const onError = (err: any) => {
    console.error("PayPal error:", err);
    alert("Payment failed. Please try again.");
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setLocation("/cart")}
            className="gap-2 text-primary hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold text-foreground mb-6">Checkout</h1>

            <Card className="p-5 space-y-6">
              {/* Shipping Information */}
              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-foreground">Shipping Information</h2>

                <div className="grid md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <div className="grid md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    className="px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Province</option>
                    <option value="EC">Eastern Cape</option>
                    <option value="FS">Free State</option>
                    <option value="GP">Gauteng</option>
                    <option value="KZN">KwaZulu-Natal</option>
                    <option value="LP">Limpopo</option>
                    <option value="MP">Mpumalanga</option>
                    <option value="NC">Northern Cape</option>
                    <option value="NW">North West</option>
                    <option value="WC">Western Cape</option>
                  </select>
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4 border-t border-border pt-6">
                <h2 className="text-sm font-semibold text-foreground">Secure Payment</h2>

                <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-foreground">
                    Pay securely using PayPal. Your payment information is protected and processed directly by PayPal.
                  </p>
                </div>

                <div className="pt-2">
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={createPayPalOrder}
                    onApprove={onApprove}
                    onError={onError}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-4 sticky top-24 space-y-4">
              <h2 className="text-sm font-semibold text-foreground">Order Summary</h2>

              <div className="space-y-2 max-h-48 overflow-y-auto border-b border-border pb-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs text-foreground">
                    <span className="line-clamp-1 flex-1 mr-2">{item.name} x{item.quantity}</span>
                    <span className="font-semibold whitespace-nowrap">R{(item.priceZAR * item.quantity).toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-foreground">
                  <span>Subtotal</span>
                  <span className="font-semibold">R{subtotal.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-xs text-foreground">
                  <span>VAT (15%)</span>
                  <span className="font-semibold">R{tax.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-xs text-foreground">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3 h-3" />
                    Shipping
                  </span>
                  <span className="font-semibold">
                    {shippingCost > 0 ? `R${shippingCost.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'Select province'}
                  </span>
                </div>
                {estimatedDays > 0 && (
                  <div className="text-xs text-muted-foreground">
                    Est. delivery: {estimatedDays} business days
                  </div>
                )}
              </div>

              <div className="border-t border-border pt-3 flex justify-between text-base font-bold text-foreground">
                <span>Total</span>
                <span className="text-primary">R{total.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
