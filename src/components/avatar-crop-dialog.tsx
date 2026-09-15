"use client";

import { useState, useCallback } from "react";
import Cropper, { type Area } from "react-easy-crop";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/luxe/spinner";
import {
  ArrowClockwiseIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
  CheckIcon,
} from "@phosphor-icons/react";
import { getCroppedImg, type CroppedImageResult } from "@/lib/image-crop";
import { toast } from "sonner";

interface AvatarCropDialogProps {
  imageSrc: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCropConfirmed: (result: CroppedImageResult) => void;
  onCancel?: () => void;
}

export function AvatarCropDialog({
  imageSrc,
  open,
  onOpenChange,
  onCropConfirmed,
  onCancel,
}: AvatarCropDialogProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCropCompleteInternal = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleConfirm = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    setIsProcessing(true);
    try {
      const croppedResult = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation,
        400, // max 400x400 px, ~25KB - 40KB
      );

      onCropConfirmed(croppedResult);
      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao cortar a imagem:", error);
      toast.error("Erro ao processar imagem. Tente novamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (onCancel) onCancel();
    onOpenChange(false);
    // Reset controls
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
  };

  if (!imageSrc) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px] p-4 sm:p-6 overflow-hidden">
        <DialogHeader className="pb-2">
          <DialogTitle>Ajustar foto do ingresso</DialogTitle>
          <DialogDescription>
            Arraste e ajuste o zoom para enquadrar seu rosto no círculo.
          </DialogDescription>
        </DialogHeader>

        {/* Cropper Container */}
        <div className="relative w-full h-[280px] sm:h-[320px] bg-neutral-900 rounded-lg overflow-hidden select-none">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropCompleteInternal}
            classes={{
              containerClassName: "rounded-lg",
            }}
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-3 py-2">
          {/* Zoom Slider */}
          <div className="flex items-center gap-3 px-1">
            <MagnifyingGlassMinusIcon className="size-4 text-muted-foreground shrink-0" />
            <input
              type="range"
              min={1}
              max={3}
              step={0.02}
              value={zoom}
              aria-label="Ajustar zoom"
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <MagnifyingGlassPlusIcon className="size-4 text-muted-foreground shrink-0" />

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-8 shrink-0 ml-1"
              title="Girar foto 90°"
              onClick={handleRotate}
            >
              <ArrowClockwiseIcon className="size-4" />
            </Button>
          </div>
        </div>

        <DialogFooter className="flex-row justify-end gap-2 pt-2 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isProcessing}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={isProcessing}
            className="gap-2"
          >
            {isProcessing ? (
              <>
                <Spinner size="size-4" />
                Otimizando...
              </>
            ) : (
              <>
                <CheckIcon weight="bold" className="size-4" />
                Confirmar foto
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
