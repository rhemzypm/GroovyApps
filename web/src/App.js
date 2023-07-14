import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import Login from "./components/Login";

// GLOBAL
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";

// ADMIN MANAGEMENT
import ManageAdmin from "./scenes/manageAdmin";
import CreateAdmin from "./scenes/createAdmin";

// USER & POINT MANAGEMENT
import Users from "./scenes/users";
import ManagePoint from "./scenes/managePoint";

// FAQ MANAGEMENT
import FAQ from "./scenes/faq";

// PRODUCT MANAGEMENT
import ManageProduct from "./scenes/manageProduct";
import AddProduct from "./scenes/addProduct";
import EditProduct from "./scenes/editProduct";

// PROMO MANAGEMENT
import ManagePromo from "./scenes/managePromo";
import AddPromo from "./scenes/addPromo";
import EditPromo from "./scenes/editPromo";

// VOUCHER MANAGEMENT
import ManageVoucher from "./scenes/manageVoucher";
import AddVoucher from "./scenes/addVoucher";
import EditVoucher from "./scenes/editVoucher";

function App({ children }) {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = async () => {
    // Perform authentication logic here, e.g., send API request, validate credentials, etc.
    // If authentication is successful, update the authenticated state to true
    setAuthenticated(true);
  };

  const handleLogout = () => {
    // Perform logout logic here, e.g., clear tokens, reset states, etc.
    // Update the authenticated state to false
    setAuthenticated(false);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {authenticated ? (
            <>
              <Sidebar isSidebar={isSidebar} />
              <main className="content">
                <Topbar
                  setIsSidebar={setIsSidebar}
                  handleLogout={handleLogout}
                />
                <Routes>
                  <Route path="/" element={<ManageAdmin />} />
                  <Route path="/admin" element={<ManageAdmin />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/point" element={<ManagePoint />} />
                  <Route path="/create" element={<CreateAdmin />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/manageproduct" element={<ManageProduct />} />
                  <Route path="/addproduct" element={<AddProduct />} />
                  <Route path="/editproduct/:id" element={<EditProduct />} />
                  <Route path="/managepromo" element={<ManagePromo />} />
                  <Route path="/addpromo" element={<AddPromo />} />
                  <Route path="/editpromo/:id" element={<EditPromo />} />
                  <Route path="/managevoucher" element={<ManageVoucher />} />
                  <Route path="/addvoucher" element={<AddVoucher />} />
                  <Route path="/editvoucher/:id" element={<EditVoucher />} />
                </Routes>
              </main>
            </>
          ) : (
            <Routes>
              <Route path="/" element={<Login handleLogin={handleLogin} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
