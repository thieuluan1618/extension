import {
  Detail,
  ActionPanel,
  Action,
  showToast,
  Toast,
  Clipboard,
  LaunchProps,
  Icon,
  Form,
  popToRoot,
} from "@raycast/api";
import { useState, useEffect, useRef } from "react";
import { Content } from "@google/generative-ai";
import { askGemini } from "./utils/gemini";
import { speakText } from "./utils/elevenlabs";

interface Arguments {
  question: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

function toGeminiHistory(messages: Message[]): Content[] {
  return messages.map((m) => ({
    role: m.role === "user" ? "user" : "model",
    parts: [{ text: m.content }],
  }));
}

export default function Ask(props: LaunchProps<{ arguments: Arguments }>) {
  const { question } = props.arguments;
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const messagesRef = useRef<Message[]>([]);

  messagesRef.current = messages;

  useEffect(() => {
    if (question) {
      handleAsk(question);
    } else {
      setShowInput(true);
    }
  }, []);

  const handleAsk = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: "user", content: text };
    const currentMessages = messagesRef.current;
    const newMessages = [...currentMessages, userMessage];
    setMessages(newMessages);
    setInputValue("");
    setShowInput(false);
    setIsLoading(true);

    try {
      const history = toGeminiHistory(currentMessages);
      const result = await askGemini(text, history);

      const assistantMessage: Message = { role: "assistant", content: result };
      setMessages([...newMessages, assistantMessage]);

      await showToast({
        style: Toast.Style.Success,
        title: "Response received",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      await showToast({
        style: Toast.Style.Failure,
        title: "Error",
        message: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const conversationMarkdown = messages
    .map(
      (m) =>
        `**${m.role === "user" ? "You" : "🤖 Pepe"}:**\n${m.content}`
    )
    .join("\n\n---\n\n");

  if (showInput) {
    return (
      <Form
        actions={
          <ActionPanel>
            <Action.SubmitForm onSubmit={() => handleAsk(inputValue)} />
          </ActionPanel>
        }
      >
        <Form.TextArea
          id="question"
          title="Ask Pepe"
          placeholder="What do you want to know?"
          value={inputValue}
          onChange={setInputValue}
        />
      </Form>
    );
  }

  return (
    <Detail
      isLoading={isLoading}
      markdown={conversationMarkdown || "Starting conversation..."}
      actions={
        <ActionPanel>
          {!isLoading && (
            <>
              <Action
                title="Ask Follow-up"
                icon={Icon.Message}
                shortcut={{ modifiers: ["cmd"], key: "return" }}
                onAction={() => setShowInput(true)}
              />
              <Action
                title="Speak Response"
                icon={Icon.SpeakerHigh}
                shortcut={{ modifiers: ["cmd"], key: "s" }}
                onAction={async () => {
                  const lastAssistant = [...messages].reverse().find((m: Message) => m.role === "assistant");
                  if (lastAssistant) {
                    await showToast({ style: Toast.Style.Animated, title: "Speaking..." });
                    try {
                      await speakText(lastAssistant.content);
                      await showToast({ style: Toast.Style.Success, title: "Done speaking" });
                    } catch (err) {
                      const msg = err instanceof Error ? err.message : String(err);
                      await showToast({ style: Toast.Style.Failure, title: "TTS Error", message: msg });
                    }
                  }
                }}
              />
              <Action
                title="Copy Last Response"
                icon={Icon.Clipboard}
                shortcut={{ modifiers: ["cmd"], key: "c" }}
                onAction={async () => {
                  const lastAssistant = [...messages].reverse().find((m: Message) => m.role === "assistant");
                  if (lastAssistant) {
                    await Clipboard.copy(lastAssistant.content);
                    await showToast({
                      style: Toast.Style.Success,
                      title: "Copied to clipboard",
                    });
                  }
                }}
              />
            </>
          )}
          <Action
            title="New Conversation"
            icon={Icon.Plus}
            shortcut={{ modifiers: ["cmd"], key: "n" }}
            onAction={() => popToRoot()}
          />
        </ActionPanel>
      }
    />
  );
}
