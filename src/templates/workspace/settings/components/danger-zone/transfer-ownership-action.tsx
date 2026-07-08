"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ErrorMessage } from "@/components/ui/error-message";
import { FieldError, FieldGroup } from "@/components/ui/field";
import { Text } from "@/components/ui/text";
import {
  transferOwnership,
  transferOwnershipInputSchema,
} from "@/http/members/transfer-ownership";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApiError } from "@/lib/http/api-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertOctagon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

interface TransferOwnershipActionProps {
  workspaceId: string;
  members: {
    id: string;
    userId: string;
    user: {
      name: string;
    };
  }[];
}

const transferOwnershipSchema = transferOwnershipInputSchema.extend({
  newOwnerId: z.uuid("Novo dono inválido"),
});

type TransferOwnershipData = z.infer<typeof transferOwnershipSchema>;

function TransferOwnershipAction({
  workspaceId,
  members,
}: TransferOwnershipActionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
    control,
  } = useForm<TransferOwnershipData>({
    resolver: zodResolver(transferOwnershipSchema),
  });

  const router = useRouter();

  function handleClose(isModalOpen: boolean) {
    setIsModalOpen(isModalOpen);
  }

  async function handleTransferOwnership(data: TransferOwnershipData) {
    try {
      await transferOwnership({ newOwnerId: data.newOwnerId, workspaceId });

      reset();
      setIsModalOpen(false);

      router.replace(`/workspaces/${workspaceId}/boards`);
    } catch (error) {
      if (error instanceof ApiError) {
        setError("root", { message: error.message });
        return;
      }

      setError("root", {
        message: "Ocorreu um erro. Tente novamente mais tarde.",
      });
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <Text className="text-foreground">Transferir propriedade</Text>
        <Text variant="mono">
          Você deixará de ser o dono e passará a ser admin. Esta ação é
          permanente.
        </Text>
      </div>
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogTrigger asChild>
          <Button variant="destructive">Transferir propriedade</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm md:max-w-md shadow-red-950 ring-red-950 dark:ring-red-950 dark:shadow-red-950">
          <form onSubmit={handleSubmit(handleTransferOwnership)}>
            <DialogHeader className="space-y-4">
              <DialogTitle className="flex gap-3 items-center">
                <div className="bg-destructive/20 border border-destructive p-2 rounded-lg">
                  <AlertOctagon className="text-destructive size-5.5" />
                </div>
                <Text className="text-foreground" variant="h2">
                  Transferir propriedade?
                </Text>
              </DialogTitle>
              <DialogDescription asChild>
                <Text variant="mono">
                  Você deixará de ser o dono e passará a ser admin. Esta ação
                  não pode ser desfeita facilmente.
                </Text>
              </DialogDescription>

              <FieldGroup className="gap-4">
                {errors.root && (
                  <ErrorMessage>{errors.root.message}</ErrorMessage>
                )}

                <Controller
                  name="newOwnerId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        if (value) field.onChange(value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Escolha um novo dono..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {members.map((member) => (
                            <SelectItem key={member.id} value={member.userId}>
                              {member.user.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />

                <FieldError
                  errors={[{ message: errors.newOwnerId?.message }]}
                  className="text-end"
                >
                  {errors.newOwnerId?.message}
                </FieldError>
              </FieldGroup>
            </DialogHeader>
            <DialogFooter className="mt-3">
              <DialogClose asChild disabled={isSubmitting}>
                <Button className="px-6" variant="secondary">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                disabled={isSubmitting}
                variant="destructive"
                type="submit"
              >
                {isSubmitting ? "Transferindo propriedade..." : "Transferir"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { TransferOwnershipAction };
