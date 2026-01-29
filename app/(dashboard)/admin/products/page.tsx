"use client";
import { DashboardProductTable } from "@/components";
import React from "react";

const DashboardProducts = () => {
  return (
    <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
      <DashboardProductTable />
    </div>
  );
};

export default DashboardProducts;
