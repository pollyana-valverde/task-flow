import { httpClient } from "@/lib/http/client";
import z from "zod";

const transferOwnershipInputSchema = z.object({
  newOwnerId: z.uuid(),
});

const transferOwnershipResponseSchema = z.object({
  message: z.string(),
});

interface TransferOwnershipProps {
  newOwnerId: string;
  workspaceId: string;
}

async function transferOwnership({
  newOwnerId,
  workspaceId,
}: TransferOwnershipProps) {
  const data = await httpClient(
    `/api/workspace/${workspaceId}/transfer-ownership`,
    {
      method: "PATCH",
      body: JSON.stringify({ newOwnerId }),
    },
  );

  return transferOwnershipResponseSchema.parse(data);
}

export { transferOwnership, transferOwnershipInputSchema };
