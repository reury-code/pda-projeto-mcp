# pda-projeto-mcp

MCP server (stdio), somente leitura, que deixa o Claude Code consultar as tarefas da CLI [pda-projeto-ia](https://github.com/reury-code/pda-projeto-ia).

- [DECISAO-ESCOPO.md](DECISAO-ESCOPO.md): o que a tool pode e não pode fazer, e como o código garante.
- [LOG-INJECTION-TEMPLATE.md](LOG-INJECTION-TEMPLATE.md): ataque de prompt injection ao próprio server, mitigação e reteste.

## Como rodar

```
cd meu-mcp-server
npm install
npm test
```

Conectar ao Claude Code (o `.mcp.json` da raiz já registra o server no escopo `project`; na primeira vez o Claude Code pede aprovação):

```
claude mcp add --transport stdio --scope project tarefas -- node meu-mcp-server/server.mjs
```

Dentro do `claude`, `/mcp` deve mostrar `tarefas` conectado. Teste com: "o que ainda falta fazer nas minhas tarefas?".
