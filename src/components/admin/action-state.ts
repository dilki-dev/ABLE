export type ActionState = { status: "idle" | "success" | "error"; message: string; completedAt?: number };
export const initialActionState: ActionState = { status: "idle", message: "" };
