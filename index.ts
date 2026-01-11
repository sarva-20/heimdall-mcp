import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import si from "systeminformation";
import { z } from "zod";
import { exec } from "child_process";
import util from "util";
import { writeFile } from "fs/promises";
import path from "path";
import os from "os";

const execAsync = util.promisify(exec);

// Initialize the Server
const server = new McpServer({
  name: "heimdall-mcp",
  version: "1.0.0",
});

// --- SYSTEM SENSORS ---

server.tool("get_battery", "Get battery status", {}, async () => {
  const battery = await si.battery();
  return {
    content: [{ type: "text", text: `Battery: ${battery.percent}%, Charging: ${battery.isCharging}` }],
  };
});

server.tool("get_cpu_load", "Get CPU load", {}, async () => {
  const load = await si.currentLoad();
  return { content: [{ type: "text", text: `CPU Load: ${load.currentLoad.toFixed(2)}%` }] };
});

server.tool("get_memory_usage", "Get RAM usage", {}, async () => {
  const mem = await si.mem();
  const usedGB = (mem.active / 1024 ** 3).toFixed(2);
  const totalGB = (mem.total / 1024 ** 3).toFixed(2);
  return { content: [{ type: "text", text: `RAM: ${usedGB}GB / ${totalGB}GB` }] };
});

// --- SYSTEM ACTIONS ---

server.tool(
  "speak_message",
  "Speak a message out loud using macOS text-to-speech",
  { message: z.string() },
  async ({ message }) => {
    await execAsync(`say "${message.replace(/"/g, '\\"')}"`);
    return { content: [{ type: "text", text: "Message spoken." }] };
  }
);

// --- CLIPBOARD & FILES ---

server.tool("read_clipboard", "Read current clipboard text", {}, async () => {
  const { stdout } = await execAsync("pbpaste");
  return { content: [{ type: "text", text: stdout || "Clipboard empty" }] };
});

server.tool(
  "write_to_clipboard",
  "Copy text to clipboard",
  { text: z.string() },
  async ({ text }) => {
    const proc = Bun.spawn(["pbcopy"], { stdin: new Response(text) });
    await proc.exited;
    return { content: [{ type: "text", text: "Copied to clipboard." }] };
  }
);

server.tool(
  "save_to_desktop",
  "Save text content to a file on the Desktop",
  { filename: z.string(), content: z.string() },
  async ({ filename, content }) => {
    const filePath = path.join(os.homedir(), "Desktop", filename);
    await writeFile(filePath, content);
    return { content: [{ type: "text", text: `Saved to ${filePath}` }] };
  }
);

// Start Server
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("Mac Jarvis Server running...");