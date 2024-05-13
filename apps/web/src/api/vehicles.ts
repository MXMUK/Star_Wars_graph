
import type { Vehicle } from "../types/vehicle";
import { client } from "../utils/fetch-info";

export const getVehicleById = (id: string): Promise<Vehicle> => {
  return client.get<Vehicle>(`/vehicles/${id}`);
};
