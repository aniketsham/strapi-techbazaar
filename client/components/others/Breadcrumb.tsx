"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbProps {
  pages?: { name: string; link: string }[]; // Optional for one-level deep pages
  currentPage: string;
}

const BreadcrumbComponent = ({ pages = [], currentPage }: BreadcrumbProps) => {
  return (
    <nav aria-label="breadcrumb">
      <Breadcrumb>
        <BreadcrumbList>
          {/* Home Link */}
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          {/* Dynamic Breadcrumb Links (only if provided) */}
          {pages.length > 0 &&
            pages.map((page) => (
              <React.Fragment key={page.link}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={page.link}>{page.name}</BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            ))}

          {/* Current Page */}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{currentPage}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
};

export default BreadcrumbComponent;
