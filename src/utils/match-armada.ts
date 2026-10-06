import type { Armada } from "@/types/armada";

export function matchArmada(
  ids: number[] | undefined,
  armadaList: Armada[],
): Armada[] {
  if (!ids || ids.length === 0) return [];

  return ids
    .map((id) => armadaList.find((a) => a.id === id))
    .filter((a): a is Armada => a !== undefined);
}