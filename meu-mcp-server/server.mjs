// MCP server (stdio) somente leitura para as tarefas do pda-projeto-ia.
// Nunca use console.log aqui: o stdout é o canal do protocolo. Depure com console.error.

import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import * as z from "zod/v4";
import { buscarTarefas, formatarTarefas } from "./ferramentas.mjs";

const server = new McpServer({ name: "tarefas-mcp", version: "0.1.0" });

server.registerTool(
  "buscar_tarefas",
  {
    description:
      "Busca tarefas na lista do projeto pda-projeto-ia (somente leitura). " +
      "Use quando a pessoa perguntar o que falta fazer, o que já foi concluído ou " +
      "procurar uma tarefa pelo título. Devolve no máximo 20 tarefas.",
    inputSchema: z.strictObject({
      texto: z
        .string()
        .max(100)
        .optional()
        .describe("Trecho do título a procurar. Ex.: 'prompts'. Vazio lista todas."),
      apenas_pendentes: z
        .boolean()
        .optional()
        .describe("true para devolver só as tarefas ainda não concluídas."),
    }),
  },
  async (entrada) => {
    const tarefas = buscarTarefas(entrada);
    return { content: [{ type: "text", text: formatarTarefas(tarefas) }] };
  },
);

await server.connect(new StdioServerTransport());
console.error("tarefas-mcp no ar (stdio).");
