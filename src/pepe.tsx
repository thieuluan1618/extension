import {
  Detail,
  ActionPanel,
  Action,
  showToast,
  Toast,
  Clipboard,
  LaunchProps,
  popToRoot,
} from "@raycast/api";
import { useState, useEffect } from "react";
import { askGemini } from "./utils/gemini";

interface Arguments {
  question: string;
}

export default function Ask(props: LaunchProps<{ arguments: Arguments }>) {
  const { question } = props.arguments;
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchResponse() {
      try {
        console.log("Question received:", question);
        
        await showToast({
          style: Toast.Style.Animated,
          title: "Asking Pepe...",
        });

        const result = await askGemini(question);
        
        if (!cancelled) {
          console.log("Response received:", result?.substring(0, 100));
          setResponse(result);
          await showToast({
            style: Toast.Style.Success,
            title: "Response received",
          });
        }
      } catch (err) {
        console.error("Error:", err);
        const errorMessage = err instanceof Error ? err.message : String(err);
        if (!cancelled) {
          setError(errorMessage);
          await showToast({
            style: Toast.Style.Failure,
            title: "Error",
            message: errorMessage,
          });
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    if (question) {
      fetchResponse();
    }

    return () => {
      cancelled = true;
    };
  }, [question]);

  const markdown = error 
    ? `## Error\n\n${error}` 
    : response || `## Loading...\n\nAsking about: "${question}"`;

  return (
    <Detail
      isLoading={isLoading}
      markdown={markdown}
      actions={
        <ActionPanel>
          {response && (
            <Action
              title="Copy Response"
              onAction={async () => {
                await Clipboard.copy(response);
                await showToast({
                  style: Toast.Style.Success,
                  title: "Copied to clipboard",
                });
              }}
            />
          )}
          <Action
            title="Ask Another Question"
            onAction={() => popToRoot()}
          />
        </ActionPanel>
      }
    />
  );
}
