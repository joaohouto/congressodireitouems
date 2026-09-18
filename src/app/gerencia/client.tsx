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
import {
  FileXlsIcon,
  PencilSimpleIcon,
  TrashSimpleIcon,
  MagnifyingGlassIcon,
  ArrowSquareOutIcon,
} from "@phosphor-icons/react";
import { Spinner } from "@/components/luxe/spinner";
import { formatDate } from "date-fns";
import { useState, useMemo } from "react";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarUploadField } from "@/components/avatar-upload-field";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";

type Ticket = {
  id: string;
  count?: number;
  instagram: string;
  igAvatar?: string | null;
  igName: string | null;
  createdAt: Date;
};

export default function GerenciaClient({
  tickets: initialTickets,
}: {
  tickets: Ticket[];
}) {
  const [tickets, setTickets] = useState(initialTickets);
  const [search, setSearch] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeletingAll, setIsDeletingAll] = useState(false);

  // Filtragem dinâmica por Nome, Número ou Instagram
  const filteredTickets = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return tickets;

    return tickets.filter((ticket) => {
      const nameMatch = (ticket.igName || "").toLowerCase().includes(q);
      const instagramMatch = (ticket.instagram || "").toLowerCase().includes(q);
      const formattedNumber =
        ticket.count && ticket.count > 0
          ? `#${ticket.count.toString().padStart(4, "0")}`
          : "";
      const numberMatch =
        ticket.count !== undefined &&
        (ticket.count.toString().includes(q) ||
          formattedNumber.toLowerCase().includes(q));
      const idMatch = ticket.id.toLowerCase().includes(q);

      return nameMatch || instagramMatch || numberMatch || idMatch;
    });
  }, [tickets, search]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedTicket) return;

    if (
      selectedTicket.count !== undefined &&
      (isNaN(selectedTicket.count) || selectedTicket.count < 1)
    ) {
      toast.error("O número do ingresso deve ser maior ou igual a 1.");
      return;
    }

    setIsSaving(true);
    try {
      const response = await axios.put(
        `/api/ticket/${selectedTicket.id}`,
        selectedTicket
      );
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === selectedTicket.id ? response.data : ticket
        )
      );
      toast.success("Ingresso atualizado com sucesso!");
      setIsEditDialogOpen(false);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Erro ao atualizar ingresso.";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await axios.delete(`/api/ticket/${id}`);
      setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
      toast.success("Ingresso deletado com sucesso!");
    } catch {
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
    } catch {
      toast.error("Erro ao deletar todos os ingressos.");
    } finally {
      setIsDeletingAll(false);
    }
  };

  const handleExport = (type: "csv" | "excel") => {
    const sanitizeForSpreadsheet = (val: any) => {
      if (val === null || val === undefined) return "";
      const str = String(val);
      if (/^[=+\-@\t\r]/.test(str)) {
        return "'" + str;
      }
      return str;
    };

    const exportData = tickets.map((ticket) => ({
      ID: ticket.id,
      "Número": ticket.count ?? "",
      Nome: sanitizeForSpreadsheet(ticket.igName || ticket.instagram),
      Instagram: sanitizeForSpreadsheet(ticket.instagram),
      "Foto URL": ticket.igAvatar || "",
      "Data de Criação": formatDate(ticket.createdAt, "dd/MM/yyyy HH:mm"),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
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
    <div className="space-y-4">
      {/* Barra de controle: busca, contador e exportação */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, número ou @..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <Badge variant="secondary" className="whitespace-nowrap h-9 px-3">
            {filteredTickets.length} de {tickets.length}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("csv")}
          >
            Exportar CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("excel")}
          >
            <FileXlsIcon className="size-4" />
            Excel
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                disabled={isDeletingAll || tickets.length === 0}
              >
                {isDeletingAll ? (
                  <Spinner size="size-4" />
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
                  permanentemente TODOS os ingressos do banco de dados.
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
      </div>

      {/* Tabela de ingressos */}
      <div className="border rounded-md overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Número</TableHead>
              <TableHead className="w-[60px]">Foto</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Instagram</TableHead>
              <TableHead className="w-[160px]">Criado em</TableHead>
              <TableHead className="w-[120px] text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-28 text-center text-muted-foreground"
                >
                  {search
                    ? "Nenhum ingresso encontrado para os termos da busca."
                    : "Nenhum ingresso emitido até o momento."}
                </TableCell>
              </TableRow>
            ) : (
              filteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  {/* Número formatado */}
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-xs">
                      {ticket.count && ticket.count > 0
                        ? `#${ticket.count.toString().padStart(4, "0")}`
                        : "------"}
                    </Badge>
                  </TableCell>

                  {/* Foto / Avatar */}
                  <TableCell>
                    <Avatar className="size-9 border border-border">
                      {ticket.igAvatar ? (
                        <AvatarImage
                          src={ticket.igAvatar}
                          alt={ticket.igName || ticket.instagram}
                          className="object-cover"
                        />
                      ) : null}
                      <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
                        {(ticket.igName || ticket.instagram || "U")[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>

                  {/* Nome */}
                  <TableCell className="font-medium">
                    {ticket.igName || ticket.instagram}
                  </TableCell>

                  {/* Instagram */}
                  <TableCell className="text-muted-foreground text-sm">
                    {ticket.instagram ? (
                      ticket.instagram.startsWith("@") ? (
                        ticket.instagram
                      ) : (
                        `@${ticket.instagram}`
                      )
                    ) : (
                      "-"
                    )}
                  </TableCell>

                  {/* Data */}
                  <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                    {formatDate(ticket.createdAt, "dd/MM/yyyy HH:mm")}
                  </TableCell>

                  {/* Ações */}
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        asChild
                        title="Visualizar ingresso"
                      >
                        <Link
                          href={`/ingresso/${ticket.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ArrowSquareOutIcon className="h-4 w-4" />
                        </Link>
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        title="Editar ingresso"
                        onClick={() => {
                          setSelectedTicket({ ...ticket });
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <PencilSimpleIcon className="h-4 w-4" />
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8"
                            title="Deletar ingresso"
                            disabled={deletingId === ticket.id}
                          >
                            {deletingId === ticket.id ? (
                              <Spinner size="size-4" />
                            ) : (
                              <TrashSimpleIcon className="h-4 w-4" />
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
                              permanentemente o ingresso de{" "}
                              <strong>{ticket.igName || ticket.instagram}</strong>.
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
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal de Edição */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[460px]">
          <DialogHeader>
            <DialogTitle>Editar Ingresso</DialogTitle>
            <DialogDescription>
              Altere o número, dados do participante ou atualize a foto.
            </DialogDescription>
          </DialogHeader>

          {selectedTicket && (
            <form onSubmit={handleUpdate} className="space-y-4 py-2">
              {/* Seção Foto / Avatar */}
              <div className="flex flex-col items-center justify-center p-3 border rounded-md bg-muted/20">
                <AvatarUploadField
                  value={selectedTicket.igAvatar || ""}
                  onChange={(dataUrl) =>
                    setSelectedTicket({
                      ...selectedTicket,
                      igAvatar: dataUrl,
                    })
                  }
                  disabled={isSaving}
                />
              </div>

              {/* Número do Ingresso */}
              <div className="space-y-1.5">
                <Label htmlFor="count">Número do Ingresso</Label>
                <Input
                  id="count"
                  type="number"
                  min={1}
                  value={selectedTicket.count ?? ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedTicket({
                      ...selectedTicket,
                      count: val === "" ? undefined : parseInt(val, 10),
                    });
                  }}
                  disabled={isSaving}
                  required
                />
                <p className="text-[11px] text-muted-foreground">
                  Número sequencial impresso no ingresso oficial. Não pode colidir com outro participante.
                </p>
              </div>

              {/* Nome */}
              <div className="space-y-1.5">
                <Label htmlFor="igName">Nome do Participante</Label>
                <Input
                  id="igName"
                  value={selectedTicket.igName || ""}
                  onChange={(e) =>
                    setSelectedTicket({
                      ...selectedTicket,
                      igName: e.target.value,
                    })
                  }
                  placeholder="Nome completo"
                  disabled={isSaving}
                  required
                />
              </div>

              {/* Instagram */}
              <div className="space-y-1.5">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={selectedTicket.instagram || ""}
                  onChange={(e) =>
                    setSelectedTicket({
                      ...selectedTicket,
                      instagram: e.target.value,
                    })
                  }
                  placeholder="usuario_ou_arroba"
                  disabled={isSaving}
                />
              </div>

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                  disabled={isSaving}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Spinner size="size-4" />
                      Salvando...
                    </>
                  ) : (
                    "Salvar Alterações"
                  )}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
