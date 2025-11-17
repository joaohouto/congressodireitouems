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
import { FileSpreadsheet, Loader2, Pencil, Trash } from "lucide-react";
import { formatDate } from "date-fns";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";

type Ticket = {
  id: string;
  instagram: string;
  igAvatar: string;
  igName: string;
  createdAt: Date;
};

export default function GerenciaClient({
  tickets: initialTickets,
}: {
  tickets: Ticket[];
}) {
  const [tickets, setTickets] = useState(initialTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeletingAll, setIsDeletingAll] = useState(false);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedTicket) return;

    try {
      const response = await axios.put(
        `/api/ticket/${selectedTicket.id}`,
        selectedTicket
      );
      setTickets(
        tickets.map((ticket) =>
          ticket.id === selectedTicket.id ? response.data : ticket
        )
      );
      toast.success("Ingresso atualizado com sucesso!");
      setIsEditDialogOpen(false);
    } catch (error) {
      toast.error("Erro ao atualizar ingresso.");
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await axios.delete(`/api/ticket/${id}`);
      setTickets(tickets.filter((ticket) => ticket.id !== id));
      toast.success("Ingresso deletado com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar ingresso.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteAll = async () => {
    setIsDeletingAll(true);
    try {
      await axios.delete(`/api/ticket/delete-all`);
      setTickets([]);
      toast.success("Todos os ingressos foram deletados com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar todos os ingressos.");
    } finally {
      setIsDeletingAll(false);
    }
  };

  const handleExport = (type: "csv" | "excel") => {
    const worksheet = XLSX.utils.json_to_sheet(tickets);
    if (type === "excel") {
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Ingressos");
      XLSX.writeFile(workbook, "ingressos.xlsx");
    } else {
      const csv = XLSX.utils.sheet_to_csv(worksheet);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "ingressos.csv");
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={isDeletingAll}>
              {isDeletingAll ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Apagar Todos"
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
              <AlertDialogDescription>
                Essa ação não pode ser desfeita. Isso irá deletar
                permanentemente TODOS os ingressos.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteAll}>
                Deletar Tudo
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Instagram</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Criada em</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell>
                <Link href={`/ingresso/${ticket.id}`}>
                  <code className="text-primary bg-muted rounded p-1 px-2">
                    {ticket.id}
                  </code>
                </Link>
              </TableCell>
              <TableCell>{ticket.instagram}</TableCell>
              <TableCell>{ticket.igName}</TableCell>
              <TableCell>
                {formatDate(ticket.createdAt, "dd/MM/yyyy HH:mm")}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setSelectedTicket(ticket);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="icon"
                        disabled={deletingId === ticket.id}
                      >
                        {deletingId === ticket.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash className="h-4 w-4" />
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Você tem certeza absoluta?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Essa ação não pode ser desfeita. Isso irá deletar
                          permanentemente o ingresso.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(ticket.id)}
                        >
                          Deletar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Ingresso</DialogTitle>
          </DialogHeader>
          {selectedTicket && (
            <form onSubmit={handleUpdate}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="instagram" className="text-right">
                    Instagram
                  </Label>
                  <Input
                    id="instagram"
                    value={selectedTicket.instagram}
                    onChange={(e) =>
                      setSelectedTicket({
                        ...selectedTicket,
                        instagram: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="igName" className="text-right">
                    Nome no Instagram
                  </Label>
                  <Input
                    id="igName"
                    value={selectedTicket.igName}
                    onChange={(e) =>
                      setSelectedTicket({
                        ...selectedTicket,
                        igName: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="igAvatar" className="text-right">
                    Avatar no Instagram
                  </Label>
                  <Input
                    id="igAvatar"
                    value={selectedTicket.igAvatar}
                    onChange={(e) =>
                      setSelectedTicket({
                        ...selectedTicket,
                        igAvatar: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit">Salvar</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
