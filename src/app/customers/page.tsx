"use server";

import CustomersTable from "./table";

export default function UsersPage() {
  return (
    <div className="p-8">
      <CustomersTable />
    </div>
  );
}
