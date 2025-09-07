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
import { FileSpreadsheet, Pencil, Trash } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SUBSCRIPTION_CATEGORIES } from "@/app/config";
import axios from "axios";
import { toast } from "sonner";

type Subscription = {
  id: string;
  name: string;
  email: string;
  count: number;
  category: string;
  instagram: string | null;
  igAvatar: string | null;
  igName: string | null;
  createdAt: Date;
};

export default function GerenciaClient({
  subscriptions: initialSubscriptions,
}: {
  subscriptions: Subscription[];
}) {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [selectedSubscription, setSelectedSubscription] =
    useState<Subscription | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedSubscription) return;

    try {
      const response = await axios.put(
        `/api/subscription/${selectedSubscription.id}`,
        selectedSubscription
      );
      setSubscriptions(
        subscriptions.map((sub) =>
          sub.id === selectedSubscription.id ? response.data : sub
        )
      );
      toast.success("Inscrição atualizada com sucesso!");
      setIsEditDialogOpen(false);
    } catch (error) {
      toast.error("Erro ao atualizar inscrição.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/subscription/${id}`);
      setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
      toast.success("Inscrição deletada com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar inscrição.");
    }
  };

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
            <TableHead>Ações</TableHead>
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
              <TableCell>
                <div className="flex gap-2">
                  <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setSelectedSubscription(sub)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar Inscrição</DialogTitle>
                      </DialogHeader>
                      {selectedSubscription && (
                        <form onSubmit={handleUpdate}>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                Nome
                              </Label>
                              <Input
                                id="name"
                                value={selectedSubscription.name}
                                onChange={(e) =>
                                  setSelectedSubscription({
                                    ...selectedSubscription,
                                    name: e.target.value,
                                  })
                                }
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="email" className="text-right">
                                Email
                              </Label>
                              <Input
                                id="email"
                                value={selectedSubscription.email}
                                onChange={(e) =>
                                  setSelectedSubscription({
                                    ...selectedSubscription,
                                    email: e.target.value,
                                  })
                                }
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="category" className="text-right">
                                Categoria
                              </Label>
                              <Select
                                value={selectedSubscription.category}
                                onValueChange={(value) =>
                                  setSelectedSubscription({
                                    ...selectedSubscription,
                                    category: value,
                                  })
                                }
                              >
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Selecione a categoria" />
                                </SelectTrigger>
                                <SelectContent>
                                  {SUBSCRIPTION_CATEGORIES.map((category) => (
                                    <SelectItem
                                      key={category.value}
                                      value={category.value}
                                    >
                                      {category.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="instagram" className="text-right">
                                Instagram
                              </Label>
                              <Input
                                id="instagram"
                                value={selectedSubscription.instagram || ""}
                                onChange={(e) =>
                                  setSelectedSubscription({
                                    ...selectedSubscription,
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
                                value={selectedSubscription.igName || ""}
                                onChange={(e) =>
                                  setSelectedSubscription({
                                    ...selectedSubscription,
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
                                value={selectedSubscription.igAvatar || ""}
                                onChange={(e) =>
                                  setSelectedSubscription({
                                    ...selectedSubscription,
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
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Você tem certeza absoluta?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Essa ação não pode ser desfeita. Isso irá deletar
                          permanentemente a inscrição.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(sub.id)}>
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
    </div>
  );
}
