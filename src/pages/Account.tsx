import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SiteFooter from "@/components/SiteFooter";
import { useAuth } from "@/contexts/AuthContext";
import { API_BASE, getAuthHeaders, getStoredAuthToken } from "@/lib/api";
import { ArrowLeft, LogOut, Package, ShieldCheck, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

interface AccountOrder {
  id: number;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: number;
  createdAt: string;
  itemCount: number;
}

export default function Account() {
  const [, setLocation] = useLocation();
  const { authToken, isLoading, login, logout, register, updateProfile, user } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
  });
  const [orders, setOrders] = useState<AccountOrder[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    setProfileForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phone: user.phone || "",
      address: user.address || "",
      city: user.city || "",
      province: user.province || "",
      postalCode: user.postalCode || "",
    });
  }, [user]);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }

    const loadOrders = async () => {
      setIsLoadingOrders(true);

      try {
        const token = authToken || getStoredAuthToken();
        const response = await fetch(`${API_BASE}/api/auth/orders`, {
          headers: {
            ...getAuthHeaders(token),
          },
        });
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || "Failed to load order history");
        }

        setOrders(data.orders || []);
      } catch (error) {
        console.error("Failed to load account orders", error);
      } finally {
        setIsLoadingOrders(false);
      }
    };

    loadOrders();
  }, [authToken, user]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await login(loginForm);
      toast.success("You are now signed in.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await register({
        firstName: registerForm.firstName,
        lastName: registerForm.lastName,
        email: registerForm.email,
        password: registerForm.password,
      });
      toast.success("Your account has been created.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to create your account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProfileSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await updateProfile(profileForm);
      toast.success("Your account details were saved.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save your profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.success("You have been signed out.");
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-primary hover:text-blue-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Store
          </button>
          <div className="flex items-center gap-2">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663463860697/SLdhiRT72VUh4Up8w2TPrH/smartnest-sa-logo-4SozQvwRC7AYGTMjDcFgTA.webp"
              alt="SmartNest SA"
              className="w-8 h-8"
            />
            <span className="font-bold text-lg text-foreground">SmartNest SA</span>
          </div>
          {user ? (
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          ) : (
            <Button variant="ghost" onClick={() => setLocation("/products")}>
              Browse Products
            </Button>
          )}
        </div>
      </nav>

      <main className="py-12">
        <div className="container max-w-5xl space-y-8">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-foreground">Your Account</h1>
            <p className="text-lg text-muted-foreground">
              Sign in for faster checkout, saved details, and order history. Guest checkout still works if you prefer.
            </p>
          </div>

          {isLoading ? (
            <Card className="p-6">Loading your account...</Card>
          ) : user ? (
            <div className="grid lg:grid-cols-[1.25fr_0.9fr] gap-6">
              <Card className="p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                <form className="grid md:grid-cols-2 gap-4" onSubmit={handleProfileSave}>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={profileForm.firstName}
                    onChange={(event) => setProfileForm((prev) => ({ ...prev, firstName: event.target.value }))}
                    className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={profileForm.lastName}
                    onChange={(event) => setProfileForm((prev) => ({ ...prev, lastName: event.target.value }))}
                    className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    value={profileForm.phone}
                    onChange={(event) => setProfileForm((prev) => ({ ...prev, phone: event.target.value }))}
                    className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={user.email}
                    disabled
                    className="px-4 py-3 border border-border rounded-lg bg-muted text-muted-foreground"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={profileForm.address}
                    onChange={(event) => setProfileForm((prev) => ({ ...prev, address: event.target.value }))}
                    className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary md:col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={profileForm.city}
                    onChange={(event) => setProfileForm((prev) => ({ ...prev, city: event.target.value }))}
                    className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    placeholder="Province"
                    value={profileForm.province}
                    onChange={(event) => setProfileForm((prev) => ({ ...prev, province: event.target.value }))}
                    className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={profileForm.postalCode}
                    onChange={(event) => setProfileForm((prev) => ({ ...prev, postalCode: event.target.value }))}
                    className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <div className="md:col-span-2 flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Saving..." : "Save Details"}
                    </Button>
                  </div>
                </form>
              </Card>

              <div className="space-y-6">
                <Card className="p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <h2 className="font-semibold text-foreground">Faster Checkout</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We’ll use these saved details to prefill checkout next time, but you can still edit them before paying.
                  </p>
                </Card>

                <Card className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-primary" />
                    <h2 className="font-semibold text-foreground">Recent Orders</h2>
                  </div>

                  {isLoadingOrders ? (
                    <p className="text-sm text-muted-foreground">Loading order history...</p>
                  ) : orders.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No orders yet. Once you place an order with this email, it will show here.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {orders.map((order) => (
                        <div key={order.id} className="border border-border rounded-lg p-4 space-y-1">
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-medium text-foreground">{order.orderNumber}</p>
                            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {order.itemCount} item{order.itemCount === 1 ? "" : "s"} • {new Date(order.createdAt).toLocaleDateString("en-ZA")}
                          </p>
                          <p className="text-sm font-semibold text-foreground">
                            R{Number(order.total).toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6 space-y-5">
                <div className="flex items-center gap-2">
                  <Button
                    variant={mode === "login" ? "default" : "outline"}
                    onClick={() => setMode("login")}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant={mode === "register" ? "default" : "outline"}
                    onClick={() => setMode("register")}
                  >
                    Create Account
                  </Button>
                </div>

                {mode === "login" ? (
                  <form className="space-y-4" onSubmit={handleLogin}>
                    <input
                      type="email"
                      placeholder="Email"
                      value={loginForm.email}
                      onChange={(event) => setLoginForm((prev) => ({ ...prev, email: event.target.value }))}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={loginForm.password}
                      onChange={(event) => setLoginForm((prev) => ({ ...prev, password: event.target.value }))}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Signing In..." : "Sign In"}
                    </Button>
                  </form>
                ) : (
                  <form className="space-y-4" onSubmit={handleRegister}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        value={registerForm.firstName}
                        onChange={(event) => setRegisterForm((prev) => ({ ...prev, firstName: event.target.value }))}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={registerForm.lastName}
                        onChange={(event) => setRegisterForm((prev) => ({ ...prev, lastName: event.target.value }))}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email"
                      value={registerForm.email}
                      onChange={(event) => setRegisterForm((prev) => ({ ...prev, email: event.target.value }))}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={registerForm.password}
                      onChange={(event) => setRegisterForm((prev) => ({ ...prev, password: event.target.value }))}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={registerForm.confirmPassword}
                      onChange={(event) => setRegisterForm((prev) => ({ ...prev, confirmPassword: event.target.value }))}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                )}
              </Card>

              <Card className="p-6 space-y-4 bg-blue-50 border-primary/20">
                <h2 className="text-xl font-semibold text-foreground">Why use an account?</h2>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>Save your delivery details for faster checkout.</li>
                  <li>See recent orders linked to your email address.</li>
                  <li>Keep guest checkout available whenever you want it.</li>
                </ul>
              </Card>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
