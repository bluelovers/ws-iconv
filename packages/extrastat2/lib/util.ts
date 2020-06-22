import { join } from "path";

export function reassemble(pathparts: string[])
{
	return join('/', ...pathparts)
}
