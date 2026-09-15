"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AvatarCropDialog } from "./avatar-crop-dialog";
import {
  CameraIcon,
  TrashSimpleIcon,
  CropIcon,
  UserIcon,
} from "@phosphor-icons/react";
import type { CroppedImageResult } from "@/lib/image-crop";
import { toast } from "sonner";

interface AvatarUploadFieldProps {
  value?: string; // base64 dataUrl or url
  onChange: (dataUrl: string) => void;
  disabled?: boolean;
}

export function AvatarUploadField({
  value,
  onChange,
  disabled = false,
}: AvatarUploadFieldProps) {
  const [rawImageSrc, setRawImageSrc] = useState<string | null>(null);
  const [isCropOpen, setIsCropOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up object URL when component unmounts
  useEffect(() => {
    return () => {
      if (rawImageSrc) {
        URL.revokeObjectURL(rawImageSrc);
      }
    };
  }, [rawImageSrc]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Por favor, selecione um arquivo de imagem válido.");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 20MB.");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setRawImageSrc(objectUrl);
    setIsCropOpen(true);

    // Reset input value so same file can be selected again if needed
    e.target.value = "";
  };

  const handleCropConfirmed = (result: CroppedImageResult) => {
    // Clean up temporary object URL
    if (rawImageSrc) {
      URL.revokeObjectURL(rawImageSrc);
      setRawImageSrc(null);
    }
    onChange(result.dataUrl);
  };

  const handleCropCancel = () => {
    if (rawImageSrc) {
      URL.revokeObjectURL(rawImageSrc);
      setRawImageSrc(null);
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  const handleOpenPicker = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full py-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/avif"
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled}
      />

      <div className="relative group">
        {value ? (
          <div className="relative size-24 rounded-full overflow-hidden border-2 border-primary/40 shadow-sm bg-muted">
            <Image
              src={value}
              alt="Pré-visualização do avatar"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={handleOpenPicker}
            disabled={disabled}
            className="size-24 rounded-full border-2 border-dashed border-muted-foreground/40 hover:border-primary/60 bg-muted/40 hover:bg-muted/70 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group-hover:scale-102"
          >
            <UserIcon className="size-6 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-[10px] text-muted-foreground font-medium">
              Sua foto
            </span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {value ? (
          <>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleOpenPicker}
              disabled={disabled}
              className="h-8 text-xs gap-1.5"
            >
              <CropIcon className="size-3.5" />
              Alterar foto
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              disabled={disabled}
              className="h-8 text-xs text-muted-foreground hover:text-destructive gap-1"
            >
              <TrashSimpleIcon className="size-3.5" />
              Remover
            </Button>
          </>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleOpenPicker}
            disabled={disabled}
            className="h-8 text-xs gap-1.5"
          >
            <CameraIcon className="size-3.5" />
            Adicionar foto
          </Button>
        )}
      </div>

      <p className="text-[11px] text-muted-foreground text-center max-w-[260px] text-balance">
        Sua foto será ajustada em formato circular para o ingresso oficial.
      </p>

      <AvatarCropDialog
        imageSrc={rawImageSrc}
        open={isCropOpen}
        onOpenChange={setIsCropOpen}
        onCropConfirmed={handleCropConfirmed}
        onCancel={handleCropCancel}
      />
    </div>
  );
}
