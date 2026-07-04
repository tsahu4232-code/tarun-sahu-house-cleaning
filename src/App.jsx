import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./admin/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsappButton from "./components/WhatsappButton";
import CallButton from "./components/CallButton";
import Home from "./pages/Home";

// Everything except the homepage is loaded on demand. This keeps the
// first bundle small so the site loads fast, especially on mobile
// networks - the browser only downloads a page's code when the
// visitor actually navigates to it.
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Contact = lazy(() => import("./pages/Contact"));
const Gallery = lazy(() => import("./pages/Gallery"));
const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));
const AdminLogin = lazy(() => import("./admin/AdminLogin"));

function PageLoader() {
  return (
    <div className="flex justify-center items-center py-32">
      <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <WhatsappButton />
      <CallButton />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
}

export default App;
