"use client";

import { Advocate } from "@/db/seed/advocates";
import { useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  useEffect(() => {
    const newSearchTerm = searchTerm.toUpperCase();

    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.toUpperCase().includes(newSearchTerm) ||
        advocate.lastName.toUpperCase().includes(newSearchTerm) ||
        advocate.city.toUpperCase().includes(newSearchTerm) ||
        advocate.degree.toUpperCase().includes(newSearchTerm) ||
        advocate.specialties
          .map((s) => s.toUpperCase())
          .includes(newSearchTerm) ||
        advocate.yearsOfExperience
          .toString()
          .toUpperCase()
          .includes(newSearchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  }, [searchTerm]);

  const onResetClick = () => {
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  return (
    <main className="m-6">
      <h1 className="text-2xl font-bold">Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p className="text-lg font-medium">Search</p>
        <p className="text-sm text-gray-600">
          Searching for: <span className="font-semibold">{searchTerm}</span>
        </p>
        <input
          className="border border-gray-400 rounded p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={onResetClick}
        >
          Reset Search
        </button>
      </div>
      <br />
      <br />
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">
              First Name
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Last Name
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">City</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Degree
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Specialties
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Years of Experience
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Phone Number
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr key={advocate.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {advocate.firstName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {advocate.lastName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {advocate.city}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {advocate.degree}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {advocate.specialties.map((s) => (
                    <div key={advocate.id + s}>{s}</div>
                  ))}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {advocate.yearsOfExperience}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {advocate.phoneNumber}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
