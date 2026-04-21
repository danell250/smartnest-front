import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { storefrontInfo } from "@/data/storefront";
import { API_BASE, getAuthHeaders } from "@/lib/api";
import { ArrowLeft, AlertCircle, Truck } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "sonner";

export default function Checkout() {
  const { items, getTotalPrice, clearCart } = useCart();
  const { authToken, user } = useAuth();
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    province: localStorage.getItem('selectedProvince') || "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [estimatedDays, setEstimatedDays] = useState(0);
  const [pendingOrder, setPendingOrder] = useState<{
    internalOrderId: number;
    orderNumber: string;
    paypalOrderId: string;
    totalUSD: string;
  } | null>(null);

  const subtotal = getTotalPrice();
  const tax = subtotal * (15 / 115);
  const total = subtotal;
  const paypalTotalUsd = (total / storefrontInfo.paypalUsdToZarRate).toFixed(2);

  // Calculate shipping when province changes
  useEffect(() => {
    if (formData.province) {
      calculateShipping(formData.province);
    }
  }, [formData.province, items]);

  useEffect(() => {
    if (!user) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      firstName: prev.firstName || user.firstName || "",
      lastName: prev.lastName || user.lastName || "",
      email: prev.email || user.email || "",
      phone: prev.phone || user.phone || "",
      address: prev.address || user.address || "",
      city: prev.city || user.city || "",
      postalCode: prev.postalCode || user.postalCode || "",
      province: prev.province || user.province || prev.province,
    }));
  }, [user]);

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
        setEstimatedDays(data.estimatedDays);
      }
    } catch (error) {
      console.error('Shipping calculation failed:', error);
    }
  };

  const validateForm = () => {
    const missingFields = [];
    if (!formData.firstName) missingFields.push("First Name");
    if (!formData.lastName) missingFields.push("Last Name");
    if (!formData.email) missingFields.push("Email");
    if (!formData.phone) missingFields.push("Phone");
    if (!formData.address) missingFields.push("Address");
    if (!formData.city) missingFields.push("City");
    if (!formData.postalCode) missingFields.push("Postal Code");
    if (!formData.province) missingFields.push("Province");

    if (missingFields.length > 0) {
      toast.error(`Please fill in the following fields: ${missingFields.join(", ")}`);
      return false;
    }

    return true;
  };

  const createPayPalOrder = async () => {
    setIsProcessing(true);

    try {
      const response = await fetch(`${API_BASE}/api/checkout/paypal-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(authToken),
        },
        body: JSON.stringify({
          ...formData,
          items,
        }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to initialize checkout');
      }

      setPendingOrder({
        internalOrderId: data.orderId,
        orderNumber: data.orderNumber,
        paypalOrderId: data.paypalOrderId,
        totalUSD: data.totalUSD,
      });

      setEstimatedDays(data.estimatedDays);

      return data.paypalOrderId;
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to process checkout. Please try again.');
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayPalClick = (_data: any, actions: any) => {
    if (!validateForm()) {
      return actions.reject();
    }
    return actions.resolve();
  };

  const onApprove = async (data: any) => {
    setIsProcessing(true);

    try {
      if (!pendingOrder) {
        throw new Error('No pending order found for this payment');
      }

      const orderResponse = await fetch(`${API_BASE}/api/orders/${pendingOrder.internalOrderId}/capture`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paypalOrderId: data.orderID,
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json().catch(() => null);
        throw new Error(errorData?.error || 'Failed to capture payment');
      }

      const orderData = await orderResponse.json();

      toast.success(`Payment successful! Order #${orderData.orderNumber} has been placed.`);
      clearCart();
      localStorage.removeItem("selectedProvince");
      setPendingOrder(null);
      setLocation("/");
    } catch (error) {
      console.error('Order update failed:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update order. Please contact support.');
    } finally {
      setIsProcessing(false);
    }
  };

  const onError = (err: any) => {
    console.error("PayPal error:", err);
    toast.error("Payment failed. Please try again.");
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
              {user && (
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-muted-foreground">
                  Checking out as <span className="font-semibold text-foreground">{user.firstName || user.email}</span>. Your account details were filled in for you, and you can still edit anything here before payment.
                </div>
              )}

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
                    Pay securely using PayPal. PayPal does not support ZAR checkout, so your final charge will be processed in USD at our store rate of R{storefrontInfo.paypalUsdToZarRate.toFixed(2)} per $1.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-muted/30 p-3 text-xs text-foreground">
                  Estimated PayPal charge: <span className="font-semibold">${pendingOrder?.totalUSD || paypalTotalUsd} USD</span>
                </div>

                <div className="pt-2">
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    onClick={handlePayPalClick}
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
                  <span>Subtotal (incl. VAT)</span>
                  <span className="font-semibold">R{subtotal.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-xs text-foreground">
                  <span>VAT included</span>
                  <span className="font-semibold">R{tax.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-xs text-foreground">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3 h-3" />
                    Delivery
                  </span>
                  <span className="font-semibold text-green-700">Included</span>
                </div>
                {estimatedDays > 0 && (
                  <div className="text-xs text-muted-foreground">
                    Est. delivery: {estimatedDays} business days
                  </div>
                )}
              </div>

              <div className="border-t border-border pt-3 flex justify-between text-base font-bold text-foreground">
                <span>Total (incl. VAT)</span>
                <span className="text-primary">R{total.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
