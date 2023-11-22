// TODO: Unit test base64 encoding/decoding

// Copied and adapted unicode base64 helper from MDN docs
// See: https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem

export function base64ToBytes(base64: string) {
	const binString = atob(base64);
	// @ts-expect-error: Suppress 'No overload matches this call' error
	return Uint8Array.from(binString, (m) => m.codePointAt(0));
}

export function base64ToString(base64: string) {
	return new TextDecoder().decode(base64ToBytes(base64));
}

export function bytesToBase64(bytes: Uint8Array) {
	let binString = '';

	// Concat string in chunks to prevent "RangeError: Maximum call stack size exceeded" error
	// in String.fromCodePoint function when converting large strings (like a JSON document)
	const chunkSize = 1024;
	for (let i = 0; i < bytes.length; i += chunkSize) {
		const chunk = bytes.slice(i, i + chunkSize);
		binString = binString.concat(String.fromCodePoint(...chunk));
	}

	return btoa(binString);
}

export function stringToBase64(string: string) {
	const stringBytes = new TextEncoder().encode(string);
	return bytesToBase64(stringBytes);
}

export function imageToBase64(file: File) {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result);
		reader.readAsDataURL(file);
	});
}
