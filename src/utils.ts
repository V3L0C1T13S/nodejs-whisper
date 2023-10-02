import fs from 'fs'
import path from 'path'
import shell from 'shelljs'
import ffmpegPath from 'ffmpeg-static'

export const checkIfFileExists = (filePath: string) => {
	const isExist = fs.existsSync(filePath)

	if (!isExist) {
		throw new Error(`[Nodejs-whisper] Error: No such file : ${filePath}\n`)
	}
}

export const convertToWavType = async (inputFilePath: string) => {
	const fileExtension = inputFilePath.split('.').pop()

	const outputFilePath = path.join(
		path.dirname(inputFilePath),
		path.basename(inputFilePath, path.extname(inputFilePath))
	)

	if (fileExtension !== 'wav') {
		try {
			const command = `${ffmpegPath} -nostats -loglevel 0 -i ${inputFilePath} -ar 16000 -ac 1 -c:a pcm_s16le  ${outputFilePath}.wav`

			shell.exec(command)
			return `${outputFilePath}.wav`
		} catch (e) {
			throw new Error(e)
		}
	} else {
		return inputFilePath
	}
}
