/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** undefined - Your Google Gemini API key */
  "geminiApiKey": string,
  /** undefined - Gemini model to use */
  "model": string
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

