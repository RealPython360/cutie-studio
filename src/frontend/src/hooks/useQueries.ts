import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Inquiry } from "../lib/types";

export function useGetInquiries() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Inquiry[]>({
    queryKey: ["inquiries"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getInquiries();
      return result as Inquiry[];
    },
    enabled: !!actor && !isFetching,
  });
}

export interface SubmitInquiryPayload {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  deadline: string;
  description: string;
}

export function useSubmitInquiry() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SubmitInquiryPayload) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitInquiry(
        payload.name,
        payload.email,
        payload.projectType,
        payload.budget,
        payload.deadline,
        payload.description,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
}
