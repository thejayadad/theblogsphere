'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
} from "@nextui-org/react";
import { FiMoreVertical, FiSearch } from 'react-icons/fi';

const ReusableTable = ({ data, columns }) => {
  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(4); // Set number of rows per page

  useEffect(() => {
    let filtered = data;

    // Apply text filter
    if (filterValue) {
      filtered = filtered.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(filterValue.toLowerCase())
        )
      );
    }

    setFilteredData(filtered);
    setPage(1); // Reset to the first page when the filter changes
  }, [filterValue, data]);

  const renderCell = (item, columnKey) => {
    switch (columnKey) {
      case 'actions':
        return (
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <FiMoreVertical className="text-default-300" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="edit">Edit</DropdownItem>
              <DropdownItem key="delete">Delete</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );
      case 'isActive':
        return item.isActive ? 'True' : 'False'; // Render 'True' or 'False' based on isActive value
      default:
        return item[columnKey] || ''; // Return the data based on the column key or an empty string if undefined
    }
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="mb-4 flex justify-between items-center">
        <Input
          isClearable
          className="w-full sm:max-w-[50%]"
          placeholder="Search..."
          startContent={<FiSearch className='h-4 w-4' />}
          value={filterValue}
          onClear={() => setFilterValue("")}
          onChange={(e) => setFilterValue(e.target.value)} // Updated to use onChange event
        />
      </div>

      {/* Table Component */}
      <Table aria-label="Hero Banners Table" className="w-full">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} allowsSorting={column.sortable}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={paginatedData}>
          {(item) => (
            <TableRow key={item.id}>
              {columns.map((column) => (
                <TableCell key={column.uid}>
                  {renderCell(item, column.uid)}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button
          disabled={page <= 1}
          onClick={handlePreviousPage}
          variant="flat"
        >
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          disabled={page >= totalPages}
          onClick={handleNextPage}
          variant="flat"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ReusableTable;
