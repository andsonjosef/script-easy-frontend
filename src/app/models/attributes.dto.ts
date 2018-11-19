import { TableDTO } from "./tables.dto";

export interface AttributeDTO{
    id: string
   	ai? : boolean
	defaultA? : string
	indexA?: string
	name : string
	nullA? : boolean
	size: number
	type : string
	comment?: string
	referencesTable? : string
    table: TableDTO;
}