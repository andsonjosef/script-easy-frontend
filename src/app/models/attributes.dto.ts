import { TableDTO } from "./tables.dto";

export interface AttributeDTO{
    id: string
   	ai : boolean
	defaultA : string
	index: string
	name : string
	nullA : boolean
	size: string
	type : string
	comment: string
	referencesTable : string
    table: TableDTO;
}