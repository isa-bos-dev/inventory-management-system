import { CreateMovementDetailRequest } from "./create-movement-detail-request";

// Payload for registering an inventory movement
export interface CreateMovementRequest {
    movementTypeValue: number;
    movementDate: string;
    observation: string;
    details: CreateMovementDetailRequest[];
}
