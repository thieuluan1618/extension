import { useState } from "react";
import {
  Detail,
  List,
  ActionPanel,
  Action,
  showToast,
  Toast,
  Clipboard,
} from "@raycast/api";
import { askGemini } from "./utils/gemini";

export default function Ask() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = async (q: string) => {
    if (!q.trim()) {
      showToast({
        style: Toast.Style.Failure,
        title: "Error",
        message: "Please enter a question",
      });
      return;
    }

    setIsLoading(true);
    setQuestion(q);

    try {
      showToast({
        style: Toast.Style.Animated,
        title: "Asking AI...",
      });

      const result = await askGemini(q);
      setResponse(result);
      setShowResult(true);

      showToast({
        style: Toast.Style.Success,
        title: "Success",
        message: "Response received",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      showToast({
        style: Toast.Style.Failure,
        title: "Error",
        message: errorMessage,
      });
      setShowResult(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (showResult && response) {
    return (
      <Detail
        markdown={response}
        actions={
          <ActionPanel>
            <Action
              title="Copy Response"
              onAction={async () => {
                await Clipboard.copy(response);
                showToast({
                  style: Toast.Style.Success,
                  title: "Copied to clipboard",
                });
              }}
            />
            <Action
              title="Ask Another Question"
              onAction={() => {
                setShowResult(false);
                setResponse("");
                setQuestion("");
              }}
            />
          </ActionPanel>
        }
      />
    );
  }

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder="Ask me anything..."
      onSearchTextChange={setQuestion}
      searchText={question}
    >
      {showResult && response && (
        <List.Item
          title="Response"
          detail={<List.Item.Detail markdown={response} />}
          actions={
            <ActionPanel>
              <Action
                title="Copy Response"
                onAction={async () => {
                  await Clipboard.copy(response);
                  showToast({
                    style: Toast.Style.Success,
                    title: "Copied to clipboard",
                  });
                }}
              />
              <Action
                title="Ask Another Question"
                onAction={() => {
                  setShowResult(false);
                  setResponse("");
                  setQuestion("");
                }}
              />
            </ActionPanel>
          }
        />
      )}
      {!showResult && (
        <List.Item
          title="Press Enter to Ask"
          actions={
            <ActionPanel>
              <Action
                title="Ask AI"
                onAction={() => handleSubmit(question)}
              />
            </ActionPanel>
          }
        />
      )}
    </List>
  );
}
