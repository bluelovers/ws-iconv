
export function pathIsNetworkDrive(input: string)
{
	return /^\\\\[^/\\]/.test(input)
}

export function matchNetworkDriveRoot(input: string)
{
	return input.match(/^\\\\([^\\/]+)[\\/]?$/)
}

export function matchNetworkDrive02(input: string)
{
	return input.match(/^\\\\([^\\/]+)[\\/]([^\\/]+)[\\/]?$/)
}

export default pathIsNetworkDrive
