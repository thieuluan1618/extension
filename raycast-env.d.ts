/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** undefined - Your Google Cloud project ID. If not set, will be read from GOOGLE_APPLICATION_CREDENTIALS file. */
  "gcpProjectId"?: string,
  /** undefined - Region for Vertex AI (e.g., us-central1) */
  "gcpLocation": string,
  /** undefined - Vertex AI model to use */
  "model": string,
  /** undefined - Your ElevenLabs API key for text-to-speech */
  "elevenLabsApiKey"?: string,
  /** undefined - Voice ID to use (default: George) */
  "elevenLabsVoiceId": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `pepe` command */
  export type Pepe = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `pepe` command */
  export type Pepe = {
  /** Ask me anything... */
  "question": string
}
}

