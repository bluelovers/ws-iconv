import { repairMojibake } from './mojibake-repair';

export {
	EnumMojibakeRepairMethod,
} from './mojibake-repair';

export {
	decodeBytes,
	encodeToBytes,
	generateMojibake,
	getDecodeTable,
	MOJIBAKE_ENCODINGS,
	repairMojibakeByEncodings,
} from './mojibake-cross-encoding'

export {
	repairMojibake,
}

export default repairMojibake
