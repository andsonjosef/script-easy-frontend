import { SchemaDTO } from "./schemas.dto";

export interface TableDTO{
    id: string
    name: string
    schema: SchemaDTO;
}