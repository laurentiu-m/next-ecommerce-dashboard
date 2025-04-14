"use server";

import CustomersTable from "./table";

export default async function UsersPage() {
  return (
    <div className="p-8">
      <CustomersTable />
    </div>
  );
}
