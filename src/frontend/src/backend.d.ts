import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Inquiry {
    id: string;
    projectType: string;
    name: string;
    submittedAt: bigint;
    description: string;
    deadline: string;
    email: string;
    budget: string;
}
export interface backendInterface {
    getInquiries(): Promise<Array<Inquiry>>;
    submitInquiry(name: string, email: string, projectType: string, budget: string, deadline: string, description: string): Promise<string>;
}
