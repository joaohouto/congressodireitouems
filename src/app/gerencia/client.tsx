"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { FileSpreadsheet } from "lucide-react";
import { formatDate } from "date-fns";

type Subscription = {
  id: string;
  name: string;
  email: string;
  category: string;
  instagram: string | null;
  createdAt: string;
};

export default function GerenciaClient({
  subscriptions,
}: {
  subscriptions: Subscription[];
}) {
  const handleExport = (type: "csv" | "excel") => {
    const worksheet = XLSX.utils.json_to_sheet(subscriptions);
    if (type === "excel") {
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Inscrições");
      XLSX.writeFile(workbook, "inscricoes.xlsx");
    } else {
      const csv = XLSX.utils.sheet_to_csv(worksheet);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "inscricoes.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-4 gap-2">
        <Button variant="outline" onClick={() => handleExport("csv")}>
          Exportar CSV
        </Button>
        <Button variant="outline" onClick={() => handleExport("excel")}>
          <FileSpreadsheet />
          Exportar Excel
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Instagram</TableHead>
            <TableHead>Criada em</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions.map((sub) => (
            <TableRow key={sub.id}>
              <TableCell>{sub.name}</TableCell>
              <TableCell>{sub.email}</TableCell>
              <TableCell>{sub.category}</TableCell>
              <TableCell>{sub.instagram}</TableCell>
              <TableCell>
                {formatDate(sub.createdAt, "dd/MM/yyyy HH:mm")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
