import {
  UseChatStreamInputMethod,
  UseChatStreamOptions,
} from "@/Hooks/useChatStream";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

const mergeInputInOptions = (
  input: string,
  options: UseChatStreamOptions,
  method: UseChatStreamInputMethod
) => {
  // options.query = options.query ?? {};
  // (options[method.type] as Record<string, unknown>)[method.key] = input;

  (options[method.type] ?? {})[method.key] = input;

  return options;
};

export const getStream = async (
  input: string,
  options: UseChatStreamOptions,
  method: UseChatStreamInputMethod
) => {
  options = mergeInputInOptions(input, options, method);

  const params = "?" + new URLSearchParams(options.query).toString();

  const response = await fetch(options.url + params, {
    method: options.method,
    headers: {
      ...DEFAULT_HEADERS,
      ...options.headers,
    },
    body: JSON.stringify(options.body, (_k, v) => (v === null ? undefined : v)),
  });

  if (!response.ok) throw new Error(response.statusText);

  return response.body;
};

export async function* decodeStreamToJson(
  reader: any
): AsyncIterableIterator<string> {
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    if (value) {
      try {
        yield decoder.decode(value);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
