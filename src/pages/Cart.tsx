import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { Trash2, ArrowLeft, ShoppingCart, Shield, Truck, CheckCircle, Package } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const [selectedProvince, setSelectedProvince] = useState("");

  const total = getTotalPrice();

  // Shipping rates for South African provinces
  const shippingRates: Record<string, { baseRate: number; perKgRate: number; estimatedDays: number }> = {
    GP: { baseRate: 89, perKgRate: 15, estimatedDays: 3 },
    WC: { baseRate: 129, perKgRate: 18, estimatedDays: 5 },
    KZN: { baseRate: 119, perKgRate: 17, estimatedDays: 4 },
    EC: { baseRate: 149, perKgRate: 20, estimatedDays: 6 },
    FS: { baseRate: 109, perKgRate: 16, estimatedDays: 4 },
    LP: { baseRate: 119, perKgRate: 17, estimatedDays: 5 },
    MP: { baseRate: 109, perKgRate: 16, estimatedDays: 4 },
    NC: { baseRate: 139, perKgRate: 19, estimatedDays: 6 },
    NW: { baseRate: 109, perKgRate: 16, estimatedDays: 4 },
  };

  const provinceNames: Record<string, string> = {
    GP: "Gauteng",
    WC: "Western Cape",
    KZN: "KwaZulu-Natal",
    EC: "Eastern Cape",
    FS: "Free State",
    LP: "Limpopo",
    MP: "Mpumalanga",
    NC: "Northern Cape",
    NW: "North West",
  };

  // Calculate shipping cost (assuming average robot vacuum weight of 4kg)
  const estimatedWeight = items.reduce((sum, item) => sum + (item.quantity * 4), 0);
  const shippingCost = selectedProvince 
    ? shippingRates[selectedProvince].baseRate + (shippingRates[selectedProvince].perKgRate * estimatedWeight)
    : 0;
  const estimatedDays = selectedProvince ? shippingRates[selectedProvince].estimatedDays : 0;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <Card className="p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <ShoppingCart className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Your Cart is Empty</h1>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Start shopping and add premium robot vacuums to your cart.
              </p>
              <Button
                onClick={() => setLocation("/")}
                className="bg-primary hover:bg-blue-700 text-white gap-2 px-6 py-3"
              >
                <ArrowLeft className="w-4 h-4" />
                Browse Products
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="gap-2 text-muted-foreground hover:text-primary mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Shopping Cart</h1>
          <p className="text-sm text-muted-foreground mt-1">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <Card key={item.id} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg border border-border"
                    />
                    <div className="absolute -top-1 -left-1 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {item.quantity}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">{item.brand}</p>
                        <h3 className="font-semibold text-foreground text-sm line-clamp-2">{item.name}</h3>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-border rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="px-2 py-1 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm"
                          >
                            −
                          </button>
                          <span className="px-3 py-1 font-semibold text-foreground min-w-[40px] text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 hover:bg-muted transition-colors font-semibold text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-bold text-primary">
                          R{(item.priceZAR * item.quantity).toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          R{item.priceZAR.toLocaleString('en-ZA')} each
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-border flex justify-end">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-1 text-xs text-destructive hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    Remove
                  </button>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-4 sticky top-24 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <Package className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-bold text-foreground">Order Summary</h2>
              </div>

              {/* Province Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">Select Province for Shipping</label>
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select province...</option>
                  <option value="GP">Gauteng</option>
                  <option value="WC">Western Cape</option>
                  <option value="KZN">KwaZulu-Natal</option>
                  <option value="EC">Eastern Cape</option>
                  <option value="FS">Free State</option>
                  <option value="LP">Limpopo</option>
                  <option value="MP">Mpumalanga</option>
                  <option value="NC">Northern Cape</option>
                  <option value="NW">North West</option>
                </select>
                {selectedProvince && (
                  <p className="text-xs text-muted-foreground">
                    Estimated delivery: {estimatedDays} business days
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-foreground">
                  <span className="text-muted-foreground">Subtotal (incl. VAT)</span>
                  <span className="font-semibold">R{total.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-xs text-foreground">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold">
                    {selectedProvince 
                      ? `R${shippingCost.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      : 'Select province'
                    }
                  </span>
                </div>
              </div>

              <div className="border-t border-border pt-3">
                <div className="flex justify-between text-base font-bold text-foreground">
                  <span>Total (incl. VAT)</span>
                  <span className="text-primary">
                    R{(total + shippingCost).toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <Button
                onClick={() => {
                  if (selectedProvince) {
                    localStorage.setItem('selectedProvince', selectedProvince);
                    setLocation("/checkout");
                  } else {
                    alert('Please select a province to calculate shipping');
                  }
                }}
                className="w-full bg-primary hover:bg-blue-700 text-white py-3 text-sm font-semibold"
              >
                Proceed to Checkout
              </Button>

              <div className="space-y-2 pt-3 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Secure PayPal payment</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>Fast delivery across SA</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>14-day return policy</span>
                </div>
              </div>

              <Button
                onClick={clearCart}
                variant="ghost"
                className="w-full text-xs text-muted-foreground hover:text-destructive hover:bg-red-50"
              >
                Clear Cart
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
