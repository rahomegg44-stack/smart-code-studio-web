type Judge0Result = {
  stdout?: string | null;
  stderr?: string | null;
  compile_output?: string | null;
  message?: string | null;
  status?: {
    id: number;
    description: string;
  };
};

const JUDGE0_URL = import.meta.env.VITE_JUDGE0_URL || "http://localhost:2358";

const CPP_LANGUAGE_ID = Number(import.meta.env.VITE_JUDGE0_CPP_LANGUAGE_ID || 54);
const JAVA_LANGUAGE_ID = Number(import.meta.env.VITE_JUDGE0_JAVA_LANGUAGE_ID || 62);

function getLanguageId(language: "cpp" | "java"): number {
  if (language === "cpp") return CPP_LANGUAGE_ID;
  return JAVA_LANGUAGE_ID;
}

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function runJudge0Code(
  language: "cpp" | "java",
  sourceCode: string,
  stdin = ""
): Promise<string> {
  const languageId = getLanguageId(language);

  const createRes = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=false&wait=false`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      language_id: languageId,
      source_code: sourceCode,
      stdin,
    }),
  });

  if (!createRes.ok) {
    const text = await createRes.text();
    throw new Error(`Judge0 submit failed: ${text}`);
  }

  const created = await createRes.json();
  const token = created.token;

  if (!token) {
    throw new Error("Judge0 token was not returned.");
  }

  for (let i = 0; i < 30; i += 1) {
    await wait(1200);

    const resultRes = await fetch(`${JUDGE0_URL}/submissions/${token}?base64_encoded=false`);
    if (!resultRes.ok) {
      const text = await resultRes.text();
      throw new Error(`Judge0 poll failed: ${text}`);
    }

    const result: Judge0Result = await resultRes.json();
    const statusId = result.status?.id;

    if (statusId === 1 || statusId === 2) {
      continue;
    }

    const output = [
      result.stdout,
      result.stderr,
      result.compile_output,
      result.message,
      result.status?.description ? `Status: ${result.status.description}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    return output || "Program finished with no output.";
  }

  throw new Error("Judge0 timeout: execution took too long.");
}