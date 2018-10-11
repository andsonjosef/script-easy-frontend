import { TableDTO } from "./tables.dto";

export interface AttributeDTO{
    id: string
   	ai : string
	defaultA : string
	index: string
	name : string
	nullA : string
	size: string
	type : string
	comment: string
	referencesTable : string
    table: TableDTO;
}