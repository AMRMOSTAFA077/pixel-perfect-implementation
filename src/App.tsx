import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Boards from "@/pages/Boards";
import BoardDetail from "@/pages/BoardDetail";
import ItemDetail from "@/pages/ItemDetail";
import Connect from "@/pages/Connect";
import ShareBoard from "@/pages/ShareBoard";
import ShareItem from "@/pages/ShareItem";
import AppLayout from "@/components/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/share/board/:shareId" element={<ShareBoard />} />
        <Route path="/share/item/:shareId" element={<ShareItem />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/boards/:id" element={<BoardDetail />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/connect" element={<Connect />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
