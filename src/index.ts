import { WhisperOptions } from './types'
import { executeCppCommand } from './whisper'
// import downloadModel from './downloadModel'

import { constructCommand } from './WhisperHelper'
import { checkIfFileExists, convertToWavType } from './utils'

import autoDownloadModel from './autoDownloadModel'

export interface IOptions {
	modelName: string
	autoDownloadModelName?: string
	whisperOptions?: WhisperOptions
}

export async function nodewhisper(filePath: string, options: IOptions) {
	if (options.autoDownloadModelName) {
		await autoDownloadModel(options.autoDownloadModelName)
	}

	checkIfFileExists(filePath)
	// await downloadModel()

	const outputFilePath = await convertToWavType(filePath)

	checkIfFileExists(outputFilePath)

	const command = constructCommand(outputFilePath, options!)

	const transcript = await executeCppCommand(command)

	return transcript
}
